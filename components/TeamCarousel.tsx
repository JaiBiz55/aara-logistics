'use client';

import { useState } from 'react';

const teams = [
  {
    title: 'Network planning',
    category: 'NETWORK OPERATIONS',
    body: 'Plan routes and coordinate lanes around shipment size, timing and destination. The team aligns pickup schedules, transport capacity and handoffs, while keeping an eye on milestones so delays can be followed up promptly.',
    visual: 'network',
    visualLabel: 'CONNECTED ROUTES',
  },
  {
    title: 'Warehouse operations',
    category: 'WAREHOUSE & FULFILLMENT',
    body: 'Coordinate receiving, storage, inventory movement and order preparation. Clear workflows help teams keep goods organized, support fulfillment needs and manage the transition from warehouse handling to dispatch.',
    visual: 'warehouse',
    visualLabel: 'WAREHOUSE FLOW',
  },
  {
    title: 'Customer solutions',
    category: 'CUSTOMER SUPPORT',
    body: 'Work with customers to understand service requirements, shipment details and day-to-day priorities. The team coordinates with operations, shares updates and helps resolve questions as a shipment moves through its planned journey.',
    visual: 'customer',
    visualLabel: 'CUSTOMER CARE',
  },
  {
    title: 'Technology & visibility',
    category: 'TRACKING & INSIGHTS',
    body: 'Use shipment milestones and operational information to help teams follow progress and spot exceptions. Timely updates support better coordination between customers, warehouse teams and transport partners from pickup through delivery.',
    visual: 'visibility',
    visualLabel: 'SHIPMENT VISIBILITY',
  },
];

function TeamIllustration({ visual, label }: { visual: string; label: string }) {
  return (
    <div className={`teamIllustration teamIllustration-${visual}`} aria-hidden="true">
      {visual === 'network' && (
        <svg viewBox="0 0 500 260">
          <path className="teamArtRoute" d="M92 181 188 92l112 75 105-83" />
          <path className="teamArtRoute teamArtRouteSecondary" d="m188 92 33 115 79-40 29 78" />
          <circle className="teamArtNode" cx="92" cy="181" r="13" />
          <circle className="teamArtNode" cx="188" cy="92" r="17" />
          <circle className="teamArtNode" cx="300" cy="167" r="13" />
          <circle className="teamArtNode" cx="405" cy="84" r="17" />
          <circle className="teamArtNode teamArtNodeSmall" cx="221" cy="207" r="9" />
          <circle className="teamArtNode teamArtNodeSmall" cx="329" cy="245" r="9" />
          <rect className="teamArtPanel" x="48" y="48" width="72" height="38" rx="8" />
          <rect className="teamArtPanel" x="352" y="166" width="94" height="42" rx="8" />
        </svg>
      )}
      {visual === 'warehouse' && (
        <svg viewBox="0 0 500 260">
          <path className="teamArtOutline" d="M92 218V67l158-39 158 39v151" />
          <path className="teamArtRoute" d="M92 111h316M92 163h316M143 86v132m104-132v132m105-132v132" />
          <rect className="teamArtBox" x="111" y="77" width="29" height="26" rx="4" />
          <rect className="teamArtBox teamArtBoxGold" x="155" y="122" width="38" height="35" rx="4" />
          <rect className="teamArtBox" x="269" y="74" width="39" height="34" rx="4" />
          <rect className="teamArtBox teamArtBoxGold" x="361" y="122" width="31" height="35" rx="4" />
          <path className="teamArtRoute teamArtRouteSecondary" d="M74 218h352" />
        </svg>
      )}
      {visual === 'customer' && (
        <svg viewBox="0 0 500 260">
          <path className="teamArtRoute teamArtRouteSecondary" d="M96 191c26-47 63-71 111-71m85 0c48 0 85 24 111 71" />
          <circle className="teamArtPerson" cx="250" cy="91" r="36" />
          <path className="teamArtPersonBody" d="M188 216c5-47 27-70 62-70s57 23 62 70" />
          <circle className="teamArtOrbit" cx="118" cy="104" r="28" />
          <circle className="teamArtOrbit" cx="382" cy="104" r="28" />
          <path className="teamArtChat" d="M94 96h48v30h-20l-12 11v-11h-16z" />
          <path className="teamArtChat" d="M358 96h48v30h-20l-12 11v-11h-16z" />
          <path className="teamArtRoute" d="M106 107h23m-23 9h15m226-9h23m-23 9h15" />
        </svg>
      )}
      {visual === 'visibility' && (
        <svg viewBox="0 0 500 260">
          <rect className="teamArtDashboard" x="83" y="43" width="334" height="174" rx="16" />
          <path className="teamArtDashboardLine" d="M111 78h112m-112 17h74" />
          <rect className="teamArtMetric" x="111" y="119" width="83" height="70" rx="9" />
          <rect className="teamArtMetric" x="207" y="119" width="83" height="70" rx="9" />
          <rect className="teamArtMetric teamArtMetricGold" x="303" y="119" width="83" height="70" rx="9" />
          <path className="teamArtRoute" d="m124 164 17-17 14 10 20-23m48 28 15-15 14 7 19-24m26 24 13-13 12 6 18-21" />
          <circle className="teamArtNode" cx="175" cy="134" r="4" />
          <circle className="teamArtNode" cx="275" cy="129" r="4" />
          <circle className="teamArtNode" cx="369" cy="139" r="4" />
        </svg>
      )}
      <span className="teamIllustrationLabel">{label}</span>
      <span className="teamIllustrationAccent" />
    </div>
  );
}

export default function TeamCarousel() {
  const [paused, setPaused] = useState(false);

  const renderTeamCards = (duplicate = false) => (
    <div className="teamCardGroup" aria-hidden={duplicate || undefined}>
      {teams.map((team) => (
        <article className="teamCard" key={`${duplicate ? 'duplicate-' : ''}${team.title}`}>
          <TeamIllustration visual={team.visual} label={team.visualLabel} />
          <div className="teamCardCopy">
            <span>{team.category}</span>
            <h3>{team.title}</h3>
            <p>{team.body}</p>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="teamCarousel">
      <div className="teamCarouselControls">
        <button
          type="button"
          className="teamCarouselPause"
          aria-label={paused ? 'Resume team carousel' : 'Pause team carousel'}
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>
      <div className={`teamTrackViewport${paused ? ' is-paused' : ''}`}>
        <div className="teamGrid" aria-label="Teams behind AARA operations">
          {renderTeamCards()}
          {renderTeamCards(true)}
        </div>
      </div>
    </div>
  );
}
