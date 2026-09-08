'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArchitectureNode {
  id: string;
  step: string;
  title: string;
  category: string;
  tools: string[];
  specs: { label: string; value: string }[];
  summary: string;
  tradeoffs: string;
}

const NODES_BY_LANG: Record<'vie' | 'eng', ArchitectureNode[]> = {
  vie: [
    {
      id: 'ingestion',
      step: '01',
      title: 'Thu Thập Đa Nguồn (Ingestion)',
      category: 'Tầng Thu Thập',
      tools: ['Python', 'REST APIs', 'POS Webhooks', 'GA4 BigQuery Export'],
      specs: [
        { label: 'Tần suất Ingestion', value: 'Micro-batch 15 phút' },
        { label: 'Nguồn dữ liệu', value: '12+ POS & Ad APIs' },
        { label: 'Kiểm chuẩn Schema', value: 'Pydantic Models' },
      ],
      summary:
        'Thu thập và chuẩn hóa dữ liệu giao dịch từ 12+ điểm bán POS và các kênh quảng cáo số. Xử lý rate limits, cơ chế retry tự động và gom dữ liệu thô vào Staging Layer.',
      tradeoffs:
        'Lựa chọn Micro-batch 15 phút thay vì Real-time Streaming (Kafka) để tối ưu chi phí hạ tầng máy chủ trong khi vẫn đáp ứng 100% nhu cầu theo dõi vận hành trong ngày của Ban Giám đốc.',
    },
    {
      id: 'transformation',
      step: '02',
      title: 'Mô Hình Hóa Dữ Liệu (ETL)',
      category: 'Tầng Chuyển Hóa',
      tools: ['DuckDB', 'Python Polars', 'SQL Pipelines', 'Automated CRON'],
      specs: [
        { label: 'Tốc độ thực thi', value: '< 90s full pipeline' },
        { label: 'Data SLA', value: '99.9% uptime' },
        { label: 'Mô hình duy trì', value: '45+ Data Marts' },
      ],
      summary:
        'Deduplication, chuẩn hóa kiểu dữ liệu, khử nhiễu và chuyển hóa raw tables thành các bảng Fact & Dimension theo mô hình Star Schema phục vụ truy vấn tốc độ cao.',
      tradeoffs:
        'Tích hợp DuckDB làm In-process Analytical Engine giúp giảm 40% thời gian xử lý ETL so với việc phụ thuộc hoàn toàn vào các truy vấn lồng nhau trên PostgreSQL truyền thống.',
    },
    {
      id: 'warehouse',
      step: '03',
      title: 'Kho Dữ Liệu & Data Marts',
      category: 'Tầng Lưu Trữ',
      tools: ['PostgreSQL', 'DuckDB Parquet', 'Star Schema', 'Indexed Views'],
      specs: [
        { label: 'Độ trễ truy vấn', value: '< 200ms p95' },
        { label: 'Tối ưu lưu trữ', value: 'Columnar Parquet' },
        { label: 'Lưu trữ lịch sử', value: '3+ năm dữ liệu' },
      ],
      summary:
        'Tổ chức cấu trúc kho dữ liệu chuyên biệt theo từng miền nghiệp vụ (Doanh thu POS, Chi phí Marketing, Tồn kho, Nhân sự). Tối ưu hóa composite indexes và partition theo thời gian.',
      tradeoffs:
        'Phân tách rạch ròi giữa Database vận hành (OLTP) và Database phân tích (OLAP/Marts) nhằm loại bỏ hoàn toàn tình trạng lock bảng ảnh hưởng đến trải nghiệm thu ngân tại các chi nhánh.',
    },
    {
      id: 'bi',
      step: '04',
      title: 'Báo Cáo & Trợ Lý Điều Hành',
      category: 'Tầng Quyết Định',
      tools: ['Metabase', 'Cảnh báo tự động', 'Telegram Bot', 'Executive P&L'],
      specs: [
        { label: 'Đối tượng sử dụng', value: 'C-Level & Branch Managers' },
        { label: 'Giảm tải Ad-hoc', value: 'Giảm 70% yêu cầu thủ công' },
        { label: 'Độ trễ cảnh báo', value: '< 60s khi có biến động' },
      ],
      summary:
        'Hệ thống bảng điều khiển Metabase tự phục vụ (Self-serve BI) cho các cấp quản lý, đi kèm cơ chế trigger cảnh báo tự động qua Telegram khi doanh thu hoặc tỷ lệ chuyển đổi biến động bất thường.',
      tradeoffs:
        'Thiết kế dashboard tập trung vào Actionable Metrics (các chỉ số gắn liền với hành động cụ thể) thay vì nhồi nhét biểu đồ phức tạp gây nhiễu loạn thông tin cho người ra quyết định.',
    },
  ],
  eng: [
    {
      id: 'ingestion',
      step: '01',
      title: 'Multi-Source Ingestion',
      category: 'Ingestion Layer',
      tools: ['Python', 'REST APIs', 'POS Webhooks', 'GA4 BigQuery Export'],
      specs: [
        { label: 'Ingestion Frequency', value: '15-min micro-batch' },
        { label: 'Connected Sources', value: '12+ POS & Ad APIs' },
        { label: 'Schema Validation', value: 'Pydantic Models' },
      ],
      summary:
        'Extract and normalize transaction data across 12+ multi-branch POS locations and digital ad platforms. Handles rate limits, automated retries, and stages raw payload safely.',
      tradeoffs:
        'Selected 15-minute micro-batching over full streaming (Kafka) to optimize cloud infrastructure costs while fulfilling 100% of executive intra-day monitoring needs.',
    },
    {
      id: 'transformation',
      step: '02',
      title: 'Data Modeling & ETL',
      category: 'Transformation Layer',
      tools: ['DuckDB', 'Python Polars', 'SQL Pipelines', 'Automated CRON'],
      specs: [
        { label: 'Execution Latency', value: '< 90s full pipeline' },
        { label: 'Data SLA', value: '99.9% clean uptime' },
        { label: 'Active Data Marts', value: '45+ Schemas' },
      ],
      summary:
        'Deduplication, data typing, noise reduction, and dimensional modeling converting raw tables into high-performance Fact & Dimension schemas.',
      tradeoffs:
        'Leveraging DuckDB as an in-process analytical engine decreased daily ETL processing time by 40% compared to nested SQL views in transactional PostgreSQL.',
    },
    {
      id: 'warehouse',
      step: '03',
      title: 'Data Warehouse & Marts',
      category: 'Storage Layer',
      tools: ['PostgreSQL', 'DuckDB Parquet', 'Star Schema', 'Indexed Views'],
      specs: [
        { label: 'Query Response', value: '< 200ms p95' },
        { label: 'Storage Engine', value: 'Columnar Parquet' },
        { label: 'Data Retention', value: '3+ Historical Years' },
      ],
      summary:
        'Architecting specialized data marts partitioned by business domain (POS Sales, Ad Spend, Inventory, Retention). Optimized with composite indexes and date-based clustering.',
      tradeoffs:
        'Strict separation between operational (OLTP) and analytical (OLAP/Marts) layers eliminated table locks and zeroed checkout latency for POS frontlines.',
    },
    {
      id: 'bi',
      step: '04',
      title: 'Decision & BI Layer',
      category: 'Analytics & Delivery',
      tools: ['Metabase', 'Automated Alerts', 'Telegram Bot', 'Executive P&L'],
      specs: [
        { label: 'Active Stakeholders', value: 'C-Level & Line Managers' },
        { label: 'Ad-hoc Reduction', value: '70% Manual Time Saved' },
        { label: 'Alert Dispatch', value: '< 60s on Anomaly' },
      ],
      summary:
        'Self-serve Metabase executive BI dashboards coupled with automated Telegram/Slack alert triggers firing whenever revenue or conversion rates deviate beyond variance thresholds.',
      tradeoffs:
        'Prioritized actionable executive metrics over decorative chart complexity to empower rapid operational decision-making.',
    },
  ],
};

export default function ArchitecturalLineage({ lang = 'vie' }: { lang?: 'vie' | 'eng' }) {
  const [activeId, setActiveId] = useState<string>('transformation');
  const nodes = NODES_BY_LANG[lang] || NODES_BY_LANG.vie;
  const activeNode = nodes.find((n) => n.id === activeId) || nodes[1];

  const labels = {
    vie: {
      telemetry: 'Thông Số Vận Hành & SLA',
      description: 'Mô Tả Triển Khai',
      tradeoffs: 'Đánh Đổi Kiến Trúc & Quyết Định Kỹ Thuật (Trade-offs):',
    },
    eng: {
      telemetry: 'System Telemetry & SLA',
      description: 'Implementation Description',
      tradeoffs: 'Architectural Decisions & Trade-offs:',
    },
  }[lang];

  return (
    <div className="w-full space-y-6">
      {/* 4-NODE FLOATING STRIP WITHOUT HARSH BORDERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nodes.map((node) => {
          const isActive = node.id === activeId;
          return (
            <button
              key={node.id}
              onClick={() => setActiveId(node.id)}
              className={`p-5 rounded-xl text-left transition-all duration-300 relative group hover:-translate-y-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#0f1930] shadow-xl shadow-[#020617]/80 text-slate-100'
                  : 'bg-[#0b1222]/75 shadow-lg shadow-[#020617]/60 hover:bg-[#0f1930]/90 hover:shadow-2xl hover:shadow-blue-950/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-blue-400/80 font-medium group-hover:text-blue-300 transition-colors">
                  {node.step} / {node.category}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400" />
                )}
              </div>
              <h4 className="text-sm font-semibold text-slate-100 mb-1">
                {node.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">
                {node.summary}
              </p>
            </button>
          );
        })}
      </div>

      {/* ACTIVE NODE DOSSIER / SPECIFICATIONS - DEEP FLOATING CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${lang}-${activeNode.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl bg-[#0b1222]/85 p-6 md:p-8 space-y-6 shadow-2xl shadow-[#020617] relative overflow-hidden backdrop-blur-xl"
        >
          {/* HEADER ROW */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-blue-400">
                  STAGE {activeNode.step}
                </span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                  {activeNode.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                {activeNode.title}
              </h3>
            </div>

            {/* TECH TOKENS */}
            <div className="flex flex-wrap items-center gap-1.5">
              {activeNode.tools.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-[#060b17] shadow-inner text-xs font-mono text-blue-300 ring-1 ring-blue-900/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* SPECS & NARRATIVE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* SPECS LIST */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-xs font-mono uppercase text-blue-400 tracking-wider block font-medium">
                {labels.telemetry}
              </span>
              <div className="space-y-2">
                {activeNode.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#060b17]/80 shadow-md ring-1 ring-blue-950/50 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-400 font-mono">{s.label}</span>
                    <span className="text-blue-200 font-semibold font-mono">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAILED NARRATIVE & TRADEOFFS */}
            <div className="lg:col-span-8 space-y-4 text-sm text-slate-300 leading-relaxed">
              <div>
                <span className="text-xs font-mono uppercase text-blue-400 tracking-wider block font-medium mb-1">
                  {labels.description}
                </span>
                <p className="text-slate-300 font-normal leading-relaxed">
                  {activeNode.summary}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#060b17]/80 shadow-inner ring-1 ring-blue-900/40">
                <span className="text-xs font-mono uppercase text-blue-300 tracking-wider block font-semibold mb-1">
                  {labels.tradeoffs}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeNode.tradeoffs}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
