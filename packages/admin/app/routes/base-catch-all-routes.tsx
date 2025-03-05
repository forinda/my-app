import React from 'react';
import { Link } from 'react-router';
import { css } from 'styled-system/css';

export default function BaseCatchAllRoutes() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        fontSize: '1.25rem',
        color: 'gray.700',
        bg: 'gray.50',
        textAlign: 'center',
        padding: '1rem',
      })}
    >
      {/* SVG Illustration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="200"
        viewBox="0 0 800 600"
        className={css({ marginBottom: '2rem' })}
      >
        <path
          fill="#4F46E5"
          d="M400 100c-82.8 0-150 67.2-150 150s67.2 150 150 150 150-67.2 150-150-67.2-150-150-150zm0 280c-71.6 0-130-58.4-130-130s58.4-130 130-130 130 58.4 130 130-58.4 130-130 130z"
        />
        <path
          fill="#4F46E5"
          d="M400 200c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zm0 80c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z"
        />
        <path
          fill="#EF4444"
          d="M400 400c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zm0 80c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z"
        />
        <path
          fill="#EF4444"
          d="M400 500c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zm0 80c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z"
        />
      </svg>

      {/* 404 Message */}
      <h1
        className={css({
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'gray.900',
          marginBottom: '1rem',
        })}
      >
        404 - Page Not Found
      </h1>
      <p
        className={css({
          fontSize: '1.25rem',
          color: 'gray.600',
          marginBottom: '2rem',
        })}
      >
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Home Link */}
      <Link
        to="/"
        className={css({
          fontSize: '1rem',
          color: 'blue',
          bg: 'indigo.6',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          textDecoration: 'none',
          transition: 'background-color 0.2s',
          _hover: { bg: 'indigo.7' },
        })}
      >
        Go Back Home
      </Link>
    </div>
  );
}
