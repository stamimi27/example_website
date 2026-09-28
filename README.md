# Sagara Living — Consent-ready website

Website static yang bisa di-deploy ke Vercel/Netlify/GitHub Pages. Tema homeware/slow living, dengan form consent yang siap dihubungkan ke backend Securiti.ai.

## Lokal
`python -m http.server 8080`

## Deploy
Upload ke GitHub lalu import repository ke Vercel/Netlify.

## Securiti.ai
Frontend sudah menyiapkan `get consent payload` dan endpoint `/api/consent`. Set `DEMO_MODE=false` setelah backend proxy tersedia.

Endpoint reporting yang diberikan:
`https://app2.securiti.ai/reporting/v1/sources/query?ref=getCmpConsentRecords`

Endpoint ini diperlakukan sebagai endpoint read/reporting. Untuk menyimpan consent, endpoint create/update dari dokumentasi Securiti.ai masih perlu dipetakan.

Jangan menaruh API token/secret Securiti.ai di JavaScript frontend.
