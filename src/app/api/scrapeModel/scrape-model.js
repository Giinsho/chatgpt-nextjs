
import axios from 'axios';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const { data } = await axios.get('https://platform.openai.com/docs/pricing');
    const $ = cheerio.load(data);

    const models = [];

    $('h2, h3, strong, b, li, p').each((_, el) => {
      const text = $(el).text().trim();
      if (/gpt-?4|gpt-3|gpt-4o|o\d|mini|nano/i.test(text)) {
        models.push(text);
      }
    });

    const uniqueModels = [...new Set(models)];
    res.status(200).json({ models: uniqueModels });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape', details: err.message });
  }
}
