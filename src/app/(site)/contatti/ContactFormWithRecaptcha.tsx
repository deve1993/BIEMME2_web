"use client";

import { RecaptchaProvider } from "@/components/providers";
import { ContactForm } from "./ContactForm";

interface ServiceOption {
  value: string;
  label: string;
}

interface ContactFormWithRecaptchaProps {
  serviceOptions: ServiceOption[];
}

/**
 * Wrapper component that loads reCAPTCHA only on the contact page.
 * This avoids loading ~150-200KB of reCAPTCHA JS on every page.
 */
export function ContactFormWithRecaptcha({
  serviceOptions,
}: ContactFormWithRecaptchaProps) {
  return (
    <RecaptchaProvider>
      <ContactForm serviceOptions={serviceOptions} />
    </RecaptchaProvider>
  );
}
