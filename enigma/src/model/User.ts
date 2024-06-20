import mongoose, {Schema, Document, mongo} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        require: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: Boolean;
    isAcceptingMessages: boolean;
    message: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "Username is a required field"],
        trim: true,
        unique: true,
    },
    email:{
        type: String,
        require: [true, "Password is a required field"],
        unique: true,
        match: [ /.+\@.+\..+/ , "Please provide a valid email address"],
    },
    password:{
        type: String,
        required: [true, "Password is a required field"],
    },
    verifyCode:{
        type: String,
        required: [true, "Verification code is a required field"],
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "Verification code expiry is a required field"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAcceptingMessages:{
        type: Boolean,
        default: true,
    },
    message: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel