const nodemailer = require('nodemailer')

//Email data from Env file
const myEmail = process.env.myEmail;
const myEmailPass = process.env.myEmailPass;

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 5000,
    secure: false,
    auth: {
        user: myEmail,
        pass: myEmailPass,
    },
});

export async function mailSender(req, res) {
    const { name, email, subject, message } = req.data;
    try {
        const mailOptions = {
            from: email, // sender address
            to: myEmail, // receiver email
            subject: `${subject}`, // Subject line
            text: `Hi there, you were emailed from ${name} <br/> ${message}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>${subject}</title>
                </head>
                <body>
                <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; max-width: 600px; margin: 0 auto;">
                    <header style="background-color: #f5f5f5; padding: 20px;">
                    <img src="https://your-logo-url" alt="Your Logo" style="width: 150px;">
                    </header>
                
                    <h3 style="font-size: 24px; margin: 20px 0;">Hello Suraj,</h3>
                
                    <p style="margin: 20px 0;">
                        ${message}
                    </p>
                
                    <a href="https://your-link" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 0 auto;">Click Here</a>
                
                    <footer style="background-color: #f5f5f5; padding: 20px; text-align: center;">
                    <p>© 2023 Afflite MyAmazingStore</p>
                    </footer>
                </div>
                </body>
                </html>
            `,
        }

        const info = await transporter.sendMail(mailOptions)
        if (info) {
            const thank = await transporter.sendMail(
                {
                    from: myEmail, // sender address
                    to: email, // receiver email
                    subject: "Mail is Sucessfull Sent", // Subject line
                    text: `Hi there, you were emailed from ${myEmail} `,
                    html: `<h1> Thank you for reach us from </h1>`,
                }
            )
        }
        return {status : 200, message: "Mail sent successfully"};
    } catch (err) {
        return {status : 500, message: err.message};
    }
}
