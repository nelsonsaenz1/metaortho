"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import Spotlight from "@/components/ui/motion/Spotlight";
import ShimmerBar from "@/components/ui/motion/ShimmerBar";
import WaitlistCTA from "@/components/waitlist/WaitlistCTA";

const ease = [0.23, 1, 0.32, 1] as const;

const plans = [
  {
    name: "Initial MSK Assessment",
    price: "$149",
    period: "one-time (planned)",
    description:
      "Comprehensive musculoskeletal evaluation. Where your protection plan starts.",
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
    cta: "Join the waitlist",
    featured: true,
  },
  {
    name: "Monthly Monitoring",
    price: "$79",
    period: "/month (planned)",
    description:
      "Ongoing surveillance for as long as you're on GLP-1 therapy.",
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
    cta: "Join the waitlist",
    featured: false,
  },
  {
    name: "Premium Monitoring",
    price: "$149",
    period: "/month (planned)",
    description:
      "Everything in Monthly, plus enhanced access and comprehensive management.",
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
    cta: "Join the waitlist",
    featured: false,
  },
];

const addons = [
  {
    name: "Supplement Bundle",
    price: "$59-$89/mo (planned)",
    tag: "Coming Soon",
    description:
      "Physician-curated supplement kit delivered monthly.",
  },
  {
    name: "Acute Gout Treatment",
    price: "$79.99 (planned)",
    tag: "Coming Soon",
    description: "Same-day diagnosis and prescription for gout flares.",
  },
  {
    name: "Lab/DEXA Order + Review",
    price: "$49-$99 (planned)",
    tag: "Coming Soon",
    description: "Standalone lab or imaging order with physician review.",
  },
  {
    name: "Dietitian Referral",
    price: "$25-$50 (planned)",
    tag: "Coming Soon",
    description: "Referral to an RD specializing in GLP-1 nutrition.",
  },
];

export default function PricingContent() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-[var(--color-bg-cream)] pt-16 pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-[var(--radius-pill)] border border-[var(--color-border)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] animate-breath" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)]">
              Planned pricing · Coming soon
            </span>
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,3.75rem)] font-normal tracking-[-0.035em] leading-[1.05] mb-6">
            Transparent pricing when
            <br />
            we launch.
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            You&apos;re already spending $200–$1,000+/month on GLP-1
            medications. For a fraction of that, ensure the weight loss
            isn&apos;t costing you your bones and muscles.
          </p>
        </div>
      </section>

      {/* Plans */}
      <SectionWrapper bg="primary">
        <div className="grid lg:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              className="h-full"
            >
              <Spotlight
                color={
                  plan.featured
                    ? "rgba(42, 111, 151, 0.6)"
                    : "rgba(42, 111, 151, 0.35)"
                }
                glow={
                  plan.featured
                    ? "rgba(42, 111, 151, 0.12)"
                    : "rgba(42, 111, 151, 0.04)"
                }
                className={`relative h-full rounded-[var(--radius-xl)] p-8 border transition-[transform,box-shadow] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 ${
                  plan.featured
                    ? "border-[var(--color-text-heading)] shadow-[var(--shadow-lg)] bg-[var(--color-bg-cream)]"
                    : "border-[var(--color-border)] bg-white hover:shadow-[var(--shadow-md)]"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-8 z-10">
                    <Badge variant="dark">Most Popular · Coming Soon</Badge>
                  </div>
                )}

                <h3
                  className="text-lg font-semibold text-[var(--color-text-heading)] mb-3 mt-2 tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span
                    className="text-4xl font-bold text-[var(--color-text-heading)] tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-[var(--color-text-tertiary)] text-sm">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mb-7">
                  {plan.description}
                </p>

                <WaitlistCTA
                  variant={plan.featured ? "dark" : "outline"}
                  size="md"
                  source={`pricing-${plan.name.toLowerCase().replace(/\s+/g, "-")}`}
                  eyebrow="Pricing waitlist · Early access"
                  headline={
                    <>
                      Lock in early access
                      <br />
                      to {plan.name.toLowerCase()}.
                    </>
                  }
                  subcopy="Waitlist members get first dibs when we open enrollment and pricing goes live."
                  className="w-full mb-7"
                >
                  {plan.cta}
                </WaitlistCTA>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm"
                    >
                      <svg
                        className="w-4 h-4 text-[var(--color-success)] flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-[var(--color-text-primary)] tracking-[-0.01em]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Add-ons */}
      <SectionWrapper bg="cream">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent-primary)] mb-4">
            Planned add-ons
          </p>
          <h2 className="text-3xl font-normal tracking-[-0.02em] mb-4">
            Add-on services at launch
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Available individually or bundled with your subscription.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {addons.map((addon, i) => (
            <motion.div
              key={addon.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease }}
            >
              <Spotlight className="glass-light h-full rounded-[var(--radius-lg)] p-6 transition-[transform] duration-[var(--dur-hover)] ease-[var(--ease-out)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className="font-semibold text-[var(--color-text-heading)] tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {addon.name}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-warm)] flex-shrink-0 ml-3 bg-[var(--color-bg-warm)] rounded-[var(--radius-sm)] px-2 py-0.5">
                    {addon.tag}
                  </span>
                </div>
                <p
                  className="text-lg font-bold text-[var(--color-accent-primary)] mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {addon.price}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {addon.description}
                </p>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Cost Comparison */}
      <SectionWrapper bg="dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl font-normal tracking-[-0.02em] mb-4"
            style={{ color: "white" }}
          >
            Compare the cost of inaction
          </h2>
          <p className="text-white/70 mb-14">
            MetaOrtho monitoring will cost a fraction of treating the damage
            after it&apos;s done.
          </p>

          <div className="space-y-6 text-left">
            {[
              {
                label: "Hip fracture surgery",
                cost: "$30,000–$65,000",
                pct: 100,
              },
              {
                label: "Osteoporosis treatment (annual)",
                cost: "$8,000–$15,000",
                pct: 55,
              },
              {
                label: "ER visit for gout",
                cost: "$2,000–$5,000",
                pct: 30,
              },
              {
                label: "MetaOrtho annual monitoring (planned)",
                cost: "Coming soon",
                pct: 12,
                highlight: true,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/80">{item.label}</span>
                  <span
                    className={`text-sm font-semibold ${item.highlight ? "text-[var(--color-success)]" : "text-white/80"}`}
                  >
                    {item.cost}
                  </span>
                </div>
                <ShimmerBar
                  percent={item.pct}
                  trackClassName="bg-white/5"
                  fillClassName={
                    item.highlight
                      ? "bg-[var(--color-success)]"
                      : "bg-white/25"
                  }
                  heightClassName="h-3"
                  shimmer={!!item.highlight}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-14">
            <WaitlistCTA
              variant="onDark"
              size="lg"
              source="pricing-bottom"
              eyebrow="Waitlist · Coming soon"
              headline={
                <>
                  Lock in early-access
                  <br />
                  pricing.
                </>
              }
            >
              Join the waitlist
            </WaitlistCTA>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
