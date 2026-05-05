"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

const navItems = [
  {
    href: "/portal",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/portal/protocol",
    label: "Protocol",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: "/portal/body",
    label: "My Body",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    href: "/portal/care-team",
    label: "Care Team",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("portal-auth");
      localStorage.removeItem("portal-user");
    }
    router.push("/portal/login");
  };

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r border-[var(--color-border)] h-[100dvh] sticky top-0">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-[var(--color-border)]">
        <Link href="/portal" className="flex items-center gap-2.5 text-[var(--color-bg-dark)]">
          <Logo size={28} />
          <span className="text-[17px] font-semibold tracking-[-0.03em] text-[var(--color-text-heading)]">
            MetaOrtho
          </span>
        </Link>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-primary)]">
          Patient Portal
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {/* Return to main site */}
        <Link
          href="/home"
          className="flex items-center gap-3 px-3 py-2 mb-3 rounded-[var(--radius-md)] text-[12px] font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-bg-cream)] transition-[color,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:bg-[var(--color-bg-warm)]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to main site
        </Link>

        {navItems.map((item) => {
          const active =
            item.href === "/portal"
              ? pathname === "/portal"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-[14px] font-medium transition-[color,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:bg-[var(--color-bg-warm)] ${
                active
                  ? "bg-[var(--color-bg-cream)] text-[var(--color-text-heading)]"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-cream)] hover:text-[var(--color-text-heading)]"
              }`}
            >
              <span className={active ? "text-[var(--color-accent-primary)]" : "text-[var(--color-text-tertiary)]"}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer: user + sign out */}
      <div className="px-3 py-4 border-t border-[var(--color-border)]">
        <div className="px-3 py-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--color-accent-primary)] text-white flex items-center justify-center text-sm font-semibold">
            DP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-[var(--color-text-heading)] truncate">
              Demo Patient
            </p>
            <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
              demo.patient@metaortho.com
            </p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="mt-2 w-full text-left px-3 py-2 text-[13px] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-bg-cream)] rounded-[var(--radius-md)] transition-[color,background-color] duration-[var(--dur-hover)] ease-[var(--ease-out)] active:bg-[var(--color-bg-warm)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)]"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
