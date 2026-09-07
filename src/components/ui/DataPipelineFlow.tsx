'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Cpu,
  Layers,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export interface PipelineStage {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  tech: string[];
  metrics: { label: string; value: string }[];
  description: string;
  codeSnippet: string;
}

const STAGES: PipelineStage[] = [
  {
    id: 'ingestion',
    name: '1. Ingestion & Raw Sources',
    subtitle: 'Extracting data from multi-channel APIs & POS databases',
    icon: Database,
    tech: ['Python', 'REST API', 'Webhooks', 'POS Sync', 'Google Analytics 4'],
    metrics: [
      { label: 'Ingestion Volume', value: '500K+ events/day' },
      { label: 'Latency', value: '< 5 min sync' },
      { label: 'Data Sources', value: '12+ APIs' },
    ],
    description:
      'Tự động hóa quá trình trích xuất dữ liệu từ các hệ thống POS, CRM, Google Ads, Facebook Ads và Web Analytics. Đảm bảo dữ liệu thô được ghi nhận liên tục mà không làm ảnh hưởng đến hệ thống vận hành ban đầu.',
    codeSnippet: `# Ingestion Service Example (Python / REST)
import requests, json
def extract_pos_transactions(api_url, auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    response = requests.get(f"{api_url}/v1/sales/today", headers=headers)
    raw_records = response.json().get("data", [])
    return validate_raw_schema(raw_records)`,
  },
  {
    id: 'etl',
    name: '2. Pipeline & Transformation',
    subtitle: 'Cleaning, normalizing & validating structured data',
    icon: Cpu,
    tech: ['Python (Pandas/Polars)', 'DuckDB', 'SQL Transmutation', 'Great Expectations'],
    metrics: [
      { label: 'ETL Processing Time', value: 'Tối ưu 40%' },
      { label: 'Validation Rate', value: '99.98% clean' },
      { label: 'Transform Rules', value: '45+ SQL models' },
    ],
    description:
      'Chuẩn hóa cấu trúc dữ liệu, khử trùng lặp (deduplication), xử lý null values và tính toán các chỉ số phái sinh (derived metrics) thông qua DuckDB & Python scripts tốc độ cao.',
    codeSnippet: `-- DuckDB ETL Aggregation Model
CREATE TABLE mart_daily_kpi AS
SELECT 
    DATE_TRUNC('day', order_timestamp) AS order_date,
    market_region,
    COUNT(DISTINCT customer_id) AS active_buyers,
    SUM(net_revenue_vnd) AS total_revenue,
    AVG(checkout_duration_sec) AS avg_checkout_sec
FROM raw_orders_stg
WHERE is_cancelled = FALSE
GROUP BY 1, 2;`,
  },
  {
    id: 'warehouse',
    name: '3. Data Warehouse & Marts',
    subtitle: 'Structuring star-schema data marts for high-speed queries',
    icon: Layers,
    tech: ['PostgreSQL', 'DuckDB Analytics', 'Star Schema', 'dbt-style Models'],
    metrics: [
      { label: 'Query Latency', value: '< 250ms avg' },
      { label: 'Data Quality SLA', value: '100% uptime' },
      { label: 'Mart Schemas', value: 'Sales, Marketing, HR' },
    ],
    description:
      'Tổ chức cơ sở dữ liệu phân tích theo mô hình Star-Schema (Fact & Dimension tables). Tối ưu index và partitioned tables giúp truy vấn báo cáo đạt hiệu năng nhanh gấp 5 lần so với DB thô.',
    codeSnippet: `-- Star Schema Fact Table Structure
SELECT 
    f.sale_id,
    d_cust.customer_tier,
    d_prod.category_name,
    f.gross_margin_vnd,
    f.churn_risk_score
FROM fact_sales f
JOIN dim_customers d_cust ON f.customer_key = d_cust.customer_key
JOIN dim_products d_prod ON f.product_key = d_prod.product_key;`,
  },
  {
    id: 'bi',
    name: '4. BI & Decision Layer',
    subtitle: 'Automated executive dashboards & real-time business alerts',
    icon: BarChart3,
    tech: ['Metabase', 'SQL Custom Dashboards', 'Slack Automated Alerts', 'Excel Exports'],
    metrics: [
      { label: 'Ad-hoc Time Saved', value: 'Giảm 70% yêu cầu thủ công' },
      { label: 'Executive Users', value: 'C-Level & Line Managers' },
      { label: 'Alert Response', value: 'Real-time via Slack' },
    ],
    description:
      'Xây dựng các dashboard tự động hóa trên Metabase cho C-Level và Trưởng bộ phận. Tích hợp cảnh báo rủi ro sụt giảm doanh số/biến động chỉ số KPI tự động gửi qua Telegram/Slack.',
    codeSnippet: `-- Executive Revenue Alert Trigger logic
WITH today_rev AS (
    SELECT SUM(total_revenue) AS current_val FROM mart_daily_kpi WHERE order_date = CURRENT_DATE
),
avg_rev AS (
    SELECT AVG(total_revenue) AS benchmark FROM mart_daily_kpi WHERE order_date >= CURRENT_DATE - 30
)
SELECT 
    CASE WHEN current_val < benchmark * 0.8 THEN 'ALERT: Revenue dropped >20%'
         ELSE 'OK' END AS status
FROM today_rev, avg_rev;`,
  },
];

export default function DataPipelineFlow() {
  const [activeStageId, setActiveStageId] = useState<string>('etl');

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[1];

  return (
    <div className="w-full space-y-6">
      {/* HEADER TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Data Pipeline Architecture Flow
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-blue-800/50">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Nhấp vào từng công đoạn pipeline bên dưới để xem chi tiết kỹ thuật & tác động công việc
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Data SLA: 99.9% Clean Accuracy</span>
        </div>
      </div>

      {/* PIPELINE INTERACTIVE NODES FLOW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = stage.id === activeStageId;

          return (
            <div key={stage.id} className="relative">
              <motion.button
                onClick={() => setActiveStageId(stage.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full ${
                  isActive
                    ? 'bg-gradient-to-b from-blue-950/80 via-slate-900/90 to-slate-900/90 border-blue-500/60 shadow-lg shadow-blue-950/50'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {/* ACTIVE TOP GLOW BAR */}
                {isActive && (
                  <motion.div
                    layoutId="activePipelineBar"
                    className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-500/20 text-cyan-300 border border-blue-400/40'
                          : 'bg-slate-800/80 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      STAGE 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h4
                      className={`text-sm font-bold transition-colors ${
                        isActive ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {stage.name.split('. ')[1]}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-normal leading-relaxed">
                      {stage.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span
                    className={`font-mono text-[11px] ${
                      isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {isActive ? '● Selected Stage' : 'Click to inspect'}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`}
                  />
                </div>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* DETAILED ACTIVE STAGE DRAWER / INSPECTOR CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-slate-900/90 border border-blue-500/30 p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6"
        >
          {/* HEADER & METRICS ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* DESCRIPTION & TECH STACK */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-blue-950 text-cyan-300 border border-blue-800 text-xs font-mono font-semibold">
                  Stage Details
                </span>
                <h4 className="text-xl font-bold text-white">{activeStage.name}</h4>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {activeStage.description}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Công Nghệ Core & Công Cụ Sử Dụng:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStage.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-700/80 text-cyan-300 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* METRICS CARDS */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {activeStage.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-slate-400 block">{m.label}</span>
                    <span className="text-base font-extrabold text-white bg-gradient-to-r from-blue-300 via-cyan-200 to-white bg-clip-text text-transparent">
                      {m.value}
                    </span>
                  </div>
                  <Clock className="w-4 h-4 text-blue-400/60" />
                </div>
              ))}
            </div>
          </div>

          {/* CODE SNIPPET / TRANSFORMATION PREVIEW */}
          <div className="space-y-2 pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Architecture Code / Logic Model Spec</span>
              </span>
              <span className="text-slate-500">ReadOnly Pipeline Preview</span>
            </div>
            <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 p-4 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto shadow-inner">
              <pre>{activeStage.codeSnippet}</pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
