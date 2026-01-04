"use client";

import { useActionState, useCallback, useRef } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import { Button } from "@/components/ui/Button";
import { sendContactEmail, type ContactFormState } from "./actions";

interface ServiceOption {
  value: string;
  label: string;
}

interface ContactFormProps {
  serviceOptions: ServiceOption[];
}

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm({ serviceOptions }: ContactFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLFormElement>(null);

  // Wrapper per aggiungere il token reCAPTCHA prima dell'invio
  const handleSubmitWithRecaptcha = useCallback(
    async (prevState: ContactFormState, formData: FormData) => {
      // Ottieni token reCAPTCHA se disponibile
      if (executeRecaptcha) {
        try {
          const token = await executeRecaptcha("contact_form");
          formData.set("recaptchaToken", token);
        } catch {
          // Continua senza token se reCAPTCHA fallisce
        }
      }

      return sendContactEmail(prevState, formData);
    },
    [executeRecaptcha],
  );

  const [state, formAction, isPending] = useActionState(
    handleSubmitWithRecaptcha,
    initialState,
  );

  // Se il form è stato inviato con successo, mostra messaggio di conferma
  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <DynamicIcon
            name="check_circle"
            size={32}
            className="text-green-600"
          />
        </div>
        <h3 className="mb-2 text-2xl font-medium text-text-primary">
          Messaggio Inviato!
        </h3>
        <p className="max-w-md text-text-secondary">{state.message}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => window.location.reload()}
        >
          Invia un altro messaggio
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {/* Messaggio di errore generale */}
      {state.message && !state.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <div className="flex items-center gap-2">
            <DynamicIcon name="alert_circle" size={20} />
            {state.message}
          </div>
        </div>
      )}

      {/* Honeypot field - hidden from users, catches bots */}
      <input
        type="text"
        name="website"
        className="absolute -left-[9999px] opacity-0"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-5 md:grid-cols-2">
        {/* Nome */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="ml-1 text-sm font-light text-text-secondary"
          >
            Nome Completo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Mario Rossi"
            aria-invalid={!!state.errors?.name}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={`w-full rounded-lg border px-4 py-3 font-light text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:ring-2 ${
              state.errors?.name
                ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-200"
                : "border-neutral-200 bg-white focus:border-primary focus:ring-primary/20"
            }`}
          />
          {state.errors?.name && (
            <p id="name-error" className="ml-1 text-sm text-red-500">
              {state.errors.name}
            </p>
          )}
        </div>

        {/* Telefono */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="ml-1 text-sm font-light text-text-secondary"
          >
            Telefono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            placeholder="+39 333 ..."
            className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 font-light text-text-primary placeholder:text-text-muted transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="ml-1 text-sm font-light text-text-secondary"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          placeholder="mario@esempio.it"
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={`w-full rounded-lg border px-4 py-3 font-light text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:ring-2 ${
            state.errors?.email
              ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-200"
              : "border-neutral-200 bg-white focus:border-primary focus:ring-primary/20"
          }`}
        />
        {state.errors?.email && (
          <p id="email-error" className="ml-1 text-sm text-red-500">
            {state.errors.email}
          </p>
        )}
      </div>

      {/* Servizio */}
      <div className="space-y-2">
        <label
          htmlFor="service"
          className="ml-1 text-sm font-light text-text-secondary"
        >
          Tipo di Lavoro
        </label>
        <div className="relative">
          <select
            id="service"
            name="service"
            defaultValue=""
            className="w-full cursor-pointer appearance-none rounded-lg border border-neutral-200 bg-white px-4 py-3 font-light text-text-primary transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {serviceOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.value === ""}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted">
            <DynamicIcon name="chevron_down" size={20} />
          </div>
        </div>
      </div>

      {/* Messaggio */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="ml-1 text-sm font-light text-text-secondary"
        >
          Messaggio <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Descrivi brevemente il tuo progetto..."
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={`w-full resize-none rounded-lg border px-4 py-3 font-light text-text-primary placeholder:text-text-muted transition-all focus:outline-none focus:ring-2 ${
            state.errors?.message
              ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-200"
              : "border-neutral-200 bg-white focus:border-primary focus:ring-primary/20"
          }`}
        />
        {state.errors?.message && (
          <p id="message-error" className="ml-1 text-sm text-red-500">
            {state.errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <DynamicIcon name="loader" size={20} className="animate-spin" />
              Invio in corso...
            </>
          ) : (
            <>
              Invia Richiesta
              <DynamicIcon
                name="arrow_right"
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </Button>
      </div>

      {/* Privacy note with reCAPTCHA mention */}
      <p className="text-center text-xs text-text-muted">
        Questo sito è protetto da reCAPTCHA e si applicano la{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Privacy Policy
        </a>{" "}
        e i{" "}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Termini di Servizio
        </a>{" "}
        di Google.
        <br />
        Inviando questo form accetti la nostra{" "}
        <a href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
