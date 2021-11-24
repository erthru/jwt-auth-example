import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";

export enum UserDocument {
    schemaName = "user",
    fullname = "fullname",
    username = "username",
    password = "password",
}

export interface IUser extends Document {
    [UserDocument.fullname]?: string;
    [UserDocument.username]?: string;
    [UserDocument.password]?: string;
}

const schema = new Schema(
    {
        _id: {
            type: String,
            default: uuidV4,
        },

        [UserDocument.fullname]: {
            type: String,
            required: true,
        },

        [UserDocument.username]: {
            type: String,
            required: true,
            unique: true,
        },

        [UserDocument.password]: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>(UserDocument.schemaName, schema);
