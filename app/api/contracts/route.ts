import { hederaTestnet } from "@/lib/client";
import { getContract } from "thirdweb";
import { getServerClient } from "@/lib/server/client";
import { HEDERA_HTS_ADDR } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await getServerClient();
    const contract = getContract({
      client,
      chain: hederaTestnet,
      address: HEDERA_HTS_ADDR,
    });
    return NextResponse.json({ success: true, contract });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Contract retrieval failed" },
      { status: 500 }
    );
  }
}
