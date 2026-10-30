# ANK Global - Automated GitHub Pages Deployment Script
Write-Host "==> 1. Exporting Next.js Static Build with BasePath /ank-global..." -ForegroundColor Cyan
$env:NEXT_EXPORT = "true"
$env:NEXT_PUBLIC_BASE_PATH = "/ank-global"
Set-Location "$PSScriptRoot/../frontend"
npm run build

Write-Host "==> 2. Ensuring .nojekyll in out directory..." -ForegroundColor Cyan
New-Item -ItemType File -Path "out/.nojekyll" -Force | Out-Null

Write-Host "==> 3. Deploying out directory to gh-pages branch..." -ForegroundColor Cyan
Set-Location "out"
git init
git config user.name "Majid-kazmi"
git config user.email "kazmimajid92@gmail.com"
git checkout -b gh-pages
git add -A
git commit -m "deploy: update GitHub Pages build $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git remote add origin https://github.com/Majid-kazmi/ank-global.git
git push origin gh-pages --force
Remove-Item ".git" -Recurse -Force -ErrorAction SilentlyContinue

Set-Location "$PSScriptRoot/.."
Write-Host "==> Published successfully to https://majid-kazmi.github.io/ank-global/" -ForegroundColor Green
