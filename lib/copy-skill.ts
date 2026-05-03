// Copies a skill's raw markdown to the clipboard.
//
// Why this is more involved than a one-liner: Safari (and increasingly other
// browsers) revoke the user-activation gesture across an `await fetch(...)`,
// so calling `navigator.clipboard.writeText()` after the network round-trip
// throws `NotAllowedError`. Passing a `Promise<Blob>` to `ClipboardItem`
// keeps the gesture alive while the fetch resolves.
export async function copySkillRawToClipboard(slug: string): Promise<void> {
  const url = `/skills/${slug}/raw`

  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    const item = new ClipboardItem({
      'text/plain': fetch(url).then(async (r) => {
        if (!r.ok) throw new Error(`fetch ${url} failed: ${r.status}`)
        return new Blob([await r.text()], { type: 'text/plain' })
      }),
    })
    await navigator.clipboard.write([item])
    return
  }

  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`)
  const text = await res.text()
  await navigator.clipboard.writeText(text)
}
