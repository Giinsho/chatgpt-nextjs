import openai from "./chatGPT";

const query = async (prompt: string, model: string) => {
  const res = await openai.chat.completions
    .create({
      model: model,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    .then((res) => res.choices[0].message)
    .catch((error) => {
      if (error.status === 429) {
        console.error("Quota exceeded. Upgrade your OpenAI plan.");
        return {
          content: `⚠️ Quota exceeded. Please check your OpenAI plan or billing. ${error.message}`,
        };
      }
      console.error(
        `ChatGPT was unable to find an answer for that! (Error: ${error.message})`,
        error
      );
    });

  return res?.content || "No response from ChatGPT";
};

export default query;
