import { useEffect, useState } from 'react'

import leftImage from './assets/left.png'
import rightImage from './assets/right.png'
import topImage from './assets/top.png'

import './App.css'

// import VideoLoaderV1 from './components/VideoLoaderV1'
import ChatBoxV1 from './components/ChatBoxV1'
import ResponseMessageV1 from './components/ResponseMessageV1';

import { createNewThread, sendMessageToThread } from './services/api';

function App() {
  const [ threadId, setThreadId ] = useState<string>("thread_74ECg0uURhTsHLbbXACgwCur");

  const fetchThread = async () => {
    if (threadId) {
      return;
    }

    const response = await createNewThread();
    setThreadId(response)
  }

  const handleMessageSubmit = async (message: string) => {
    if (!threadId) {
      return;
    }
  
    await sendMessageToThread(threadId, message)
  }

  useEffect(() => {
    fetchThread()
  }, [])

  return (
    <div className="h-screen text-slate-500 bg-black">
      <img src={topImage} className="z-1 fixed w-screen -top-25 left-0 right-0" />
      <img src={leftImage} className="z-1 fixed h-screen left-0" />
      <img src={rightImage} className="z-1 fixed h-screen right-0" />
      
      {/* <VideoLoaderV1 /> */}
      <div className="pt-25 ml-60 mr-40 h-full relative">
        <div className='overflow-x-y-scroll'>
          <ResponseMessageV1 />

          <ChatBoxV1
            onSubmit={handleMessageSubmit}
          />
        </div>
      </div>
      <footer className="fixed bottom-0 w-full text-center bg-gray-900">
        By @sanjeevmalagi1 | Powered By OpenAI
      </footer>
    </div>
  )
}

export default App
