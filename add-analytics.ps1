$analyticsCode = @"
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EG5T75NQHF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-EG5T75NQHF');
    </script>
</head>
"@

$files = Get-ChildItem -Path . -Filter *.html -Recurse
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    if ($content -notmatch "G-EG5T75NQHF") {
        $content = $content -replace "</head>", $analyticsCode
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.FullName)"
    } else {
        Write-Host "Skipped $($file.FullName) - Analytics code already present"
    }
}
