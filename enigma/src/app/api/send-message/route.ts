import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request:Request) {
    await dbConnect()

    const {username, content} = await request.json()
    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json(
            { message: 'User not found', success: false },
            { status: 404 }
        );
        }

        //is user accepting messages? 
        if(!user.isAcceptingMessages){
            return Response.json(
            { message: 'User is not accepting messages', success: false },
            { status: 403 }
        );
        }

        const newMessage = {content, createdAt : new Date()}
        user.messages.push(newMessage as Message)
        await user.save()
        console.log('Saved user messages:', user.messages);

        return Response.json(
            { message: 'Message Sent Successfully', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.log("Error sending messages", error)
        return Response.json(
            { 
                success : false,
                message : "Internal Server Error occured"
            },
            {status : 500}
        )
    }
}