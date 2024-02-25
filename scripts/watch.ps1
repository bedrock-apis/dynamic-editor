# Start the first process
$proc1 = Start-Process -FilePath "npx" -ArgumentList "tsc -w" -PassThru -NoNewWindow 

# Start the second process
#$proc2 = Start-Process -FilePath "regolith" -ArgumentList "watch" -PassThru -NoNewWindow

Set-Location ./configs
Write-Output "Jobs Started "
$i = 5;
# Wait for a key press in a loop
do {
    Start-Sleep -Seconds 3
    regolith run
    $i--
    if ($i -eq 0) {
        $i = 60
        echo "Press any key to stop..."
    }
} until ($Host.UI.RawUI.KeyAvailable)

# Stop the processes
Stop-Process -InputObject $proc1 -Force
#Stop-Process -InputObject $proc2 -Force

Write-Output "Jobs Stopped "
