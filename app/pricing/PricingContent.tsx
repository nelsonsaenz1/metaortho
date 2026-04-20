"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const plans = [
  {
    name: "Initial MSK Assessment",
    price: "$149",
    period: "one-time",
    description: "Comprehensive musculoskeletal evaluation. Where your protection plan starts.",
    features: [
      "30-minute video consultation",
      "Full GLP-1 history & risk assessment",
      "Sarcopenia risk screening",
      "Bone density evaluation",
      "Gout risk assessment",
      "Lab orders (DEXA, vitamin D, metabolic panel, uric acid)",
      "Personalized treatment plan from Dr. Saenz",
      "Nutritional & supplement recommendations",
      "Exercise prescription",
    ],
    cta: "Book Assessment",
    href: "/book",
    featured: true,
  },
  {
    name: "Monthly Monitoring",
    price: "$79",
    period: "/month",
    description: "Ongoing surveillance for as long as you're on GLP-1 therapy.",
    features: [
      "Monthly or bi-monthly video check-ins",
      "Lab result tracking & trend analysis",
      "DEXA scan monitoring (every 6-12 months)",
      "Protocol adjustments as weight loss progresses",
      "Exercise program updates",
      "Supplement optimization",
      "Priority scheduling",
      "Secure messaging with care team",
    ],
    cta: "Start Monitoring",
    href: "/book",
    featured: false,
  },
  {
    name: "Premium Monitoring",
    price: "$149",
    period: "/month",
    description: "Everything in Monthly, plus enhanced access and comprehensive management.",
    features: [
      "Everything in Monthly Monitoring",
      "Weekly check-in availability",
      "Expanded lab panels quarterly",
      "Nutritional optimization deep-dive",
      "PT referral coordination",
      "Dietitian referral included",
      "Direct physician access",
      "Same-day urgent consultations",
    ],
    cta: "Go Premium",
    href: "/book",
    featured: false,
  },
];

const addons = [
  { name: "Supplement Bundle", price: "$59-$89/mo", tag: "Coming Soon", description: "Physician-curated supplement kit delivered monthly." },
  { name: "Acute Gout Treatment", price: "$79.99", tag: "Episodic", description: "Same-day diagnosis and prescription for gout flares." },
  { name: "Lab/DEXA Order + Review", price: "$49-$99", tag: "A La Carte", description: "Standalone lab or imaging order with physician review." },
  { name: "Dietitian Referral", price: "$25-$50", tag: "Available Now", description: "Referral to an RD specializing in GLP-1 nutrition." },
];

export default function PricingContent() {
  return (
    <>
      {/* Header */}
      <section className="bg-[var(--color-bg-cream)] pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4 font-[var(--font-body)]">
            Transparent pricing
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-normal tracking-[-0.03em] mb-6">
            Invest in your structural health
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            You&apos;re already spending $200-$1,000+/month on GLP-1 medications. For a fraction of that, ensure the weight loss isn&apos;t costing you your bones and muscles.
          </p>
        </div>
      </section>

      {/* Plans */}
      <SectionWrapper bg="primary">
        <div className="grid lg:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[var(--radius-xl)] p-8 border transition-all duration-300 ${
                plan.featured
                  ? "border-[var(--color-text-heading)] shadow-[var(--shadow-lg)] bg-[var(--color-bg-cream)] relative"
                  : "border-[var(--color-border)] bg-white hover:shadow-[var(--shadow-md)]"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-8">
                  <Badge variant="dark">Most Popular</Badge>
                </div>
              )}

              <h3 className="text-lg font-semibold text-[var(--color-text-heading)] mb-3 mt-2 font-[var(--font-body)] tracking-[-0.01em]">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-[var(--color-text-heading)] tracking-tight">
                  {plan.price}
                </span>
                <span className="text-[var(--color-text-tertiary)] text-sm">{plan.period}</span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-7">{plan.description}</p>

              <Button
                href={plan.href}
                variant={plan.featured ? "dark" : "outline"}
                className="w-full mb-7"
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <svg className="w-4 h-4 text-[var(--color-success)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[var(--color-text-primary)] tracking-[-0.01em]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Add-ons */}
      <SectionWrapper bg="cream">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-4">Add-on services</h2>
          <p className="text-[var(--color-text-secondary)]">Available individually or bundled with your subscription.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {addons.map((addon) => (
            <div key={addon.name} className="bg-white rounded-[var(--radius-lg)] p-6 border border-[var(--color-border)] hover:shadow-[var(--shadow-md)] transition-all">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-[var(--color-text-heading)] tracking-[-0.01em] font-[var(--font-body)]">{addon.name}</h3>
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-tertiary)] flex-shrink-0 ml-3">{addon.tag}</span>
              </div>
              <p className="text-lg font-bold text-[var(--color-accent-primary)] mb-2 tracking-tight">{addon.price}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{addon.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Cost Comparison */}
      <SectionWrapper bg="dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-4" style={{ color: 'white' }}>Compare the cost of inaction</h2>
          <p className="text-white/70 mb-14">
            MetaOrtho monitoring costs a fraction of treating the damage after it&apos;s done.
          </p>

          <div className="space-y-5 text-left">
            {[
              { label: "Hip fracture surgery", cost: "$30,000–$65,000", width: "100%" },
              { label: "Osteoporosis treatment (annual)", cost: "$8,000–$15,000", width: "55%" },
              { label: "ER visit for gout", cost: "$2,000–$5,000", width: "30%" },
              { label: "MetaOrtho annual monitoring", cost: "$948–$1,788", width: "12%", highlight: true },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.highlight ? "text-[var(--color-success)]" : "text-white/80"}`}>
                    {item.cost}
                  </span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.highlight ? "bg-[var(--color-success)]" : "bg-white/15"
                    }`}
                    style={{ width: item.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
