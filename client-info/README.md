# Client Information & Asset Guide

Welcome! This directory contains configuration templates and guides to prepare your brand information, contact details, payment instructions, policies, and product catalog for the sports store website.

---

## 1. Quick Summary of Files to Fill In

| File | Purpose | Is it Optional? |
| :--- | :--- | :--- |
| [`business-profile.md`](file:///e:/sports-store/client-info/business-profile.md) | Official store name, address, business hours, and description | **Required** |
| [`contact-information.md`](file:///e:/sports-store/client-info/contact-information.md) | WhatsApp order phone number and customer support details | **Required** |
| [`payment-methods.md`](file:///e:/sports-store/client-info/payment-methods.md) | Cash on Delivery availability and payment guidelines | **Required** |
| [`shipping-and-returns.md`](file:///e:/sports-store/client-info/shipping-and-returns.md) | Delivery charges, times, returns, and custom order rules | **Required** |
| [`product-catalog-template.csv`](file:///e:/sports-store/client-info/product-catalog-template.csv) | Master catalog containing products, prices, sizes, and colors | **Required** (replace DEMO items) |
| [`owner-information.md`](file:///e:/sports-store/client-info/owner-information.md) | Owner bio, team profiles, and publication consent | Optional |
| [`social-media.md`](file:///e:/sports-store/client-info/social-media.md) | Links to your official Instagram, Facebook, TikTok, etc. | Optional |
| [`private/payment-details.private.example.md`](file:///e:/sports-store/client-info/private/payment-details.private.example.md) | Private internal bank account handover | Optional & Confidential |

---

## 2. Where to Place Your Media Assets

All media files must be added inside the [`client/public/assets/`](file:///e:/sports-store/client/public/assets) subfolders:

- **Logos & Icons:** Place your vector SVG or transparent PNG logo in `client/public/assets/branding/`.
- **Owner & Team Photos:** Place owner photos in `client/public/assets/owners/` and team member photos in `client/public/assets/team/`.
- **Hero & Promo Banners:** Place banners in `client/public/assets/banners/`.
- **Business Certificates:** Place any quality or export certificates in `client/public/assets/certificates/`.
- **Product Photos:** Place high-quality images in the respective product folders:
  - Cricket equipment: `client/public/assets/products/cricket/`
  - Football & team kits: `client/public/assets/products/football/`
  - Badminton gear: `client/public/assets/products/badminton/`
  - Shoes & footwear: `client/public/assets/products/shoes/`
  - Sportswear & clothing: `client/public/assets/products/clothing/`
  - Accessories (gloves, helmets, bags): `client/public/assets/products/accessories/`
- **3D Models:** Place tested `.glb` or `.gltf` 3D files in `client/public/assets/3d-models/`.

---

## 3. File Naming Rules

To prevent broken links across browsers and operating systems, use clean file names:
- Use **lowercase letters**, numbers, and **hyphens (`-`)** only.
- **Do not use spaces** or special characters (e.g., use `cricket-bat-front.jpg` instead of `Cricket Bat Front (1).JPG`).
- Recommended formats:
  - Logos: `.svg` or `.png` (transparent background)
  - Photography: `.webp` or `.jpg`
  - 3D models: `.glb` (self-contained binary format preferred, kept under 5MB for smooth loading)

---

## 4. Privacy & Security Rules

- **What is Public:** All details in `business-profile.md`, `contact-information.md`, `shipping-and-returns.md`, `social-media.md`, and `payment-methods.md` will be readable on the public website.
- **What is Private:** Bank account numbers, IBANs, or internal accounting information must **not** be stored in public configuration files.
- **Protected Folder:** The `client-info/private/` folder is blocked in `.gitignore` so confidential notes are not pushed to Git.
- **Never Share:** Never write down or transmit passwords, PINs, OTP codes, card CVVs, or online banking credentials.

---

## 5. Important Product & 3D Reality Checks

- **Real Images & 3D Models:** Realistic 3D displays require valid `.glb` or `.gltf` model files. If a 3D model does not exist for an item, leave the `model_3d` column empty in the catalog CSV; the website will cleanly display multi-angle product photos instead.
- **Replace DEMO Data:** The products in `product-catalog-template.csv` are marked with `DEMO-` prefixes as temporary samples. Replace them with your actual products, prices, and stock statuses before launching.

---

## 6. Progress Tracking

Use [`docs/CLIENT_ASSET_CHECKLIST.md`](file:///e:/sports-store/docs/CLIENT_ASSET_CHECKLIST.md) to tick off submitted assets, verify image licenses, and sign off on content approval.
