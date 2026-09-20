"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      const supabase = createClient();

      await supabase.auth.signOut();

      router.push("/voting");

      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.button
      whileTap={{
        scale: 0.95,
      }}
      onClick={handleLogout}
      disabled={loading}
      className="
flex
h-9
items-center
gap-2
rounded-xl
bg-[#0F3D2E]
px-3
text-xs
font-bold
text-[#F8F5EF]
transition
hover:bg-[#0A2A1F]
disabled:opacity-60
"
    >
      <LogOut size={15} />

      <span className="hidden sm:block">
        {loading ? "Logging out..." : "Logout"}
      </span>
    </motion.button>
  );
}
