import mailer from 'nodemailer'
import 'dotenv/config'



class MailingService {
  constructor() {
    
    this.client = mailer.createTransport({
        service: process.env.HOST,
        port: 587, 
        auth: {
            
            user: "aresden113@gmail.com",
            pass: process.env.PASS_MAILING
        }
    })
}
  resetPassword = async (email, resetLink) => {
    try {
        const mailOptions = {
            from: process.env.USER_MAILING,
            to: email,
            subject: 'Password Reset',
            html: `<p>You requested to reset your password. Click the following link to reset it:</p>
            <a href="${resetLink}">Click here to renew your Oath to the Rhino Realm</a>`,
        }

        let result = await this.client.sendMail(mailOptions);
        return result;

    } catch (error) {
        throw error
    }
}
}
export default new MailingService()