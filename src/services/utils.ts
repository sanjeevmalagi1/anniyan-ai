import { OpenAI } from "openai"

import { getMessageFromThread } from "./api"

export interface IMessage {
  id: string;
  createdAt: number;
  message: string;
}

export const filterMessages = (messages: OpenAI.Beta.Threads.Messages.MessagesPage, userType: string) => {
  return messages.data
  .filter(message => {
    const messageContent = message.content[0] as OpenAI.Beta.Threads.Messages.MessageContent;
    
    return message.role === userType && messageContent.type === 'text'
  })
  .map(message => {
    const messageContent = message.content[0] as OpenAI.Beta.Threads.Messages.MessageContent;
    
    if (messageContent.type === 'text') {
      return {
        id: message.id,
        createdAt: message.created_at,
        message: messageContent.text.value
      } as IMessage;
    }

    return {
      id: message.id,
      createdAt: message.created_at,
      message: ""
    } as IMessage;
  });
}

export const sortMessages = (messages: IMessage[]): IMessage[] => {
  return messages.sort((message1, message2) => message2.createdAt - message1.createdAt)
}

export const getLatestMessage = (messages: IMessage[]): IMessage => {
  return sortMessages(messages)[0]
}

export async function pollForAssistantResponse(threadId: string, latestMessage: IMessage | undefined) {
  let polling = true;
  const totalPolls = 5;
  let currentPoll = 0;
  let first = true;

  while (polling && currentPoll < totalPolls) {
    currentPoll += 1;

    await new Promise((resolve) => setTimeout(resolve, first ? 300 : 3*1000)); // Wait 3s before each poll

    try {
      first = false
      const messages = await getMessageFromThread(threadId)
      
      if (!messages) {
        return;
      }
      const assistantMessages = filterMessages(messages, "assistant")
      const latestAssistantMessage = getLatestMessage(assistantMessages)

      if (latestAssistantMessage.id !== latestMessage?.id) {
        console.log("Assistant Responded:", latestAssistantMessage.message);
        polling = false; // Stop polling when assistant responds
        return latestAssistantMessage
      }
    } catch (error) {
      console.error("Error polling messages:", error);
    }
  }
}