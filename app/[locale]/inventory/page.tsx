'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ChevronDown,
  MessageCircle,
  ArrowRight,
  MapPin,
  Gauge,
  Calendar,
  Palette,
  SlidersHorizontal,
  ArrowUpDown,
  Search,
  X,
  Loader2,
} from 'lucide-react';
import { allCars } from '@/lib/data/cars';

type SortKey = 'newest' | 'cheapest' | 'expensive' | 'mileage';

const ITEMS_PER_PAGE = 25;
const DB_TOTAL = 10254;

// ── Mock brand counts (simulate global database scale) ─────────────────────────
const MOCK_BRAND_COUNTS: Record<string, number> = {
  'Porsche': 4114,
  'Mercedes-AMG': 1750,
  'Ferrari': 1280,
  'Maserati': 795,
  'Mercedes-Benz': 760,
  'Lamborghini': 570,
  'Bentley': 343,
  'BMW': 213,
};

const MOCK_ORIGIN_COUNTS = { Japan: 7891, Korea: 2363 };
const MOCK_DRIVE_COUNTS  = { RHD: 6420, LHD: 3834 };
const MOCK_STATUS_COUNTS = { Available: 8124, Reserved: 1543, Sold: 587 };

const statusStyles = {
  Available: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Reserved:  'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Sold:      'bg-white/8 text-white/35 border-white/12',
};
const statusDot = {
  Available: 'bg-emerald-400',
  Reserved:  'bg-amber-400',
  Sold:      'bg-white/30',
};

// ── Count-up ──────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 900) {
  const [count, setCount] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;
    const t0 = performance.now();
    const raf = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(start + diff * e));
      if (p < 1) requestAnimationFrame(raf);
      else prev.current = target;
    };
    requestAnimationFrame(raf);
  }, [target, duration]);
  return count;
}

// ── 3D Tilt card ──────────────────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-0.5, 0.5], [4, -4]);
  const ry = useTransform(mx, [-0.5, 0.5], [-4, 4]);
  const sx = useSpring(rx, { stiffness: 300, damping: 30 });
  const sy = useSpring(ry, { stiffness: 300, damping: 30 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Accordion section ─────────────────────────────────────────────────────────
function Accordion({
  title, open, onToggle, count, children,
}: {
  title: string; open: boolean; onToggle: () => void; count?: number; children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-white/80">{title}</span>
          {count !== undefined && count > 0 && (
            <span className="text-[9px] font-heading font-bold bg-japan-red text-white px-1.5 py-0.5 rounded-sm">
              {count}
            </span>
          )}
        </div>
        <ChevronDown
          size={14}
          className={`text-white/30 transition-transform duration-200 ${open ? 'rotate-0' : '-rotate-90'}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Checkbox row ──────────────────────────────────────────────────────────────
function CheckRow({
  label, count, checked, onChange,
}: {
  label: string; count: number; checked: boolean; onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 py-1.5 px-2 cursor-pointer hover:bg-white/[0.04] rounded transition-colors group">
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 border shrink-0 flex items-center justify-center transition-all duration-150 ${
            checked ? 'bg-japan-red border-japan-red' : 'border-white/20 group-hover:border-white/40'
          }`}
        >
          {checked && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className={`text-sm font-body transition-colors ${checked ? 'text-white font-medium' : 'text-white/55'}`}>
          {label}
        </span>
      </div>
      <span className={`text-xs font-body tabular-nums transition-colors shrink-0 ${checked ? 'text-japan-red font-bold' : 'text-white/25'}`}>
        {count.toLocaleString()}
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
    </label>
  );
}

// ── Price range slider ────────────────────────────────────────────────────────
function PriceRange({
  min, max, onChange,
}: {
  min: number; max: number; onChange: (min: number, max: number) => void;
}) {
  const GLOBAL_MIN = 0;
  const GLOBAL_MAX = 1000000;

  const pct = (v: number) => ((v - GLOBAL_MIN) / (GLOBAL_MAX - GLOBAL_MIN)) * 100;

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), max - 10000);
    onChange(v, max);
  };
  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), min + 10000);
    onChange(min, v);
  };

  const fmt = (n: number) =>
    n >= 1000000 ? '∞' : n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;

  return (
    <div className="px-5 pb-5">
      {/* Track */}
      <div className="relative h-1 bg-white/10 rounded-full mb-4">
        <div
          className="absolute h-full bg-japan-red rounded-full"
          style={{ left: `${pct(min)}%`, right: `${100 - pct(max)}%` }}
        />
        <input
          type="range" min={GLOBAL_MIN} max={GLOBAL_MAX} step={5000} value={min}
          onChange={handleMin}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <input
          type="range" min={GLOBAL_MIN} max={GLOBAL_MAX} step={5000} value={max}
          onChange={handleMax}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumbs */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-japan-red border-2 border-white rounded-full -translate-x-1/2 pointer-events-none"
          style={{ left: `${pct(min)}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-japan-red border-2 border-white rounded-full -translate-x-1/2 pointer-events-none"
          style={{ left: `${pct(max)}%` }}
        />
      </div>
      {/* Labels */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/50 font-body tabular-nums">{fmt(min)}</span>
        <span className="text-xs text-white/20 font-heading uppercase tracking-wider">—</span>
        <span className="text-xs text-white/50 font-body tabular-nums">{fmt(max)}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function InventoryPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('inventory');

  // ── Filter state ─────────────────────────────────────────────────────────────
  const [search, setSearch]             = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedDrives, setSelectedDrives]   = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000000);
  const [yearMin, setYearMin]   = useState('');
  const [yearMax, setYearMax]   = useState('');
  const [sort, setSort]         = useState<SortKey>('newest');

  // ── Accordion open state ─────────────────────────────────────────────────────
  const [openBrand, setOpenBrand]     = useState(true);
  const [openModel, setOpenModel]     = useState(false);
  const [openOrigin, setOpenOrigin]   = useState(true);
  const [openDrive, setOpenDrive]     = useState(true);
  const [openStatus, setOpenStatus]   = useState(true);
  const [openPrice, setOpenPrice]     = useState(true);
  const [openYear, setOpenYear]       = useState(false);
  const [openMobile, setOpenMobile]   = useState(false);

  // ── Pagination ───────────────────────────────────────────────────────────────
  const [visibleCount, setVisibleCount]   = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore]     = useState(false);
  const [toast, setToast]                 = useState('');

  // ── Derived model list from selected brands ───────────────────────────────────
  const availableModels = useMemo(() => {
    const src = selectedBrands.length ? allCars.filter(c => selectedBrands.includes(c.brand)) : allCars;
    const set = new Set<string>();
    src.forEach(c => set.add(c.model));
    return Array.from(set).sort();
  }, [selectedBrands]);

  // ── Filtered cars ─────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let cars = [...allCars];

    if (search.trim()) {
      const q = search.toLowerCase();
      cars = cars.filter(c =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        String(c.year).includes(q)
      );
    }
    if (selectedBrands.length)   cars = cars.filter(c => selectedBrands.includes(c.brand));
    if (selectedModels.length)   cars = cars.filter(c => selectedModels.includes(c.model));
    if (selectedOrigins.length)  cars = cars.filter(c => selectedOrigins.includes(c.origin));
    if (selectedDrives.length) {
      cars = cars.filter(c => {
        const drive = c.origin === 'Japan' ? 'RHD' : 'LHD';
        return selectedDrives.includes(drive);
      });
    }
    if (selectedStatuses.length) cars = cars.filter(c => selectedStatuses.includes(c.status));
    if (priceMin > 0)            cars = cars.filter(c => c.price >= priceMin);
    if (priceMax < 1000000)      cars = cars.filter(c => c.price <= priceMax);
    if (yearMin)                 cars = cars.filter(c => c.year >= Number(yearMin));
    if (yearMax)                 cars = cars.filter(c => c.year <= Number(yearMax));

    if (sort === 'cheapest')  cars.sort((a, b) => a.price - b.price);
    else if (sort === 'expensive') cars.sort((a, b) => b.price - a.price);
    else if (sort === 'mileage')   cars.sort((a, b) => a.mileage - b.mileage);
    else cars.sort((a, b) => b.year - a.year);

    return cars;
  }, [search, selectedBrands, selectedModels, selectedOrigins, selectedDrives, selectedStatuses, priceMin, priceMax, yearMin, yearMax, sort]);

  // Reset visible count on filter change
  useEffect(() => { setVisibleCount(ITEMS_PER_PAGE); },
    [search, selectedBrands, selectedModels, selectedOrigins, selectedDrives, selectedStatuses, priceMin, priceMax, yearMin, yearMax, sort]);

  // Clear selected models when brands change
  useEffect(() => { setSelectedModels([]); }, [selectedBrands]);

  const countDisplay = useCountUp(filtered.length);
  const paginated    = filtered.slice(0, visibleCount);

  const hasFilters = !!(search || selectedBrands.length || selectedModels.length ||
    selectedOrigins.length || selectedDrives.length || selectedStatuses.length ||
    priceMin > 0 || priceMax < 1000000 || yearMin || yearMax);

  const activeFilterCount =
    selectedBrands.length + selectedModels.length + selectedOrigins.length +
    selectedDrives.length + selectedStatuses.length +
    (priceMin > 0 || priceMax < 1000000 ? 1 : 0) +
    (yearMin || yearMax ? 1 : 0);

  const reset = () => {
    setSearch('');
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedOrigins([]);
    setSelectedDrives([]);
    setSelectedStatuses([]);
    setPriceMin(0);
    setPriceMax(1000000);
    setYearMin('');
    setYearMax('');
    setSort('newest');
  };

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) =>
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setToast('Loading more vehicles from global auctions…');
    setTimeout(() => {
      setVisibleCount(v => Math.min(v + ITEMS_PER_PAGE, filtered.length));
      setLoadingMore(false);
      setTimeout(() => setToast(''), 2500);
    }, 900);
  };

  // ── Sidebar JSX (shared desktop/mobile) ──────────────────────────────────────
  const sidebarContent = (
    <div className="bg-[#0d0d0d] border border-white/8">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-white">
            {t('filters.title') || 'Filters'}
          </span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 flex items-center justify-center bg-japan-red text-white text-[10px] font-heading font-bold rounded-sm">
              {activeFilterCount}
            </span>
          )}
        </div>
        {hasFilters && (
          <button
            onClick={reset}
            className="text-[11px] text-japan-red hover:text-red-400 font-heading font-bold uppercase tracking-wider transition-colors"
          >
            {t('filters.clearFilters') || 'Clear All'}
          </button>
        )}
      </div>

      {/* ── Make ── */}
      <Accordion
        title="Make"
        open={openBrand}
        onToggle={() => setOpenBrand(v => !v)}
        count={selectedBrands.length}
      >
        <div className="px-3 pb-3 max-h-64 overflow-y-auto space-y-0.5">
          {Object.entries(MOCK_BRAND_COUNTS)
            .sort((a, b) => b[1] - a[1])
            .map(([brand, count]) => (
              <CheckRow
                key={brand}
                label={brand}
                count={count}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggle(selectedBrands, setSelectedBrands, brand)}
              />
            ))}
        </div>
      </Accordion>

      {/* ── Model (shows only when brands selected) ── */}
      {selectedBrands.length > 0 && (
        <Accordion
          title="Model"
          open={openModel}
          onToggle={() => setOpenModel(v => !v)}
          count={selectedModels.length}
        >
          <div className="px-3 pb-3 max-h-56 overflow-y-auto space-y-0.5">
            {availableModels.map(model => {
              const realCount = allCars.filter(c => c.model === model).length;
              return (
                <CheckRow
                  key={model}
                  label={model}
                  count={realCount}
                  checked={selectedModels.includes(model)}
                  onChange={() => toggle(selectedModels, setSelectedModels, model)}
                />
              );
            })}
          </div>
        </Accordion>
      )}

      {/* ── Origin ── */}
      <Accordion
        title="Country"
        open={openOrigin}
        onToggle={() => setOpenOrigin(v => !v)}
        count={selectedOrigins.length}
      >
        <div className="px-3 pb-3 space-y-0.5">
          {(Object.entries(MOCK_ORIGIN_COUNTS) as [string, number][]).map(([origin, count]) => (
            <CheckRow
              key={origin}
              label={`${origin === 'Japan' ? '🇯🇵' : '🇰🇷'} ${origin}`}
              count={count}
              checked={selectedOrigins.includes(origin)}
              onChange={() => toggle(selectedOrigins, setSelectedOrigins, origin)}
            />
          ))}
        </div>
      </Accordion>

      {/* ── Drive / Steering ── */}
      <Accordion
        title="Steering"
        open={openDrive}
        onToggle={() => setOpenDrive(v => !v)}
        count={selectedDrives.length}
      >
        <div className="px-3 pb-3 space-y-0.5">
          {(Object.entries(MOCK_DRIVE_COUNTS) as [string, number][]).map(([drive, count]) => (
            <CheckRow
              key={drive}
              label={drive}
              count={count}
              checked={selectedDrives.includes(drive)}
              onChange={() => toggle(selectedDrives, setSelectedDrives, drive)}
            />
          ))}
        </div>
      </Accordion>

      {/* ── Status ── */}
      <Accordion
        title="Status"
        open={openStatus}
        onToggle={() => setOpenStatus(v => !v)}
        count={selectedStatuses.length}
      >
        <div className="px-3 pb-3 space-y-0.5">
          {(Object.entries(MOCK_STATUS_COUNTS) as [string, number][]).map(([status, count]) => (
            <CheckRow
              key={status}
              label={status}
              count={count}
              checked={selectedStatuses.includes(status)}
              onChange={() => toggle(selectedStatuses, setSelectedStatuses, status)}
            />
          ))}
        </div>
      </Accordion>

      {/* ── Price ── */}
      <Accordion
        title="Price USD"
        open={openPrice}
        onToggle={() => setOpenPrice(v => !v)}
        count={priceMin > 0 || priceMax < 1000000 ? 1 : 0}
      >
        <PriceRange
          min={priceMin}
          max={priceMax}
          onChange={(mn, mx) => { setPriceMin(mn); setPriceMax(mx); }}
        />
      </Accordion>

      {/* ── Year ── */}
      <Accordion
        title="Year"
        open={openYear}
        onToggle={() => setOpenYear(v => !v)}
        count={yearMin || yearMax ? 1 : 0}
      >
        <div className="px-4 pb-4 flex items-center gap-2">
          <input
            type="number" placeholder="1990" value={yearMin}
            onChange={e => setYearMin(e.target.value)}
            className="w-full bg-black/40 border border-white/12 text-white text-sm py-2 px-3 focus:outline-none focus:border-japan-red placeholder:text-white/20"
          />
          <span className="text-white/20 shrink-0">—</span>
          <input
            type="number" placeholder="2024" value={yearMax}
            onChange={e => setYearMax(e.target.value)}
            className="w-full bg-black/40 border border-white/12 text-white text-sm py-2 px-3 focus:outline-none focus:border-japan-red placeholder:text-white/20"
          />
        </div>
      </Accordion>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-obsidian pt-20">

      {/* ── Toast ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0e0e0e] border border-japan-red/40 text-white/80 text-sm font-body px-6 py-3 shadow-xl"
          >
            🔄 {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page header ── */}
      <div className="bg-black border-b border-white/10 py-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-japan-red text-[10px] font-heading font-bold uppercase tracking-[0.4em] mb-2">Stock</div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <h1 className="font-heading font-bold text-3xl md:text-5xl uppercase tracking-tight text-white">
              {t('title')} <span className="text-japan-red">{t('titleAccent')}</span>
            </h1>
            {/* Animated counter */}
            <div className="text-right">
              <div className="flex items-baseline gap-2 justify-end">
                <span className="text-white font-heading font-bold text-3xl tabular-nums">
                  {countDisplay.toLocaleString()}
                </span>
                <span className="text-white/35 text-sm font-heading">vehicles found</span>
              </div>
              <div className="text-white/20 text-[10px] font-heading uppercase tracking-[0.3em] mt-0.5">
                of {DB_TOTAL.toLocaleString()} in database
              </div>
            </div>
          </div>
          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap gap-5">
            {['Updated Daily', '14 Source Countries', 'Secure Global Shipping', 'Auction-Inspected Stock'].map(b => (
              <span key={b} className="flex items-center gap-1.5 text-[11px] text-white/30 font-heading uppercase tracking-[0.2em]">
                <span className="w-1 h-1 rounded-full bg-japan-red" />{b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="sticky top-16 z-30 bg-black/90 backdrop-blur-md border-b border-white/8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none" />
            <input
              type="text"
              placeholder="Search make, model, year…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-xs font-body pl-8 pr-8 py-2.5 focus:outline-none focus:border-japan-red placeholder:text-white/20"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                <X size={12} />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setOpenMobile(v => !v)}
            className="lg:hidden flex items-center gap-2 border border-white/15 text-white/50 text-xs font-heading font-bold uppercase tracking-widest px-3 py-2.5 hover:border-japan-red hover:text-white transition-colors"
          >
            <SlidersHorizontal size={12} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          {/* Active filter chips */}
          <div className="flex flex-wrap gap-1.5">
            {selectedBrands.map(b => (
              <button
                key={b}
                onClick={() => toggle(selectedBrands, setSelectedBrands, b)}
                className="flex items-center gap-1 text-[11px] font-heading bg-japan-red/15 border border-japan-red/30 text-japan-red px-2.5 py-1 hover:bg-japan-red/25 transition-colors"
              >
                {b} <X size={9} />
              </button>
            ))}
            {selectedOrigins.map(o => (
              <button key={o} onClick={() => toggle(selectedOrigins, setSelectedOrigins, o)}
                className="flex items-center gap-1 text-[11px] font-heading bg-blue-500/15 border border-blue-500/30 text-blue-400 px-2.5 py-1 hover:bg-blue-500/25 transition-colors">
                {o} <X size={9} />
              </button>
            ))}
            {selectedDrives.map(d => (
              <button key={d} onClick={() => toggle(selectedDrives, setSelectedDrives, d)}
                className="flex items-center gap-1 text-[11px] font-heading bg-teal-500/15 border border-teal-500/30 text-teal-400 px-2.5 py-1 hover:bg-teal-500/25 transition-colors">
                {d} <X size={9} />
              </button>
            ))}
            {selectedStatuses.map(s => (
              <button key={s} onClick={() => toggle(selectedStatuses, setSelectedStatuses, s)}
                className="flex items-center gap-1 text-[11px] font-heading bg-white/8 border border-white/15 text-white/50 px-2.5 py-1 hover:bg-white/12 transition-colors">
                {s} <X size={9} />
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 ml-auto">
            <ArrowUpDown size={11} className="text-white/20" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="bg-[#0e0e0e] border border-white/10 text-white/55 text-xs font-heading uppercase tracking-widest px-3 py-2.5 focus:outline-none focus:border-japan-red cursor-pointer"
            >
              <option value="newest" className="bg-black">{t('sort.newest')}</option>
              <option value="cheapest" className="bg-black">{t('sort.cheapest')}</option>
              <option value="expensive" className="bg-black">{t('sort.expensive')}</option>
              <option value="mileage" className="bg-black">Lowest Mileage</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">

          {/* ── Desktop sidebar ── */}
          <aside className="hidden lg:block w-[300px] shrink-0 self-start sticky top-[112px]">
            {sidebarContent}
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Mobile sidebar drawer */}
            <AnimatePresence>
              {openMobile && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lg:hidden overflow-hidden mb-5"
                >
                  {sidebarContent}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {filtered.length === 0 ? (
              <div className="text-center py-24 border border-white/8 bg-[#0e0e0e] text-white/40">
                <p className="font-heading text-xl uppercase tracking-wider mb-4">{t('noResults')}</p>
                <p className="text-sm mb-6">{t('clearToSeeAll')}</p>
                <button onClick={reset} className="bg-japan-red text-white font-heading font-bold uppercase tracking-widest px-8 py-3 hover:bg-red-700 transition-colors text-sm">
                  {t('filters.clearFilters')}
                </button>
              </div>
            ) : (
              <>
                {/* Vehicle cards */}
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {paginated.map((car, i) => {
                      const steeringLabel = car.origin === 'Japan' ? 'RHD' : 'LHD';
                      const importLabel   = car.origin === 'Japan' ? 'Japan Import' : 'Korea Import';
                      const waMsg = encodeURIComponent(
                        `Hi, I'm interested in the ${car.year} ${car.brand} ${car.model} — $${car.price.toLocaleString('en-US')}`
                      );

                      return (
                        <motion.div
                          key={car.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.28, delay: Math.min(i * 0.025, 0.2) }}
                        >
                          <TiltCard className="bg-[#0e0e0e] border border-white/8 hover:border-white/20 transition-colors group overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                              {/* Image */}
                              <div className="relative sm:w-[42%] h-52 sm:h-auto min-h-[200px] shrink-0 overflow-hidden bg-black/30">
                                <Image
                                  src={car.images[0]}
                                  alt={`${car.year} ${car.brand} ${car.model}`}
                                  fill
                                  sizes="(max-width: 640px) 100vw, 42vw"
                                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                  style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(230,0,18,0.12) 0%, transparent 70%)' }} />
                                {car.status === 'Sold' && (
                                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                                    <span className="font-heading font-bold text-white/50 text-xl uppercase tracking-[0.3em] border border-white/30 px-5 py-1.5 rotate-[-12deg]">Sold</span>
                                  </div>
                                )}
                                {car.status === 'Reserved' && (
                                  <div className="absolute top-3 left-3 bg-amber-500/90 text-black font-heading font-bold text-[10px] uppercase tracking-widest px-2.5 py-1">
                                    Reserved
                                  </div>
                                )}
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white/45 text-[10px] font-heading px-2 py-0.5 tracking-wider">
                                  {car.images.length} photos
                                </div>
                              </div>

                              {/* Details */}
                              <div className="flex-1 p-5 md:p-6 flex flex-col gap-3">
                                <div className="flex flex-wrap gap-2">
                                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 ${statusStyles[car.status]}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${statusDot[car.status]}`} />
                                    {car.status}
                                  </span>
                                  <span className="inline-flex items-center text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-teal-500/10 text-teal-400/80 border-teal-500/20">
                                    {steeringLabel}
                                  </span>
                                  <span className="inline-flex items-center text-[11px] font-heading font-bold uppercase tracking-wider border px-2.5 py-1 bg-blue-500/10 text-blue-400/80 border-blue-500/20">
                                    {importLabel}
                                  </span>
                                </div>

                                <h2 className="font-heading font-bold text-white text-lg md:text-xl leading-snug group-hover:text-japan-red transition-colors duration-200">
                                  {car.year} {car.brand} {car.model}
                                </h2>

                                <div className="border-t border-white/6" />

                                <div className="flex items-baseline gap-3">
                                  <span className="text-white font-heading font-bold text-2xl tracking-tight">
                                    ${car.price.toLocaleString('en-US')}
                                  </span>
                                  {car.priceJpy && (
                                    <span className="text-white/28 font-body text-sm">
                                      ¥{car.priceJpy.toLocaleString('en-US')}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                                  <span className="flex items-center gap-1.5 text-xs text-white/45 font-body">
                                    <Calendar size={11} className="text-white/25 shrink-0" />{car.year}
                                  </span>
                                  <span className="flex items-center gap-1.5 text-xs text-white/45 font-body">
                                    <Gauge size={11} className="text-white/25 shrink-0" />{car.mileage.toLocaleString('en-US')} km
                                  </span>
                                  <span className="flex items-center gap-1.5 text-xs text-white/45 font-body">
                                    <Palette size={11} className="text-white/25 shrink-0" />{car.color}
                                  </span>
                                  <span className="flex items-center gap-1.5 text-xs text-white/45 font-body">
                                    <MapPin size={11} className="text-white/25 shrink-0" />{car.location}
                                  </span>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-auto pt-1">
                                  <Link
                                    href={`/${locale}/inventory/${car.id}`}
                                    className="inline-flex items-center gap-2 bg-japan-red text-white font-heading font-bold uppercase tracking-widest text-xs px-5 py-2.5 hover:bg-red-700 transition-colors group/btn relative overflow-hidden"
                                  >
                                    <span className="relative z-10">Details</span>
                                    <ArrowRight size={12} className="relative z-10 group-hover/btn:translate-x-0.5 transition-transform" />
                                    <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300" />
                                  </Link>
                                  <a
                                    href={`https://wa.me/971503240800?text=${waMsg}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border border-white/18 text-white/60 font-heading font-bold uppercase tracking-widest text-xs px-5 py-2.5 hover:border-japan-red hover:text-white transition-colors"
                                  >
                                    <MessageCircle size={12} />
                                    Request Import
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="h-px bg-japan-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                          </TiltCard>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Load More */}
                {visibleCount < filtered.length && (
                  <div className="mt-10 flex flex-col items-center gap-3">
                    <div className="text-white/25 text-xs font-body">
                      Showing {paginated.length.toLocaleString()} of {filtered.length.toLocaleString()} vehicles
                    </div>
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="flex items-center gap-3 border border-white/15 text-white/60 font-heading font-bold uppercase tracking-widest text-sm px-10 py-4 hover:border-japan-red hover:text-white transition-colors disabled:opacity-50"
                    >
                      {loadingMore ? (
                        <><Loader2 size={15} className="animate-spin" /> Loading…</>
                      ) : (
                        <>Load More Vehicles <ArrowRight size={14} /></>
                      )}
                    </button>
                    <div className="text-white/15 text-[10px] font-heading uppercase tracking-widest">
                      {(filtered.length - visibleCount).toLocaleString()} more available
                    </div>
                  </div>
                )}

                {visibleCount >= filtered.length && filtered.length > ITEMS_PER_PAGE && (
                  <div className="mt-10 text-center text-white/20 text-xs font-heading uppercase tracking-widest py-4 border-t border-white/6">
                    All {filtered.length.toLocaleString()} vehicles shown
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
