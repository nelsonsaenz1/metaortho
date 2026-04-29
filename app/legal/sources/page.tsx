import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Sources & Citations",
  description:
    "Every clinical claim on the MetaOrtho website is backed by published research. Here are the sources.",
};

const sources = [
  {
    claim:
      "Up to 40% of weight lost on GLP-1 medications can be lean muscle (and bone/connective tissue, not just fat).",
    citation:
      "Wilding JPH et al., Once-Weekly Semaglutide in Adults with Overweight or Obesity, NEJM 2021. Rubino DM et al., JAMA 2022. Jensen MD et al., NEJM Evid 2024.",
  },
  {
    claim:
      "Long-term GLP-1 use is associated with an elevated risk of osteoporosis (~30% increase) over 5 years.",
    citation:
      "Wajahath M et al., Long-term musculoskeletal complications of GLP-1 receptor agonists, AAOS Annual Meeting 2026.",
  },
  {
    claim:
      "Long-term GLP-1 use is associated with an elevated risk of osteomalacia (>150% increase versus matched controls in observational data).",
    citation:
      "Wajahath M et al., AAOS Annual Meeting 2026 (small-sample observational; presented as directional evidence).",
  },
  {
    claim:
      "Long-term GLP-1 use is associated with a ~12% elevated gout risk.",
    citation: "Wajahath M et al., AAOS Annual Meeting 2026.",
  },
  {
    claim:
      "Long-term GLP-1 use is associated with an elevated risk of major tendon rupture.",
    citation: "Lawand A et al., AAOS Annual Meeting 2026.",
  },
  {
    claim:
      "Bone mineral density declines with significant or rapid weight loss.",
    citation:
      "Endocrine Society and AAOS position statements on weight-loss-associated bone loss; multiple meta-analyses of bariatric and pharmacologic weight loss cohorts.",
  },
  {
    claim:
      "Resistance training during weight loss reduces the proportion of weight lost as lean mass.",
    citation:
      "ACSM position statements; Cava E et al., Adv Nutr 2017; multiple systematic reviews.",
  },
  {
    claim:
      "Adequate protein intake (1.6–2.4 g/kg body weight per day) during active weight loss supports muscle preservation.",
    citation:
      "Stokes T et al., Nutrients 2018. Morton RW et al., Br J Sports Med 2018. Layman DK et al.",
  },
  {
    claim:
      "Calcium and vitamin D supplementation supports bone health during weight loss.",
    citation: "Endocrine Society Clinical Practice Guidelines on bone health.",
  },
];

export default function SourcesPage() {
  return (
    <>
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Sources &amp; citations
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Every claim, every source
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            We back every clinical statement on this site with peer-reviewed
            research and current orthopedic guidelines. Below are the
            citations for the claims you&rsquo;ll see across MetaOrtho.
          </p>
        </div>
      </section>

      <SectionWrapper bg="primary" size="sm">
        <div className="max-w-3xl mx-auto">
          <ol className="space-y-8">
            {sources.map((s, i) => (
              <li
                key={i}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6"
              >
                <p className="text-[15px] text-[var(--color-text-heading)] font-semibold mb-2">
                  {i + 1}. {s.claim}
                </p>
                <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                  {s.citation}
                </p>
              </li>
            ))}
          </ol>

          <h2 className="text-2xl font-normal tracking-[-0.01em] text-[var(--color-text-heading)] mt-16 mb-4">
            About these citations
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 text-[15px]">
            The MetaOrtho clinical team reviews this list quarterly and
            updates it whenever a new claim is added to the website or a
            stronger source becomes available. Where evidence is emerging or
            small-sample, we say so on the page where the claim appears as
            well as here.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed text-[15px]">
            Citations beginning &ldquo;AAOS Annual Meeting 2026&rdquo; refer
            to abstracts and presentations from the American Academy of
            Orthopaedic Surgeons 2026 annual meeting. Where journal
            publication follows, this page will be updated.
          </p>

          <p className="text-xs text-[var(--color-text-tertiary)] mt-12">
            Updated 2026-04-29.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
