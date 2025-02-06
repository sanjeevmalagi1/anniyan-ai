import { SyntheticEvent, useState } from "react";

interface ChatBoxV1Props {
  onSubmit: (message: string) => void;
}

function ChatBoxV1(props: ChatBoxV1Props) {
  const { onSubmit } = props;

  const [ message, setMessage ] = useState<string>("")

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    if (!message) {
      return;
    }

    onSubmit(message)
    setMessage("")
  }

  return (
    <div className="absolute bottom-5 md:right-35 w-full border-15 border-gray-600 h-75 max-w-110 shadow-[0px_0px_156px_18px_rgba(65,115,113,0.5)]">
      <form className="h-full flex flex-col" onSubmit={handleSubmit}>
        <input
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="font-serif text-slate-300 flex-1 p-5 w-full bg-gray-700/30 backdrop-blur-md text-2xl  placeholder-gray-400"
          placeholder="Write Your Message Here ..." />
        <button
          type="submit"
          className="flex-0 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Submit (or press enter)
        </button>

      </form>
    </div>
  )
}

export default ChatBoxV1
