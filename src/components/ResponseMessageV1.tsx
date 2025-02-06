import { IMessage } from "../services/utils"

interface ResponseMessageV1Props {
  isLoading: boolean;
  message: IMessage | undefined;
}

function getMessage(message: IMessage | undefined):string {
  if (!message) {
    return "Welcome! Speak Your Mind! "
  }

  return message?.message
}

function ResponseMessageV1(props: ResponseMessageV1Props) {
  const { isLoading, message } = props

  const messageText = getMessage(message)

  if (isLoading) {
    return (
      <div className="bg-gray-700/30 backdrop-blur-md px-5 border-t-5 border-b-5 border-gray-600 shadow-[0px_0px_156px_18px_rgba(65,115,113,0.5)]">
        <div className="font-serif md:px-40 h-full min-h-50 max-h-100  w-full flex justify-center py-2 text-3xl md:text-5xl overflow-y-scroll animate-pulse font-extrabold">
          <div className="my-auto">Loading ...</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-gray-700/30 backdrop-blur-md px-5 border-t-5 border-b-5 border-gray-600 shadow-[0px_0px_156px_18px_rgba(65,115,113,0.5)]">
      <div className="font-serif md:px-40 h-full min-h-50 max-h-60  w-full flex justify-center py-2 text-3xl md:text-5xl overflow-y-scroll animate-jump animate-once font-extrabold">
        <div className="my-auto">{messageText}</div>
      </div>
    </div>
  )
}

export default ResponseMessageV1
