'use client'
import { ClientLayout } from "@/components/layouts/Client";
import Loading from "./(client)/login/loading";
import ShinyText from "@/components/ui/ShinyText";
export default function Home() {

  return (
    <ClientLayout>

      <ShinyText text="Home Page" />

    </ClientLayout>
  );
}
