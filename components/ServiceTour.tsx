import Link from 'next/link';

export type ServiceVisualKind =
  | 'network'
  | 'warehouse'
  | 'truck'
  | 'pickup'
  | 'hub'
  | 'home'
  | 'quick'
  | 'store'
  | 'delivery'
  | 'commerce'
  | 'cold';

type ServiceTourItem = {
  name: string;
  slug: string;
  visual: ServiceVisualKind;
  caption: string;
  note: string;
};

const tours: ServiceTourItem[] = [
  { name: 'Supply Chain Solutions', slug: 'supply-chain-solutions', visual: 'network', caption: 'CONNECTED NETWORK', note: 'Connect planning, inventory and delivery in one coordinated network.' },
  { name: 'Warehouse Solutions', slug: 'warehouse-equipment-rental', visual: 'warehouse', caption: 'STORAGE & HANDLING', note: 'Flexible space, material handling equipment and fulfilment workflows.' },
  { name: 'Transportation FTL', slug: 'transportation-ftl', visual: 'truck', caption: 'DIRECT LINEHAUL', note: 'Dedicated full-truckload capacity for planned, direct lane movement.' },
  { name: 'First Mile', slug: 'first-mile', visual: 'pickup', caption: 'ORIGIN PICKUP', note: 'Scheduled pickups and careful freight intake at the point of origin.' },
  { name: 'Middle Mile', slug: 'middle-mile', visual: 'hub', caption: 'HUB TRANSFER', note: 'Coordinated hub transfers that keep freight moving between cities.' },
  { name: 'Last Mile', slug: 'last-mile', visual: 'home', caption: 'DOORSTEP HANDOFF', note: 'Local dispatch, route planning and a clear delivery handoff.' },
  { name: 'Quick Commerce', slug: 'quick-commerce', visual: 'quick', caption: 'QUICK FULFILMENT', note: 'Fast micro-hub picking for time-sensitive neighbourhood orders.' },
  { name: 'Dark Store Solutions', slug: 'dark-store-solutions', visual: 'store', caption: 'MICRO-FULFILMENT', note: 'Compact online-only fulfilment built around nearby demand.' },
  { name: 'Delivery Solutions', slug: 'delivery-solutions', visual: 'delivery', caption: 'FLEXIBLE DELIVERY', note: 'Flexible delivery capacity for retail, enterprise and commercial needs.' },
  { name: 'E-commerce Solutions', slug: 'ecom-solution', visual: 'commerce', caption: 'ONLINE ORDER FLOW', note: 'Order fulfilment, shipping and returns for growing online brands.' },
  { name: 'Cold Chain Logistics', slug: 'cold-chain-logistics', visual: 'cold', caption: 'TEMPERATURE CARE', note: 'Temperature-aware handling and cold storage coordination for sensitive goods.' },
];

export function ServiceArtwork({ visual }: { visual: ServiceVisualKind }) {
  return (
    <svg className="serviceTourArtwork" viewBox="0 0 640 420" aria-hidden="true">
      <circle className="serviceArtHalo" cx="320" cy="210" r="146" />
      <circle className="serviceArtRing" cx="320" cy="210" r="119" />
      {visual === 'network' && <g>
        <path className="serviceArtLine" d="M320 197 214 136M320 197l106-61M320 231l-99 58M320 231l99 58" />
        <rect className="serviceArtGoldFill" x="276" y="168" width="88" height="86" rx="20" />
        <rect className="serviceArtFill" x="176" y="104" width="76" height="64" rx="14" />
        <rect className="serviceArtFill" x="388" y="104" width="76" height="64" rx="14" />
        <rect className="serviceArtFill" x="183" y="270" width="76" height="64" rx="14" />
        <rect className="serviceArtFill" x="381" y="270" width="76" height="64" rx="14" />
        <path className="serviceArtLine" d="M298 201h44M298 219h44" />
        <circle className="serviceArtGoldDot" cx="214" cy="136" r="7" /><circle className="serviceArtGoldDot" cx="426" cy="136" r="7" />
        <circle className="serviceArtGoldDot" cx="221" cy="302" r="7" /><circle className="serviceArtGoldDot" cx="419" cy="302" r="7" />
      </g>}
      {visual === 'warehouse' && <g>
        <path className="serviceArtLine" d="m190 176 130-76 130 76v150H190z" />
        <path className="serviceArtGold" d="M176 178 320 94l144 84" />
        <path className="serviceArtLine" d="M226 190v108M320 190v108M414 190v108M210 226h220M210 264h220" />
        <rect className="serviceArtGoldFill" x="239" y="196" width="58" height="26" rx="4" />
        <rect className="serviceArtFill" x="333" y="196" width="58" height="26" rx="4" />
        <rect className="serviceArtFill" x="239" y="234" width="58" height="26" rx="4" />
        <rect className="serviceArtGoldFill" x="333" y="272" width="58" height="26" rx="4" />
      </g>}
      {visual === 'truck' && <g>
        <rect className="serviceArtFill" x="155" y="164" width="236" height="112" rx="12" />
        <path className="serviceArtGoldFill" d="M391 194h61l39 45v37H391z" />
        <path className="serviceArtLine" d="M411 205h33l27 31h-60zM172 190h202M172 218h202" />
        <path className="serviceArtGold" d="M166 298h332" />
        <circle className="serviceArtWheel" cx="224" cy="285" r="24" /><circle className="serviceArtWheel" cx="430" cy="285" r="24" />
        <circle className="serviceArtGoldDot" cx="224" cy="285" r="7" /><circle className="serviceArtGoldDot" cx="430" cy="285" r="7" />
      </g>}
      {visual === 'pickup' && <g>
        <path className="serviceArtLine" d="M196 302V176l124-70 124 70v126" />
        <path className="serviceArtGold" d="M177 179 320 98l143 81" />
        <rect className="serviceArtFill" x="242" y="207" width="70" height="70" rx="8" />
        <path className="serviceArtLine" d="M260 229h34M260 245h34M260 261h20" />
        <rect className="serviceArtGoldFill" x="338" y="216" width="64" height="61" rx="7" />
        <path className="serviceArtGold" d="M338 238h64M370 216v61" />
      </g>}
      {visual === 'hub' && <g>
        <rect className="serviceArtFill" x="173" y="150" width="294" height="142" rx="22" />
        <path className="serviceArtGold" d="M203 181h234M203 218h234M203 255h234" />
        <rect className="serviceArtGoldFill" x="218" y="158" width="52" height="20" rx="4" />
        <rect className="serviceArtFill" x="292" y="194" width="52" height="20" rx="4" />
        <rect className="serviceArtGoldFill" x="367" y="231" width="52" height="20" rx="4" />
        <circle className="serviceArtGoldDot" cx="200" cy="326" r="7" /><circle className="serviceArtGoldDot" cx="440" cy="326" r="7" />
        <path className="serviceArtLine" d="M200 326h240" />
      </g>}
      {visual === 'home' && <g>
        <path className="serviceArtLine" d="m182 211 138-112 138 112M208 195v132h224V195" />
        <path className="serviceArtGold" d="m182 211 138-112 138 112" />
        <rect className="serviceArtFill" x="286" y="237" width="68" height="90" rx="8" />
        <rect className="serviceArtGoldFill" x="226" y="226" width="48" height="48" rx="7" />
        <path className="serviceArtGold" d="M235 250h30M250 235v30" />
        <rect className="serviceArtFill" x="365" y="226" width="42" height="50" rx="7" />
        <path className="serviceArtLine" d="M320 327v-43" />
      </g>}
      {visual === 'quick' && <g>
        <path className="serviceArtLine" d="m208 167 30 161h164l30-161z" />
        <path className="serviceArtGold" d="M262 176v-22a58 58 0 0 1 116 0v22" />
        <path className="serviceArtLine" d="M247 209h146M258 252h124" />
        <circle className="serviceArtGoldFill" cx="320" cy="247" r="56" />
        <path className="serviceArtGold" d="M320 215v34l24 15" />
        <circle className="serviceArtGoldDot" cx="320" cy="247" r="5" />
      </g>}
      {visual === 'store' && <g>
        <rect className="serviceArtFill" x="180" y="117" width="280" height="205" rx="15" />
        <path className="serviceArtGold" d="M210 170h220M210 224h220M210 278h220" />
        <rect className="serviceArtGoldFill" x="225" y="132" width="48" height="32" rx="5" />
        <rect className="serviceArtFill" x="292" y="132" width="48" height="32" rx="5" />
        <rect className="serviceArtFill" x="360" y="184" width="48" height="32" rx="5" />
        <rect className="serviceArtGoldFill" x="243" y="238" width="48" height="32" rx="5" />
        <rect className="serviceArtFill" x="322" y="238" width="48" height="32" rx="5" />
      </g>}
      {visual === 'delivery' && <g>
        <path className="serviceArtLine" d="M231 192v-28a89 89 0 0 1 178 0v28" />
        <rect className="serviceArtGoldFill" x="199" y="185" width="242" height="138" rx="22" />
        <path className="serviceArtGold" d="M199 232h242M320 185v138" />
        <path className="serviceArtLine" d="m280 255 26 25 56-58" />
      </g>}
      {visual === 'commerce' && <g>
        <path className="serviceArtLine" d="M183 145h35l34 159h180l34-119H237" />
        <path className="serviceArtGold" d="M250 215h204M260 261h181" />
        <rect className="serviceArtGoldFill" x="283" y="164" width="63" height="43" rx="7" />
        <rect className="serviceArtFill" x="360" y="164" width="63" height="43" rx="7" />
        <circle className="serviceArtWheel" cx="283" cy="333" r="18" /><circle className="serviceArtWheel" cx="407" cy="333" r="18" />
        <circle className="serviceArtGoldDot" cx="283" cy="333" r="5" /><circle className="serviceArtGoldDot" cx="407" cy="333" r="5" />
      </g>}
      {visual === 'cold' && <g>
        <path className="serviceArtLine" d="m320 105 112 65v129l-112 64-112-64V170z" />
        <path className="serviceArtGold" d="M320 105v129m112-64-112 64-112-64m112 64v129" />
        <circle className="serviceArtGoldFill" cx="320" cy="232" r="53" />
        <path className="serviceArtGold" d="M320 198v68M290 215l60 34M350 215l-60 34" />
        <path className="serviceArtLine" d="m320 198-8 10m8-10 8 10m-8 58-8-10m8 10 8-10m-30-41 13 1m-13-1 5-11m55 11-13 1m13-1-5-11m-55 30 13-1m-13 1 5 11m55-11-13-1m13 1-5 11" />
      </g>}
    </svg>
  );
}

export default function ServiceTour() {
  const renderService = (service: ServiceTourItem, index: number) => <article className={`serviceTourRow${index % 2 === 1 ? ' serviceTourRowReverse' : ''}`} key={service.slug}>
      <div className={`serviceTourArt serviceTourArt-${service.visual}`} aria-hidden="true">
        <span className="serviceTourArtLabel">{service.caption}</span>
        <ServiceArtwork visual={service.visual} />
      </div>
      <div className="serviceTourCopy">
        <div className="sectionKicker">AARA SERVICE</div>
        <h3>{service.name}</h3>
        <p>{service.note}</p>
        <Link href={`/services/${service.slug}`} className="serviceTourLink">Explore service details <span aria-hidden="true">↗</span></Link>
      </div>
    </article>;

  return <div className="serviceTour" aria-label="AARA services">
    {tours.slice(0, 3).map((service, index) => renderService(service, index))}
    <details className="serviceTourMore">
      <summary className="serviceTourToggle" aria-label="Show or hide more services">
        <span className="serviceTourToggleIcon" aria-hidden="true">↓</span>
      </summary>
      <div className="serviceTourMoreGrid">
        {tours.slice(3).map((service, index) => renderService(service, index + 3))}
      </div>
    </details>
  </div>;
}