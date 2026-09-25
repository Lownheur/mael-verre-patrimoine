$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) {
    & $nodeCommand.Source node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5175 --strictPort
} else {
    $runtimeNode = Join-Path $env:USERPROFILE '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe'
    if (-not (Test-Path -LiteralPath $runtimeNode)) { throw 'Node.js est requis. Installez Node.js puis relancez ce script.' }
    & $runtimeNode node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5175 --strictPort
}
