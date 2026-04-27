import type { Trade } from '@/lib/finance'

const TradeLog = ({ trades }: { trades: Trade[] }) => (
  <div className="overflow-x-auto rounded-lg border border-border">
    <table className="min-w-full divide-y divide-border text-sm">
      <thead className="bg-surface/60 text-primary font-mono uppercase text-xs tracking-wider">
        <tr>
          <th className="px-4 py-3 text-left">Date</th>
          <th className="px-4 py-3 text-left">Instrument</th>
          <th className="px-4 py-3 text-left">Thesis</th>
          <th className="px-4 py-3 text-left">Outcome</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border bg-surface/20">
        {trades.map((t, i) => (
          <tr key={i} className="hover:bg-surface/60 transition-colors">
            <td className="px-4 py-3 text-muted font-mono text-xs whitespace-nowrap">{t.date}</td>
            <td className="px-4 py-3 text-text font-mono">{t.instrument}</td>
            <td className="px-4 py-3 text-muted">{t.thesis}</td>
            <td className="px-4 py-3 text-accent font-mono whitespace-nowrap">{t.outcome}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="px-4 py-3 text-xs text-muted bg-surface/40 border-t border-border">
      Personal accountability journal — not investment advice.
    </p>
  </div>
)

export default TradeLog
