import {
  prisma,
  ConversationRepository,
} from "../../../db/src";

export class ConversationService {
  private repo =
    new ConversationRepository();

  async create() {
    const user =
      await prisma.user.upsert({
        where: {
          email: "demo@test.com",
        },
        update: {},
        create: {
          email: "demo@test.com",
        },
      });

    return this.repo.create({
      userId: user.id,
      platform: "CHATGPT",
      title: "New Chat",
    });
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    return this.repo.findById(id);
  }
  
}