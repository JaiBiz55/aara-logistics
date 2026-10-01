import Link from 'next/link';
import ServiceTourVideo from '@/components/ServiceTourVideo';

const tours = [
  { name: 'Supply Chain Solutions', slug: 'supply-chain-solutions', clip: '/media/motion/movement-03.mp4', note: 'Connect planning, inventory and delivery in one coordinated network.' },
  { name: 'Warehouse Solutions', slug: 'warehouse-equipment-rental', clip: '/media/services/india-warehouse-forklift.mp4', note: 'Flexible space, material handling equipment and fulfilment workflows.' },
  { name: 'Transportation FTL', slug: 'transportation-ftl', clip: '/media/services/ftl-transport.mp4', note: 'Dedicated full-truckload capacity for planned, direct lane movement.' },
  { name: 'First Mile', slug: 'first-mile', clip: '/media/services/india-forklift-container.mp4', note: 'Scheduled pickups and careful freight intake at the point of origin.' },
  { name: 'Middle Mile', slug: 'middle-mile', clip: '/media/services/india-pallet-movement.mp4', note: 'Coordinated hub transfers that keep freight moving between cities.' },
  { name: 'Last Mile', slug: 'last-mile', clip: '/media/services/first-mile.mp4', note: 'Local dispatch, route planning and a clear delivery handoff.' },
  { name: 'Quick Commerce', slug: 'quick-commerce', clip: '/media/services/quick-commerce-grocery.mp4', note: 'Fast micro-hub picking for time-sensitive neighbourhood orders.' },
  { name: 'Dark Store Solutions', slug: 'dark-store-solutions', clip: '/media/services/dark-store.mp4', note: 'Compact online-only fulfilment built around nearby demand.' },
  { name: 'Delivery Solutions', slug: 'delivery-solutions', clip: '/media/services/delivery-doorstep.mp4', note: 'Flexible delivery capacity for retail, enterprise and commercial needs.' },
  { name: 'E-commerce Solutions', slug: 'ecom-solution', clip: '/media/services/ecommerce-conveyor.mp4', note: 'Order fulfilment, shipping and returns for growing online brands.' },
  { name: 'Cold Chain Logistics', slug: 'cold-chain-logistics', clip: '/media/services/india-coldchain-operations.mp4', note: 'Temperature-aware handling and cold storage coordination for sensitive goods.' },
  { name: 'Air Shipping', slug: 'air-shipping', clip: '/media/services/mixkit-flight-getting-ready-for-departure-4065-full-hd.mp4', note: 'Coordinated air freight for time-sensitive shipments, from pickup through delivery.' },
  { name: 'Cargo Shipping', slug: 'cargo-shipping', clip: '/media/services/133079-755697265.mp4', note: 'Planned cargo capacity and transport coordination for commercial consignments.' },
];

export default function ServiceTour() {
  return <div className="serviceTour" aria-label="AARA services">
    {tours.map((service, index) => <article className="serviceTourRow" key={service.slug}>
      <ServiceTourVideo src={service.clip} label={String(index + 1).padStart(2, '0')} />
      <div className="serviceTourCopy">
        <div className="sectionKicker">SERVICE {String(index + 1).padStart(2, '0')} / AARA</div>
        <h3>{service.name}</h3>
        <p>{service.note}</p>
        <Link href={`/services/${service.slug}`} className="serviceTourLink">Explore service details <span aria-hidden="true">↗</span></Link>
      </div>
    </article>)}
  </div>;
}
