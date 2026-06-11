import { z } from "zod";

import {
  CreateConversationSchema,
} from "../schemas/conversation.schema";

export type CreateConversationDto =
  z.infer<
    typeof CreateConversationSchema
  >;