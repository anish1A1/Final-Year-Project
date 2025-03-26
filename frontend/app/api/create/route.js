
import { StreamChat } from "stream-chat";


const api_key = process.env.STREAM_APP_ID;
const api_secret = process.env.STREAM_APP_SECRET;
const user_id = "John Doe";
export async function GET() {

// client-side you initialize the Chat client with your API key
    const chatClient = StreamChat.getInstance( api_key, api_secret ); 

    //creating a user token
    const token = serverClient.createToken(user_id);
    return Response.json({message : 'Hello World!'});
}
