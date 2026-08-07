import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { useCallback, useId, useMemo, useState } from 'react';
import { EASE } from '../../animations/variants';
import { BUDGET_OPTIONS, SERVICE_OPTIONS, SOURCE_OPTIONS, TIMELINE_OPTIONS } from '../../data/site';
import { submitInquiry, ApiError } from '../../services/api';
import type { InquiryPayload } from '../../types';
import { cn, referenceId } from '../../utils';

const STEPS = ['About you', 'Your company', 'The project', 'Review'];

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  source: string;
  services: string[];
  projectDescription: string;
  budget: string;
  timeline: string;
  /** Honeypot — hidden from real users, left blank by them. */
  hp: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  source: '',
  services: [],
  projectDescription: '',
  budget: '',
  timeline: '',
  hp: '',
};

type FieldKey = keyof FormState;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateField(key: FieldKey, value: FormState[FieldKey]): string {
  if (key === 'name' && !String(value).trim()) return 'Please enter your name.';
  if (key === 'email') {
    if (!String(value).trim()) return 'Please enter your email.';
    if (!EMAIL_RE.test(String(value))) return 'That email address doesn\'t look right.';
  }
  if (key === 'phone' && String(value).trim() && String(value).trim().length < 7) {
    return 'Please enter a valid phone number.';
  }
  if (key === 'projectDescription' && String(value).trim().length < 30) {
    return 'Tell us a little more — at least 30 characters.';
  }
  return '';
}

/**
 * Multi-step premium project inquiry:
 * floating labels · realtime validation · animated states · success screen
 * with generated reference id.
 */
export function InquiryForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormState>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [refId, setRefId] = useState('');

  const set = (key: FieldKey, value: FormState[FieldKey]) => {
    setValues((v) => ({ ...v, [key]: value }));
    const err = validateField(key, value);
    setErrors((e) => ({ ...e, [key]: err }));
  };

  const onBlur = (key: FieldKey) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateField(key, values[key]) }));
  };

  const stepErrors = useMemo(() => {
    if (step === 0) return [errors.name, errors.email, errors.phone].filter(Boolean);
    if (step === 2) return [errors.projectDescription].filter(Boolean);
    return [];
  }, [step, errors]);

  const canContinue = useMemo(() => {
    if (step === 0) return values.name.trim() && EMAIL_RE.test(values.email);
    if (step === 1) return true;
    if (step === 2) return values.services.length > 0 && values.projectDescription.trim().length >= 30 && values.budget && values.timeline;
    return true;
  }, [step, values]);

  const next = () => {
    if (step === 0) {
      // mark all step fields touched so errors surface
      ['name', 'email', 'phone'].forEach((k) => onBlur(k as FieldKey));
      if (!canContinue) return;
    }
    if (step === 2 && !canContinue) return;
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = useCallback(async () => {
    setStatus('submitting');
    setSubmitError('');
    const payload: InquiryPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      company: values.company.trim(),
      website: values.website.trim(),
      services: values.services,
      projectDescription: values.projectDescription.trim(),
      budget: values.budget,
      timeline: values.timeline,
      source: values.source,
      hp: values.hp,
    };
    const id = referenceId();
    try {
      await submitInquiry(payload);
      setRefId(id);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setSubmitError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.');
    }
  }, [values]);

  const toggleService = (service: string) => {
    setValues((v) => ({
      ...v,
      services: v.services.includes(service)
        ? v.services.filter((s) => s !== service)
        : [...v.services, service],
    }));
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-raised">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <SuccessScreen key="success" referenceId={refId} name={values.name.split(' ')[0]} />
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="p-6 md:p-10"
          >
            {/* Honeypot — invisible to real users, tabIndex/aria hide it from
               keyboard & screen-reader nav. Bots that autofill every input
               populate it; the server silently drops those submissions. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
              <label htmlFor="hp-field">Leave this field empty</label>
              <input
                id="hp-field"
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                value={values.hp}
                onChange={(e) => set('hp', e.target.value)}
              />
            </div>

            {/* Progress */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ash">
                  Step {step + 1} / {STEPS.length}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
                  {STEPS[step]}
                </span>
              </div>
              <div className="mt-3 flex gap-1.5" aria-hidden="true">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-colors duration-500',
                      i <= step ? 'bg-signal' : 'bg-ink-line',
                    )}
                  />
                ))}
              </div>
            </div>

            {step === 0 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <FloatInput label="Full name" value={values.name} error={touched.name ? errors.name : undefined} onChange={(v) => set('name', v)} onBlur={() => onBlur('name')} autoFocus />
                <FloatInput label="Email address" type="email" value={values.email} error={touched.email ? errors.email : undefined} onChange={(v) => set('email', v)} onBlur={() => onBlur('email')} />
                <FloatInput label="Phone (optional)" type="tel" value={values.phone} error={touched.phone ? errors.phone : undefined} onChange={(v) => set('phone', v)} onBlur={() => onBlur('phone')} />
                <p className="self-end text-xs leading-relaxed text-ash sm:col-span-1">
                  We&rsquo;ll only use these details to respond to your inquiry.
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <FloatInput label="Company" value={values.company} onChange={(v) => set('company', v)} />
                <FloatInput label="Website (optional)" type="url" value={values.website} onChange={(v) => set('website', v)} />
                <div className="sm:col-span-2">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ash">How did you hear about KYNYX?</p>
                  <div className="flex flex-wrap gap-2">
                    {SOURCE_OPTIONS.map((option) => (
                      <ChoicePill key={option} active={values.source === option} onClick={() => set('source', option)}>
                        {option}
                      </ChoicePill>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-8">
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ash">
                    Service required <span className="text-signal">(select all that apply)</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((service) => (
                      <ChoicePill key={service} active={values.services.includes(service)} onClick={() => toggleService(service)}>
                        {service}
                      </ChoicePill>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <label htmlFor="description" className="font-mono text-[10px] uppercase tracking-widest text-ash">
                      Project description
                    </label>
                    <span className={cn('font-mono text-[10px] tracking-widest', values.projectDescription.length >= 30 ? 'text-signal' : 'text-ash-deep')}>
                      {values.projectDescription.length} chars
                    </span>
                  </div>
                  <textarea
                    id="description"
                    rows={4}
                    value={values.projectDescription}
                    onChange={(e) => set('projectDescription', e.target.value)}
                    onBlur={() => onBlur('projectDescription')}
                    placeholder="What are you building? Who is it for? What does success look like?"
                    className={cn(
                      'w-full resize-none rounded-xl border bg-ink px-4 py-3.5 text-sm text-mist placeholder:text-ash-deep transition-colors',
                      touched.projectDescription && errors.projectDescription
                        ? 'border-red-500/60 focus:border-red-400'
                        : 'border-ink-line focus:border-signal/60',
                    )}
                    aria-invalid={Boolean(touched.projectDescription && errors.projectDescription)}
                    aria-describedby="description-error"
                  />
                  {touched.projectDescription && errors.projectDescription && (
                    <p id="description-error" className="mt-2 text-xs text-red-400">
                      {errors.projectDescription}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ash">Estimated budget</p>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_OPTIONS.map((option) => (
                        <ChoicePill key={option} active={values.budget === option} onClick={() => set('budget', option)}>
                          {option}
                        </ChoicePill>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-ash">Timeline</p>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINE_OPTIONS.map((option) => (
                        <ChoicePill key={option} active={values.timeline === option} onClick={() => set('timeline', option)}>
                          {option}
                        </ChoicePill>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="font-display text-xl font-semibold text-mist">Almost there — review your inquiry.</h3>
                <ReviewRow label="Name" value={values.name} />
                <ReviewRow label="Email" value={values.email} />
                <ReviewRow label="Phone" value={values.phone || '—'} />
                <ReviewRow label="Company" value={values.company || '—'} />
                <ReviewRow label="Services" value={values.services.join(', ')} />
                <ReviewRow label="Budget" value={values.budget} />
                <ReviewRow label="Timeline" value={values.timeline} />
                <div className="rounded-xl border border-ink-line bg-ink p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ash">Project description</p>
                  <p className="mt-2 text-sm leading-relaxed text-mist/80">{values.projectDescription}</p>
                </div>
              </div>
            )}

            {/* Errors */}
            {stepErrors.length > 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                role="alert"
              >
                {stepErrors[0]}
              </motion.p>
            )}

            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                role="alert"
              >
                {submitError}
              </motion.p>
            )}

            {/* Nav */}
            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-3 text-sm text-mist transition-colors hover:border-signal hover:text-signal',
                  step === 0 && 'pointer-events-none opacity-40',
                )}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canContinue}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3 text-sm font-semibold text-ink transition-opacity',
                    !canContinue && 'cursor-not-allowed opacity-40',
                  )}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={status === 'submitting'}
                  className="inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Submit Inquiry
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- sub-components ---------------- */

function FloatInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  autoFocus?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const inputId = useId();
  const errorId = `${inputId}-error`;
  return (
    <div>
      <div className="relative">
        <label
          htmlFor={inputId}
          className={cn(
            'pointer-events-none absolute left-4 top-3.5 origin-left font-mono text-xs transition-all duration-300',
            floated ? '-translate-y-2.5 scale-75 text-signal' : 'text-ash',
          )}
        >
          {label}
        </label>
        <input
          id={inputId}
          type={type}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            'w-full rounded-xl border bg-ink px-4 pb-2.5 pt-5 text-sm text-mist outline-none transition-colors',
            error ? 'border-red-500/60 focus:border-red-400' : 'border-ink-line focus:border-signal/60',
          )}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            id={errorId}
            className="mt-1.5 text-xs text-red-400"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChoicePill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300',
        active
          ? 'border-signal bg-signal/15 text-signal shadow-[0_0_16px_-6px_rgba(198,255,62,0.5)]'
          : 'border-ink-line text-mist/70 hover:border-signal/40 hover:text-mist',
      )}
    >
      {children}
    </button>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink-line pb-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-ash">{label}</span>
      <span className="max-w-[70%] text-right text-sm text-mist">{value}</span>
    </div>
  );
}

function SuccessScreen({ referenceId: id, name }: { referenceId: string; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center px-6 py-20 text-center md:py-24"
      role="status"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 14 }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-signal text-ink shadow-glow"
      >
        <Check className="h-9 w-9" strokeWidth={3} aria-hidden="true" />
      </motion.span>
      <h3 className="mt-8 font-display text-3xl font-semibold text-mist md:text-4xl">Project received.</h3>
      <p className="mt-3 max-w-md text-ash">
        Thanks{name ? `, ${name}` : ''}. We&rsquo;ve got your project details and our team
        will review them shortly. We&rsquo;ll be in touch soon to discuss next steps.
      </p>
      <p className="mt-8 rounded-full border border-signal/40 bg-signal-dim px-5 py-2.5 font-mono text-xs tracking-widest text-signal">
        Reference: {id}
      </p>
    </motion.div>
  );
}
