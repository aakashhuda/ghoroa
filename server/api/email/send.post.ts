import { sendEmail } from "../../utils/email";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    await sendEmail(body);

    return {
      success: true,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email",
    });
  }
});
