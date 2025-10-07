import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated] = useState(false);
  const [walletConnected] = useState(true);

  return { isAuthenticated, walletConnected };
};
