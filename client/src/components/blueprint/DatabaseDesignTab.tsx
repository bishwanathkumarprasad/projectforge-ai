import React, { useState } from 'react';
import { ProjectIdea, DatabaseEntity } from '../../types';
import { Database, Key, Copy, Check, Table2 } from 'lucide-react';

export const DatabaseDesignTab: React.FC<{ project: ProjectIdea }> = ({ project }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copySqlForEntity = (entity: DatabaseEntity, idx: number) => {
    const fieldsSql = entity.fields
      .map(f => `  ${f.name} ${f.type}${f.constraints ? ' ' + f.constraints : ''}`)
      .join(',\n');
    const sql = `CREATE TABLE ${entity.name.toLowerCase()} (\n${fieldsSql}\n);`;

    navigator.clipboard.writeText(sql);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-base font-extrabold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-forge-400" />
            <span>Recommended Relational Entities & Schemas</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Normalized tables with relational constraints designed for Postgres or SQLite.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.databaseDesign.map((entity, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-cyan-400" />
                <h5 className="text-base font-extrabold text-white font-mono">
                  {entity.name}
                </h5>
              </div>
              <button
                onClick={() => copySqlForEntity(entity, idx)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
                title="Copy CREATE TABLE SQL"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {entity.description}
            </p>

            {/* Fields Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Field</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Constraints</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {entity.fields.map((field, fIdx) => (
                    <tr key={fIdx} className="hover:bg-slate-800/30">
                      <td className="py-2 px-3 font-semibold text-white flex items-center gap-1">
                        {field.constraints?.includes('PRIMARY') && (
                          <Key className="w-3 h-3 text-amber-400 shrink-0" />
                        )}
                        <span>{field.name}</span>
                      </td>
                      <td className="py-2 px-3 text-forge-300">{field.type}</td>
                      <td className="py-2 px-3 text-[11px] text-slate-400">
                        {field.constraints || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
