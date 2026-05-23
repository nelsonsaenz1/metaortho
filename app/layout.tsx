import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCTA from "@/components/layout/MobileCTA";
import CookieConsent from "@/components/layout/CookieConsent";
import WaitlistStickyFooter from "@/components/WaitlistStickyFooter";
import Analytics from "@/components/Analytics";
import { WaitlistProvider } from "@/components/waitlist/WaitlistModal";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "MetaOrtho — Specialty GLP-1 Management",
    template: "%s | MetaOrtho",
  },
  description:
    "MetaOrtho is a physician-led specialty GLP-1 management practice. Start with a free GLP-1 Management Profile, then meet a board-certified endocrinologist and orthopedic surgeon for a cash-pay specialty consult — candidacy, medication fit, side effects, and monitoring.",
  keywords: [
    "GLP-1 management",
    "specialty GLP-1 consult",
    "GLP-1 candidacy",
    "GLP-1 side effects",
    "Ozempic management",
    "Mounjaro management",
    "GLP-1 second opinion",
    "GLP-1 body composition",
    "telehealth GLP-1",
    "MetaOrtho",
    "MetaOrthopedics",
  ],
  metadataBase: new URL("https://metaortho.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://metaortho.com",
    siteName: "MetaOrthopedics",
    title: "MetaOrtho — Specialty GLP-1 Management",
    description:
      "Physician-led specialty GLP-1 management. Start with a free GLP-1 Management Profile, then a cash-pay specialty consult: candidacy, medication fit, side effects, and monitoring.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "MetaOrthopedics",
    alternateName: "MetaOrtho",
    description:
      "Physician-led specialty GLP-1 management practice led by a board-certified endocrinologist and a board-certified orthopedic surgeon. Helps patients evaluate candidacy, medication fit, side-effect concerns, and metabolic and musculoskeletal monitoring through a cash-pay specialty consult.",
    url: "https://metaortho.com",
    medicalSpecialty: ["Endocrine", "Orthopedic"],
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Specialty GLP-1 Management Consult",
        procedureType: "Diagnostic",
      },
      {
        "@type": "MedicalProcedure",
        name: "GLP-1 Candidacy and Medication Review",
        procedureType: "Diagnostic",
      },
      {
        "@type": "MedicalProcedure",
        name: "Body Composition and Musculoskeletal Monitoring",
        procedureType: "Diagnostic",
      },
    ],
    isAcceptingNewPatients: true,
    currenciesAccepted: "USD",
  };

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-bg-darkest)] focus:text-white focus:rounded-[var(--radius-md)] focus:outline focus:outline-2 focus:outline-[var(--color-accent-primary)]"
        >
          Skip to main content
        </a>
        <WaitlistProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileCTA />
          <CookieConsent />
          <WaitlistStickyFooter />
        </WaitlistProvider>
        <Analytics />
      </body>
    </html>
  );
}
