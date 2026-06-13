import { prisma } from "../client";

export class MessageRepository {
  async create(data: {
    conversationId: string;
    role: "USER" | "ASSISTANT" | "SYSTEM";
    content: string;
  }) {
    return prisma.message.create({
      data,
    });
  }
  async findByConversationId(
  conversationId: string
) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: {
      createdAt: "asc",
    },
  });
}

}

