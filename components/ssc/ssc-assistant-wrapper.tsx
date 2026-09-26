"use client";

import { usePathname } from "next/navigation";
import SSCAssistant from "./ssc-assistant";

export default function SSCAssistantWrapper() {
  const pathname = usePathname();

  const hideAssistant =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/voting");

  if (hideAssistant) {
    return null;
  }

  return <SSCAssistant />;
}