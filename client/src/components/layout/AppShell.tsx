import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { pageVariants } from '../../animations/variants';
import { AppReadyProvider } from '../../context/AppReadyContext';
import { AmbientBackground } from '../effects/AmbientBackground';
import { CustomCursor } from '../effects/CustomCursor';
import { Loader } from '../effects/Loader';
import { Footer } from './Footer';
import { MobileMenu } from './MobileMenu';
import { Navbar } from './Navbar';
import { PageFallback } from './PageFallback';
import { RouteTransitionBar } from './RouteTransitionBar';
import { ScrollToTop } from './ScrollToTop';
import ReactGA from 'react-ga4';

/* Route-level code splitting — pages load on demand. */
const HomePage = lazy(() => import('../../pages/HomePage'));
const ServicesPage = lazy(() => import('../../pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('../../pages/ServiceDetailPage'));
const WorkPage = lazy(() => import('../../pages/WorkPage'));
const CaseStudyPage = lazy(() => import('../../pages/CaseStudyPage'));
const AboutPage = lazy(() => import('../../pages/AboutPage'));
const InsightsPage = lazy(() => import('../../pages/InsightsPage'));
const InsightDetailPage = lazy(() => import('../../pages/InsightDetailPage'));
const ContactPage = lazy(() => import('../../pages/ContactPage'));
const PrivacyPage = lazy(() => import('../../pages/PrivacyPage'));
const TermsPage = lazy(() => import('../../pages/TermsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));

/**
 * Application shell: loader, cursor, navbar, animated routes, footer,
 * mobile menu and grain overlay.
 *
 * Routes are keyed by location.pathname inside AnimatePresence so every
 * navigation runs a ~600ms enter/exit transition.
 */

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  return null;
}

export function AppShell() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoaderDone = () => {
    setLoading(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', menuOpen);
    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [menuOpen]);

  return (
    <AppReadyProvider value={!loading}>
      <AnalyticsTracker />
      <div className="grain relative min-h-screen">
        {/* Viewport-fixed ambient layer (z-0), rendered on every route.
            Placed here (outside the route-transition motion.div) so it
            stays truly `fixed` to the viewport — a transformed/blurred
            ancestor would otherwise turn `fixed` into "fixed relative to
            that ancestor" and it would scroll away with the page. Mounted
            once at the shell level so it also survives route changes
            without unmounting/remounting or restarting its animation. */}
        <AmbientBackground />

        <AnimatePresence>{loading && <Loader key="loader" onDone={handleLoaderDone} />}</AnimatePresence>

        <ScrollToTop />
        <CustomCursor />
        <RouteTransitionBar routeKey={location.pathname} />
        <Navbar onMenuOpen={() => setMenuOpen(true)} />
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

        <main id="main" className="relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="min-h-screen"
            >
              <Suspense fallback={<PageFallback />}>
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/work" element={<WorkPage />} />
                  <Route path="/work/:slug" element={<CaseStudyPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/insights" element={<InsightsPage />} />
                  <Route path="/insights/:slug" element={<InsightDetailPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </AppReadyProvider>
  );
}
