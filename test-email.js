const nodemailer = require('nodemailer');

async function testEmail() {
    const host = 'smtp.gmail.com';
    const port = 465;
    const user = 'noreply@leelabiologics.com';
    const pass = 'blrmrocwurdrtybz';

    console.log('Testing with credentials:');
    console.log('Host:', host);
    console.log('Port:', port);
    console.log('User:', user);
    console.log('Pass length:', pass.length);

    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: true,
        auth: {
            user: user,
            pass: pass,
        },
    });

    try {
        console.log('Verifying connection...');
        await transporter.verify();
        console.log('Connection verified successfully!');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: user,
            to: 'info@leelabiologics.com',
            subject: 'Test Email from Local Setup',
            text: 'This is a test to verify SMTP credentials.',
        });
        console.log('Test email sent! Message ID:', info.messageId);
    } catch (error) {
        console.error('Failed to test SMTP:', error);
    }
}

testEmail();
