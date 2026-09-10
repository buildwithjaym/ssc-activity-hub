import Image from "next/image";
import { SITE_CONFIG } from "./site-config";

export function Footer() {
  return (
    <footer className="bg-[#0A2A1F] px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-white">
                <Image
                  src={SITE_CONFIG.images.logo}
                  alt="Supreme Student Council logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>

              <div>
                <h3 className="font-bold">{SITE_CONFIG.name}</h3>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/40">
                  {SITE_CONFIG.institution}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
              The official digital information hub for Supreme Student Council
              activities during Parageyan 2026 at Basilan State College.
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Quick links
            </p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
              {SITE_CONFIG.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-2 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Supreme Student Council · Basilan State College</p>
            <p>Developed by: Jaymar Maruji, SSC Senator</p>
          </div>
        </div>
      </div>
    </footer>
  );
}