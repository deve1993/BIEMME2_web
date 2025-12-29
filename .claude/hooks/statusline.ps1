# Status Line per Claude Code - Windows PowerShell
# Mostra: directory, git branch, modello, uso contesto, token

param()

$input_json = $input | Out-String

try {
    $data = $input_json | ConvertFrom-Json

    # Estrai dati
    $cwd = $data.workspace.current_dir
    $model = $data.model.display_name
    $version = $data.version
    $context = $data.context_window

    # Costruisci status
    $status = @()

    # Directory (abbreviata)
    $home = $env:USERPROFILE
    $dir_display = $cwd -replace [regex]::Escape($home), "~"
    $status += "📁 $dir_display"

    # Git branch (se presente)
    Push-Location $cwd -ErrorAction SilentlyContinue
    $branch = git symbolic-ref --short HEAD 2>$null
    if ($branch) {
        $git_status = git status --porcelain 2>$null
        if ($git_status) {
            $status += "🔴 $branch ±"
        } else {
            $status += "🟢 $branch ✓"
        }
    }
    Pop-Location

    # Modello
    $status += "🤖 $model"

    # Contesto
    if ($context.current_usage) {
        $current_input = $context.current_usage.input_tokens
        $cache_creation = $context.current_usage.cache_creation_input_tokens
        $cache_read = $context.current_usage.cache_read_input_tokens
        $context_size = $context.context_window_size

        $current_total = $current_input + $cache_creation + $cache_read

        if ($context_size -gt 0) {
            $pct = [math]::Round(($current_total * 100) / $context_size)
            $status += "📊 $pct%"
        }

        # Token totali
        $total_tokens = $current_input + $context.current_usage.output_tokens + $cache_creation
        if ($total_tokens -gt 1000) {
            $k_tokens = [math]::Round($total_tokens / 1000)
            $status += "💬 ${k_tokens}K"
        } else {
            $status += "💬 $total_tokens"
        }
    }

    # Output
    Write-Host ($status -join " | ")

} catch {
    Write-Host "📁 Ready"
}
