import '../lib/chartSetup'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend)

const HORIZONS = ['6h', '12h', '24h', '48h', '72h']

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
  callbacks: {
    label: ctx => ` ${ctx.dataset.label}: ${Number(ctx.parsed.y).toFixed(4)}`,
  },
}

const scaleOpts = (min, max) => ({
  x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6e6e73', font: { size: 11 } } },
  y: {
    min, max,
    grid: { color: 'rgba(0,0,0,0.05)' },
    ticks: {
      color: '#6e6e73',
      font: { size: 11 },
      callback: v => v.toFixed(2),
    },
  },
})

function ChartCard({ title, note, children }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm">
      <p className="text-sm font-semibold text-[#1D1D1F] mb-1">{title}</p>
      {note && <p className="text-xs text-[#6e6e73] mb-5">{note}</p>}
      {children}
    </div>
  )
}

export default function VapCharts() {
  const proposedLineData = {
    labels: HORIZONS,
    datasets: [
      {
        label: 'AUROC',
        data: [0.9800, 0.9817, 0.9919, 0.9908, 0.9865],
        borderColor: '#0071E3',
        backgroundColor: 'rgba(0,113,227,0.08)',
        pointBackgroundColor: '#0071E3',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: true,
      },
      {
        label: 'AUPRC',
        data: [0.8136, 0.8565, 0.9325, 0.9352, 0.9210],
        borderColor: '#34C759',
        backgroundColor: 'rgba(52,199,89,0.06)',
        pointBackgroundColor: '#34C759',
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.35,
        fill: true,
      },
    ],
  }

  const sensitivityBarData = {
    labels: HORIZONS,
    datasets: [
      {
        label: 'Sensitivity',
        data: [0.7895, 0.8106, 0.8872, 0.8746, 0.8634],
        backgroundColor: 'rgba(0,113,227,0.7)',
        borderRadius: 5,
        borderSkipped: false,
      },
      {
        label: 'AUPRC',
        data: [0.8136, 0.8565, 0.9325, 0.9352, 0.9210],
        backgroundColor: 'rgba(255,149,0,0.75)',
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  }

  const aurocCompareData = {
    labels: HORIZONS,
    datasets: [
      {
        label: 'LSTM (Ours)',
        data: [0.9800, 0.9817, 0.9919, 0.9908, 0.9865],
        borderColor: '#FF3B30',
        pointBackgroundColor: '#FF3B30',
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: 'Random Forest',
        data: [0.875, 0.892, 0.884, 0.866, 0.844],
        borderColor: '#0071E3',
        borderDash: [5, 3],
        pointBackgroundColor: '#0071E3',
        pointStyle: 'rect',
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: 'SVM (RBF)',
        data: [0.793, 0.843, 0.823, 0.814, 0.803],
        borderColor: '#FF9500',
        borderDash: [4, 4],
        pointBackgroundColor: '#FF9500',
        pointStyle: 'triangle',
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: 'Logistic Reg.',
        data: [0.660, 0.668, 0.658, 0.637, 0.639],
        borderColor: '#8E8E93',
        borderDash: [2, 3],
        pointBackgroundColor: '#8E8E93',
        pointStyle: 'rectRot',
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  }

  const auprcCompareData = {
    labels: HORIZONS,
    datasets: [
      {
        label: 'LSTM (Ours)',
        data: [0.8136, 0.8565, 0.9325, 0.9352, 0.9210],
        borderColor: '#FF3B30',
        pointBackgroundColor: '#FF3B30',
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: 'Random Forest',
        data: [0.030, 0.055, 0.155, 0.240, 0.360],
        borderColor: '#0071E3',
        borderDash: [5, 3],
        pointBackgroundColor: '#0071E3',
        pointStyle: 'rect',
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: 'SVM (RBF)',
        data: [0.020, 0.050, 0.160, 0.205, 0.230],
        borderColor: '#FF9500',
        borderDash: [4, 4],
        pointBackgroundColor: '#FF9500',
        pointStyle: 'triangle',
        pointRadius: 4,
        tension: 0.3,
      },
      {
        label: 'Logistic Reg.',
        data: [0.010, 0.020, 0.040, 0.090, 0.155],
        borderColor: '#8E8E93',
        borderDash: [2, 3],
        pointBackgroundColor: '#8E8E93',
        pointStyle: 'rectRot',
        pointRadius: 4,
        tension: 0.3,
      },
    ],
  }

  return (
    <div className="space-y-4">
      <ChartCard
        title="AUROC & AUPRC — 各預警時間窗口"
        note="提議模型（4 特徵）於 Stay-level 5-fold CV 的整體效能"
      >
        <Line
          data={proposedLineData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            plugins: { legend: legendOpts, tooltip: tooltipOpts },
            scales: scaleOpts(0.75, 1.02),
          }}
        />
      </ChartCard>

      <ChartCard
        title="Sensitivity & AUPRC — 提議模型"
        note="敏感度（召回率）與 Precision-Recall AUC 的逐窗口比較"
      >
        <Bar
          data={sensitivityBarData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.2,
            plugins: { legend: legendOpts, tooltip: tooltipOpts },
            scales: {
              ...scaleOpts(0.7, 1.0),
              x: { ...scaleOpts(0.7, 1.0).x, barPercentage: 0.7, categoryPercentage: 0.8 },
            },
          }}
        />
      </ChartCard>

      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard title="AUROC 模型比較" note="LSTM vs 傳統機器學習基準線">
          <Line
            data={aurocCompareData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 1.4,
              plugins: { legend: legendOpts, tooltip: tooltipOpts },
              scales: scaleOpts(0.55, 1.02),
            }}
          />
        </ChartCard>

        <ChartCard title="AUPRC 模型比較" note="類別不平衡下 LSTM 的優勢最為顯著">
          <Line
            data={auprcCompareData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 1.4,
              plugins: { legend: legendOpts, tooltip: tooltipOpts },
              scales: scaleOpts(0, 1.02),
            }}
          />
        </ChartCard>
      </div>
    </div>
  )
}
