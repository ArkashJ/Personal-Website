# vhs tape — records a /playwright-cli skill demo as a GIF.
# Run: bun run demo:cli   (or: vhs scripts/cli-demo.tape)

Output docs/screenshots/playwright-cli-demo.gif

Set FontSize 16
Set Width 1200
Set Height 720
Set Padding 24
Set Theme "TokyoNight"
Set TypingSpeed 40ms
Set Shell "bash"

Type "# playwright-cli skill — drive a browser like a human would"
Sleep 600ms
Enter
Sleep 600ms

Type "playwright-cli --version"
Sleep 300ms
Enter
Sleep 1200ms

Type "playwright-cli -s=demo open https://arkashj.com/weekly/2026-W19 --browser=chrome"
Sleep 300ms
Enter
Sleep 4s

Type "playwright-cli -s=demo resize 1280 800"
Sleep 200ms
Enter
Sleep 1200ms

Type "playwright-cli -s=demo screenshot --filename=demo.png"
Sleep 200ms
Enter
Sleep 2s

Type "playwright-cli -s=demo close"
Sleep 200ms
Enter
Sleep 1200ms

Type "# done — pure CLI, no MCP, no @playwright/test"
Sleep 1500ms
