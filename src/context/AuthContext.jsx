import { useCallback, useEffect, useState } from "react";

import api, { setAccessToken } from "../api/axios";
import AuthContext from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    const { token, user: authenticatedUser } = response.data;

    setAccessToken(token);
    setUser(authenticatedUser);
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const refreshSession = useCallback(async () => {
    try {
      const response = await api.post("/auth/refresh-token");
      setAccessToken(response.data.token);
      setUser(response.data.user);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const refreshTimeout = setTimeout(() => {
      void refreshSession();
    }, 0);

    return () => clearTimeout(refreshTimeout);
  }, [refreshSession]);

  const value = { user, setUser, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
