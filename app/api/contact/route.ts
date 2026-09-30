import { NextResponse } from 'next/server';

const attempts = new Map<string,{count:number; windowStart:number}>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const DEFAULT_WHATSAPP_NUMBER = '919663377290';

function formatWhatsAppMessage(payload: Record<string, string>) {
  return [
    'New enquiry from AARA Logistics',
    '',
    `Name: ${payload.name || 'Not provided'}`,
    `Email: ${payload.email || 'Not provided'}`,
    `Phone: ${payload.phone || 'Not provided'}`,
    `Service: ${payload.service || 'Not provided'}`,
    '',
    'Message:',
    payload.message || 'No message provided',
  ].join('\n');
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && now - current.windowStart < WINDOW_MS && current.count >= MAX_ATTEMPTS) return NextResponse.json({error:'Too many requests'},{status:429});
  if (!current || now - current.windowStart >= WINDOW_MS) attempts.set(ip,{count:1,windowStart:now}); else current.count += 1;

  const body = await req.json().catch(()=>null) as Record<string,unknown> | null;
  if (!body) return NextResponse.json({error:'Invalid request'},{status:400});
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const service = String(body.service ?? '').trim();
  const message = String(body.message ?? '').trim();
  const honeypot = String(body.company ?? '').trim();
  if (honeypot) return NextResponse.json({ok:true});
  if (name.length < 2 || name.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120 || phone.length > 30 || service.length > 100 || message.length > 1200) return NextResponse.json({error:'Please check the submitted details.'},{status:400});

  const whatsappNumber = (process.env.COMPANY_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, '');
  const whatsappText = formatWhatsAppMessage({ name, email, phone, service, message });

  if (process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
    try {
      const graphResponse = await fetch(`https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: whatsappNumber,
          type: 'text',
          text: { body: whatsappText },
        }),
      });

      if (!graphResponse.ok) {
        console.error('WhatsApp API error:', await graphResponse.text());
      }
    } catch (error) {
      console.error('WhatsApp API request failed:', error);
    }
  }

  return NextResponse.json({
    ok: true,
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`,
  });
}
