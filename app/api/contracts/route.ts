import { HEDERA_HTS_ADDR } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      address: HEDERA_HTS_ADDR,
      message: "Address retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Address retrieval failed", message: (error as Error).message },
      { status: 500 }
    );
  }
}
