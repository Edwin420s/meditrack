const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

// Configure transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  }
});

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.error('Error verifying email transporter:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Load email templates
const loadTemplate = (templateName, replacements) => {
  try {
    const templatePath = path.join(__dirname, 'templates', `${templateName}.hbs`);
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateContent);
    return template(replacements);
  } catch (error) {
    console.error(`Error loading email template ${templateName}:`, error);
    throw new Error('Failed to load email template');
  }
};

// Main email sending function
const sendEmail = async ({ to, subject, template, context, text }) => {
  try {
    let html;
    
    if (template) {
      html = loadTemplate(template, context);
    }

    const mailOptions = {
      from: `"MediTrack" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject,
      text: text || subject, // Fallback to subject if no text provided
      html,
      attachments: context?.attachments || []
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Specific email functions
const sendPasswordResetEmail = async (email, name, resetLink) => {
  return sendEmail({
    to: email,
    subject: 'MediTrack - Password Reset Request',
    template: 'password-reset',
    context: {
      name,
      resetLink,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@meditrack.com',
      appName: 'MediTrack'
    }
  });
};

const sendPasswordChangedEmail = async (email, name) => {
  return sendEmail({
    to: email,
    subject: 'MediTrack - Password Changed Successfully',
    template: 'password-changed',
    context: {
      name,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@meditrack.com',
      appName: 'MediTrack'
    }
  });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
  transporter
};