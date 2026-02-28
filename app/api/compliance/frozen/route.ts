import { NextResponse } from "next/server";
import { SDK_URL } from "@/lib/utils";
import { Account } from "@/hooks/kesy/useCompliance";
import axios from "axios";

export async function GET() {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing API_KEY environment variable" },
        { status: 500 },
      );
    }

    const response = await axios.get(`${SDK_URL}/compliance/frozen`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Failed to get frozen accounts");
    }
    return NextResponse.json(response.data.frozenAccounts as Account[], {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to get frozen accounts",
        message: (error as Error).message,
      },
      {
        status:
          axios.isAxiosError(error) && error.response?.status
            ? error.response.status
            : 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { accountId, reason, action } = await request.json();
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing API_KEY environment variable" },
        { status: 500 },
      );
    }
    const reasonKey =
      action === "freeze"
        ? "freezeReason"
        : action === "unfreeze"
          ? "unfreezeReason"
          : "wipeReason";
    const response = await axios.post(
      `${SDK_URL}/compliance/${action}`,
      { accountId, [reasonKey]: reason },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    if (response.status !== 200) {
      throw new Error("Failed to freeze account");
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to freeze account",
        message: (error as Error).message,
      },
      {
        status:
          axios.isAxiosError(error) && error.response?.status
            ? error.response.status
            : 500,
      },
    );
  }
}
