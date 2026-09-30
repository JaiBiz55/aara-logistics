import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AARA Logistics — Logistics, Fulfillment & Warehouse Solutions',
  description: 'AARA Logistics and Technology Pvt Ltd — transport, fulfillment and warehouse solutions across India.',
  metadataBase: new URL('https://aaralogistics.com'),
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
