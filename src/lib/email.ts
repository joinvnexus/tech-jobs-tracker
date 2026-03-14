import nodemailer from "nodemailer"

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  // Skip if email is not configured
  if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
    console.warn("[email] Email not configured, skipping send")
    return { success: false, message: "Email not configured" }
  }

  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@hirehub.com",
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""),
    })

    console.log("[email] Email sent:", result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error("[email] Failed to send email:", error)
    return { success: false, error }
  }
}

// Email Templates
export function getApplicationReceivedEmail(
  applicantName: string,
  jobTitle: string,
  companyName: string
) {
  return {
    subject: `Application Received - ${jobTitle} at ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Application Received!</h1>
          <p>Dear ${applicantName},</p>
          <p>Thank you for applying to the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
          <p>We have received your application and will review it shortly. If your qualifications match our requirements, we will contact you for further steps.</p>
          <p>Best regards,<br>The ${companyName} Team</p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #888;">
            This is an automated message from HireHub. Please do not reply to this email.
          </p>
        </body>
      </html>
    `,
  }
}

export function getApplicationStatusEmail(
  applicantName: string,
  jobTitle: string,
  companyName: string,
  status: string
) {
  const statusMessages: Record<string, string> = {
    REVIEWED: "Your application has been reviewed by the hiring team.",
    SHORTLISTED: "Congratulations! You have been shortlisted for the next round.",
    INTERVIEW_SCHEDULED: "An interview has been scheduled. Please check your email for details.",
    REJECTED: "We regret to inform you that your application was not selected.",
    HIRED: "Congratulations! You have been offered the position.",
  }

  return {
    subject: `Application Update - ${jobTitle} at ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Application Update</h1>
          <p>Dear ${applicantName},</p>
          <p>${statusMessages[status] || "There has been an update to your application."}</p>
          <p>Position: <strong>${jobTitle}</strong><br>Company: <strong>${companyName}</strong></p>
          <p>Log in to your HireHub account for more details.</p>
          <p>Best regards,<br>The HireHub Team</p>
        </body>
      </html>
    `,
  }
}

export function getJobApprovalEmail(
  employerName: string,
  jobTitle: string,
  approved: boolean
) {
  return {
    subject: approved
      ? `Job Approved - ${jobTitle}`
      : `Job Needs Revision - ${jobTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">${approved ? "Job Approved!" : "Job Needs Revision"}</h1>
          <p>Dear ${employerName},</p>
          ${
            approved
              ? `<p>Your job posting for <strong>${jobTitle}</strong> has been approved and is now live!</p>`
              : `<p>Your job posting for <strong>${jobTitle}</strong> needs some revisions before it can be approved.</p>
                 <p>Please log in to your employer dashboard to make the necessary changes.</p>`
          }
          <p>Best regards,<br>The HireHub Team</p>
        </body>
      </html>
    `,
  }
}

export function getWelcomeEmail(userName: string, role: string) {
  return {
    subject: "Welcome to HireHub!",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Welcome to HireHub!</h1>
          <p>Dear ${userName},</p>
          <p>Thank you for joining HireHub as a ${role === "EMPLOYER" ? "Employer" : "Job Seeker"}.</p>
          ${
            role === "EMPLOYER"
              ? "<p>You can now post jobs and find talented candidates for your team.</p>"
              : "<p>You can now search for jobs and apply to your dream positions.</p>"
          }
          <p>Get started by completing your profile:</p>
          <ul>
            <li>Add your skills and experience</li>
            <li>Upload your resume</li>
            <li>Start applying to jobs</li>
          </ul>
          <p>Best regards,<br>The HireHub Team</p>
        </body>
      </html>
    `,
  }
}
