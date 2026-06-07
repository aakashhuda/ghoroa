import { Resend } from "resend";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const config = useRuntimeConfig();

  const resend = new Resend(config.resendApiKey);

  const { data, error } = await resend.emails.send({
    from: config.emailFrom,
    to,
    subject,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
