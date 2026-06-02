"use client";

import { useState } from "react";
import { t, type Locale } from "@/lib/i18n";

type InquiryFormProps = {
  productName?: string;
  locale?: Locale;
};

export function InquiryForm({ productName = "", locale = "en" }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const copy = t(locale).inquiry;

  return (
    <form
      className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <h2 className="text-2xl font-bold text-stone-950">{copy.title}</h2>
        <p className="mt-1 text-sm text-stone-600">
          {copy.intro}
        </p>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-stone-800">
        {copy.name}
        <input
          required
          name="name"
          className="h-12 rounded-md border border-stone-300 px-3 text-base outline-none focus:border-orange-600"
          autoComplete="name"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-stone-800">
        {copy.phone}
        <input
          required
          name="phone"
          className="h-12 rounded-md border border-stone-300 px-3 text-base outline-none focus:border-orange-600"
          autoComplete="tel"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-stone-800">
        {copy.email}
        <input
          required
          type="email"
          name="email"
          className="h-12 rounded-md border border-stone-300 px-3 text-base outline-none focus:border-orange-600"
          autoComplete="email"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-stone-800">
        {copy.product}
        <input
          required
          name="product"
          defaultValue={productName}
          className="h-12 rounded-md border border-stone-300 px-3 text-base outline-none focus:border-orange-600"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-stone-800">
        {copy.message}
        <textarea
          name="message"
          rows={4}
          className="rounded-md border border-stone-300 px-3 py-3 text-base outline-none focus:border-orange-600"
          defaultValue={copy.defaultMessage}
        />
      </label>

      <button
        type="submit"
        className="h-12 rounded-md bg-orange-600 px-5 text-base font-bold text-white transition hover:bg-orange-700"
      >
        {copy.submit}
      </button>

      {submitted ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900">
          {copy.success}
        </p>
      ) : null}
    </form>
  );
}
