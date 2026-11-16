$ErrorActionPreference = 'Stop'
$repositoryPath = Split-Path -Parent $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodeExecutable = if ($nodeCommand) { $nodeCommand.Source } else { $null }

if (-not $nodeExecutable) {
    $runtimePackages = Get-AppxPackage -Name 'OpenAI.CodexPrimaryRuntime*' -ErrorAction SilentlyContinue | Sort-Object Version -Descending
    foreach ($runtimePackage in $runtimePackages) {
        $candidateExecutable = Join-Path $runtimePackage.InstallLocation 'dependencies\node\bin\node.exe'
        if (Test-Path -LiteralPath $candidateExecutable) {
            $nodeExecutable = $candidateExecutable
            break
        }
    }
}

if (-not $nodeExecutable) {
    Write-Host 'Node.js was not found. Install Node.js LTS from https://nodejs.org/ and try again.'
    exit 1
}

Set-Location -LiteralPath $repositoryPath
& $nodeExecutable (Join-Path $PSScriptRoot 'preview.mjs')
exit $LASTEXITCODE
