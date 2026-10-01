import Link from 'next/link';
import Nav from '@/components/Nav';
import ScrollController from '@/components/ScrollController';
import MotionScene from '@/components/MotionScene';
import DeferredVideo from '@/components/DeferredVideo';

type Solution={slug:string; index:string; eyebrow:string; title:string; lead:string; description:string; clip:string; steps:readonly {n:string;title:string;body:string}[]; stats:readonly (readonly[string,string])[]; features:readonly (readonly[string,string])[]; warehouse?:boolean; video?:boolean};

const rentalEquipment = [
  ['Forklifts', 'Electric and diesel options for pallet movement and heavier warehouse loads.'],
  ['Reach trucks', 'For lifting palletized stock in higher racking and narrower aisles.'],
  ['Pallet trucks', 'Manual or battery-powered movement for receiving, staging, and dispatch.'],
  ['Electric stackers', 'Compact lifting and stacking support for warehouse operations.'],
  ['Order pickers', 'Equipment for picking items from elevated storage locations.'],
  ['VNA trucks', 'Very-narrow-aisle handling options for dense storage layouts.'],
  ['Tow tractors', 'For moving carts and materials along repeatable warehouse routes.'],
  ['Pallet racking', 'Storage configurations designed around the site, inventory, and aisle plan.'],
] as const;

export default function SolutionPage({solution}:{solution:Solution}){
 return <><ScrollController/><Nav/><main className="solutionPage">
  <section className="solutionHero"><div className="solutionVisual"><MotionScene mode={solution.warehouse?'warehouse':'network'} clipSrc={solution.clip}/></div><div className="solutionVignette"/><div className="container solutionHeroInner"><div className="solutionMeta"><span>{solution.index} / AARA</span><span>{solution.eyebrow}</span></div><h1>{solution.title}</h1><p>{solution.lead}</p><div className="solutionHeroActions"><Link className="primaryBtn" href="/#contact">Talk to an Expert ↗</Link><Link className="ghostBtn" href="/#services">View services</Link></div></div></section>

  <section className="solutionBody"><div className="container"><div className="detailGrid"><div><div className="sectionKicker">WHAT WE SOLVE</div><h2>{solution.description}</h2></div><div><p className="detailLead">Track the service through clear operational checkpoints, from planning through delivery.</p><div className="detailStats">{solution.stats.map(([v,l])=><div key={l}><strong>{v}</strong><span>{l}</span></div>)}</div></div></div><div className="stepGrid">{solution.steps.map(s=><article key={s.n} data-reveal><span>{s.n}</span><h3>{s.title}</h3><p>{s.body}</p></article>)}</div></div></section>

  {solution.video && <section className="videoBand"><div className="container"><div className="sectionKicker light">STORE TO CUSTOMER IN MINUTES</div><div className="videoShell"><DeferredVideo src="/media/services/quick-commerce.mp4"/><div className="videoBadge">15-MINUTE FULFILLMENT FLOW</div></div></div></section>}
  {solution.warehouse && <section className="robotics"><div className="container"><div className="sectionKicker light">HUMAN + MACHINE WORKFLOWS</div><div className="detailGrid"><div><h2>Human + <em>machine.</em></h2></div><div><p>Ergonomic tools, smart scanning, and safety compliance support fast, accurate warehouse workflows.</p></div></div><div className="roboticsVisual"><MotionScene mode="warehouse" clipSrc={solution.clip}/></div><div className="rentalEquipment"><div className="sectionKicker light">EQUIPMENT RENTALS</div><h2>Warehouse equipment</h2><p className="rentalEquipmentLead">Flexible equipment options for receiving, storage, picking, and dispatch. Final selection depends on your warehouse layout and handling needs.</p><div className="rentalEquipmentGrid">{rentalEquipment.map(([name, description], index) => <article className="rentalEquipmentCard" key={name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><p>{description}</p></article>)}</div></div></div></section>}

  <section className="featureSection"><div className="container"><div className="sectionKicker">AARA DIFFERENCE</div><div className="featureGrid">{solution.features.map(([title,body],i)=><article className="featureCard" key={title}><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
  <section className="ctaBand"><div className="container"><div className="sectionKicker">READY WHEN YOU ARE</div><h2>MOVE THE <br/>NEXT STEP.</h2><Link className="darkBtn" href="/#contact">Start a conversation ↗</Link></div></section>
 </main><footer className="footer"><div className="container footerNew"><span>© 2026 AARA LOGISTICS AND TECHNOLOGY PVT LTD</span><span>SUPPORT@AARALOGISTICS.COM</span><span>BANGALORE · KARNATAKA · INDIA</span></div></footer></>;
}
