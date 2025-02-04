import { SyntheticEvent, useState } from "react";

interface ChatBoxV1Props {
  onSubmit: (message: string) => void;
}

function ChatBoxV1(props: ChatBoxV1Props) {
  const { onSubmit } = props;

  const [ message, setMessage ] = useState<string>()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    if (!message) {
      return;
    }

    onSubmit(message)
    setMessage("")
  }
  
  return (
    <div className="fixed bottom-5 right-10 border-15 border-gray-600 h-75 w-100 ">
      <form onSubmit={handleSubmit}>
        <textarea
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={4}
          className="p-5 w-full h-full opacity-50 text-2xl bg-gray-700  placeholder-gray-400 text-white"
          placeholder="Write Here...."></textarea>
        <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Submit</button>

      </form>
    </div>
  )
}

export default ChatBoxV1
