import { KESY_URL } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

async function subscribeToNewsLetter({ email }: { email: string }) {
  try {
    const response = await axios.post(`${KESY_URL}/newsletter/subscribe`, {
      email,
    });
    if (response.status !== 200) {
      throw new Error("Failed to subscribe to newsletter");
    }
    return response.data;
  } catch (error) {
    console.error("Error subscribing to newsletter", error);
    throw error;
  }
}

export const useSubscribeToNewsLetter = () => {
  return useMutation({
    mutationFn: subscribeToNewsLetter,
  });
};
