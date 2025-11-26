import { createThirdwebClient } from "thirdweb";
import { getSecret } from "./secrets";

export async function getServerClient() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const secretKey = await getSecret("THIRDWEB_SECRET");

  if (!clientId) {
    throw new Error("CLIENT_ID must be set");
  }

  if (!secretKey) {
    throw new Error("THIRDWEB_SECRET must be set in Google Secret Manager");
  }

  return createThirdwebClient({
    clientId,
    secretKey,
  });
}
