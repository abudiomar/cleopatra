"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { services } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-[0.9375rem] " +
  "text-brand-950 placeholder:text-sand-400 transition-colors " +
  "focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10";

const label = "block text-sm font-medium text-brand-900";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    // currentTarget is null na een await, dus het formulier hier vastpakken.
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Er ging iets mis.");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Er ging iets mis. Probeer het opnieuw of bel ons.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-accent-400/40 bg-accent-100/50 p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent-400 text-white">
          <Icon name="check" className="size-7" strokeWidth={2.4} />
        </span>
        <h2 className="mt-6 text-2xl font-semibold">Bedankt voor uw bericht</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-sand-700">
          Wij hebben uw aanvraag ontvangen en nemen binnen één werkdag contact
          met u op. Heeft u haast? Bel ons gerust direct.
        </p>
        <Button
          variant="secondary"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Nog een bericht sturen
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-card border border-sand-200 bg-white p-8 md:p-10"
      noValidate
    >
      {/* Honeypot tegen spambots — onzichtbaar voor bezoekers. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="bedrijfsnaam-extra">Laat dit veld leeg</label>
        <input
          id="bedrijfsnaam-extra"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="naam" className={label}>
            Naam <span className="text-brand-600">*</span>
          </label>
          <input
            id="naam"
            name="naam"
            type="text"
            required
            autoComplete="name"
            placeholder="Uw voor- en achternaam"
            className={`${field} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="email" className={label}>
            E-mailadres <span className="text-brand-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="naam@voorbeeld.nl"
            className={`${field} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="telefoon" className={label}>
            Telefoonnummer
          </label>
          <input
            id="telefoon"
            name="telefoon"
            type="tel"
            autoComplete="tel"
            placeholder="06 12345678"
            className={`${field} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="dienst" className={label}>
            Waar gaat het om?
          </label>
          <select
            id="dienst"
            name="dienst"
            defaultValue=""
            className={`${field} mt-2`}
          >
            <option value="">Maak een keuze</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value="Anders">Anders / weet ik nog niet</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="bericht" className={label}>
            Uw bericht <span className="text-brand-600">*</span>
          </label>
          <textarea
            id="bericht"
            name="bericht"
            required
            rows={5}
            placeholder="Vertel kort over de ruimte, de gewenste frequentie en de locatie."
            className={`${field} mt-2 resize-y`}
          />
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-sand-500 sm:max-w-xs">
          Wij gebruiken uw gegevens uitsluitend om op deze aanvraag te
          reageren.
        </p>

        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Bezig met versturen…" : "Aanvraag versturen"}
          {status !== "sending" && <Icon name="arrow" className="size-4" />}
        </Button>
      </div>
    </form>
  );
}
