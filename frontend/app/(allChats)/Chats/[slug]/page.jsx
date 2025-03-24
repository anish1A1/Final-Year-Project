import ChatForum from "@/ImpComponent/chatComponents/ChatForum";
const ChatPage = async ({params}) => {
  const slug = (await params).slug
    return (
    <div className="mt-32 font-semibold text-center">
      This is the chat for {slug}.

      <ChatForum />
    </div>
  )
}

export default ChatPage
