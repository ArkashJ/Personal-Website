// Copy any text endpoint (defaulting to the current path's `/raw` sibling)
// to the clipboard. Mirrors lib/copy-skill.ts; the Safari user-activation
// trick (passing a Promise<Blob> to ClipboardItem) keeps the gesture alive
// across the fetch.
export async function copyRawToClipboard(rawUrl: string): Promise<void> {
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    const item = new ClipboardItem({
      'text/plain': fetch(rawUrl).then(async (r) => {
        if (!r.ok) throw new Error(`fetch ${rawUrl} failed: ${r.status}`)
        return new Blob([await r.text()], { type: 'text/plain' })
      }),
    })
    await navigator.clipboard.write([item])
    return
  }

  const res = await fetch(rawUrl)
  if (!res.ok) throw new Error(`fetch ${rawUrl} failed: ${res.status}`)
  await navigator.clipboard.writeText(await res.text())
}
