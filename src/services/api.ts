// import axios from "axios"

const BASE_URL = "http://localhost:3000"

export async function createNewThread() {

  const request = new Request(`${BASE_URL}/api/v1/thread`, {
    method: "POST"
  })

  const response = await request.json()

  return response
}

export async function sendMessageToThread(threadId: string, message: string) {
  const request = new Request(`${BASE_URL}/api/v1/thread/${threadId}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })

  const response = await fetch(request)

  if (!response.ok) {
    return
  }

  return Response.json(response)
}


export async function runMessageToThread(threadId: string) {

  const request = new Request(`${BASE_URL}/api/v1/thread/${threadId}/run`, {
    method: "POST"
  })

  const response = await request.json()

  return response
}

export async function getMessageFromThread(threadId: string) {

  const request = new Request(`${BASE_URL}/api/v1/thread/${threadId}/messages`, {
    method: "GET"
  })

  const response = await request.json()

  return response
}
