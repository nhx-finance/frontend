"use client";
import { KESY_URL } from "@/lib/utils";
import { User } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { authAxios } from "./useAuthentication";
import { useKESYAuth } from "@/contexts/KESYContext";

async function getUserDetails(): Promise<User> {
  const authenticatedInstance = authAxios();
  const response = await authenticatedInstance.get(`${KESY_URL}/user/profile`);
  return response.data;
}

export const useUserDetails = () => {
  const { user } = useKESYAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-details"],
    queryFn: getUserDetails,
    enabled: !!user,
  });
  return { data, isLoading, error };
};
