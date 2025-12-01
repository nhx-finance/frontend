import {
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
} from "@hashgraph/sdk";
import { NextResponse } from "next/server";
import { setUpClient } from "../transactions/route";
import { getSecret } from "@/lib/server/secrets";
import { KESY_LOG_TOPIC_ID } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const privateKeySecret = await getSecret("PRIVATE_KEY");
    const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;
    const client = await setUpClient({
      accountId,
      privateKey: privateKeySecret,
    });
    const transaction = new TopicMessageSubmitTransaction()
      .setTopicId(KESY_LOG_TOPIC_ID)
      .setMessage(message);

    const txResponse = await transaction.execute(client);

    const receipt = await txResponse.getReceipt(client);

    console.log("Transaction Status:", receipt.status);
    return NextResponse.json(
      {
        success: true,
        txnId: txResponse.transactionId?.toString() ?? "",
        message: "Message submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Message submission failed", message: (error as Error).message },
      { status: 500 }
    );
  }
}
