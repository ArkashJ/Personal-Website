import type { ReactNode } from 'react'

const AsciiDiagram = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-12">
    <h2 className="text-xl font-mono font-bold text-[#30ACA6] mb-4 border-b border-[#2E3656] pb-2">
      {title}
    </h2>
    <pre
      className="
        bg-[#0d1117] text-[#00FFC8] font-mono text-xs leading-relaxed
        overflow-x-auto p-6 rounded-lg border border-[#2E3656]
        whitespace-pre
      "
    >
      {children}
    </pre>
  </section>
)

export default AsciiDiagram
