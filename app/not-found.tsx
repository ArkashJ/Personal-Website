import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="px-6 py-32 max-w-3xl mx-auto text-center">
      <p className="font-mono text-primary text-sm tracking-widest uppercase mb-4">404</p>
      <h1 className="text-4xl font-bold text-text mb-4">Page not found</h1>
      <p className="text-muted mb-8">The link is broken, or the page hasn’t been built yet.</p>
      <div className="flex justify-center gap-3">
        <Button href="/" variant="primary">
          Home
        </Button>
        <Button href="/architecture" variant="ghost">
          Site Map
        </Button>
      </div>
    </div>
  )
}
