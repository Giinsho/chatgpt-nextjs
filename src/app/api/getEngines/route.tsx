import openai from "../../../lib/chatGPT";
import { NextResponse } from "next/server";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

export async function GET() {
  try {
    const models = await openai.models.list();

    const modelOptions: Option[] = models.data.map((model) => ({
      value: model.id,
      label: model.id,
    }));

    return NextResponse.json<Data>({ modelOptions }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching models:", error);
    return NextResponse.json<Data>({ modelOptions: [] }, { status: 500 });
  }
}
