import { Link } from 'react-router-dom';
import { ROUTES } from '../config/routes';

export default function NotFoundPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      gap: '1rem',
      padding: '2rem',
    }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-3xl)' }}>404</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>Lost in space...</p>
      <Link to={ROUTES.home} style={{
        padding: '0.5rem 1.5rem',
        background: 'var(--color-primary)',
        color: 'var(--color-text-bright)',
        borderRadius: 'var(--border-radius)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--font-sm)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        Return to Base
      </Link>
    </div>
  );
}
