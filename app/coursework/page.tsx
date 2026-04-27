import Link from 'next/link'
import SectionHeader from '@/components/sections/SectionHeader'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import TechBadge from '@/components/ui/TechBadge'
import JsonLd from '@/components/seo/JsonLd'
import { breadcrumbSchema } from '@/lib/structured-data'
import { COURSES, coursesBySemester, type Course } from '@/lib/coursework'
import { buildMetadata } from '@/lib/metadata'

export const metadata = buildMetadata({
  title: 'Coursework — BU CS, Math, & Programming Languages',
  description:
    'Course-by-course deep dives from Boston University: Raft consensus in Go, OOP design patterns in Java, OCaml interpreter, SGD optimizer comparison in R, PageRank, Gale-Shapley analysis, mathematical statistics.',
  path: '/coursework',
  keywords: [
    'BU coursework',
    'Boston University',
    'Raft Go',
    'OCaml interpreter',
    'Gale-Shapley',
    'SGD optimization',
    'PageRank',
    'mathematical statistics',
    'distributed systems',
    'design patterns',
  ],
})

const SEMESTERS: Course['semester'][] = ['Spring 2023', 'Fall 2023']

const CourseCard = ({ c }: { c: Course }) => (
  <Link key={c.slug} href={`/coursework/${c.slug}`}>
    <Card glow className="h-full">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest">
          {c.code}
        </span>
        <span className="font-mono text-[10px] text-subtle uppercase tracking-widest">
          {c.semester}
        </span>
      </div>
      <h3 className="text-lg font-bold text-text tracking-tight mb-2">{c.title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-3">{c.summary}</p>
      <div className="flex flex-wrap gap-1.5">
        {c.tech.slice(0, 4).map((t) => (
          <TechBadge key={t} label={t} />
        ))}
      </div>
    </Card>
  </Link>
)

export default function CourseworkHub() {
  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Coursework', path: '/coursework' },
        ])}
      />
      <SectionHeader
        eyebrow="Coursework"
        title="BU CS, Math, & PL — by class."
        italicAccent="Deep dives, not transcripts."
        description="Selected coursework with technical write-ups. Code excerpts illustrate concepts; full assignment solutions are not published."
        asH1
      />

      <div className="space-y-12 mt-8">
        {SEMESTERS.map((sem) => {
          const courses = coursesBySemester(sem)
          if (courses.length === 0) return null
          return (
            <section key={sem}>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-primary mb-4 pb-2 border-b border-border">
                ● {sem} <span className="text-subtle ml-2">{courses.length} classes</span>
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 reveal">
                {courses.map((c) => (
                  <CourseCard key={c.slug} c={c} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <p className="text-muted text-xs mt-12 max-w-2xl">
        <Badge>Note</Badge> Code excerpts are kept short and illustrative. Full homework solutions
        are intentionally not hosted to respect academic-integrity expectations of current and
        future BU students.
      </p>
    </div>
  )
}
