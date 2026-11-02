import Link from 'next/link';
import Nav from '@/components/Nav';
import ScrollController from '@/components/ScrollController';
import ServiceTour from '@/components/ServiceTour';
import MotionScene from '@/components/MotionScene';
import QuoteForm from '@/components/QuoteForm';
import DeferredVideo from '@/components/DeferredVideo';
import ServiceTourVideo from '@/components/ServiceTourVideo';
import TeamCarousel from '@/components/TeamCarousel';

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

const differentiators = [
  ['One connected network', 'Coordinate pickup, warehousing, linehaul and delivery through a single operating partner.'],
  ['Visibility at each handoff', 'Keep teams informed with clear shipment milestones from origin through final delivery.'],
  ['Flexible operating plans', 'Shape capacity and workflows around your products, lanes and service requirements.'],
  ['Clear operational ownership', 'Keep responsibilities and handoffs clear across teams so questions, exceptions and next steps reach the right people.'],
];

const processSteps = [
  ['Understand the movement', 'We learn about your products, locations, shipment volumes, timelines and delivery requirements. Together, we clarify priorities, constraints and the details that shape a reliable plan.'],
  ['Plan the operation', 'We define the right combination of transport, storage and fulfillment for your lanes. The plan aligns capacity, pickup schedules, handling needs and delivery windows with your day-to-day operation.'],
  ['Coordinate each handoff', 'Teams align pickups, warehouse activity, hubs and delivery milestones as freight moves through the network. Clear ownership and timely updates help everyone respond when plans or shipment status change.'],
  ['Review and improve', 'We review service performance, delivery milestones and recurring exceptions with your team. These conversations help identify practical adjustments to workflows, capacity and future operating plans.'],
];

const portfolioItems = [
  {
    label: 'WAREHOUSING',
    title: 'Storage and fulfillment',
    body: 'Warehouse operations designed around inventory flow, handling needs and dispatch routines.',
    clip: '/media/services/india-warehouse-forklift.mp4',
    slug: 'warehouse-equipment-rental',
  },
  {
    label: 'FREIGHT',
    title: 'Freight across the network',
    body: 'Planned full-truckload and hub-to-hub movement connecting key business locations.',
    clip: '/media/services/ftl-transport.mp4',
    slug: 'transportation-ftl',
  },
  {
    label: 'DELIVERY',
    title: 'From dispatch to doorstep',
    body: 'Local delivery coordination with a clear handoff at the customer’s door.',
    clip: '/media/services/delivery-doorstep.mp4',
    slug: 'delivery-solutions',
  },
  {
    label: 'QUICK COMMERCE',
    title: 'Fast local fulfillment',
    body: 'Micro-hub picking and nearby delivery for time-sensitive neighborhood orders.',
    clip: '/media/services/quick-commerce-grocery.mp4',
    slug: 'quick-commerce',
  },
];

const faqs = [
  ['Which locations do you serve?', 'AARA supports movement across key Indian markets. Serviceability depends on the origin, destination, shipment profile and requested service. Share your lanes with our team to confirm coverage.'],
  ['Which logistics services can I combine?', 'You can discuss transport, warehouse solutions, first- and last-mile delivery, e-commerce fulfillment and other services together. We will help identify the operating model that fits your requirements.'],
  ['How can I request a quote?', 'Use the contact form below with your contact details, service of interest and a short description of the movement. Our team can follow up to understand the shipment and lane details.'],
  ['How do I get shipment updates?', 'Shipment milestones and visibility options depend on the service and operating plan. Contact our team to confirm the tracking and reporting available for your movement.'],
];

export default function HomePage() {
  return <>
    <ScrollController />
    <Nav />
    <main id="top" className="homePage">
      <section className="homeHero" id="hero">
        <div className="homeHeroBg"><MotionScene mode="hero" clipSrc="/media/motion/movement-01 - Trim.mp4"/></div>
        <div className="homeHeroShade" />
        <div className="container homeHeroInner">
          <div className="heroMini">LIVE NETWORK STATUS <span>·</span> REAL-TIME TRACKING ACROSS PAN-INDIA LANES</div>
          <h1>POWERING <em>CONTINUOUS</em> SUPPLY CHAIN FLOW.</h1>
          <p>End-to-end freight transportation, warehouse fulfillment, and doorstep delivery connected through intelligent network orchestration. Unifying first-mile collection, middle-mile linehaul, and last-mile execution into a single, reliable promise. Total visibility, reduced buffer stock, and guaranteed SLAs across every lane.</p>
          <div className="heroActions"><a className="primaryBtn" href="#contact">Talk to an Expert ↗</a><a className="ghostBtn" href="#services">Explore Services ↘</a></div>
        </div>
        <div className="heroBottomLine"><span>FM</span><span>MM</span><span>LM</span><span>QC</span><span>PAN INDIA</span></div>
      </section>

      <section id="trusted-by" className="clientSection"><div className="container"><div className="clientIntro"><h2 className="sectionKicker light">TRUSTED BY TEAMS THAT MOVE INDIA</h2><p>Supporting operations for teams including</p></div><div className="clientNames" aria-label="Selected clients"><span>amazon</span><span>Flipkart</span><span>Decorpot</span><span className="clientEtc">& more</span></div></div></section>

      <section id="about" className="aboutSection">
        <div className="aboutVisual"><MotionScene mode="warehouse" clipSrc="/media/motion/movement-02.mp4" /></div>
        <div className="container aboutCopy">
          <div className="sectionKicker light">ABOUT AARA</div>
          <h2>Built to make every <em>handoff count.</em></h2>
          <p>AARA Logistics and Technology connects transportation, warehousing and fulfillment into coordinated supply-chain operations. Rooted in Bengaluru, our network supports movement between key markets across India.</p>
          <div className="aboutCoverage"><span>Bengaluru</span><span>Hyderabad</span><span>Chennai</span><span>Mumbai</span><span>Delhi</span><span>Pan-India lanes</span></div>
          <Link className="aboutLink" href="/services/supply-chain-solutions">Get to know our solutions <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section id="services" className="serviceIndexSection sectionLight">
        <div className="container narrow"><div className="sectionKicker">SERVICES & SOLUTIONS</div><h2>One network. <em>Every mile.</em></h2><p className="sectionLead">Follow the movement from first pickup through storage, linehaul and final delivery. Open any service for the full operating detail.</p></div>
        <ServiceTour />
      </section>

      <section id="why-us" className="whyUsSection">
        <div className="container">
          <div className="sectionKicker light">WHY AARA</div>
          <div className="whyUsHeading"><h2>Built around the <em>whole journey.</em></h2><p>Practical coordination and clear ownership help keep supply chains moving.</p></div>
          <div className="featureGrid">{differentiators.map(([title, body]) => <article className="featureCard" key={title} data-reveal><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section id="stats" className="statStrip"><div className="container"><h2 className="sectionKicker light statStripLabel">AARA AT A GLANCE</h2><div className="statStripGrid">{stats.map(([v,l])=><div key={l} data-reveal><strong>{v}</strong><span>{l}</span></div>)}</div></div></section>

      <section id="process" className="processSection sectionLight">
        <div className="container">
          <div className="sectionKicker">HOW WE WORK</div>
          <div className="processHeading"><h2>From first brief to <em>every delivery.</em></h2><p>A clear, collaborative process keeps the right people aligned at each stage.</p></div>
          <div className="processGrid">{processSteps.map(([title, body]) => <article className="processCard" key={title} data-reveal><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section id="portfolio" className="portfolioSection">
        <div className="container">
          <div className="sectionKicker light">SELECTED CAPABILITIES</div>
          <div className="portfolioHeading"><h2>Operations <em>in motion.</em></h2><p>A look at the connected services and workflows AARA supports. Explore each service to discuss how it fits your operation.</p></div>
          <div className="portfolioGrid">{portfolioItems.map((item) => <article className="portfolioCard" key={item.slug} data-reveal>
            <ServiceTourVideo src={item.clip} label={item.label} />
            <div className="portfolioCardCopy"><div className="sectionKicker light">{item.label}</div><h3>{item.title}</h3><p>{item.body}</p><Link href={`/services/${item.slug}`}>Explore service <span aria-hidden="true">↗</span></Link></div>
          </article>)}</div>
          <div className="portfolioFilm"><div><div className="sectionKicker light">AARA IN MOTION</div><p>From origin pickup through hubs and final delivery.</p></div><div className="videoShell"><DeferredVideo src="/media/aara-logistics.mp4" poster="/media/aara-logistics-poster.jpg" /><div className="videoBadge">ORIGIN → HUB → DOOR</div></div></div>
        </div>
      </section>

      <section id="team" className="teamSection sectionLight">
        <div className="container">
          <div className="sectionKicker">THE PEOPLE BEHIND THE MOVEMENT</div>
          <div className="teamHeading"><h2>Different teams. <em>One promise.</em></h2><p>Specialist teams coordinate the operational details behind each service.</p></div>
          <TeamCarousel />
        </div>
      </section>

      <section id="testimonials" className="testimonialsSection">
        <div className="container testimonialsGrid">
          <div><div className="sectionKicker light">TESTIMONIALS</div><h2>Trust is earned at <em>every handoff.</em></h2></div>
          <div className="testimonialNote"><span className="testimonialMark" aria-hidden="true">“</span><h3>Customer stories are being prepared.</h3><p>We only publish feedback with our partners’ approval. In the meantime, our team can discuss your lanes, service needs and relevant experience directly.</p><Link href="/#contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>

      <section id="faq" className="faqSection sectionLight">
        <div className="container faqGrid">
          <div><div className="sectionKicker">FAQ</div><h2>Good to <em>know.</em></h2><p>Have another question? Our team can help you work through the details.</p><Link className="darkBtn" href="/#contact">Ask our team ↗</Link></div>
          <div className="faqList">{faqs.map(([question, answer]) => <details className="faqItem" key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section id="contact" className="contactBand"><div className="container contactGridNew"><div><div className="sectionKicker light">GET IN TOUCH</div><h2>LET'S <em>MOVE.</em></h2><div className="contactList"><a href="mailto:support@aaralogistics.com"><span>Email</span><strong>support@aaralogistics.com</strong></a><a href="tel:+919663377290"><span>Phone</span><strong>+91 9663377290</strong></a><div><span>Address</span><strong>Bommasandra Industrial Area<br/>Bangalore-560099</strong></div><div><span>Business hours</span><strong>Monday - Saturday<br/>9:00 AM - 6:00 PM</strong></div></div></div><QuoteForm services={services.map(([name]) => name)} /></div></section>
    </main>
    <footer className="footer"><div className="container footerNew"><span>© 2026 AARA LOGISTICS AND TECHNOLOGY PVT LTD</span><nav aria-label="Footer navigation"><a href="/#about">About</a><a href="/#services">Services</a><a href="/#why-us">Why us</a><a href="/#stats">Stats</a><a href="/#process">Process</a><a href="/#portfolio">Portfolio</a><a href="/#team">Team</a><a href="/#testimonials">Testimonials</a><a href="/#faq">FAQ</a><a href="/#contact">Contact</a></nav><span>SUPPORT@AARALOGISTICS.COM</span><span>BANGALORE · KARNATAKA · INDIA</span></div></footer>
  </>;
}
