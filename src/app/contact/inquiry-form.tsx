"use client";

import { useActionState, useEffect, useId, useRef, useSyncExternalStore, type ReactNode } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { submitInquiry, type InquiryState } from "./actions";
import { occasions } from "./occasions";

const fieldClass =
  "w-full rounded-panel bg-paper px-4 py-3 text-base text-ink ring-1 ring-ink/15 ring-inset " +
  "placeholder:text-stone/70 transition-[box-shadow] duration-(--duration-base) " +
  "hover:ring-ink/30 focus:ring-2 focus:ring-sindoor focus:outline-none " +
  "aria-invalid:ring-2 aria-invalid:ring-sindoor-deep";

export function InquiryForm() {
  const [state, action, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });
  // Earliest pickable date, read in the browser (the prerendered HTML has no "today").
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().toISOString().slice(0, 10),
    () => undefined,
  );
  const resultRef = useRef<HTMLDivElement>(null);

  // Bring the thank-you (or the error summary) into view: the form above it may be tall.
  useEffect(() => {
    if (state.status === "idle") return;
    const el = resultRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-panel bg-mist p-8 outline-none md:p-10">
        <h2 className="text-3xl">Thank you{state.name ? `, ${state.name}` : ""}.</h2>
        <p className="mt-4 max-w-prose text-lg text-stone">
          Your message is with me. I will reply with availability and a quote, usually within a
          day. If your date is close, message me on WhatsApp as well.
        </p>
        <ButtonLink href={site.whatsappUrl} target="_blank" rel="noreferrer" variant="secondary" className="mt-8">
          Message on WhatsApp
        </ButtonLink>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : {};
  const values = state.status === "error" ? state.values : {};

  return (
    <form action={action} noValidate className="grid gap-6 sm:grid-cols-2">
      {state.status === "error" ? (
        <div ref={resultRef} tabIndex={-1} role="alert" className="text-sindoor-deep outline-none sm:col-span-2">
          {state.message}
        </div>
      ) : null}

      <Field label="Your name" error={errors.name}>
        {(props) => (
          <input {...props} name="name" autoComplete="name" required defaultValue={values.name} className={fieldClass} />
        )}
      </Field>

      <Field label="Phone or WhatsApp" error={errors.phone}>
        {(props) => (
          <input
            {...props}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+91 98765 43210"
            defaultValue={values.phone}
            className={fieldClass}
          />
        )}
      </Field>

      <Field label="What are you celebrating?" error={errors.occasion}>
        {(props) => (
          <select
            {...props}
            name="occasion"
            required
            defaultValue={values.occasion ?? ""}
            className={`${fieldClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%20fill='none'%20stroke='%2316201b'%20stroke-width='1.6'%3E%3Cpath%20d='M4%206l4%204%204-4'/%3E%3C/svg%3E")] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
          >
            <option value="" disabled>
              Choose one
            </option>
            {occasions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        )}
      </Field>

      <Field label="Date" hint="Leave empty if not decided yet" error={errors.eventDate}>
        {(props) => (
          <input {...props} name="eventDate" type="date" min={today} defaultValue={values.eventDate} className={fieldClass} />
        )}
      </Field>

      <Field label="Town or venue" error={errors.location} className="sm:col-span-2">
        {(props) => (
          <input
            {...props}
            name="location"
            required
            placeholder="For example, Imphal or Guwahati"
            defaultValue={values.location}
            className={fieldClass}
          />
        )}
      </Field>

      <Field label="Email" hint="Optional" error={errors.email} className="sm:col-span-2">
        {(props) => (
          <input {...props} name="email" type="email" autoComplete="email" defaultValue={values.email} className={fieldClass} />
        )}
      </Field>

      <Field label="Tell me about your day" hint="Optional" error={errors.message} className="sm:col-span-2">
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={5}
            maxLength={2000}
            placeholder="Number of days, rituals you want covered, photos, film or drone…"
            defaultValue={values.message}
            className={`${fieldClass} resize-y`}
          />
        )}
      </Field>

      {/* Honeypot: hidden from people and assistive tech, catches simple bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:col-span-2">
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending ? "Sending…" : "Send inquiry"}
        </Button>
        <p className="text-sm text-stone">I reply with availability and a quote, usually within a day.</p>
      </div>
    </form>
  );
}

const noopSubscribe = () => () => {};

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) => ReactNode;
};

function Field({ label, hint, error, className = "", children }: FieldProps) {
  const id = useId();
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {hint ? (
          <span id={`${id}-hint`} className="ml-2 font-normal text-stone">
            {hint}
          </span>
        ) : null}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": describedBy || undefined })}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-sindoor-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
