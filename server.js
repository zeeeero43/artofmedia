import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('SMTP Configuration Error:', error);
  } else {
    console.log('✅ SMTP Server is ready to send emails');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, interest, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, Email und Nachricht sind Pflichtfelder',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      });
    }

    // Prepare email content
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.SMTP_TO_EMAIL,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name} - ${interest || 'Allgemeine Anfrage'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00FF29; border-bottom: 2px solid #00FF29; padding-bottom: 10px;">
            Neue Kontaktanfrage
          </h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Telefon:</strong> ${phone}</p>` : ''}
            ${interest ? `<p style="margin: 10px 0;"><strong>Interesse:</strong> ${interest}</p>` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Nachricht:</h3>
            <p style="background: white; padding: 15px; border-left: 3px solid #00FF29; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Diese E-Mail wurde über das Kontaktformular auf artofmedia.com gesendet.</p>
            <p>Zeitstempel: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}</p>
          </div>
        </div>
      `,
      text: `
Neue Kontaktanfrage von art.of.media

Name: ${name}
E-Mail: ${email}
${phone ? `Telefon: ${phone}` : ''}
${interest ? `Interesse: ${interest}` : ''}

Nachricht:
${message}

---
Gesendet am: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'Nachricht erfolgreich gesendet',
      messageId: info.messageId,
    });

  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || 'Not configured'}`);
  console.log(`📨 Emails will be sent to: ${process.env.SMTP_TO_EMAIL || 'Not configured'}`);
});
