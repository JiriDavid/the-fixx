"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminNavLinks({ items }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium tracking-wide text-white/70 transition hover:border-white/20 hover:text-white ${
                isActive ? "text-white" : ""
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="admin-nav-active"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/25 via-amber-400/25 to-yellow-400/25"
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                {item.icon && (
                  <item.icon size={16} className="text-amber-300" />
                )}
                <span>{item.label}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
