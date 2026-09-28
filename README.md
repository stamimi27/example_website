# Sagara Living — Securiti JSON Form Extractor Ready

Website ini mempertahankan desain Sagara Living dan mengubah form consent menjadi form HTML standar yang mudah dibaca oleh JSON Form Extractor.

## Field yang diekstrak

- `name`
- `email`
- `consent_email`
- `consent_phone`
- `consent_social_media`
- `source`

Consent checkbox memakai `value="true"` dan `name` yang eksplisit.

## JSON yang dibuat

```json
{
  "subject": {
    "name": "Budi",
    "email": "budi@example.com"
  },
  "consent": {
    "email": true,
    "phone": false,
    "social_media": true
  },
  "source": "sagara-living-website",
  "collected_at": "2026-09-28T00:00:00.000Z"
}
```

## Testing

Saat ini `DEMO_MODE=true`, sehingga tidak ada data yang dikirim ke Securiti. Setelah plugin/extractor sudah dikonfigurasi, JSON dapat dilihat di browser DevTools Console.

Payload terakhir juga tersedia melalui:

```js
window.lastSecuritiConsent
```

atau:

```js
window.SecuritiConsent.getJSON()
```

## Backend

Form menggunakan `action="/api/consent"`. Untuk mengirim JSON ke Securiti, ubah `DEMO_MODE=false` setelah endpoint backend `/api/consent` tersedia.

Jangan menaruh API token/secret Securiti di frontend.
