import axios from "axios"
import { OpenAI } from "openai"

const BASE_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})

export async function createNewThread() {

  const response = await axiosInstance.post("/api/v1/thread")

  if (response.status !== 200) {
    return null
    
  }

  return response.data as OpenAI.Beta.Threads.Thread;
}

export async function addMessageToThread(threadId: string, message: string) {

  const body = {
    message: message
  }

  const response = await axiosInstance.post(`/api/v1/thread/${threadId}/run`, body)

  if (response.status !== 200) {
    return null
  }

  return response.data as OpenAI.Beta.Threads.Runs.Run;
}

export async function getMessageFromThread(threadId: string) {

  const response = await axiosInstance.get(`/api/v1/thread/${threadId}/messages`)

  if (response.status !== 200) {
    return null;
  }

  return response.data as OpenAI.Beta.Threads.Messages.MessagesPage
}
