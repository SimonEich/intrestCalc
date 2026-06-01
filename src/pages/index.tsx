import Head from "next/head";
import { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface YearRow {
  year: number;
  total: number;
  gainThisYear: number;
  totalGain: number;
}

export default function Home() {
  const [year, setYear] = useState("");
  const [interest, setInterest] = useState("");
  const [capital, setCapital] = useState("");
  const [rows, setRows] = useState<YearRow[]>([]);

  function fmt(n: number) {
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  }

  function calculate() {
    const cap = parseFloat(capital);
    const yrs = parseInt(year);
    const rate = parseFloat(interest);
    if (isNaN(cap) || isNaN(yrs) || isNaN(rate)) return;

    const result: YearRow[] = [];
    let prev = cap;
    for (let y = 1; y <= yrs; y++) {
      const total = cap * Math.pow(1 + rate / 100, y);
      result.push({ year: y, total, gainThisYear: total - prev, totalGain: total - cap });
      prev = total;
    }
    setRows(result);
  }

  const finalTotal = rows.at(-1)?.total ?? 0;
  const finalGain = rows.at(-1)?.totalGain ?? 0;

  const chartData = {
    labels: rows.map((r) => `Y${r.year}`),
    datasets: [
      { label: "Initial capital", data: rows.map(() => parseFloat(capital) || 0), backgroundColor: "#B5D4F4", stack: "s" },
      { label: "Gain", data: rows.map((r) => parseFloat(r.totalGain.toFixed(2))), backgroundColor: "#1D9E75", stack: "s" },
    ],
  };

  return (
    <>
      <Head><title>Interest Calculator</title></Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-medium mb-6">Interest Calculator</h1>
        <div className="bg-slate-100 rounded-xl p-6 w-full max-w-3xl">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: "Capital (€)", val: capital, set: setCapital },
              { label: "Years", val: year, set: setYear },
              { label: "Interest (%)", val: interest, set: setInterest },
            ].map(({ label, val, set }) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-sm text-slate-500">{label}</label>
                <input type="number" className="bg-white rounded-lg px-3 py-2 border border-slate-200"
                  value={val} onChange={(e) => set(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && calculate()} />
              </div>
            ))}
          </div>
          <button onClick={calculate} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg">
            Calculate
          </button>

          {rows.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Total amount</p>
                  <p className="text-xl font-medium">€{fmt(finalTotal)}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-1">Total gain</p>
                  <p className="text-xl font-medium text-green-600">+€{fmt(finalGain)}</p>
                </div>
              </div>

              <div className="mt-6" style={{ height: 220 }}>
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { x: { stacked: true }, y: { stacked: true } } }} />
              </div>

              <div className="mt-6 max-h-64 overflow-y-auto rounded-lg border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>{["Year", "Total amount", "Gain this year", "Total gain"].map(h =>
                      <th key={h} className="text-left px-3 py-2 text-slate-500 font-medium">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.year} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-3 py-2">{r.year}</td>
                        <td className="px-3 py-2">€{fmt(r.total)}</td>
                        <td className="px-3 py-2 text-green-600">+€{fmt(r.gainThisYear)}</td>
                        <td className="px-3 py-2 text-green-600">+€{fmt(r.totalGain)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
