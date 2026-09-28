import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for SSC Activity Hub and the Parageyan 2026 People's Choice Award voting system.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F2] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="text-sm font-medium text-[#0A2A1F] hover:text-[#D4AF37]"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-[#0A2A1F] sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: September 28, 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By accessing or using SSC Activity Hub, you agree to these Terms of Service.
              If you do not agree, please do not use the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">2. About the Platform</h2>
            <p className="mt-3">
              SSC Activity Hub is the official digital platform of the Supreme Student
              Council of Basilan State College. It provides information about student
              activities, schedules, guidelines, announcements, and the Parageyan 2026
              People&apos;s Choice Award voting system.
            </p>
            <p className="mt-3">
              The platform is developed by <strong>Jaymar Maruji</strong>, SSC Senator.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">3. Eligibility</h2>
            <p className="mt-3">
              Voting and certain features may be limited to eligible students or authorized
              users as determined by the Supreme Student Council. You agree to provide
              accurate information when signing in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">4. Google Sign-In</h2>
            <p className="mt-3">
              Some features require Google authentication. You are responsible for
              maintaining the security of your Google account. You must not share your
              account or attempt to vote using another person&apos;s account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">5. Voting Rules</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>One legitimate vote per eligible user, unless otherwise stated by SSC</li>
              <li>Any attempt to manipulate votes is prohibited</li>
              <li>SSC reserves the right to cancel suspicious or invalid votes</li>
              <li>Voting periods and rules may be updated by SSC as needed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">6. Acceptable Use</h2>
            <p className="mt-3">You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Misuse the platform or disrupt its services</li>
              <li>Attempt unauthorized access to systems or data</li>
              <li>Use bots, scripts, or automated tools to vote</li>
              <li>Harass other users or submit false information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">7. Intellectual Property</h2>
            <p className="mt-3">
              Content on this platform, including text, branding, and design, is owned by
              the Supreme Student Council and/or the platform developer, unless otherwise
              stated. You may not copy or reuse materials without permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">8. Disclaimer</h2>
            <p className="mt-3">
              The platform is provided on an &quot;as is&quot; basis for official student
              council use. We strive for accuracy and availability, but we do not guarantee
              uninterrupted service or error-free content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">9. Limitation of Liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, the Supreme Student Council and the
              developer shall not be liable for any indirect or consequential damages
              arising from your use of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">10. Changes to These Terms</h2>
            <p className="mt-3">
              We may update these Terms of Service at any time. Continued use of the
              platform after changes means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">11. Contact</h2>
            <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
              <p><strong>Developer:</strong> Jaymar Maruji</p>
              <p><strong>Position:</strong> SSC Senator</p>
              <p><strong>Organization:</strong> Supreme Student Council – Basilan State College</p>
              <p><strong>Website:</strong> https://basilanstateuniversity-ssc.org</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}