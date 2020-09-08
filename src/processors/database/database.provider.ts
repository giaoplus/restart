import { MONGODB, EMAIL } from '../../../app.config';
import * as mongoose from 'mongoose';
import { Logger } from 'src/utils/log4js';
import { EmailService } from 'src/helper/email.service';

export const databaseProvider = {
    inject: [EmailService],
    provide: 'MongodbConnection',
    useFactory: async (emailService: EmailService):Promise<typeof mongoose> => {
        let reConnectionTask = null;

        function connection() {
            let uri = MONGODB.uri;
            return mongoose.connect(uri, { useNewUrlParser: false });
        }

        mongoose.connection.on('connecting', () => {
            Logger.log('database connecting...');
        })

        mongoose.connection.on('open', () => {
            Logger.log('database connect success');
            clearTimeout(reConnectionTask);
            reConnectionTask = null;
        })

        mongoose.connection.on('disconnected', () => {
            Logger.log('database connection lost，reconnection in 5s');
            reConnectionTask = setTimeout(connection, 5000);
        })

        mongoose.connection.on('error', (error) => {
            Logger.error(`database connection error: ${String(error)}`);
            Logger.log(String(error));
            emailService.sendMail({
                to: EMAIL.admin,
                subject: '数据库崩溃！！！',
                html: `<p>数据库崩了：</p><pre><code>${JSON.stringify(error)}</code></pre>`
            })
        })

        return connection();
    }
};