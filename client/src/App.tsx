import { BrowserRouter } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-FXHHT9RZB2');

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
