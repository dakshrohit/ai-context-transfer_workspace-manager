import { prisma } from "../client";

export class ConversationRepository {
  async create(data: {
    userId: string;
    platform: "CHATGPT" | "CLAUDE" | "GEMINI";
    title: string;
  }) {
    return prisma.conversation.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.conversation.findUnique({
      where: { id },
      include: {
        messages: true,
      },
    });
  }
  

  async findByUserId(
  userId: string
) {
  return prisma.conversation.findMany({
    where: {
      userId,
      deletedAt: null,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}
}