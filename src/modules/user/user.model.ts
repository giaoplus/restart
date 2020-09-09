import { Document, Schema, Connection } from 'mongoose';
import { MONGODB } from '../../../app.config';

export interface User extends Document {
    username: string;
    password: string;
    mobile: string;
    email: string;
    salt: string;
    role?: number;
    status?: number;
    updateTime?: string;
}

const userSchema: Schema = new Schema({
    user: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    salt: { type: String, required: false },
    role: { type: Number, default: 0, enum: [0, 1, 2] },
    status: { type: Number, default: 0, enum: [0, 1, 2] },
    updateTime: { type: Date, default: Date.now }
});

export const UserModelName = 'mongodb_user';
export const UserProviders = {
    provide: UserModelName,
    useFactory: (connection: Connection) => connection.model('Users', userSchema),
    inject: [MONGODB]
};