import nodemailer from 'nodemailer'
import env from 'dotenv'

env.config()
const { EMAIL, PW } = process.env

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',  
  secure: true,
  secureConnection: false, // TLS requires secureConnection to be false
  tls: {
      ciphers:'SSLv3'
  },
  requireTLS:true,
  port: 465,
  debug: true,
  auth: {
    user: EMAIL,
    pass: PW
  }
})

const main = async (receiver_email: string, temp_pw: string) => {
  await transporter.sendMail({
    from: EMAIL,
    to: receiver_email,
    subject: 'Welcome to Larchvies',
    html: 
     "<h1>This is your termperary password : "+ temp_pw +"</h1>"
    +"<h3>Please set your new password after signing in</h3>"
  })
}

export const initial_pw = (receiver_email: string, temp_pw_issuance: string) => {
  try {
    main(receiver_email, temp_pw_issuance) // send email
  } catch(error) {
    console.log(error)
  }
}
