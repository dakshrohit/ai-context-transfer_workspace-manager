import { workspaceGraph } from "../graph/workspace.graph";
import {
  ConversationRepository,
  MessageRepository,
} from "../../../db/src";

export class ChatService {
  private conversationRepo =
    new ConversationRepository();

  private messageRepo =
    new MessageRepository();

  async getMessages(
    conversationId: string
  ) {
    return this.messageRepo.findByConversationId(
      conversationId
    );
  }

  async getConversations(
    userId: string
  ) {
    return this.conversationRepo.findByUserId(
      userId
    );
  }

  async chat(
    conversationId: string,
    message: string
  ) {
    const existingMessages =
      await this.messageRepo.findByConversationId(
        conversationId
      );

    if (
      existingMessages.length === 0
    ) {
      await this.conversationRepo.updateTitle(
        conversationId,
        message.slice(0, 50)
      );
    }

    await this.messageRepo.create({
      conversationId,
      role: "USER",
      content: message,
    });

    const result =
      await workspaceGraph.invoke({
        message,
      });

    await this.messageRepo.create({
      conversationId,
      role: "ASSISTANT",
      content: result.response,
    });

    return result.response;
  }
}