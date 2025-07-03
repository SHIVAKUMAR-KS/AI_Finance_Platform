import { sendEmail } from "@/actions/send-email";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return Response.json({ success: false, error: "Missing fields" }, { status: 400 });
    }
    const to = process.env.CONTACT_EMAIL || "your@email.com";
    const subject = `New Contact Form Submission from ${name}`;
    // Simple text email, could be improved with a React component
    const react = (
      <div>
        <p><b>Name:</b> {name}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Message:</b></p>
        <p>{message}</p>
      </div>
    );
    const result = await sendEmail({ to, subject, react });
    if (result.success) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
} 