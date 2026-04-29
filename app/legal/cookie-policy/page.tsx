import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies and tracking technologies MetaOrtho uses, why, and how to control them.",
};

const headingClass =
  "text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mb-4";
const paraClass =
  "text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]";

const cookies = [
  {
    name: "site-auth",
    vendor: "MetaOrtho (first-party)",
    purpose: "Pre-launch site password gate. Set after the visitor enters the access password and removed at logout. Necessary.",
    expiry: "Session",
    category: "Necessary",
  },
  {
    name: "metaortho-cookie-consent",
    vendor: "MetaOrtho (first-party, localStorage)",
    purpose: "Records the visitor&rsquo;s cookie consent choice so the banner doesn&rsquo;t appear again.",
    expiry: "Persistent until cleared",
    category: "Necessary",
  },
  {
    name: "_ga / _gid / _gat (and gtag-set ad cookies)",
    vendor: "Google (Google Ads conversion tracking)",
    purpose: "Used to attribute visits and conversions to Google Ads campaigns. Loaded only on public marketing pages and only if you accept analytics &amp; marketing cookies.",
    expiry: "Up to 2 years",
    category: "Marketing",
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Cookie policy
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Cookies and tracking
          </h1>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            Effective date: 2026-04-29
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <h2 className={headingClass}>What cookies are</h2>
          <p className={paraClass}>
            Cookies are small data files stored on your device by your
            browser. We also use similar technologies such as{" "}
            <code>localStorage</code>. We refer to all of these as
            &ldquo;cookies&rdquo; on this page for simplicity.
          </p>

          <h2 className={headingClass}>How we use cookies</h2>
          <p className={paraClass}>
            We group cookies into the following categories:
          </p>
          <ul className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px] list-disc pl-5 space-y-1.5">
            <li>
              <strong>Necessary</strong> &mdash; required for the site to
              work (site password gate, your cookie-consent choice). These
              are always on and cannot be disabled while the site is in
              use.
            </li>
            <li>
              <strong>Functional</strong> &mdash; remember preferences and
              UI state. We do not currently use functional cookies.
            </li>
            <li>
              <strong>Analytics</strong> &mdash; help us understand how the
              site is used in aggregate. We do not currently use analytics
              cookies.
            </li>
            <li>
              <strong>Marketing</strong> &mdash; used to measure
              advertising performance and tailor messaging. We use Google
              Ads conversion tracking on public marketing pages only.
            </li>
          </ul>

          <h2 className={headingClass}>Pages where tracking is and isn&rsquo;t used</h2>
          <p className={paraClass}>
            We never load marketing or analytics cookies on the patient
            portal, on intake forms after a health question has been
            asked, or on any page where you are logged in as a patient.
            This is a deliberate, route-level boundary that aligns with
            HHS Office for Civil Rights guidance on online tracking
            technologies and HIPAA.
          </p>

          <h2 className={headingClass}>The cookies we use</h2>
          <div className="overflow-x-auto -mx-5 sm:mx-0 mb-8">
            <table className="w-full text-[14px] text-left">
              <thead className="text-[var(--color-text-heading)] font-semibold border-b border-[var(--color-border)]">
                <tr>
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Vendor</th>
                  <th className="py-3 px-3">Purpose</th>
                  <th className="py-3 px-3">Expires</th>
                  <th className="py-3 px-3">Category</th>
                </tr>
              </thead>
              <tbody className="text-[var(--color-text-secondary)]">
                {cookies.map((c) => (
                  <tr
                    key={c.name}
                    className="border-b border-[var(--color-border)]"
                  >
                    <td className="py-3 px-3 font-mono text-[12px]">
                      {c.name}
                    </td>
                    <td className="py-3 px-3">{c.vendor}</td>
                    <td
                      className="py-3 px-3"
                      dangerouslySetInnerHTML={{ __html: c.purpose }}
                    />
                    <td className="py-3 px-3">{c.expiry}</td>
                    <td className="py-3 px-3">{c.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={headingClass}>How to control cookies</h2>
          <p className={paraClass}>
            You can choose your cookie preferences from the cookie banner
            on your first visit, and you can revisit your choices at any
            time from the &ldquo;Manage cookies&rdquo; link in the
            footer. By default, only necessary cookies are set; analytics
            and marketing cookies are off until you opt in.
          </p>
          <p className={paraClass}>
            You can also block or delete cookies through your browser
            settings. Note that blocking necessary cookies will prevent
            parts of the site from working.
          </p>

          <h2 className={headingClass}>Do Not Sell or Share &amp; Global Privacy Control</h2>
          <p className={paraClass}>
            MetaOrtho does not sell personal information. We honor the
            Global Privacy Control (GPC) browser signal as a request to
            opt out of sale or sharing of personal information.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-04-29.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
