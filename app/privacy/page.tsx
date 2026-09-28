import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for SSC Activity Hub and the Parageyan 2026 People's Choice Award voting system.",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: September 28, 2026
        </p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-slate-700">
          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">1. Introduction</h2>
            <p className="mt-3">
              SSC Activity Hub (&quot;we&quot;, &quot;our&quot;, or &quot;the Platform&quot;) is the official
              digital platform of the Supreme Student Council of Basilan State College.
              This Privacy Policy explains how we collect, use, and protect information
              when you use our website and services, including the Parageyan 2026
              People&apos;s Choice Award voting system.
            </p>
            <p className="mt-3">
              This platform is developed and maintained by <strong>Jaymar Maruji</strong>,
              SSC Senator, on behalf of the Supreme Student Council.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">2. Information We Collect</h2>
            <p className="mt-3">We may collect the following information:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Google Account information</strong> when you sign in, such as your
                name, email address, and profile image.
              </li>
              <li>
                <strong>Voting activity</strong>, such as which candidate you voted for and
                the time of your vote.
              </li>
              <li>
                <strong>Basic usage data</strong>, such as pages visited and device/browser
                type, to improve the platform.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">3. How We Use Your Information</h2>
            <p className="mt-3">We use your information to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Authenticate your identity through Google Sign-In</li>
              <li>Allow secure and fair participation in voting</li>
              <li>Prevent duplicate or unauthorized votes</li>
              <li>Operate, maintain, and improve SSC Activity Hub</li>
              <li>Communicate important updates related to Parageyan 2026 and SSC activities</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">4. Google Authentication</h2>
            <p className="mt-3">
              Our voting system uses Google OAuth for secure sign-in. By signing in with
              Google, you allow us to access basic profile information needed to verify
              your identity. We only request the minimum permissions required for voting
              and account access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">5. Data Storage and Security</h2>
            <p className="mt-3">
              Your data is stored using secure third-party services, including Supabase and
              hosting providers. We take reasonable measures to protect your information
              against unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">6. Data Sharing</h2>
            <p className="mt-3">
              We may share limited information only when necessary:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>With SSC officers for official event management</li>
              <li>With service providers that help us operate the platform</li>
              <li>When required by law or institutional policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">7. Your Choices</h2>
            <p className="mt-3">
              You may stop using the platform at any time. If you want your account-related
              data reviewed or removed, you may contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">8. Children&apos;s Privacy</h2>
            <p className="mt-3">
              This platform is intended for students and members of the Basilan State College
              community. We do not knowingly collect personal information from children
              under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">9. Changes to This Policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. Updates will be posted
              on this page with a revised date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#0A2A1F]">10. Contact Us</h2>
            <p className="mt-3">
              For privacy-related questions or requests, contact:
            </p>
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