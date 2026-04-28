import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileCTA from "@/components/layout/MobileCTA";
import CookieConsent from "@/components/layout/CookieConsent";
import WaitlistStickyFooter from "@/components/WaitlistStickyFooter";
import { WaitlistProvider } from "@/components/waitlist/WaitlistModal";

const GOOGLE_ADS_TAG_ID = "AW-18123956048";

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
    default: "MetaOrtho — Musculoskeletal Care for GLP-1 Patients",
    template: "%s | MetaOrtho",
  },
  description:
    "Physician-led telehealth practice protecting your bones, muscles, and joints while you lose weight on Ozempic, Wegovy, Mounjaro, or Zepbound. Board-certified orthopedic surgeon.",
  keywords: [
    "GLP-1 muscle loss",
    "Ozempic bone density",
    "GLP-1 side effects",
    "sarcopenia weight loss drugs",
    "Ozempic muscle loss",
    "GLP-1 musculoskeletal",
    "weight loss bone loss",
    "Mounjaro side effects",
    "telehealth orthopedic",
    "MetaOrtho",
    "MetaOrthopedics",
  ],
  metadataBase: new URL("https://metaortho.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://metaortho.com",
    siteName: "MetaOrthopedics",
    title: "MetaOrtho — Musculoskeletal Care for GLP-1 Patients",
    description:
      "Up to 40% of weight lost on GLP-1 drugs is muscle and bone, not fat. MetaOrtho monitors and protects your musculoskeletal health during weight loss.",
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
      "Physician-led telemedicine practice providing musculoskeletal monitoring and care for patients on GLP-1 weight loss medications.",
    url: "https://metaortho.com",
    medicalSpecialty: "Orthopedic",
    availableService: [
      {
        "@type": "MedicalProcedure",
        name: "Comprehensive MSK Assessment for GLP-1 Patients",
        procedureType: "Diagnostic",
      },
      {
        "@type": "MedicalProcedure",
        name: "Sarcopenia Prevention Protocol",
        procedureType: "Therapeutic",
      },
      {
        "@type": "MedicalProcedure",
        name: "Bone Density Monitoring",
        procedureType: "Diagnostic",
      },
      {
        "@type": "MedicalProcedure",
        name: "Gout Diagnosis and Treatment",
        procedureType: "Therapeutic",
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
        <WaitlistProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileCTA />
          <CookieConsent />
          <WaitlistStickyFooter />
        </WaitlistProvider>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_TAG_ID}');`}
      </Script>
    </html>
  );
}
