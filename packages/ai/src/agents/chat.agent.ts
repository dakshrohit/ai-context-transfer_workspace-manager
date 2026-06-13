import { gemini } from "../models/gemini";

export async function chatAgent(
  message: string
): Promise<string> {
  try {
    const result = await gemini.invoke(message);

    return result.content.toString();
  } catch (error) {
    console.error(error);

    throw new Error(
      "Failed to generate response"
    );
  }
}