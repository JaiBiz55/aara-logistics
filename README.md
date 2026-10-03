# AARA Logistics — Next.js 3D Website

## Structure
The homepage is intentionally light on copy and led by visuals. Each service listed on the homepage links to a dedicated page.

Service routes include:
- /services/supply-chain-solutions
- /services/warehouse-equipment-rental
- /services/transportation-ftl
- /services/first-mile
- /services/middle-mile
- /services/last-mile
- /services/quick-commerce
- /services/dark-store-solutions
- /services/delivery-solutions
- /services/ecom-solution

## Visual system
- Gold: #FFD700
- Primary Blue: #003D7A
- Dark Navy: #001540
- Homepage hero: 3-truck 3D road scene, no shipping containers
- Warehouse: racking / storage / human-machine visual
- Smooth scrolling and GSAP scroll reveals
- Uploaded AARA logistics video is included in public/media

## Security baseline
- Security headers in next.config.ts
- poweredByHeader disabled
- Contact endpoint validates lengths and email format
- Basic rate limiting on the contact endpoint
- Honeypot field to reduce automated spam
- No raw HTML injection from form fields

Connect app/api/contact/route.ts to your transactional email or CRM provider before production use.

## Start
npm install
npm run dev
