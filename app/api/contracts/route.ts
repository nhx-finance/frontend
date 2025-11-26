import { HEDERA_HTS_ADDR } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      address: HEDERA_HTS_ADDR,
      message: "Contract should be created client-side using getContract()",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Contract retrieval failed" },
      { status: 500 }
    );
  }
}
