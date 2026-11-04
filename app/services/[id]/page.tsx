import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  ExternalLink,
} from "lucide-react";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Beyond the Visuals`,
    description: service.shortDescription,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const serviceIndex = servicesData.findIndex((s) => s.id === id);
  if (serviceIndex === -1) notFound();

  const service = servicesData[serviceIndex];
  const nextService = servicesData[(serviceIndex + 1) % servicesData.length];
  const relatedProject = service.relatedProjectId
    ? projectsData.find((p) => p.id === service.relatedProjectId)
    : null;

  return (
    <main className="min-h-screen bg-[#F4F1EA] text-[#0B0B14] selection:bg-[#FF6E10] selection:text-white">
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-50 bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#E5DDD0]/80">
        <div className="max-w-[1400px] mx-auto px-[5vw] h-20 flex items-center justify-between">
          <Link
            href="/#services"
            className="group flex items-center gap-2.5 text-xs font-mono font-medium uppercase tracking-[0.1em] text-[#7A7264] hover:text-[#0B0B14] transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-[#D5CDC0] bg-white flex items-center justify-center group-hover:border-orange-500 group-hover:text-orange-600 transition-colors shadow-sm">
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>All Disciplines</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/work"
              className="text-xs font-mono font-medium uppercase tracking-[0.1em] text-[#7A7264] hover:text-[#0B0B14] transition-colors"
            >
              Work
            </Link>
            <a
              href="https://wa.me/918605081006?text=Hi%20Ayush%20and%20Kishori%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-[#0B0B14] hover:bg-orange-600 text-white text-xs font-medium uppercase tracking-wide transition-colors shadow-sm"
            >
              Request Scope
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-[5vw] border-b border-[#E5DDD0]">
        <div className="max-w-[1400px] mx-auto">
          {/* Breadcrumb & Discipline Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-mono-label font-mono font-medium uppercase tracking-[0.14em] text-orange-600 bg-orange-100/70 border border-orange-200 px-3.5 py-1 rounded-full">
              Discipline {service.number} / 06
            </span>
            <span className="h-px w-10 bg-[#DDD7C8]" />
            <span className="text-mono-label font-mono uppercase tracking-[0.1em] text-[#8C887E]">
              Core Capability
            </span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-[-0.035em] leading-[1.08] text-[#0B0B14] max-w-4xl">
            {service.title}
          </h1>

          <p className="mt-6 text-xl sm:text-2xl text-orange-700 font-normal leading-[1.4] max-w-3xl">
            {service.tagline}
          </p>

          <p className="mt-6 text-base sm:text-lg text-[#554E42] leading-[1.65] max-w-3xl font-normal">
            {service.fullOverview}
          </p>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-[#E5DDD0]/80">
            {service.metrics.map((metric, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-[#E5DDD0] shadow-sm">
                <span className="block text-3xl sm:text-4xl font-mono font-medium text-orange-600 tabular-nums mb-1">
                  {metric.value}
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.1em] text-[#7A7264]">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Strategic Problem & Solution ── */}
      <section className="py-20 md:py-28 px-[5vw] border-b border-[#E5DDD0]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E] block mb-3">
              THE STRATEGIC SHIFT
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-[1.15] text-[#0B0B14]">
              Why standard approaches fail and how we engineer the remedy.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="p-8 rounded-3xl bg-white border border-[#E5DDD0] shadow-sm">
              <div className="flex items-center gap-2.5 text-xs font-mono font-medium uppercase tracking-[0.12em] text-red-600 mb-3">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                The Common Industry Problem
              </div>
              <p className="text-base text-[#554E42] leading-[1.65]">
                {service.problemSolved}
              </p>
            </div>

            {/* Technologies used */}
            <div>
              <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E] block mb-4">
                ENGINEERED WITH
              </span>
              <div className="flex flex-wrap gap-2.5">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-white border border-[#DDD7C8] text-xs font-mono text-[#1a1510] shadow-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scope of Deliverables ── */}
      <section className="py-20 md:py-28 px-[5vw] border-b border-[#E5DDD0]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14">
            <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E] block mb-3">
              WHAT IS INCLUDED
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-[1.15] text-[#0B0B14]">
              Comprehensive Deliverables Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-[#E5DDD0] shadow-sm flex flex-col justify-between hover:border-orange-500/80 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-[#1a1510] leading-[1.4]">
                      {item}
                    </h3>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#F0EBE0] text-[11px] font-mono uppercase tracking-[0.08em] text-[#8C887E]">
                  Module 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4-Step Execution Process ── */}
      <section className="py-20 md:py-28 px-[5vw] border-b border-[#E5DDD0]">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14">
            <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E] block mb-3">
              HOW WE SHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-[1.15] text-[#0B0B14]">
              The 4-Step Execution Blueprint
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step) => (
              <div
                key={step.step}
                className="p-7 rounded-2xl bg-white border border-[#E5DDD0] shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div>
                  <span className="text-3xl font-mono font-medium text-orange-600 tabular-nums block mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-medium text-[#1a1510] mb-2 leading-[1.3]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#554E42] leading-[1.6]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Live Project Showcase (if available) ── */}
      {relatedProject && (
        <section className="py-20 md:py-28 px-[5vw] border-b border-[#E5DDD0]">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E] block mb-3">
                  PROVEN IN PRODUCTION
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] text-[#0B0B14]">
                  See This Capability in Action
                </h2>
              </div>
              <Link
                href="/work"
                className="text-xs font-mono font-medium uppercase tracking-[0.1em] text-orange-600 hover:text-orange-700 flex items-center gap-1.5"
              >
                <span>View all work</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bg-white border border-[#E5DDD0] shadow-sm">
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-[#E5DDD0]">
                <Image
                  src={relatedProject.image}
                  alt={relatedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="px-3.5 py-1.5 rounded-full text-mono-label font-mono font-medium uppercase tracking-[0.1em] bg-[#F5F2EB] text-[#7A7264] border border-[#E8E2D6] inline-block">
                  {relatedProject.client}
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-[-0.025em] text-[#0B0B14]">
                  {relatedProject.title}
                </h3>
                <p className="text-base text-[#554E42] leading-[1.6]">
                  {relatedProject.description}
                </p>

                {relatedProject.liveUrl && (
                  <div className="pt-4">
                    <a
                      href={relatedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B0B14] hover:bg-orange-600 text-white text-xs font-medium uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Section ── */}
      {service.faq.length > 0 && (
        <section className="py-20 md:py-28 px-[5vw] border-b border-[#E5DDD0]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E] block mb-3">
                FREQUENTLY ASKED
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-[-0.03em] leading-[1.15] text-[#0B0B14]">
                Questions about {service.title}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6">
              {service.faq.map((item, i) => (
                <div key={i} className="p-7 rounded-2xl bg-white border border-[#E5DDD0] shadow-sm">
                  <h3 className="text-lg font-medium text-[#0B0B14] mb-3">
                    {item.question}
                  </h3>
                  <p className="text-base text-[#554E42] leading-[1.65]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom Next Capability Navigation & Direct CTA ── */}
      <section className="py-20 md:py-28 px-[5vw] bg-[#ECE6DB]/50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E] block mb-2">
              READY TO COMMENCE?
            </span>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-[#0B0B14]">
              Let&apos;s engineer your {service.title}.
            </h2>
            <p className="mt-3 text-base text-[#6b6050] max-w-xl">
              Direct line to Ayush Mapari &amp; Kishori Charpe. Zero middle management. Fast scoping within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://wa.me/918605081006?text=Hi%20Ayush%20and%20Kishori%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Direct WhatsApp Chat</span>
                <ArrowUpRight size={14} />
              </a>
              <Link
                href="/work"
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#0B0B14] border border-[#DDD7C8] text-xs font-medium uppercase tracking-wider transition-colors shadow-sm"
              >
                Explore All Projects
              </Link>
            </div>
          </div>

          {/* Next Capability Card */}
          <Link
            href={`/services/${nextService.id}`}
            className="group w-full md:w-auto min-w-[320px] p-8 rounded-3xl bg-white border border-[#DDD7C8] shadow-md hover:shadow-xl hover:border-orange-500/80 transition-all text-left"
          >
            <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E] block mb-2">
              NEXT DISCIPLINE →
            </span>
            <h3 className="text-xl font-medium text-[#0B0B14] group-hover:text-orange-600 transition-colors">
              {nextService.title}
            </h3>
            <p className="text-xs font-mono text-[#7A7264] mt-1">
              Discipline {nextService.number} / 06
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
