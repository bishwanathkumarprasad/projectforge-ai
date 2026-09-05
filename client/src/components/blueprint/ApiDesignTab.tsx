import React, { useState } from 'react';
import { ProjectIdea, ApiEndpoint } from '../../types';
import { Terminal, Copy, Check, Code } from 'lucide-react';

export const ApiDesignTab: React.FC<{ project: ProjectIdea }> = ({ project }) => {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const copyEndpoint = (endpoint: ApiEndpoint) => {
    navigator.clipboard.writeText(`${endpoint.method} ${endpoint.path}`);
    setCopiedPath(endpoint.path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'POST':
        return 'bg-forge-500/20 text-forge-400 border-forge-500/30';
      case 'PUT':
      case 'PATCH':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'DELETE':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-base font-extrabold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>Core REST API Endpoints Specification</span>
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          Essential API surface connecting frontend components to backend microservices.
        </p>
      </div>

      <div className="space-y-4">
        {project.apiDesign.map((endpoint, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 font-mono">
                <span
                  className={`text-xs font-black px-2.5 py-1 rounded-lg border ${getMethodBadge(
                    endpoint.method
                  )}`}
                >
                  {endpoint.method}
                </span>
                <span className="text-sm font-bold text-white tracking-wide">
                  {endpoint.path}
                </span>
              </div>

              <button
                onClick={() => copyEndpoint(endpoint)}
                className="self-start sm:self-auto px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                title="Copy route endpoint"
              >
                {copiedPath === endpoint.path ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Route</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-300">{endpoint.description}</p>

            {/* Request & Response Snippets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              {endpoint.requestBody && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                    Request Body Payload
                  </span>
                  <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap text-[11px]">
                    {endpoint.requestBody}
                  </pre>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 md:col-span-1">
                <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1">
                  Sample JSON Response (200 OK)
                </span>
                <pre className="text-emerald-300/90 overflow-x-auto whitespace-pre-wrap text-[11px]">
                  {endpoint.responseSample}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
