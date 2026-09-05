import React, { useState, useEffect, useRef } from 'react';
import { ProjectIdea, MentorStructuredResponse, MentorChatMessage } from '../../types';
import { api } from '../../services/api';
import {
  Bot,
  Send,
  Sparkles,
  Loader2,
  Code,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface MentorTabProps {
  project: ProjectIdea;
}

export const MentorTab: React.FC<MentorTabProps> = ({ project }) => {
  const [messages, setMessages] = useState<MentorChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickChips = [
    'What should my MVP contain for the initial viva?',
    'Which database should I use and why?',
    'Can I finish this project in 3 months?',
    'How should I divide tasks among team members?',
    'What could go wrong during the live demo?',
    'How can I make this project more innovative?',
  ];

  // Load existing conversation history on mount
  useEffect(() => {
    let isMounted = true;
    api.getMentorHistory(project.id).then(res => {
      if (isMounted && res.success && res.history.length > 0) {
        const loaded: MentorChatMessage[] = [];
        for (const item of res.history) {
          loaded.push({
            id: `q_${item.id}`,
            sender: 'user',
            text: item.question,
            timestamp: item.timestamp,
          });
          loaded.push({
            id: `a_${item.id}`,
            sender: 'mentor',
            structuredAnswer: item.answer,
            timestamp: item.timestamp,
          });
        }
        setMessages(loaded);
      }
    }).catch(err => {
      console.warn('Could not fetch mentor history:', err);
    });

    return () => {
      isMounted = false;
    };
  }, [project.id]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleAsk = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || isLoading) return;

    setErrorMsg(null);
    setInputQuestion('');

    const userMsg: MentorChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await api.askMentor(project.id, q);
      const mentorMsg: MentorChatMessage = {
        id: `mentor_${res.messageId || Date.now()}`,
        sender: 'mentor',
        structuredAnswer: res.answer,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, mentorMsg]);
    } catch (err: any) {
      setErrorMsg(err.message || 'AI Mentor failed to respond. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mentor Intro Header */}
      <div className="p-4 rounded-2xl bg-brand-violet/10 border border-brand-violet/25 flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-brand-violet/20 text-brand-violet shrink-0">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-white">
            Grounded Capstone Mentor for &ldquo;{project.title.split(':')[0]}&rdquo;
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            I understand your exact tech stack ({project.recommendedTechnologies.slice(0, 3).map(t => t.name).join(', ')}), architecture pattern ({project.architecture.pattern}), and {project.difficulty} difficulty tier. Ask questions about division of labor, viva defense, or implementation steps.
          </p>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Recommended Guidance Prompts
        </span>
        <div className="flex flex-wrap gap-2">
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(chip)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-brand-violet/40 hover:text-white transition-all text-left"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Thread Container */}
      <div className="min-h-[350px] max-h-[550px] overflow-y-auto space-y-4 pr-1">
        {messages.length === 0 && (
          <div className="text-center py-12 text-slate-500 space-y-2">
            <HelpCircle className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-sm font-medium">No questions asked yet.</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click any chip above or type your question below to receive grounded guidance tailored to your project.
            </p>
          </div>
        )}

        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {msg.sender === 'user' ? (
              <div className="max-w-xl p-3.5 rounded-2xl rounded-tr-none bg-forge-600 text-white text-xs sm:text-sm font-medium shadow-md">
                {msg.text}
              </div>
            ) : msg.structuredAnswer ? (
              <div className="max-w-3xl w-full p-5 rounded-3xl rounded-tl-none bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
                {/* Direct Recommendation */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forge-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Direct Recommendation</span>
                  </div>
                  <p className="text-sm font-bold text-white leading-relaxed">
                    {msg.structuredAnswer.recommendation}
                  </p>
                </div>

                {/* Strategic Reason */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-400 mb-1">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Strategic Rationale</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {msg.structuredAnswer.reason}
                  </p>
                </div>

                {/* Steps */}
                {msg.structuredAnswer.steps && msg.structuredAnswer.steps.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Step-by-Step Implementation Guide</span>
                    </div>
                    <div className="space-y-1.5">
                      {msg.structuredAnswer.steps.map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start gap-2 text-xs text-slate-200"
                        >
                          <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-snug">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example Code Snippet */}
                {msg.structuredAnswer.exampleCode && (
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Code className="w-3.5 h-3.5" />
                      <span>Illustrative Snippet</span>
                    </div>
                    <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                      {msg.structuredAnswer.exampleCode}
                    </pre>
                  </div>
                )}

                {/* Common Mistakes */}
                {msg.structuredAnswer.commonMistakes && msg.structuredAnswer.commonMistakes.length > 0 && (
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-rose-400">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Common Student Mistakes to Avoid</span>
                    </div>
                    <ul className="space-y-1 pl-4 list-disc text-rose-200/90 text-[11px]">
                      {msg.structuredAnswer.commonMistakes.map((mistake, mIdx) => (
                        <li key={mIdx}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-3 rounded-xl bg-slate-900/60 border border-slate-800 max-w-sm">
            <Loader2 className="w-4 h-4 text-forge-400 animate-spin" />
            <span>Consulting system architecture & generating structured guidance...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleAsk(inputQuestion);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={e => setInputQuestion(e.target.value)}
          placeholder={`Ask anything about ${project.title.split(':')[0]}...`}
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-violet placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={isLoading || !inputQuestion.trim()}
          className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            isLoading || !inputQuestion.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-brand-violet hover:bg-purple-600 text-white shadow-glow-violet'
          }`}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          <span className="hidden sm:inline">Ask Mentor</span>
        </button>
      </form>
    </div>
  );
};
