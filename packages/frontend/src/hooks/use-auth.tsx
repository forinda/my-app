import { AuthThemeContext } from '@/context/auth-theme-context';
import { jwtDecode } from 'jwt-decode';
import { useContext, useMemo, useEffect, useState } from 'react';

export default function useAuth() {
  const { state, actions, dispatch } = useContext(AuthThemeContext);
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    is_authenticated,
  } = state!.auth;

  // Local state to track seconds until token expires
  const [secondsUntilTokenExpires, setSecondsUntilTokenExpires] = useState(0);

  // Calculate seconds until expiration using useMemo
  const calculatedSecondsUntilTokenExpires = useMemo(() => {
    if (!accessToken) return 0;
    const { exp } = jwtDecode(accessToken);
    return Math.max(0, exp! - Math.floor(Date.now() / 1000));
  }, [accessToken]);

  // Update the local state with seconds left every second
  useEffect(() => {
    setSecondsUntilTokenExpires(calculatedSecondsUntilTokenExpires);

    if (calculatedSecondsUntilTokenExpires > 0) {
      const interval = setInterval(() => {
        setSecondsUntilTokenExpires((prev) => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [calculatedSecondsUntilTokenExpires]);

  const shouldRefreshToken = useMemo(() => {
    return secondsUntilTokenExpires < 60;
  }, [secondsUntilTokenExpires]);

  const minutesUntilTokenExpires = useMemo(() => {
    return Math.floor(secondsUntilTokenExpires / 60);
  }, [secondsUntilTokenExpires]);

  return {
    state,
    actions,
    dispatch: dispatch!,
    is_authenticated,
    ac_token: accessToken,
    rf_token: refreshToken,
    should_refresh_token: shouldRefreshToken,
    minutes_until_token_expires: minutesUntilTokenExpires,
    seconds_until_token_expires: secondsUntilTokenExpires,
  };
}
