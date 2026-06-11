import { z } from "zod";

export const PlatformSchema = z.enum([
  "CHATGPT",
  "CLAUDE",
  "GEMINI",
]);

export const MessageRoleSchema = z.enum([
  "USER",
  "ASSISTANT",
  "SYSTEM",
]);

export const MessageSchema = z.object({
  role: MessageRoleSchema,
  content: z.string().min(1),
});

export const CreateConversationSchema = z.object({
  platform: PlatformSchema,

  title: z
    .string()
    .trim()
    .min(1)
    .max(200),

  messages: z
    .array(MessageSchema)
    .min(1),
});