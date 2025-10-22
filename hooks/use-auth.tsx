import { useState } from "react";

export const useAuth = () => {
  const [isAuthenticated] = useState(false);

  return { isAuthenticated };
};
