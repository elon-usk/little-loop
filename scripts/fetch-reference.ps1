$ErrorActionPreference = 'Continue'
$base = "https://theartcenter.nyc"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path | Split-Path -Parent
$ref = Join-Path $root 'reference'
$refCss = Join-Path $ref 'assets/css'
$refImg = Join-Path $ref 'assets/img'
New-Item -ItemType Directory -Path $refCss -Force | Out-Null
New-Item -ItemType Directory -Path $refImg -Force | Out-Null

Write-Host "Fetching homepage..." -ForegroundColor Cyan
$resp = Invoke-WebRequest -Uri $base -UseBasicParsing
Set-Content -Path (Join-Path $ref 'home.html') -Encoding UTF8 -Value $resp.Content

Write-Host "Fetching stylesheets..." -ForegroundColor Cyan
$cssHrefs = [System.Text.RegularExpressions.Regex]::Matches($resp.Content, 'href\s*=\s*"([^"]+\.css[^"]*)"', 'IgnoreCase') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
foreach($href in $cssHrefs){
  try{
    $url = $href
    if($url.StartsWith("//")){ $url = "https:" + $url }
    if($url.StartsWith("/")){ $url = $base + $url }
    $uri = [Uri]$url
    $name = ($uri.Segments[-1]).TrimEnd('/')
    if([string]::IsNullOrWhiteSpace($name)){ $name = "style.css" }
    $name = $name -replace "[\?\:&=]","_"
    $outFile = Join-Path $refCss $name
    Invoke-WebRequest -Uri $uri.AbsoluteUri -UseBasicParsing -OutFile $outFile | Out-Null
    Write-Host "Saved CSS: $name"
  } catch { Write-Warning "CSS failed: $href" }
}

Write-Host "Fetching up to 30 images from homepage..." -ForegroundColor Cyan
$imgSrcs = [System.Text.RegularExpressions.Regex]::Matches($resp.Content, 'src\s*=\s*"([^"]+\.(png|jpe?g|webp|gif)[^"]*)"', 'IgnoreCase') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique | Select-Object -First 30
foreach($srcUrl in $imgSrcs){
  try{
    $url = $srcUrl
    if($url.StartsWith("//")){ $url = "https:" + $url }
    if($url.StartsWith("/")){ $url = $base + $url }
    $uri = [Uri]$url
    $name = ($uri.Segments[-1]).TrimEnd('/')
    if([string]::IsNullOrWhiteSpace($name)){ $name = "image" + [guid]::NewGuid().ToString().Substring(0,8) + ".img" }
    $name = $name -replace "[\?\:&=]","_"
    $outFile = Join-Path $refImg $name
    Invoke-WebRequest -Uri $uri.AbsoluteUri -UseBasicParsing -OutFile $outFile | Out-Null
    Write-Host "Saved IMG: $name"
  } catch { Write-Warning "IMG failed: $srcUrl" }
}

Write-Host "Done. See reference/ for files." -ForegroundColor Green

