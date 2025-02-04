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
      <div className="-ml-50 -mx-50 w-screen border-t-5 px-40 border-b-5 border-gray-600 w-100">
        <div className="h-full w-full min-h-50 max-h-60 flex items-center justify-center py-2 text-3xl overflow-y-scroll animate-jump animate-once">
          Loading ...
        </div>
      </div>
    )
  }
  
  return (
    <div className="-ml-50 -mx-50 w-screen w-100 border-t-5 px-40 border-b-5 border-gray-600">
      <div className="h-full w-full min-h-50 max-h-60 flex items-center py-2 text-3xl overflow-y-scroll animate-jump animate-once">
        {messageText}
      </div>
    </div>
  )
}

export default ResponseMessageV1
