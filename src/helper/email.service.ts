import { Injectable } from '@nestjs/common';
import { Transporter, createTransport, SendMailOptions } from 'nodemailer';
import { EMAIL } from '../../app.config';
import { Logger } from 'src/utils/log4js';

export interface mailOptions {
    to: string,
    subject: string,
    text: string
}

@Injectable()
export class EmailService {
    private transporter: Transporter;
    private clientIsValid: boolean;

    constructor() {
        this.transporter = createTransport({
            host: 'smtp.qq.com',
            secure: true,
            port: 465,
            auth: {
                user: EMAIL.user,
                pass: EMAIL.pass
            }
        })
        this.verifyClient();
    }

    private verifyClient() {
        return this.transporter.verify((error) => {
            if(error){
                this.clientIsValid = false;
                setTimeout(this.verifyClient.bind(this), 1000 * 60 * 30);
                Logger.log('email service connect error, reconnection in 30m');
                console.log(error)
            }else{
                this.clientIsValid = true;
                Logger.log('email service connect success');
            }
        })
    }

    public sendMail(mailOptions: mailOptions) {
        if(!this.clientIsValid){
            Logger.error('email service error');
            return false;
        }
        const options: SendMailOptions = Object.assign(mailOptions, { from: EMAIL.user });
        this.transporter.sendMail(options, (error, info) => {
            if(error){
                Logger.error(`mail send error: ${String(error)}`);
            }else{
                Logger.info(`mail send success: ${String(info)}`);
            }
        })
    }
}