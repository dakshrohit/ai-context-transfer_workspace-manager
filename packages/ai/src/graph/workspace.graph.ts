import {
  Annotation,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

import { chatNode } from "./chat.node";

export const WorkspaceState =
  Annotation.Root({
    message: Annotation<string>(),
    response: Annotation<string>(),
  });

export const workspaceGraph =
  new StateGraph(WorkspaceState)
    .addNode("chat", chatNode)
    .addEdge(START, "chat")
    .addEdge("chat", END)
    .compile();