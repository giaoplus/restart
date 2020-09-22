import { Document, Schema, Connection } from 'mongoose';
import { MONGODB_CONNECTION } from 'src/config/db.config';

export interface UserDoc extends Document {
    username: string;
    password: string;
    mobile: string;
    email: string;
    salt: string;
    role?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String, required: true },
    role: { type: Number, default: 0, enum: [0, 1, 2] },
    status: { type: Number, default: 0, enum: [0, 1, 2] },
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now }
}, {
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

export const UserProviderName = 'mongodb_user';
export const UserProvider = {
    provide: UserProviderName,
    useFactory: (connection: Connection) => connection.model('Users', userSchema),
    inject: [MONGODB_CONNECTION]
};