import nodemailer from 'nodemailer'
import env from 'dotenv'

env.config()
const { EMAIL, GMAIL_APP_PW } = process.env

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: EMAIL,
    pass: GMAIL_APP_PW
  }
})

const main = async (receiver_email: string, temp_pw: string) => {
  await transporter.sendMail({
    from: EMAIL,
    to: receiver_email,
    subject: 'Welcome to Larchives',
    html: 
     "<h1>Here is your temporary password : "+ temp_pw +"</h1>"
    +"<h3>Kindly set a new password upon signing in.</h3>"
    +"<p>Best regards,</p><br/>"
    +"<p>Team Larchives</p>"
  })
}

export const initial_pw = (receiver_email: string, temp_pw_issuance: string) => {
  try {
    main(receiver_email, temp_pw_issuance) // send email
  } catch(error) {
    console.log(error)
  }
}
