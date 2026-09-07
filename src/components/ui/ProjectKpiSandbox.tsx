'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Percent,
  Sliders,
  Sparkles,
  BarChart2,
} from 'lucide-react';

interface MarketData {
  id: string;
  name: string;
  flag: string;
  regionTag: string;
  metrics: {
    revenue: string;
    revenueChange: string;
    conversion: string;
    conversionChange: string;
    activeUsers: string;
    automationSavedHours: string;
  };
  highlights: string[];
  architectureNotes: string;
}

const MARKET_DATASETS: MarketData[] = [
  {
    id: 'vn',
    name: 'Thị Trường Việt Nam (Core POS & CRM)',
    flag: '🇻🇳',
    regionTag: 'Domestic Market • High Concurrency',
    metrics: {
      revenue: '45.2 Tỷ VNĐ',
      revenueChange: '+28% YoY',
      conversion: '4.85%',
      conversionChange: '+1.2%',
      activeUsers: '120,000+ MAU',
      automationSavedHours: '160 giờ/tháng',
    },
    highlights: [
      'Tích hợp 12+ điểm bán POS thời gian thực',
      'Phân nhóm khách hàng RFM tự động bằng SQL',
      'Dashboard C-Level theo dõi P&L realtime',
    ],
    architectureNotes:
      'Dữ liệu thô từ POS được gom về PostgreSQL staging theo chu kỳ 15 phút. DuckDB xử lý dữ liệu tổng hợp hàng đêm tạo Data Marts cho Metabase.',
  },
  {
    id: 'intl',
    name: 'Thị Trường Quốc Tế (Thailand & Philippines)',
    flag: '🌏',
    regionTag: 'Regional Expansion • Multi-Currency',
    metrics: {
      revenue: '$1.42M USD',
      revenueChange: '+42% YoY',
      conversion: '3.62%',
      conversionChange: '+0.8%',
      activeUsers: '85,000+ MAU',
      automationSavedHours: '210 giờ/tháng',
    },
    highlights: [
      'Tự động quy đổi đa tiền tệ (THB, PHP ➔ USD/VND)',
      'Phân tích hiệu quả chiến dịch Marketing đa kênh',
      'Báo cáo tuân thủ thuế & tài chính liên quốc gia',
    ],
    architectureNotes:
      'API Ingestion kết nối hệ thống kế toán nội địa TH & PH. Pipeline tự động hóa tỷ giá hối đoái và đồng bộ hóa báo cáo hợp nhất về HQ.',
  },
];

export default function ProjectKpiSandbox() {
  const [selectedMarketId, setSelectedMarketId] = useState<string>('vn');
  const [simulationMultiplier, setSimulationMultiplier] = useState<number>(1);

  const activeMarket =
    MARKET_DATASETS.find((m) => m.id === selectedMarketId) || MARKET_DATASETS[0];

  return (
    <div className="w-full rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 backdrop-blur-xl space-y-6 shadow-2xl">
      {/* HEADER WITH MARKET TAB SELECTOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Globe2 className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Interactive Regional Business KPI Sandbox
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Mô phỏng dữ liệu kinh doanh thực tế theo khu vực & tác động của mô hình phân tích
          </p>
        </div>

        {/* MARKET TABS */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 shrink-0">
          {MARKET_DATASETS.map((market) => {
            const isActive = market.id === selectedMarketId;
            return (
              <button
                key={market.id}
                onClick={() => setSelectedMarketId(market.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{market.flag}</span>
                <span>{market.id === 'vn' ? 'Việt Nam' : 'TH & PH Market'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* METRICS GRID */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMarket.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* REVENUE METRIC */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Doanh Thu Hợp Nhất</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              {activeMarket.metrics.revenue}
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{activeMarket.metrics.revenueChange}</span>
            </div>
          </div>

          {/* CONVERSION METRIC */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Tỷ Lệ Chuyển Đổi (CR)</span>
              <Percent className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              {activeMarket.metrics.conversion}
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{activeMarket.metrics.conversionChange}</span>
            </div>
          </div>

          {/* ACTIVE USERS METRIC */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Khách Hàng Hoạt Động</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-extrabold text-white tracking-tight">
              {activeMarket.metrics.activeUsers}
            </div>
            <div className="text-xs font-mono text-slate-400">Monthly Active Users</div>
          </div>

          {/* AUTOMATION SAVINGS METRIC */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 hover:border-blue-500/40 transition-colors">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Tiết Kiệm Vận Hành</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-300 tracking-tight">
              {activeMarket.metrics.automationSavedHours}
            </div>
            <div className="text-xs font-mono text-amber-400/80">Tự động báo cáo SQL/ETL</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* HIGHLIGHTS & ARCHITECTURE FOOTNOTE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-800/80 text-sm">
        <div className="lg:col-span-6 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block font-semibold">
            Tác Động Nổi Bật Tại Thị Trường:
          </span>
          <ul className="space-y-2">
            {activeMarket.highlights.map((hl, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold">
            <BarChart2 className="w-4 h-4" />
            <span>Mô Tả Kiến Trúc Phía Sau Sandbox</span>
          </div>
          <p className="text-xs text-slate-300/90 leading-relaxed">
            {activeMarket.architectureNotes}
          </p>
        </div>
      </div>
    </div>
  );
}
