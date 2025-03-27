
// import axios from "../../utils/axios";

// const handleUserSelect = async (user) => {
//     try {
//         const response = await axios.post('/api/create-chat/', {
//             receiver_id: user.id,
//         }, {headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + localStorage.getItem('token')
//         }});
//         const data = response.data;
//         if(data.channel_id){
//            setActiveChat(data.channel_id); 
//         }
//     } catch (error) {
//         console.error("Error creating chat:", error);
//     }
// };