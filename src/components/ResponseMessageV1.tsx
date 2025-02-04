import { IMessage } from "../services/utils"

interface ResponseMessageV1Props {
  isLoading: boolean;
  message: IMessage | undefined;
}

function getMessage(message: IMessage | undefined):string {
  if (!message) {
    return "Welcome! Speak Your Mind!"
  }

  return message?.message
}

function ResponseMessageV1(props: ResponseMessageV1Props) {
  const { isLoading, message } = props

  const messageText = getMessage(message)

  if (isLoading) {
    return (
      <div className="px-5 border-t-5 border-b-5 border-gray-600 shadow-[0px_0px_156px_18px_rgba(65,115,113,0.5)]">
        <div className="font-serif md:px-40 h-full w-full min-h-40 max-h-50 flex items-center py-2 text-xl md:text-3xl overflow-y-scroll animate-jump animate-once font-extrabold">
          Loading ...
        </div>
      </div>
    )
  }
  
  return (
    <div className="px-5 border-t-5 border-b-5 border-gray-600 shadow-[0px_0px_156px_18px_rgba(65,115,113,0.5)]">
      <div className="font-serif md:px-40 h-full w-full min-h-40 max-h-50 flex items-center py-2 text-xl md:text-3xl overflow-y-scroll animate-jump animate-once font-extrabold">
        {messageText}
      </div>
    </div>
  )
}

export default ResponseMessageV1
