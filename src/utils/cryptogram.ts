import * as crypto from 'crypto';

/**
 * 生成密码盐
 */
export function makeSalt():string {
    return crypto.randomBytes(3).toString('base64');
}

/**
 * 密码加密
 * @param password 明文密码
 * @param salt 密码盐
 * @returns 加密密码
 */
export function encryptPassword(password: string, salt: string):string {
    if(!password || !salt) return '';

    const tempSalt = Buffer.from(salt, 'base64');

    return crypto.pbkdf2Sync(password, tempSalt, 100000, 64, 'sha1').toString('base64');
}