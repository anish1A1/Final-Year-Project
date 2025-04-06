import ChatComponent from "../../../ImpComponent/chatComponents/ChatComponent";

const page = () => {
  const secretKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
    console.log("STREAM API KEY:", secretKey);
  return (
    <div className="mt-32 font-semibold text-center">
    
          <ChatComponent />
    </div>
  )
}

export default page
