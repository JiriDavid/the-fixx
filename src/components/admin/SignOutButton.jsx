"use client";

import { useTransition } from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function SignOutButton() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: "/" });
    });
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-white/20 hover:text-white"
      whileTap={{ scale: 0.96 }}
      disabled={pending}
    >
      <LogOut size={16} />
      {pending ? "Exiting" : "Sign Out"}
    </motion.button>
  );
}
