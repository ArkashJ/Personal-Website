# vhs tape — records a /playwright-cli skill demo as a GIF.
# Install: brew install charmbracelet/tap/vhs
# Run:     bun run demo:cli   (or: vhs scripts/cli-demo.tape)

Output docs/screenshots/playwright-cli-demo.gif

Set FontSize 14
Set Width 1200
Set Height 720
Set Padding 20
Set Theme "Tokyo Night"
Set TypingSpeed 30ms

Type "# /playwright-cli — capture arkashj.com/weekly in light + dark"
Enter
Sleep 800ms

Type "bun run capture:weekly"
Sleep 400ms
Enter
Sleep 12s

Type "ls docs/screenshots/weekly-*.png | head"
Enter
Sleep 2s

Type "bun run demo:gif"
Sleep 400ms
Enter
Sleep 6s

Type "open docs/screenshots/weekly-scroll.gif"
Sleep 400ms
Enter
Sleep 2s
