import { Router } from 'express'
import transport from '../mailing/mailing.js'

const router = Router()

router.get('/', async (req, res) => {
    const email =  await transport.sendMail({
      from: "Coder <shania33@ethereal.email>",
      to: "Coder2 <sonny.mcclure56@ethereal.email>",
      subject: "Hola mundo desde el servidor",
      hmtl: `<h1>Bienvenido a nuestro sistema</h1><div>Bienvenido</div>`,
      text: "esto es un fallback!",
    })
    console.log(email)
    res.send("Correo Enviado")
  });

  export default router