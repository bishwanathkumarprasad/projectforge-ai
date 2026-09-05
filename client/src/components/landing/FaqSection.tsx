import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const faqs = [
    {
      q: 'Will these project ideas be approved by my university project coordinator?',
      a: 'Yes. ProjectForge AI explicitly optimizes for academic rigor, technical depth, and clear real-world problem statements. Every idea includes a standardized 8-phase development roadmap, database schema, and an exportable academic synopsis formatted for faculty review.',
    },
    {
      q: 'Can I build these projects without paying for expensive cloud or GPU servers?',
      a: 'Absolutely. Every blueprint explicitly specifies zero-cost options (such as free tiers on Supabase/Neon, local Docker containers, quantized ONNX edge models, and free-tier Google AI Studio keys) so students never incur out-of-pocket costs.',
    },
    {
      q: 'How does the AI Mentor differ from a general chatbot?',
      a: 'General chatbots give generic textbook definitions. The ProjectForge AI Mentor is strictly grounded in your specific project blueprint: it knows your chosen tech stack, database entities, MVP features, and timeline constraints. Answers are structured with recommendations, strategic reasons, concrete steps, and common student mistakes.',
    },
    {
      q: 'What happens if I do not have a Google Gemini API Key configured?',
      a: 'ProjectForge AI includes an authentic, fully functional Demo Mode with rich, pre-computed capstone blueprints across HealthTech, FinTech, EdTech, Smart Cities, and Computer Vision. Evaluators and students can test all features—including roadmaps, architecture diagrams, and mentor Q&A—completely offline without configuring any keys.',
    },
    {
      q: 'Can I export the project blueprint for my initial synopsis submission?',
      a: 'Yes. Click the "Export Synopsis" button inside any project blueprint to generate a cleanly formatted academic synopsis document complete with Problem Statement, Objectives, Architecture, Tech Stack, and References, ready for print or markdown copy.',
    },
    {
      q: 'Can our team track roadmap tasks collaboratively?',
      a: 'Yes. The interactive Roadmap tab allows you to check off individual tasks across all 8 development phases. Your progress percentage updates in real-time, persists in local storage/database, and triggers celebratory visual feedback upon reaching 100% completion.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 border-t border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-forge-400 bg-forge-500/10 px-3 py-1 rounded-full border border-forge-500/20">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
            Academic & Technical Guidance
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Answers to common questions about capstone preparation, defense, and system capabilities.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/50 border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-forge-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-forge-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
