import { IMessage } from "../services/utils"

interface ResponseMessageV1Props {
  isLoading: boolean;
  message: IMessage | undefined;
}

function ResponseMessageV1(props: ResponseMessageV1Props) {
  const { isLoading, message } = props

  if (isLoading) {
    return (
      <div className="-ml-50 -mx-50 my-10 w-screen border-t-5 px-40 border-b-5 border-gray-600 w-100">
        <div className="text-center py-2 min-h-50 max-h-80 text-3xl">
          Loading ...
        </div>
      </div>
    )
  }

  if (!message) {
    return (
      <div className="-ml-50 -mx-50 my-10 w-screen border-t-5 px-40 border-b-5 border-gray-600 w-100 overflow-y-scroll">
        <div className="text-center py-2 min-h-50 max-h-80 h-full text-3xl overflow-y-scroll animate-jump animate-once">
          Welcome! Speak Your Mind!
        </div>
      </div>
    )
  }
  
  return (
    <div className="-ml-50 -mx-50 my-10 w-screen border-t-5 px-40 border-b-5 border-gray-600 w-100 overflow-y-scroll">
      <div className="text-center py-2 min-h-50 max-h-80 h-full text-3xl overflow-y-scroll animate-jump animate-once">
        {message?.message}
      </div>
    </div>
  )
}

export default ResponseMessageV1
