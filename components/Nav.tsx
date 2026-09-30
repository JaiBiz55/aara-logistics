'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const services = [
  ['Supply Chain Solutions', '/services/supply-chain-solutions'],
  ['Warehouse Solutions', '/services/warehouse-equipment-rental'],
  ['Transportation FTL', '/services/transportation-ftl'],
  ['First Mile', '/services/first-mile'],
  ['Middle Mile', '/services/middle-mile'],
  ['Last Mile', '/services/last-mile'],
  ['Quick Commerce', '/services/quick-commerce'],
  ['Dark Store Solutions', '/services/dark-store-solutions'],
  ['Delivery Solutions', '/services/delivery-solutions'],
  ['Ecom Solution', '/services/ecom-solution'],
];

const links = [
  ['Home', '/#top'],
  ['Warehouse', '/services/warehouse-equipment-rental'],
  ['Coverage', '/#coverage'],
  ['Contact', '/#contact'],
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const update = () => setSolid(window.scrollY > 30);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  function closeMenus() {
    setOpen(false);
    setServicesOpen(false);
  }

  return (
    <header className={`siteNav ${solid ? 'solid' : ''}`} onKeyDown={(event) => { if (event.key === 'Escape') { closeMenus(); (document.activeElement as HTMLElement | null)?.blur(); } }}>
      <div className="container navInnerNew">
        <Link className="logo" href="/#top" onClick={closeMenus}><i />AARA <span>LOGISTICS</span></Link>
        <nav aria-label="Main navigation">
          {links.slice(0, 1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          <div className={`navServices ${servicesOpen ? 'is-open' : ''}`} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button
              className="navServicesTrigger"
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((value) => !value)}
            >
              Services <span aria-hidden="true" />
            </button>
            <div className="navServicesMenu" role="menu" aria-label="Services">
              <Link className="navServicesAll" role="menuitem" href="/#services" onClick={closeMenus}>All services <span aria-hidden="true">↗</span></Link>
              {services.map(([label, href]) => (
                <Link role="menuitem" key={href} href={href} onClick={closeMenus}>{label}<span aria-hidden="true">↗</span></Link>
              ))}
            </div>
          </div>
          {links.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="navRight">
          <Link className="navQuote" href="/#contact">Request a quote ↗</Link>
          <button className={`hamb ${open ? 'open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => { if (open) setServicesOpen(false); setOpen(!open); }}>
            <span /><span />
          </button>
        </div>
      </div>
      <div className={`mobileNav ${open ? 'open' : ''}`} aria-hidden={!open} inert={!open}>
        {links.slice(0, 1).map(([label, href]) => <Link key={href} href={href} onClick={closeMenus}>{label}<b>↗</b></Link>)}
        <button className="mobileServicesToggle" type="button" aria-expanded={servicesOpen} aria-controls="mobile-services-submenu" onClick={() => setServicesOpen((value) => !value)}>
          Services <b aria-hidden="true">{servicesOpen ? '−' : '+'}</b>
        </button>
        {servicesOpen && <div className="mobileServices" id="mobile-services-submenu">
          <Link href="/#services" onClick={closeMenus}>All services <b>↗</b></Link>
          {services.map(([label, href]) => <Link key={href} href={href} onClick={closeMenus}>{label}<b>↗</b></Link>)}
        </div>}
        {links.slice(1).map(([label, href]) => <Link key={href} href={href} onClick={closeMenus}>{label}<b>↗</b></Link>)}
        <Link className="mobileQuote" href="/#contact" onClick={closeMenus}>Request a quote ↗</Link>
      </div>
    </header>
  );
}
