import { NextResponse } from "next/server";
import {
  AccountId,
  Client,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  PrivateKey,
} from "@hashgraph/sdk";
import { getSecret } from "@/lib/server/secrets";
import { TREASURY_ACCOUNT_ID, DECIMALS } from "@/lib/utils";

async function setUpClient({
  accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID,
  privateKey = "",
}): Promise<Client> {
  if (!accountId) {
    throw new Error("NEXT_PUBLIC_ACCOUNT_ID is not set");
  }
  if (!privateKey || privateKey === "") {
    throw new Error("PRIVATE_KEY is not set");
  }
  const client = Client.forTestnet();
  const ACCOUNT_ID = AccountId.fromString(accountId);
  const KEY = PrivateKey.fromStringECDSA(privateKey);

  client.setOperator(ACCOUNT_ID, KEY);
  return client;
}

export async function POST(request: Request) {
  try {
    const { address, amount } = await request.json();
    console.log("address", address);
    const privateKeySecret = await getSecret("PRIVATE_KEY");
    const accountId = process.env.NEXT_PUBLIC_ACCOUNT_ID;
    const client = await setUpClient({
      accountId,
      privateKey: privateKeySecret,
    });
    const transaction = new ContractExecuteTransaction()
      .setContractId(TREASURY_ACCOUNT_ID)
      .setGas(15_000_000)
      .setFunction(
        "transfer",
        new ContractFunctionParameters()
          .addAddress(address)
          .addInt64(amount * 10 ** DECIMALS)
      );
    const frozenTransaction = transaction.freezeWith(client);
    const transactionBytes = frozenTransaction.toBytes();
    const transactionHex = Buffer.from(transactionBytes).toString("hex");

    return NextResponse.json(
      {
        success: true,
        transactionHex,
        message: "Transaction created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
