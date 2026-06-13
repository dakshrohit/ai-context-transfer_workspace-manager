import { gemini } from "../models/gemini";

export async function chatNode(
  state: {
    message: string;
    response?: string;
  }
) {
  try {
    const result = await gemini.invoke(
      state.message
    );

    return {
      response: result.content.toString(),
    };
  } catch (error) {
    console.error(error);

    throw new Error(
      "Chat node execution failed"
    );
  }
}