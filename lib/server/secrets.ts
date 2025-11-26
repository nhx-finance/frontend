import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();

// Cache to avoid repeated API calls
const secretCache = new Map<string, string>();

export async function getSecret(secretId: string): Promise<string> {
  const cacheKey = secretId;
  if (secretCache.has(cacheKey)) {
    return secretCache.get(cacheKey)!;
  }

  const projectId = process.env.GCP_PROJECT_ID;
  if (!projectId) {
    throw new Error("GCP_PROJECT_ID is not set");
  }
  const name = `projects/${projectId}/secrets/${secretId}/versions/latest`;

  try {
    const [version] = await client.accessSecretVersion({ name });
    const payload = version.payload?.data?.toString("utf8");

    if (!payload) {
      throw new Error(`Secret payload not found for ${secretId}`);
    }

    secretCache.set(cacheKey, payload);
    return payload;
  } catch (error) {
    console.error(`Error accessing secret ${secretId}:`, error);
    throw new Error(`Failed to retrieve secret: ${secretId}`);
  }
}
