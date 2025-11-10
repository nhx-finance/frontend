"use client";
import { KESY_URL } from "@/lib/utils";
import { User } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import { authAxios } from "./useAuthentication";
import { useKESYAuth } from "@/contexts/KESYContext";

async function getUserDetails(): Promise<User> {
  const authenticatedInstance = authAxios();
  try {
    const response = await authenticatedInstance.get(`${KESY_URL}/user`);
    return response.data;
  } catch (error) {
    console.error("error getting user details", error);
    throw error;
  } finally {
  }
}

export const useUserDetails = () => {
  const { user } = useKESYAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-details"],
    queryFn: getUserDetails,
  });
  return { data, isLoading, error };
};
