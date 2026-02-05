"use server";

import nodemailer from "nodemailer";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

const initialState: ContactFormState = {
  success: false,
  message: "",
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Verifica token reCAPTCHA con Google
async function verifyRecaptcha(token: string): Promise<{
  success: boolean;
  score?: number;
  action?: string;
}> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const isDev = process.env.NODE_ENV === "development";

  // Skip verifica in development (localhost non è nei domini reCAPTCHA)
  if (isDev) {
    console.log("DEV MODE: Skip verifica reCAPTCHA");
    return { success: true, score: 1 };
  }

  if (!secretKey) {
    // Se non c'è la secret key, skip la verifica (dev mode)
    console.warn("RECAPTCHA_SECRET_KEY non configurata, skip verifica");
    return { success: true, score: 1 };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const data = await response.json();
    return {
      success: data.success,
      score: data.score,
      action: data.action,
    };
  } catch (error) {
    console.error("Errore verifica reCAPTCHA:", error);
    return { success: false };
  }
}

export async function sendContactEmail(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // 1. Estrarre dati dal form
  const name = (formData.get("name") as string)?.trim() || "";
  const email = (formData.get("email") as string)?.trim() || "";
  const phone = (formData.get("phone") as string)?.trim() || "";
  const service = (formData.get("service") as string)?.trim() || "";
  const message = (formData.get("message") as string)?.trim() || "";

  // Honeypot check (anti-spam)
  const honeypot = formData.get("website") as string;
  if (honeypot) {
    // Bot detected - return success silently to not reveal detection
    return { success: true, message: "Messaggio inviato con successo!" };
  }

  // Verifica reCAPTCHA
  const recaptchaToken = formData.get("recaptchaToken") as string;
  if (recaptchaToken) {
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      return {
        success: false,
        message: "Verifica di sicurezza fallita. Ricarica la pagina e riprova.",
      };
    }

    // Score troppo basso = probabilmente un bot (0.0 = bot, 1.0 = umano)
    if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.3) {
      console.warn(`reCAPTCHA score basso: ${recaptchaResult.score}`);
      return {
        success: false,
        message: "Verifica di sicurezza fallita. Ricarica la pagina e riprova.",
      };
    }
  }

  // 2. Validazione
  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Il nome è obbligatorio";
  } else if (name.length < 2) {
    errors.name = "Il nome deve avere almeno 2 caratteri";
  }

  if (!email) {
    errors.email = "L'email è obbligatoria";
  } else if (!isValidEmail(email)) {
    errors.email = "Inserisci un'email valida";
  }

  if (!message) {
    errors.message = "Il messaggio è obbligatorio";
  } else if (message.length < 10) {
    errors.message = "Il messaggio deve avere almeno 10 caratteri";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Per favore correggi gli errori nel form",
      errors,
    };
  }

  // 3. Sanitize inputs for email
  const safeName = sanitizeInput(name);
  const safePhone = sanitizeInput(phone);
  const safeService = sanitizeInput(service);
  const safeMessage = sanitizeInput(message);

  // 4. Configurare transporter SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // 5. Template email HTML
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #4a1a1e; padding: 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                BIEMME 2 Costruzioni
              </h1>
              <p style="color: #c9a66b; margin: 10px 0 0; font-size: 14px;">
                Nuova richiesta dal sito web
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #4a1a1e; margin: 0 0 20px; font-size: 20px; border-bottom: 2px solid #c9a66b; padding-bottom: 10px;">
                Dettagli Richiesta
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #4a1a1e; display: inline-block; width: 120px;">Nome:</strong>
                    <span style="color: #333;">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #4a1a1e; display: inline-block; width: 120px;">Email:</strong>
                    <a href="mailto:${email}" style="color: #4a1a1e; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${
                  safePhone
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #4a1a1e; display: inline-block; width: 120px;">Telefono:</strong>
                    <a href="tel:${phone.replace(/\s/g, "")}" style="color: #4a1a1e; text-decoration: none;">${safePhone}</a>
                  </td>
                </tr>
                `
                    : ""
                }
                ${
                  safeService
                    ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #4a1a1e; display: inline-block; width: 120px;">Servizio:</strong>
                    <span style="color: #333;">${safeService}</span>
                  </td>
                </tr>
                `
                    : ""
                }
              </table>

              <h3 style="color: #4a1a1e; margin: 30px 0 15px; font-size: 16px;">Messaggio:</h3>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 4px solid #c9a66b;">
                <p style="color: #333; margin: 0; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px 40px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #666; margin: 0; font-size: 12px;">
                Email inviata automaticamente dal sito web BIEMME 2<br>
                <a href="https://biemme2.it" style="color: #4a1a1e;">www.biemme2.it</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  // 6. Inviare email
  try {
    await transporter.sendMail({
      from: `"BIEMME 2 Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.CONTACT_EMAIL || "info@biemme2.com",
      replyTo: email,
      subject: `Nuova richiesta: ${safeService || "Contatto generico"} - ${safeName}`,
      html: emailHtml,
      text: `
Nuova richiesta dal sito BIEMME 2

Nome: ${name}
Email: ${email}
${phone ? `Telefono: ${phone}` : ""}
${service ? `Servizio: ${service}` : ""}

Messaggio:
${message}
      `.trim(),
    });

    return {
      success: true,
      message:
        "Grazie! La tua richiesta è stata inviata. Ti contatteremo presto.",
    };
  } catch (error) {
    console.error("Errore invio email:", error);
    return {
      success: false,
      message:
        "Si è verificato un errore nell'invio. Riprova più tardi o contattaci telefonicamente.",
    };
  }
}
