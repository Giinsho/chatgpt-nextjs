import axios from "axios";
import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await axios.get(
      "https://platform.openai.com/docs/pricing",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
        },
      }
    );

  

    const $ = cheerio.load(data);
    const models: string[] = [];

    $("table tbody tr td div div div p").each((_, el) => {
      const text = $(el).text().trim();

      // Filter or just push
      if (/gpt|o\d|dall-e|whisper/i.test(text)) {
        models.push(text);
      }
    });

    const uniqueModels = [...new Set(models)];
    return NextResponse.json({ models: uniqueModels });
  } catch (err: any) {
    console.error("Scrape error:", err); // <-- important
    return NextResponse.json(
      {
        error: "Failed to scrape",
        details: err.message,
      },
      { status: 500 }
    );
  }
}
