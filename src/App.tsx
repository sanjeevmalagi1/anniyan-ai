import { useEffect, useState } from 'react'


import leftImage from './assets/left.png'
import rightImage from './assets/right.png'
import topImage from './assets/top.png'
import topImage1 from './assets/top_1.png'

import './App.css'

import VideoLoaderV1 from './components/VideoLoaderV1'
import ChatBoxV1 from './components/ChatBoxV1'
import ResponseMessageV1 from './components/ResponseMessageV1'

import {
  createNewThread,
  addMessageToThread,
} from './services/api'

import {
  IMessage,
  pollForAssistantResponse
} from './services/utils'

function App() {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ threadId, setThreadId ] = useState<string>();
  const [ latestAssistantMessage, setLatestAssistantMessage ] = useState<IMessage>()

  const fetchThread = async () => {
    if (threadId) {
      return;
    }

    const thread = await createNewThread();

    if (!thread) {
      return;
    }

    const threadid = thread?.id
    setThreadId(threadid)
    setIsLoading(false)
  }


  const handleMessageSubmit = async (message: string) => {
    if (!threadId) {
      return;
    }
  
    setIsLoading(true)
    await addMessageToThread(threadId, message)
    const newLatestMessage = await pollForAssistantResponse(threadId, latestAssistantMessage)
    setLatestAssistantMessage(newLatestMessage)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchThread()
  }, [])

  return (
    <div className="h-screen text-slate-500 bg-slate-700 bg-[url(/images/hell-background.jpg)] bg-blend-darken">
      <img src={topImage} className="z-1 fixed w-screen left-0 right-0 hidden md:block" />
      <img src={topImage1} className="z-1 fixed w-screen left-0 right-0 md:hidden" />
      <img src={leftImage} className="z-1 fixed h-screen left-0 hidden md:block" />
      <img src={rightImage} className="z-1 fixed h-screen right-0 hidden md:block" />
      
      <VideoLoaderV1 />
      <div className="pt-20 md:pt-50 h-full relative">
        <ResponseMessageV1 isLoading={isLoading} message={latestAssistantMessage} />
        <ChatBoxV1
            onSubmit={handleMessageSubmit}
        />
      </div>
      <footer className="fixed bottom-0 w-full text-center bg-gray-900">
        By <a href='https://github.com/sanjeevmalagi1/' target='_blank'>@sanjeevmalagi1</a> | Powered By <a href='https://platform.openai.com/' target='_blank'>OpenAI</a>
      </footer>
    </div>
  )
}

export default App
