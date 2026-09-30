'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import ScrollController from '@/components/ScrollController';

const MotionScene = dynamic(() => import('@/components/MotionScene'), { ssr: false });

const services = [
  ['Supply Chain Solutions','/services/supply-chain-solutions'],
  ['Warehouse Solutions','/services/warehouse-equipment-rental'],
  ['Transportation FTL','/services/transportation-ftl'],
  ['First Mile','/services/first-mile'],
  ['Middle Mile','/services/middle-mile'],
  ['Last Mile','/services/last-mile'],
  ['Quick Commerce','/services/quick-commerce'],
  ['Dark Store Solutions','/services/dark-store-solutions'],
  ['Delivery Solutions','/services/delivery-solutions'],
  ['Ecom Solution','/services/ecom-solution'],
] as const;

const stats = [['500+','Enterprise Clients'],['10M+','Shipments Delivered'],['99.5%','On-Time SLA Target'],['24/7','Live Control Tower Telemetry']];

export default function HomePage() {
  const [sent, setSent] = useState(false);
  async function submitQuote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ error: 'Unable to submit request.' }));
      window.alert(error.error || 'Unable to submit request.');
      return;
    }

    const payload = await res.json().catch(() => ({ ok: true }));
    setSent(true);
    form.reset();

    if (payload.whatsappUrl) {
      window.open(payload.whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  }

  return <>
    <ScrollController />
    <Nav />
    <main id="top" className="homePage">
      <section className="homeHero" id="hero">
        <div className="homeHeroBg"><MotionScene /></div>
        <div className="homeHeroShade" />
        <div className="container homeHeroInner">
          <div className="heroMini">LIVE NETWORK STATUS <span>·</span> REAL-TIME TRACKING ACROSS PAN-INDIA LANES</div>
          <h1>POWERING <em>CONTINUOUS</em> SUPPLY CHAIN FLOW.</h1>
          <p>End-to-end freight transportation, warehouse fulfillment, and doorstep delivery connected through intelligent network orchestration. Unifying first-mile collection, middle-mile linehaul, and last-mile execution into a single, reliable promise. Total visibility, reduced buffer stock, and guaranteed SLAs across every lane.</p>
          <div className="heroActions"><a className="primaryBtn" href="#contact">Talk to an Expert ↗</a><a className="ghostBtn" href="#services">Explore Services ↘</a></div>
        </div>
        <div className="heroBottomLine"><span>FM</span><span>MM</span><span>LM</span><span>QC</span><span>PAN INDIA</span></div>
      </section>

      <section className="statStrip"><div className="container statStripGrid">{stats.map(([v,l])=><div key={l} data-reveal><strong>{v}</strong><span>{l}</span></div>)}</div></section>

      <section id="services" className="serviceIndexSection sectionLight">
        <div className="container narrow"><div className="sectionKicker">SERVICES & SOLUTIONS</div><h2>One connected view of the <em>movement.</em></h2><p className="sectionLead">Every service opens its own detail page. The home page stays visual and focused.</p></div>
        <div className="serviceRail" aria-label="AARA services">{services.map(([name,href],i)=><Link key={href} href={href}><small>{String(i+1).padStart(2,'0')}</small><span>{name}</span><b>↗</b></Link>)}</div>
      </section>

      <section className="warehouseTease">
        <div className="warehouseVisual"><MotionScene mode="warehouse" clipSrc="/media/motion/movement-02.mp4" clipLabel="MOVEMENT 02" /></div>
        <div className="container warehouseCopy"><div className="sectionKicker">WAREHOUSE SOLUTIONS</div><h2>Storage that <em>moves.</em></h2><p>Smart storage combining multi-tier racking, WMS tracking, and AI-directed pick paths to maximize throughput.</p><Link className="darkBtn" href="/services/warehouse-equipment-rental">View warehouse solutions ↗</Link></div>
      </section>

      <section className="videoBand"><div className="container"><div className="sectionKicker light">AARA IN MOTION</div><div className="videoShell"><video src="/media/aara-logistics.mp4" poster="/media/aara-logistics-poster.jpg" autoPlay muted loop playsInline preload="metadata" /><div className="videoBadge">ORIGIN (FIRST MILE) → HUB (MIDDLE MILE) → DOOR (LAST MILE)</div></div></div></section>

      <section id="coverage" className="coverageSection sectionLight"><div className="container"><div className="sectionKicker">SERVICE COVERAGE</div><div className="coverageGrid"><div><h2>Built for <em>South India.</em></h2><p>Service coverage across key markets including Bangalore, Hyderabad, Chennai, Coimbatore, Pune, Kolkata, Mumbai, Delhi, Ahmedabad, Jaipur, Kochi and Pan-India operations.</p></div><div className="cityCloud">{['Bangalore','Hyderabad','Chennai','Coimbatore','Pune','Kolkata','Mumbai','Delhi','Ahmedabad','Jaipur','Kochi','Pan-India'].map(c=><span key={c}>{c}</span>)}</div></div></div></section>

      <section id="contact" className="contactBand"><div className="container contactGridNew"><div><div className="sectionKicker light">GET IN TOUCH</div><h2>LET'S <em>MOVE.</em></h2><div className="contactList"><a href="mailto:support@aaralogistics.com"><span>Email</span><strong>support@aaralogistics.com</strong></a><a href="tel:+919663377290"><span>Phone</span><strong>+91 9663377290</strong></a><div><span>Address</span><strong>Bangalore 560072<br/>Karnataka, India</strong></div><div><span>Business hours</span><strong>Monday - Saturday<br/>9:00 AM - 6:00 PM</strong></div></div></div><form className="quoteForm" onSubmit={submitQuote}><input name="name" placeholder="Name" required maxLength={80}/><input name="email" type="email" placeholder="Email" required maxLength={120}/><input name="phone" placeholder="Phone" maxLength={30}/><select name="service" defaultValue=""><option value="" disabled>Service</option>{services.map(([n])=><option key={n}>{n}</option>)}</select><textarea name="message" placeholder="Tell us about your movement" maxLength={1200}/><input name="company" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" /><button type="submit">{sent ? 'Request received ✓' : 'Request a quote ↗'}</button></form></div></section>
    </main>
    <footer className="footer"><div className="container footerNew"><span>© 2026 AARA LOGISTICS AND TECHNOLOGY PVT LTD</span><span>SUPPORT@AARALOGISTICS.COM</span><span>BANGALORE · KARNATAKA · INDIA</span></div></footer>
  </>;
}
