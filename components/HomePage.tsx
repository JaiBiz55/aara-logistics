import Link from 'next/link';
import Nav from '@/components/Nav';
import ScrollController from '@/components/ScrollController';
import ServiceTour from '@/components/ServiceTour';
import MotionScene from '@/components/MotionScene';
import QuoteForm from '@/components/QuoteForm';
import DeferredVideo from '@/components/DeferredVideo';

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
  ['Cold Chain Solutions','/services/cold-chain-logistics'],
] as const;

const stats = [['500+','Enterprise Clients'],['10M+','Shipments Delivered'],['99.5%','On-Time SLA Target'],['24/7','Live Control Tower Telemetry']];

export default function HomePage() {
  return <>
    <ScrollController />
    <Nav />
    <main id="top" className="homePage">
      <section className="homeHero" id="hero">
        <div className="homeHeroBg"><MotionScene mode="hero" clipSrc="/media/motion/movement-01.mp4" clipStartSeconds={18} clipEndSeconds={59} /></div>
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

      <section className="clientSection"><div className="container"><div className="clientIntro"><div className="sectionKicker light">TRUSTED BY TEAMS THAT MOVE INDIA</div><p>Supporting operations for teams including</p></div><div className="clientNames" aria-label="Selected clients"><span>amazon</span><span>Flipkart</span><span>Decorpot</span><span className="clientEtc">& more</span></div></div></section>

      <section id="services" className="serviceIndexSection sectionLight">
        <div className="container narrow"><div className="sectionKicker">SERVICES & SOLUTIONS</div><h2>One network. <em>Every mile.</em></h2><p className="sectionLead">Follow the movement from first pickup through storage, linehaul and final delivery. Open any service for the full operating detail.</p></div>
        <ServiceTour />
      </section>

      <section className="warehouseTease">
        <div className="warehouseVisual"><MotionScene mode="warehouse" clipSrc="/media/motion/movement-02.mp4" /></div>
        <div className="container warehouseCopy"><div className="sectionKicker">WAREHOUSE SOLUTIONS</div><h2>Storage that <em>moves.</em></h2><p>Smart storage combining multi-tier racking, WMS tracking, and AI-directed pick paths to maximize throughput.</p><Link className="darkBtn" href="/services/warehouse-equipment-rental">View warehouse solutions ↗</Link></div>
      </section>

      <section className="videoBand"><div className="container"><div className="sectionKicker light">AARA IN MOTION</div><div className="videoShell"><DeferredVideo src="/media/aara-logistics.mp4" poster="/media/aara-logistics-poster.jpg" /><div className="videoBadge">ORIGIN (FIRST MILE) → HUB (MIDDLE MILE) → DOOR (LAST MILE)</div></div></div></section>

      <section id="coverage" className="coverageSection sectionLight"><div className="container"><div className="sectionKicker">SERVICE COVERAGE</div><div className="coverageGrid"><div><h2>Built for South India to <em>Across India</em></h2><p>Rooted in Bengaluru and built to connect key markets across India, including Hyderabad, Chennai, Coimbatore, Pune, Kolkata, Mumbai, Delhi, Ahmedabad, Jaipur and Kochi.</p></div><div className="cityCloud">{['Bangalore','Hyderabad','Chennai','Coimbatore','Pune','Kolkata','Mumbai','Delhi','Ahmedabad','Jaipur','Kochi','Pan-India'].map(c=><span key={c}>{c}</span>)}</div></div></div></section>

      <section id="contact" className="contactBand"><div className="container contactGridNew"><div><div className="sectionKicker light">GET IN TOUCH</div><h2>LET'S <em>MOVE.</em></h2><div className="contactList"><a href="mailto:support@aaralogistics.com"><span>Email</span><strong>support@aaralogistics.com</strong></a><a href="tel:+919663377290"><span>Phone</span><strong>+91 9663377290</strong></a><div><span>Address</span><strong>Bommasandra Industrial Area<br/>Bangalore-560099</strong></div><div><span>Business hours</span><strong>Monday - Saturday<br/>9:00 AM - 6:00 PM</strong></div></div></div><QuoteForm services={services.map(([name]) => name)} /></div></section>
    </main>
    <footer className="footer"><div className="container footerNew"><span>© 2026 AARA LOGISTICS AND TECHNOLOGY PVT LTD</span><span>SUPPORT@AARALOGISTICS.COM</span><span>BANGALORE · KARNATAKA · INDIA</span></div></footer>
  </>;
}
