'use client'
import { ClientLayout } from "@/components/layouts/Client";
import LoadingUI from "@/components/shared/LoadingUI";
import { useEffect, useState } from "react";
import { getProfile } from "./src/auth.service";
import type { LoginResponse } from "./src/auth.service";

export default function Home() {
  
  return (
    <ClientLayout>
      

      <LoadingUI>Home Not Yet Arrival</LoadingUI>
    </ClientLayout>
  );
}
