"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Cal from "@calcom/embed-react";
import Image from "next/image";
import Link from "next/link";
import { sendMessage } from "@/app/contact/actions";
import {
  calBookingUrl,
  calEmbedPath,
  serviceOptions,
  sourceOptions,
  type ContactState,
  type ContactTab,
  type ServiceValue,
} from "@/lib/inquiry";

const calEmbedConfig = {
  layout: "month_view",
  theme: "light",
} as const;

const initialState: ContactState = { status: "idle" };

const controlClassName =
  "w-full rounded-xl border border-[#d4d4d4] bg-white px-4 text-base leading-[1.5] text-ink outline-none transition placeholder:text-[rgba(19,20,27,0.52)] focus:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink aria-[invalid=true]:border-ink";

const labelClassName = "text-base leading-[1.5] font-semibold text-[#111]";
const optionalClassName = "font-normal text-[#5f5f5f]";

type ContactExperienceProps = {
  defaultService?: ServiceValue;
  defaultTab?: ContactTab;
};

export function ContactExperience({
  defaultService,
  defaultTab = "book",
}: ContactExperienceProps) {
  const [tab, setTab] = useState<ContactTab>(defaultTab);
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const errorKey = state.fieldErrors ? Object.keys(state.fieldErrors).join(",") : "";
  const bookTabId = useId();
  const messageTabId = useId();
  const bookPanelId = useId();
  const messagePanelId = useId();

  useEffect(() => {
    if (state.status !== "success") return;
    setTab("message");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    confirmationRef.current?.focus();
    confirmationRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
    });
  }, [state.status]);

  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    setTab("message");
    const firstInvalid = Object.keys(state.fieldErrors)[0];
    if (firstInvalid) document.getElementById(firstInvalid)?.focus();
  }, [state.status, state.fieldErrors, errorKey]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
      <aside className="flex w-full flex-col gap-5 rounded-3xl bg-[linear-gradient(180deg,#bfbaef_0%,rgba(191,186,239,0)_116.4%)] px-6 py-8 text-center lg:w-[398px] lg:shrink-0 lg:gap-6 lg:py-10 lg:text-left">
        <h1 className="text-[32px] leading-[1.15] font-normal text-[#111] lg:text-[40px]">
          Tell me about your product.
        </h1>
        <p className="text-base leading-[1.5] text-ink lg:text-lg">
          What are you working on, and what you’d like to improve? A short overview would be enough to start with.
        </p>
        <div
          role="tablist"
          aria-label="How to get in touch"
          className="flex w-full rounded-[20px] bg-white p-1"
        >
          <TabButton
            id={bookTabId}
            controls={bookPanelId}
            selected={tab === "book"}
            onSelect={() => setTab("book")}
          >
            Book a call
          </TabButton>
          <TabButton
            id={messageTabId}
            controls={messagePanelId}
            selected={tab === "message"}
            onSelect={() => setTab("message")}
          >
            Message
          </TabButton>
        </div>
        {tab === "message" ? (
          <p className="text-sm leading-[1.5] text-ink">
            Or contact{" "}
            <a href="mailto:hello@softground.digital" className="underline decoration-from-font">
              hello@softground.digital
            </a>
          </p>
        ) : null}
      </aside>

      <div className="min-w-0 flex-1">
        <div
          role="tabpanel"
          id={bookPanelId}
          aria-labelledby={bookTabId}
          hidden={tab !== "book"}
          className="flex flex-col gap-4"
        >
          <div className="min-h-[560px] w-full overflow-hidden rounded-2xl border border-[#d4d4d4] bg-white lg:min-h-[640px]">
            <Cal
              calLink={calEmbedPath(calBookingUrl)}
              config={calEmbedConfig}
              className="min-h-[560px] w-full lg:min-h-[640px]"
            />
          </div>
          <p className="text-sm leading-[1.5] text-ink/72">
            Calendar not loading?{" "}
            <a
              href={calBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-from-font"
            >
              Open it in a new tab
            </a>
            .
          </p>
        </div>

        <div
          role="tabpanel"
          id={messagePanelId}
          aria-labelledby={messageTabId}
          hidden={tab !== "message"}
        >
          {state.status === "success" ? (
            <div
              ref={confirmationRef}
              id="contact-confirmation"
              tabIndex={-1}
              role="status"
              className="outline-none"
            >
              <p className="max-w-[640px] text-[32px] leading-[1.3] font-normal text-[#111] lg:text-[40px]">
                Thanks for telling me about your product. I’ll be in touch by email soon.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex h-[52px] items-center justify-center rounded-2xl border border-ink px-6 text-base font-semibold text-ink transition hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <MessageForm
              formAction={formAction}
              pending={pending}
              state={state}
              defaultService={defaultService}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function ContactExperienceFallback() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10" aria-hidden>
      <div className="h-[310px] w-full rounded-3xl bg-[linear-gradient(180deg,#bfbaef_0%,rgba(191,186,239,0)_116.4%)] lg:h-[361px] lg:w-[398px] lg:shrink-0" />
      <div className="h-[560px] min-w-0 flex-1 animate-pulse rounded-2xl bg-[#f7f8fa] lg:h-[640px]" />
    </div>
  );
}

function MessageForm({
  formAction,
  pending,
  state,
  defaultService,
}: {
  formAction: (payload: FormData) => void;
  pending: boolean;
  state: ContactState;
  defaultService?: ServiceValue;
}) {
  const errors = state.fieldErrors;

  return (
    <form action={formAction} className="relative flex flex-col gap-6">
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company_url">Company URL</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Field id="name" label="Your name" required error={errors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors?.name)}
            aria-describedby={errors?.name ? "name-error" : undefined}
            className={`${controlClassName} h-14`}
          />
        </Field>
        <Field id="email" label="Email address" required error={errors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors?.email)}
            aria-describedby={errors?.email ? "email-error" : undefined}
            className={`${controlClassName} h-14`}
          />
        </Field>
        <Field id="business" label="Business name" required error={errors?.business}>
          <input
            id="business"
            name="business"
            type="text"
            required
            autoComplete="organization"
            placeholder="Company or product name"
            aria-invalid={Boolean(errors?.business)}
            aria-describedby={errors?.business ? "business-error" : undefined}
            className={`${controlClassName} h-14`}
          />
        </Field>
        <Field id="website" label="Website or product link" error={errors?.website}>
          <input
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
            aria-invalid={Boolean(errors?.website)}
            aria-describedby={errors?.website ? "website-error" : undefined}
            className={`${controlClassName} h-14`}
          />
        </Field>
      </div>

      <Field id="help" label="What would you like help with?" required error={errors?.help}>
        <textarea
          id="help"
          name="help"
          required
          rows={5}
          placeholder="Tell me about your product, what’s getting in the way and what you’d like to achieve."
          aria-invalid={Boolean(errors?.help)}
          aria-describedby={errors?.help ? "help-error" : undefined}
          className={`${controlClassName} h-[152px] resize-y py-4`}
        />
      </Field>

      <RadioGroup
        name="service"
        label="What are you interested in?"
        options={serviceOptions.map((option) => ({ value: option.value, label: option.label }))}
        defaultValue={defaultService}
        error={errors?.service}
      />

      <Field id="files" label="Link to a brief or files" error={errors?.files}>
        <input
          id="files"
          name="files"
          type="text"
          inputMode="url"
          placeholder="Google Drive, Figma, Notion or Loom link"
          aria-invalid={Boolean(errors?.files)}
          aria-describedby={errors?.files ? "files-error" : undefined}
          className={`${controlClassName} h-14`}
        />
      </Field>

      <RadioGroup
        name="source"
        label="How did you hear about me?"
        options={sourceOptions.map((option) => ({ value: option, label: option }))}
        error={errors?.source}
      />

      <div className="flex flex-col items-stretch gap-6">
        {state.message ? (
          <p role="alert" className="text-sm leading-[1.5] text-ink">
            {state.message}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-[52px] w-full items-center justify-center rounded-2xl bg-lime px-6 text-base font-semibold text-[#111] transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60 lg:w-[220px]"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm leading-[1.5] text-ink/72">
          I’ll only use your details to reply to your enquiry.{" "}
          <span className="underline decoration-from-font">Privacy policy</span>
        </p>
      </div>
    </form>
  );
}

function TabButton({
  id,
  controls,
  selected,
  onSelect,
  children,
}: {
  id: string;
  controls: string;
  selected: boolean;
  onSelect: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-controls={controls}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onClick={onSelect}
      className={`flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-2xl px-3 py-3.5 text-base leading-[1.5] whitespace-nowrap transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:px-7 ${
        selected
          ? "bg-ink font-semibold text-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          : "font-medium text-ink/72 hover:bg-[#f0f0f0] hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  id,
  label,
  required = false,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className={labelClassName}>
        {label}
        {required ? (
          <span aria-hidden> *</span>
        ) : (
          <span className={optionalClassName}> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm leading-[1.5] text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function RadioGroup({
  name,
  label,
  options,
  defaultValue,
  error,
}: {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
}) {
  const labelId = `${name}-label`;

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelId}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${name}-error` : undefined}
      className="flex flex-col gap-3"
    >
      <p id={labelId} className={labelClassName}>
        {label} <span className={optionalClassName}>(optional)</span>
      </p>
      {options.map((option) => (
        <RadioOption
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          defaultChecked={option.value === defaultValue}
        />
      ))}
      {error ? (
        <p id={`${name}-error`} role="alert" className="text-sm leading-[1.5] text-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function RadioOption({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  const id = `${name}-${value}`;

  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3">
      <span className="relative size-[18px] shrink-0">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          className="peer absolute inset-0 size-[18px] cursor-pointer opacity-0"
        />
        <Image
          src="/icons/radio-unselected.svg"
          alt=""
          width={18}
          height={18}
          unoptimized
          className="pointer-events-none block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink opacity-0 peer-checked:opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full opacity-0 outline-2 outline-offset-2 outline-ink peer-focus-visible:opacity-100"
        />
      </span>
      <span className="text-base leading-[1.5] text-ink">{label}</span>
    </label>
  );
}
