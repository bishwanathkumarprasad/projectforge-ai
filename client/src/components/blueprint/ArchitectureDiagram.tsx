import React, { useState } from 'react';
import { ProjectIdea, ArchitectureNode } from '../../types';
import {
  Workflow,
  Laptop,
  Server,
  Database,
  Bot,
  Globe,
  Info,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const ArchitectureDiagram: React.FC<{ project: ProjectIdea }> = ({ project }) => {
  const { architecture } = project;
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(
    architecture.nodes[0] || null
  );

  const getNodeIcon = (category: string) => {
    switch (category) {
      case 'client':
        return Laptop;
      case 'gateway':
        return Globe;
      case 'app':
        return Server;
      case 'ai':
        return Bot;
      case 'database':
      case 'cache':
        return Database;
      default:
        return Layers;
    }
  };

  const getNodeBadgeColor = (category: string) => {
    switch (category) {
      case 'client':
        return 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300';
      case 'gateway':
        return 'border-forge-500/40 bg-forge-950/40 text-forge-300';
      case 'app':
        return 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300';
      case 'ai':
        return 'border-brand-violet/40 bg-purple-950/40 text-purple-300';
      case 'database':
      case 'cache':
        return 'border-amber-500/40 bg-amber-950/40 text-amber-300';
      default:
        return 'border-slate-700 bg-slate-900 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Pattern Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-forge-400">
            System Design Pattern
          </span>
          <h4 className="text-base font-extrabold text-white mt-0.5">
            {architecture.pattern}
          </h4>
        </div>
        <div className="text-xs text-slate-400 max-w-md">
          {architecture.summary}
        </div>
      </div>

      {/* Visual SVG & Node Layout Canvas */}
      <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38a8f8 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-forge-400" />
              <span>Interactive Data Flow Topology (Click node to inspect)</span>
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Accessible SVG / HTML Spec
            </span>
          </div>

          {/* Node Grid Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {architecture.nodes.map((node, idx) => {
              const Icon = getNodeIcon(node.category);
              const isSelected = selectedNode?.id === node.id;
              const badgeClass = getNodeBadgeColor(node.category);

              return (
                <div key={node.id} className="relative">
                  <button
                    onClick={() => setSelectedNode(node)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      isSelected
                        ? `${badgeClass} ring-2 ring-forge-400 shadow-glow`
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                        <Icon className="w-4 h-4 text-forge-400" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        Node {idx + 1}
                      </span>
                    </div>

                    <h5 className="text-sm font-extrabold text-white leading-tight">
                      {node.label}
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 truncate">
                      {node.role}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Tech:</span>
                      <span className="font-semibold text-slate-200">{node.technology}</span>
                    </div>
                  </button>

                  {/* Flow Arrow indicator */}
                  {idx < architecture.nodes.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Protocol Edge Data Flows */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Data Flow Protocols & Communication Links
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {architecture.edges.map((edge, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-semibold text-white block">{edge.label}</span>
                    <span className="text-[11px] text-slate-400">{edge.from} → {edge.to}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono font-bold text-forge-400 border border-slate-700">
                    {edge.protocol}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forge-400">
            <Info className="w-4 h-4" />
            <span>Node Inspector: {selectedNode.label}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-bold block">
                Primary Responsibility
              </span>
              <p className="text-sm font-semibold text-white">{selectedNode.role}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-bold block">
                Implementation Technology
              </span>
              <p className="text-sm font-semibold text-white">{selectedNode.technology}</p>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 uppercase font-bold block">
                Architectural Tier
              </span>
              <p className="text-sm font-semibold text-white capitalize">{selectedNode.category} Tier</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
