import { StoreHome } from "@/components/StoreHome";

export const revalidate = 300;

export default function Home() {
  return <StoreHome locale="lv" />;
}
