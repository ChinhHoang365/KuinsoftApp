import { useCurrentApp } from 'context';

/**
 * Hook for authentication
 * Returns: isAuthenticated, userInfo, login/logout functions
 */
export const useAuth = () => {
  const { isAuthenticated, userInfo, setIsAuthenticated, setUserInfo } = useCurrentApp();

  const logout = () => {
    setUserInfo(null);
    setIsAuthenticated(false);
    localStorage.clear();
  };

  return {
    isAuthenticated,
    userInfo,
    logout,
  };
};
