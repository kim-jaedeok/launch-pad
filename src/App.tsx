import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './config/routes';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LaunchesPage from './pages/LaunchesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.launches} element={<LaunchesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
