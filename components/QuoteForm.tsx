'use client';

import { useState, type FormEvent } from 'react';

export default function QuoteForm({ services }: { services: readonly string[] }) {
  const [sent, setSent] = useState(false);

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const whatsappTab = window.open('', '_blank');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      whatsappTab?.close();
      const error = await response.json().catch(() => ({ error: 'Unable to submit request.' }));
      window.alert(error.error || 'Unable to submit request.');
      return;
    }

    const payload = await response.json().catch(() => ({ ok: true }));
    setSent(true);
    form.reset();

    if (payload.whatsappUrl && whatsappTab) {
      whatsappTab.location.href = payload.whatsappUrl;
    } else if (payload.whatsappUrl) {
      window.location.href = payload.whatsappUrl;
    }
  }

  return (
    <form className="quoteForm" onSubmit={submitQuote}>
      <input name="name" placeholder="Name" required maxLength={80} />
      <input name="email" type="email" placeholder="Email" required maxLength={120} />
      <input name="phone" placeholder="Phone" maxLength={30} />
      <select name="service" defaultValue="">
        <option value="" disabled>Service</option>
        {services.map((service) => <option key={service}>{service}</option>)}
      </select>
      <textarea name="message" placeholder="Tell us about your movement" maxLength={1200} />
      <input name="company" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit">{sent ? 'Request received ✓' : 'Request a quote ↗'}</button>
    </form>
  );
}
