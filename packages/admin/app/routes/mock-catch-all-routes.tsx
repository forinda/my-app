import { Link } from 'react-router';
import { css } from 'styled-system/css';
import { Icon } from '@iconify/react';

export default function DashboardNotFound() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
      })}
    >
      <Icon
        icon="mdi:alert-circle-outline"
        className={css({ fontSize: '4rem', color: 'var(--primary-color)' })}
      />
      <h1 className={css({ fontSize: '2rem', fontWeight: 'bold', mt: 4 })}>
        404 - Page Not Found
      </h1>
      <p className={css({ fontSize: '1.2rem', opacity: 0.8, mt: 2 })}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/mock-dashboard"
        className={css({
          marginTop: 6,
          padding: '12px 24px',
          borderRadius: '8px',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          fontSize: '1rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          transition: 'background 0.3s',
          _hover: { backgroundColor: 'var(--primary-dark-color)' },
        })}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
