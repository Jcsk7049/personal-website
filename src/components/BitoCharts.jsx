import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const legendOpts = {
  position: 'bottom',
  labels: {
    font: { size: 11.5, family: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif' },
    color: '#6e6e73',
    padding: 16,
    usePointStyle: true,
    pointStyleWidth: 8,
  },
}

const tooltipOpts = {
  backgroundColor: 'rgba(29,29,31,0.88)',
  titleFont: { size: 12, family: '-apple-system, BlinkMacSystemFont, sans-serif' },
  bodyFont: { size: 12, family: '-apple-system, BlinkMacSystemFont, sans-serif' },
  padding: 10,
  cornerRadius: 8,
}

function ChartCard({ title, note, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm">
      <p className="text-sm font-semibold text-[#1D1D1F] mb-1">{title}</p>
      {note && <p className="text-xs text-[#6e6e73] mb-5">{note}</p>}
      {children}
    </div>
  )
}

const TOP_FEATURES = [
  { name: 'total_volume',          label: '交易總量',        score: 36910, desc: '所有幣種累計交易金額' },
  { name: 'age',                   label: '帳戶年齡',        score: 30913, desc: '帳戶開立至今的天數' },
  { name: 'swap_twd_volume',       label: '換匯金額 (TWD)',  score: 26079, desc: '台幣兌換 USDT 的總金額' },
  { name: 'min_retention_minutes', label: '最短持幣時間',    score: 23471, desc: '入金到出金的最短間隔（分鐘）' },
  { name: 'tx_per_day',            label: '每日交易頻率',    score: 22056, desc: '平均每天的交易次數' },
  { name: 'total_twd_volume',      label: '台幣交易總量',    score: 20153, desc: '台幣入金 + 出金累計金額' },
  { name: 'avg_twd_amount',        label: '平均台幣交易額',  score: 18317, desc: '每筆台幣交易的平均金額' },
  { name: 'night_tx_ratio',        label: '深夜交易比例',    score: 11530, desc: '22:00–06:00 的交易佔比' },
  { name: 'twd_deposit_ratio',     label: '台幣入金佔比',    score: 10976, desc: '入金次數佔總台幣交易的比例' },
  { name: 'swap_to_twd_ratio',     label: '換回台幣比例',    score:  9810, desc: 'USDT 換回台幣的交易佔比' },
]

export default function BitoCharts() {
  const featureData = {
    labels: TOP_FEATURES.map(f => f.label),
    datasets: [{
      label: '特徵重要性（XGBoost gain）',
      data: TOP_FEATURES.map(f => f.score),
      backgroundColor: TOP_FEATURES.map((_, i) =>
        i < 3 ? 'rgba(255,149,0,0.80)' : 'rgba(0,113,227,0.65)'
      ),
      borderRadius: 5,
      borderSkipped: false,
    }],
  }

  const classData = {
    labels: ['正常帳戶', '人頭帳戶（黑名單）'],
    datasets: [{
      label: '訓練集帳戶數',
      data: [49377, 1640],
      backgroundColor: ['rgba(52,199,89,0.70)', 'rgba(255,59,48,0.70)'],
      borderRadius: 6,
      borderSkipped: false,
    }],
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard
          title="特徵重要性 Top 10"
          note="XGBoost gain 分數（橙色為前三名）"
        >
          <Bar
            data={featureData}
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 0.9,
              plugins: {
                legend: { display: false },
                tooltip: {
                  ...tooltipOpts,
                  callbacks: {
                    label: ctx => ` gain: ${ctx.parsed.x.toLocaleString()}`,
                    afterLabel: ctx => `  ${TOP_FEATURES[ctx.dataIndex].desc}`,
                  },
                },
              },
              scales: {
                x: {
                  grid: { color: 'rgba(0,0,0,0.05)' },
                  ticks: { color: '#6e6e73', font: { size: 10 } },
                },
                y: {
                  grid: { display: false },
                  ticks: { color: '#1D1D1F', font: { size: 11 } },
                },
              },
            }}
          />
        </ChartCard>

        <ChartCard
          title="訓練集類別分佈"
          note="極度不平衡：1,640 人頭帳戶 vs 49,377 正常帳戶（比例約 1:30）"
        >
          <Bar
            data={classData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 1.1,
              plugins: {
                legend: { display: false },
                tooltip: {
                  ...tooltipOpts,
                  callbacks: {
                    label: ctx => ` ${ctx.parsed.y.toLocaleString()} 筆`,
                    afterLabel: ctx => `  佔比：${(ctx.parsed.y / 51017 * 100).toFixed(2)}%`,
                  },
                },
              },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#1D1D1F', font: { size: 12 } } },
                y: {
                  grid: { color: 'rgba(0,0,0,0.05)' },
                  ticks: {
                    color: '#6e6e73',
                    font: { size: 10 },
                    callback: v => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v,
                  },
                },
              },
            }}
          />
        </ChartCard>
      </div>

      <div className="bg-[#f5f5f7] rounded-2xl p-5">
        <p className="text-xs font-semibold text-[#1D1D1F] mb-3">AWS 資料管線流程</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { step: '① 原始資料', label: 'BitoPro API', color: 'bg-[#1D1D1F] text-white' },
            { arrow: true },
            { step: '② 儲存層', label: 'Amazon S3', color: 'bg-[#FF9500]/15 text-[#B36200]' },
            { arrow: true },
            { step: '③ 清洗 / 圖分析', label: 'AWS Glue + Athena', color: 'bg-[#FF9500]/15 text-[#B36200]' },
            { arrow: true },
            { step: '④ 模型訓練', label: 'SageMaker', color: 'bg-[#FF9500]/15 text-[#B36200]' },
            { arrow: true },
            { step: '⑤ 即時推論', label: 'AWS Lambda', color: 'bg-[#FF9500]/15 text-[#B36200]' },
            { arrow: true },
            { step: '⑥ 可解釋 AI', label: 'Bedrock + SHAP', color: 'bg-[#FF9500]/15 text-[#B36200]' },
            { arrow: true },
            { step: '⑦ 審查介面', label: 'Streamlit', color: 'bg-[#0071E3]/10 text-[#0071E3]' },
          ].map((item, i) =>
            item.arrow
              ? <span key={i} className="text-[#c7c7cc] font-light">→</span>
              : (
                <div key={i} className={`px-3 py-2 rounded-xl ${item.color}`}>
                  <p className="text-[10px] opacity-60 mb-0.5">{item.step}</p>
                  <p className="font-semibold">{item.label}</p>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}
