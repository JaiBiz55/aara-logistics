import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SolutionPage from '@/components/SolutionPage';

const pages = {
  'supply-chain-solutions': {
    index: '01', eyebrow: 'SUPPLY CHAIN SOLUTIONS', clip: '/media/motion/movement-03.mp4',
    title: 'UNIFY YOUR END-TO-END SUPPLY CHAIN.',
    lead: 'Connect B2B distribution, B2C e-commerce, and D2C channels under one operating model.',
    description: 'Eliminates channel silos, reduces buffer inventory, and replaces fragmented vendors with single-dashboard telemetry.',
    stats: [['100%', 'Multi-Channel Visibility'], ['30%', 'Buffer Stock Reduction'], ['Zero', 'Channel Silos'], ['PAN-India', 'Reach']],
    steps: [
      ['01', 'Network Planning', 'Map movement, nodes, and lanes across B2B, B2C, and D2C channels.'],
      ['02', 'Inventory Positioning', 'Position inventory closer to channel demand and reduce buffer stock.'],
      ['03', 'Multi-Channel Execution', 'Coordinate distribution, e-commerce, and direct orders in one operating model.'],
      ['04', 'End-to-End Tracking', 'Keep orders, shipments, and exceptions visible from origin to delivery.'],
    ],
    features: [
      ['Unified WMS/TMS software integration', 'Connect warehouse and transportation systems for shared operating visibility.'],
      ['Zero-dwell cross-docking', 'Move shipments through transfer hubs with minimal dwell time.'],
      ['Dynamic exception rerouting', 'Adjust routes and handoffs when delays or disruptions occur.'],
      ['Enterprise SLA guarantees', 'Coordinate service delivery against agreed enterprise service levels.'],
    ],
  },
  'warehouse-equipment-rental': {
    index: '02', eyebrow: 'WAREHOUSE SOLUTIONS', clip: '/media/services/india-warehouse-forklift.mp4',
    title: 'SMART STORAGE. HIGH-VELOCITY MOVEMENT.',
    lead: 'Scalable warehouse space, flexible MHE rental, and human-machine workflows engineered for fast throughput.',
    description: 'Eliminates fixed real estate overheads, picking errors, and stockout risks during peak demand spikes.',
    stats: [['99.8%', 'Order Accuracy'], ['24/7', 'Operations'], ['WMS', 'Real-Time Sync'], ['Flexible', 'On-Demand Capacity']],
    steps: [
      ['01', 'Inbound Docking', 'Receive and verify inventory at a planned inbound dock.'],
      ['02', 'Smart Putaway', 'Use WMS-directed locations to place stock efficiently.'],
      ['03', 'High-Density Staging', 'Stage high-velocity items for fast order picking.'],
      ['04', 'Outbound Dispatch', 'Match dispatch capacity to the outbound order flow.'],
    ],
    features: [
      ['Modern MHE fleet rentals', 'Choose material handling equipment to match operational demand.'],
      ['Multi-tier VNA racking', 'Make efficient use of vertical storage and narrow-aisle space.'],
      ['Live WMS inventory control', 'Keep stock movements and inventory status synchronized.'],
      ['Ergonomic human-machine workflows', 'Support safe, efficient work across people and equipment.'],
    ],
    warehouse: true,
  },
  'transportation-ftl': {
    index: '03', eyebrow: 'TRANSPORTATION FTL', clip: '/media/services/ftl-transport.mp4',
    title: 'DEDICATED CAPACITY. GUARANTEED LANES.',
    lead: 'Direct point-to-point Full Truckload (FTL) transit with dedicated fleets and GPS telemetry.',
    description: 'Protects shippers from volatile spot-market rates, driver shortages, and transshipment cargo damage.',
    stats: [['32ft', 'Container Linehaul Fleet'], ['99.5%', 'On-Time Transit Target'], ['100%', 'GPS Live Tracked'], ['Zero', 'Transshipment Touches']],
    steps: [
      ['01', 'Capacity Match', 'Match dedicated fleet capacity to the shipment and lane.'],
      ['02', 'Origin Collection', 'Collect the shipment at its origin point.'],
      ['03', 'Dedicated Linehaul', 'Move freight point to point on a dedicated lane.'],
      ['04', 'Direct Delivery', 'Deliver directly without intermediate transshipment.'],
    ],
    features: [
      ['Contracted lane availability', 'Plan shipments around reserved lane capacity.'],
      ['Driver fatigue management', 'Support safe operating practices across long-haul routes.'],
      ['Geofenced departure/arrival alerts', 'Receive route milestone notifications at lane checkpoints.'],
      ['Full transit insurance', 'Add transit insurance cover for freight movement.'],
    ],
  },
  'first-mile': {
    index: '04', eyebrow: 'FIRST MILE', clip: '/media/services/india-forklift-container.mp4',
    title: 'PRECISION PICKUPS FROM SOURCE.',
    lead: 'Controlled origin collection, vendor coordination, and swift freight inwarding before network entry.',
    description: 'Prevents uncoordinated supplier appointments, dock congestion, and unstandardized packaging from delaying downstream fulfillment.',
    stats: [['98.9%', 'Pickup Window Adherence'], ['100%', 'Origin Audits'], ['Multi-Vendor', 'Aggregation'], ['Real-Time', 'Dock Status']],
    steps: [
      ['01', 'Vendor Scheduling', 'Coordinate supplier appointments and pickup windows.'],
      ['02', 'Dock Collection', 'Collect freight at the origin dock.'],
      ['03', 'Quality Audit', 'Check packaging and freight condition before release.'],
      ['04', 'Network Release', 'Release verified freight into the transport network.'],
    ],
    features: [
      ['Supplier portal booking', 'Coordinate pickup bookings with suppliers through a portal.'],
      ['GS1 barcode validation', 'Validate shipment labels and barcode information at origin.'],
      ['Supplier milk-run optimization', 'Combine nearby supplier pickups into efficient collection routes.'],
      ['Origin exception management', 'Identify and resolve pickup and dock issues early.'],
    ],
  },
  'middle-mile': {
    index: '05', eyebrow: 'MIDDLE MILE', clip: '/media/services/india-pallet-movement.mp4',
    title: 'HIGH-VELOCITY NETWORK LINEHAUL.',
    lead: 'Rapid, hub-to-hub transportation connecting manufacturing plants, DCs, and city fulfillment hubs.',
    description: 'Eliminates inter-city transit bottlenecks, empty miles, and sorting delays at transfer hubs.',
    stats: [['24-48 Hr', 'Inter-State Transit'], ['Zero-Dwell', 'Cross-Docking'], ['Maximized', 'Load Density'], ['Scheduled', 'Linehauls']],
    steps: [
      ['01', 'Hub Consolidation', 'Consolidate freight at origin hubs for the next linehaul.'],
      ['02', 'Scheduled Departure', 'Depart on planned lane schedules.'],
      ['03', 'Control-Tower Transit', 'Track linehaul progress through control-tower operations.'],
      ['04', 'Destination Cross-Dock', 'Sort and cross-dock freight for the next delivery leg.'],
    ],
    features: [
      ['Cross-dock sorting expertise', 'Sort freight quickly at transfer hubs.'],
      ['Dynamic FTL/LTL fleet mixing', 'Match full and less-than-truckload capacity to shipment demand.'],
      ['Real-time control tower tracking', 'Monitor linehaul milestones and exceptions in transit.'],
      ['Automated sorting lines', 'Support consistent, high-throughput transfer operations.'],
    ],
  },
  'last-mile': {
    index: '06', eyebrow: 'LAST MILE', clip: '/media/services/first-mile.mp4',
    title: 'FLAWLESS DOORSTEP EXECUTION.',
    lead: 'Local dispatch, dynamic route optimization, and real-time tracking for the critical final leg.',
    description: 'Reduces high last-mile costs, failed delivery attempts, urban traffic friction, and customer delivery anxiety.',
    stats: [['99.2%', 'First-Attempt Success'], ['Live', 'Driver Tracking'], ['100%', 'Electronic POD Capture'], ['Precise', 'Delivery Windows']],
    steps: [
      ['01', 'Route Sorting', 'Sort shipments by delivery route and time window.'],
      ['02', 'Driver Dispatch', 'Dispatch drivers on optimized local routes.'],
      ['03', 'Doorstep Delivery', 'Complete the final customer handoff.'],
      ['04', 'Live POD Capture', 'Capture electronic proof of delivery at the doorstep.'],
    ],
    features: [
      ['AI route optimization', 'Optimize routes against destinations and delivery priorities.'],
      ['2-way SMS customer messaging', 'Send and receive delivery updates with customers.'],
      ['Locker & PUDO pickup integration', 'Support parcel pickup through lockers and pickup/drop-off points.'],
      ['Professional rider training', 'Prepare riders for safe and consistent delivery service.'],
    ],
  },
  'quick-commerce': {
    index: '07', eyebrow: 'QUICK COMMERCE', clip: '/media/services/quick-commerce-grocery.mp4',
    title: 'SUB-HOUR HYPERLOCAL FULFILLMENT.',
    lead: 'Ultra-fast order processing and store-to-door delivery executed within 15-30 minutes from urban micro-hubs.',
    description: 'Meets consumer expectations for instant sub-hour delivery of groceries, personal care, and high-velocity essentials.',
    stats: [['10-30 Min', 'Delivery Target'], ['<120 Sec', 'Pick & Pack Speed'], ['99.9%', 'Inventory SKU Accuracy'], ['Dense', 'Micro-Hub Network']],
    steps: [
      ['01', 'Instant Order Sync', 'Receive new orders from store and commerce systems.'],
      ['02', 'Fast Pick & Pack', 'Pick high-velocity essentials and prepare orders quickly.'],
      ['03', 'Rider Handshake', 'Hand the completed order to a delivery rider.'],
      ['04', 'Express Navigation', 'Navigate the order to the customer by the fastest local route.'],
    ],
    features: [
      ['High-density store micro layouts', 'Arrange compact store zones for rapid picking.'],
      ['Batch picking algorithms', 'Group suitable orders to speed up item collection.'],
      ['Live stock feeds to prevent cancellations', 'Keep available stock synchronized with incoming orders.'],
      ['Dedicated EV rider fleet', 'Support local deliveries with a dedicated electric-vehicle rider fleet.'],
    ],
    video: true,
  },
  'dark-store-solutions': {
    index: '08', eyebrow: 'DARK STORE SOLUTIONS', clip: '/media/services/dark-store.mp4',
    title: 'COMPACT MICRO-FULFILLMENT HUBS.',
    lead: 'Dedicated urban fulfillment nodes closed to walk-in customers, engineered for high-frequency order assembly.',
    description: 'Replaces high commercial retail rents and distant warehouses with high-density urban micro-hubs.',
    stats: [['100%', 'Online Order Focus'], ['3x', 'Higher Picking Speed'], ['Lower', 'Last-Mile Cost'], ['24/7', 'Operations']],
    steps: [
      ['01', 'Stock Replenishment', 'Replenish fast-moving inventory for local orders.'],
      ['02', 'Pick-Path Navigation', 'Guide pickers along efficient paths through the store.'],
      ['03', 'Staging & Bagging', 'Stage and bag orders for dispatch.'],
      ['04', 'Rider Handoff', 'Hand completed orders to delivery riders.'],
    ],
    features: [
      ['Strategic urban placement', 'Position fulfillment nodes near concentrated local demand.'],
      ['Fast-moving SKU curation', 'Prioritize products with frequent local demand.'],
      ['Low-overhead infrastructure', 'Build compact operations around the required inventory flow.'],
      ['Instant API store integration', 'Connect order systems with store inventory and fulfillment.'],
    ],
  },
  'delivery-solutions': {
    index: '09', eyebrow: 'DELIVERY SOLUTIONS', clip: '/media/services/delivery-doorstep.mp4',
    title: 'RELIABLE EXPRESS & ENTERPRISE DELIVERIES.',
    lead: 'Customized delivery options for enterprise, retail, and commercial shipments backed by strict SLA guarantees.',
    description: 'Provides flexible, SLA-backed delivery solutions tailored to multi-stop retail routes and specialized freight.',
    stats: [['100%', 'Contractual SLA Compliance'], ['Customized', 'Dedicated Fleets'], ['24/7', 'Proactive Support Desk'], ['Chain of', 'Custody']],
    steps: [
      ['01', 'Order Ingest', 'Receive delivery orders and service requirements.'],
      ['02', 'Fleet Allocation', 'Assign suitable fleet capacity and vehicle types.'],
      ['03', 'Scheduled Transit', 'Move shipments according to planned schedules.'],
      ['04', 'Confirmed Delivery', 'Confirm delivery and maintain the chain of custody.'],
    ],
    features: [
      ['Contractual delivery SLAs', 'Set delivery commitments for the service requirement.'],
      ['Specialized vehicle options', 'Choose EV, temperature-controlled, or flatbed vehicles.'],
      ['Proactive exception desk', 'Monitor delivery exceptions and coordinate resolution.'],
      ['Branded driver & tracking experience', 'Provide a consistent branded delivery and tracking experience.'],
    ],
  },
  'ecom-solution': {
    index: '10', eyebrow: 'E-COMMERCE SOLUTIONS', clip: '/media/services/ecommerce-conveyor.mp4',
    title: 'BUILT TO SCALE ONLINE BRANDS.',
    lead: 'Complete e-commerce suite combining warehousing, automated picking, Pan-India delivery, and returns management.',
    description: 'Eliminates marketplace integration friction, high RTO return rates, and slow shipping times.',
    stats: [['1-Day', 'Regional Delivery'], ['Automated', 'NDR & RTO Reduction'], ['Seamless', 'Shopify/Amazon API Sync'], ['99.9%', 'Order Precision']],
    steps: [
      ['01', 'Marketplace API Sync', 'Sync orders from marketplace and storefront APIs.'],
      ['02', 'Auto Pick & Pack', 'Pick and pack orders through coordinated fulfillment.'],
      ['03', 'Multi-Carrier Dispatch', 'Dispatch orders through the appropriate carrier network.'],
      ['04', 'Returns Processing', 'Receive, verify, and process returned items.'],
    ],
    features: [
      ['Turnkey storefront API connections', 'Connect storefront order data with fulfillment operations.'],
      ['Automated NDR buyer verification', 'Verify buyer details when a delivery attempt needs follow-up.'],
      ['Frictionless reverse pickups', 'Coordinate returns collection from customers.'],
      ['Custom branded unboxing experience', 'Support a consistent branded presentation for delivered orders.'],
    ],
  },
  'cold-chain-logistics': {
    index: '11', eyebrow: 'COLD CHAIN LOGISTICS', clip: '/media/services/india-coldchain-operations.mp4',
    title: 'PROTECT EVERY TEMPERATURE-SENSITIVE SHIPMENT.',
    lead: 'Cold storage and temperature-controlled movement planned around the requirements of your products.',
    description: 'Coordinate suitable cold rooms, handling windows and refrigerated transport across origin, storage and distribution handoffs.',
    stats: [['Multi-Temp', 'Storage Planning'], ['Cold-Chain', 'Handoff Coordination'], ['Live', 'Milestone Visibility'], ['Product-Led', 'Temperature Plans']],
    steps: [
      ['01', 'Product Requirements', 'Confirm the product, handling conditions and required temperature range.'],
      ['02', 'Cold Storage Plan', 'Coordinate suitable cold storage and staging requirements.'],
      ['03', 'Temperature-Controlled Transit', 'Plan refrigerated or insulated movement for the shipment.'],
      ['04', 'Verified Handoffs', 'Track handoffs and delivery milestones through the route.'],
    ],
    features: [
      ['Cold storage coordination', 'Plan storage capacity around product and lane requirements.'],
      ['Reefer and insulated transport planning', 'Coordinate refrigerated vehicles for suitable routes.'],
      ['Temperature-aware handling windows', 'Align loading, staging and transfer timing with product needs.'],
      ['Shipment milestone visibility', 'Keep teams informed as sensitive consignments move through the network.'],
    ],
  },
  'air-shipping': {
    index: '12', eyebrow: 'AIR SHIPPING', clip: '/media/services/mixkit-flight-getting-ready-for-departure-4065-full-hd.mp4',
    title: 'MOVE TIME-CRITICAL FREIGHT AT SPEED.',
    lead: 'Coordinated air freight options for urgent consignments, with pickup, airport handling, and delivery planned around shipment priorities.',
    description: 'Connect origin collection, air freight coordination, shipment handoffs, and final delivery with milestone visibility through the journey.',
    stats: [['Priority', 'Air Freight Options'], ['Origin-to-Door', 'Coordination'], ['Planned', 'Airport Handoffs'], ['Live', 'Milestone Updates']],
    steps: [
      ['01', 'Shipment Assessment', 'Confirm shipment dimensions, weight, destination, delivery deadline, and handling needs.'],
      ['02', 'Pickup & Preparation', 'Schedule collection and coordinate shipment preparation and documentation.'],
      ['03', 'Air Transit Coordination', 'Coordinate airport handoffs and planned air movement.'],
      ['04', 'Final Delivery', 'Arrange destination delivery and confirm the shipment handoff.'],
    ],
    features: [
      ['Priority routing options', 'Match available air freight options to shipment urgency and destination.'],
      ['Pickup and airport transfer coordination', 'Coordinate ground movement and handoffs around the air journey.'],
      ['Shipment documentation support', 'Help coordinate the information required for shipment processing.'],
      ['Milestone updates through delivery', 'Keep teams informed as the shipment moves between handoffs.'],
    ],
  },
  'cargo-shipping': {
    index: '13', eyebrow: 'CARGO SHIPPING', clip: '/media/services/133079-755697265.mp4',
    title: 'CARGO MOVEMENT, PLANNED END TO END.',
    lead: 'Coordinated cargo transport for commercial consignments, from pickup and capacity planning through delivery.',
    description: 'Match cargo requirements to practical transport capacity, route planning, handling, and delivery coordination.',
    stats: [['FTL / LTL', 'Capacity Options'], ['Door-to-Door', 'Movement Planning'], ['Scheduled', 'Pickup Coordination'], ['Tracked', 'Transit Milestones']],
    steps: [
      ['01', 'Cargo Assessment', 'Confirm shipment dimensions, weight, handling needs, origin, and destination.'],
      ['02', 'Pickup & Consolidation', 'Plan suitable collection and consolidation for the shipment.'],
      ['03', 'Linehaul Transit', 'Coordinate cargo movement along the planned route.'],
      ['04', 'Delivery Confirmation', 'Arrange the destination handoff and capture delivery confirmation.'],
    ],
    features: [
      ['FTL and LTL coordination', 'Match transport capacity to the shipment and lane.'],
      ['Planned pickup and delivery windows', 'Coordinate collection and arrival timing with shipment requirements.'],
      ['Cargo handling requirements', 'Plan handling around the shipment type and declared needs.'],
      ['Transit updates and delivery confirmation', 'Track shipment milestones through the final handoff.'],
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) return {};
  return { title: `${page.title} - AARA Logistics`, description: page.lead };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as keyof typeof pages];
  if (!page) notFound();
  const steps = page.steps.map(([n, title, body]) => ({ n, title, body }));
  return <SolutionPage solution={{ ...page, slug, steps }} />;
}
