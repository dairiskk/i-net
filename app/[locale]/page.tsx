import { notFound } from "next/navigation";
import { StoreHome } from "@/components/StoreHome";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export const revalidate = 300;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <StoreHome locale={locale as Locale} />;
}
