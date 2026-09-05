import React from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterSortBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedDomain: string;
  setSelectedDomain: (d: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (diff: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  domains: string[];
  totalCount: number;
  filteredCount: number;
  onReset: () => void;
}

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDomain,
  setSelectedDomain,
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
  domains,
  totalCount,
  filteredCount,
  onReset,
}) => {
  const isFiltered =
    searchQuery !== '' ||
    selectedDomain !== 'all' ||
    selectedDifficulty !== 'all' ||
    sortBy !== 'relevance';

  return (
    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md mb-8 space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search projects, technologies..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-forge-500 placeholder:text-slate-500"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
          {/* Domain Filter */}
          <select
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-xs focus:outline-none focus:ring-2 focus:ring-forge-500"
          >
            <option value="all">All Domains ({totalCount})</option>
            {domains.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-xs focus:outline-none focus:ring-2 focus:ring-forge-500"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-xs focus:outline-none focus:ring-2 focus:ring-forge-500"
          >
            <option value="relevance">Sort: Recommended Fit</option>
            <option value="innovation">Sort: Innovation Score</option>
            <option value="practicality">Sort: Practicality Score</option>
            <option value="placement">Sort: Placement Relevance</option>
          </select>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              onClick={onReset}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1 text-xs"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Summary Count Line */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
        <span>
          Showing <strong className="text-white">{filteredCount}</strong> of{' '}
          <strong className="text-white">{totalCount}</strong> project blueprints
        </span>
        {isFiltered && (
          <span className="text-forge-400 font-medium">Filters active</span>
        )}
      </div>
    </div>
  );
};
