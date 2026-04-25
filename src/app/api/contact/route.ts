import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, project } = await request.json();

    if (!name || !email || !project) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rohan.raut.dev@gmail.com',
        // IMPORTANT: The user needs to set this in an .env.local file
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: 'rohan.raut.dev@gmail.com',
      to: 'rohan.raut.dev@gmail.com', // Sends the email to you
      replyTo: email, // Allows you to hit "Reply" and email the client back
      subject: `New Project Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nProject Details:\n${project}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Details:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${project}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
