import nodemailer from 'nodemailer'
import 'dotenv/config'

// Nodemailer
//video 49:12
const transport = nodemailer.createTransport({
    //service
    host: process.env.HOST,
    port: process.env.PORT,
    auth: {
          user: process.env.USER_MAILING,
          pass: process.env.PASS_MAILING,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  export default transport