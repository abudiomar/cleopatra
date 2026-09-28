/**
 * Centrale contentlaag.
 *
 * Alle teksten van de site staan hier. Zo kan de klant tekst aanpassen zonder
 * door de componenten te hoeven zoeken, en blijft vertaling naar het Engels
 * later een kwestie van dit bestand dupliceren.
 */

export const site = {
  name: "Cleopatra Professional Cleaning",
  shortName: "Cleopatra",
  legalName: "Cleopatra Professional Cleaning",
  tagline: "Professional cleaning for private and business clients",
  description:
    "Cleopatra Professional Cleaning provides professional cleaning for private and business clients in Amsterdam, Rotterdam, Utrecht, The Hague, and Eindhoven. Environmentally friendly, flexible, and with controlled quality.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleopatra-professioneleschoonmaak.nl",
  locale: "nl_NL",
} as const;

export const contact = {
  phone: "0685093090",
  phoneDisplay: "06 8509 3090",
  phoneHref: "tel:+31685093090",
  whatsapp: "+31614956713",
  whatsappDisplay: "06 1495 6713",
  whatsappHref: "https://wa.me/31614956713",
  email: "info@cleopatraschoonmaak.nl",
  emailHref: "mailto:info@cleopatraschoonmaak.nl",
  kvk: "",
  btw: "",
  hours: [
    { days: "Monday t/m Friday", time: "08:00 – 18:00" },
    { days: "Saturday", time: "09:00 – 16:00" },
    { days: "Sunday", time: "On appointment" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About us", href: "/about us" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Cleaning in the Randstad and beyond",
  title: "An environment that makes sense,every day,",
  titleAcceebnt: "every single day",
  intro:
    "Cleopatra Professional Cleaning Cleopatra Professional Cleaning takes care of cleaning homes, offices, and commercial spaces. Fixed team, regular appointments, and results you don't have to worry about anymore.",
  primaryCta: { label: "Request a quote", href: "/contact" },
  secondaryCta: { label: "View our services", href: "/services" },
  stats: [
    { value: "5", label: "cities in our service area" },
    { value: "100%", label: "environmentally friendly products" },
    { value: "24h", label: "response time to an inquiry" },
  ], 
} as const;

export const usps = [
  {
    title: "Environmentally friendly cleaning methods",
    body:
      "We work exclusively with biodegradable products and techniques that are safe for children, pets, and your staff. Clean without harsh chemical fumes, and without burdening the environment.",
    icon: "leaf",
  },
  {
    title: "Flexible service provision",
    body:
      "Your schedule is the starting point, not ours. We come early in the morning, after closing time, or on weekends — weekly, biweekly, or as a one-time service at delivery or relocation.",
    icon: "clock",
  },
  {
    title: "Thorough quality control",
    body:
      "Each order is checked off according to a fixed checklist and periodically reviewed by a team leader. If something doesn't add up, we fix it before you notice.",
    icon: "shield",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  name: string;
  audience: "Private" | "Business" | "Private & Business";
  summary: string;
  body: string;
  includes: string[];
  icon: string;
};

export const services: Service[] = [
  {
    slug: "residential cleaning",
    name: "Residential Cleaning",
    audience: "Private",
    summary:
      "A fixed face that takes care of your home on a weekly or bi-weekly basis.",
    body:
      "We discuss with you what happens and how often. The same employee comes back, knows your house and knows where the attention should go. No changing intruders, no explanation you have to give every time again.",
    includes: [
      "Kitchen, bathroom and toilets",
      "Vacuuming and dusting all floors",
      "Dusting furniture and surfaces",
      "Windows on the interior side",
      "Beds made upon request",
    ],
    icon: "home",
  },
  {
    slug: "office and business cleaning",
    name: "Office and Business Cleaning",
    audience: "Business",
    summary:
      "Daily or weekly maintenance of offices, practices and business spaces.",
    body:
      "We plan outside your working hours, so your team can walk into a finished space in the morning. A fixed contact person, clear job description, and one invoice per month.",
    includes: [
      "Workplaces, meeting rooms and reception",
      "Pantry, coffee corner and sanitary facilities",
      "Waste management and separation",
      "Refilling of consumable items",
      "Periodieke dieptereiniging",
    ],
    icon: "building",
  },
  {
    slug: "completion cleaning",
    name: "Completion Cleaning",
    audience: "Private & Business",
    summary:
      "When a property is ready for occupancy, we ensure it's spotless.",
    body:
      "We deliver the property exactly how the landlord or real estate agent wants to see it: window frames, baseboards, inside of cabinets, lime scale, and glue residues. Including a final check, so you can hand over the keys without any discussion.",
    includes: [
      "Full cleaning of all rooms", 
      "Inside of cabinets, drawers, and equipment", 
      "Frames, baseboards, doors, and switches", 
      "Removing lime and glue residues",
       "Final inspection with handover report"
    ],
    icon: "sparkle",
  },
  {
    slug: "window cleaning",
    name: "Window Cleaning",
    audience: "Private & Business",
    summary: "Windows inside and outside, streak-free and at agreed frequencies.",
    body:
      "From a house to a building with multiple floors. We work with pure water and telescopic systems, ensuring no streaks remain and no ladder is needed against your facade.",
    includes: [
      "Windows inside and outside",
      "Frames and window sills",
      "Glass facades and entrances",
      "Fixed frequency or single turn",
    ],
    icon: "window",
  },
  {
    slug: "floor maintenance",
    name: "Floor Maintenance",
    audience: "Business",
    summary: "Deep cleaning, crystallizing and coating of hard floors.",
    body:
      "A floor that becomes dull is almost never worn out — it is saturated. We remove old layers and apply a new protective layer, making daily maintenance easier afterwards.",
    includes: [
      "Deep cleaning of PVC, linoleum and tiles",
      "Removal of old wax layers",
      "Application of protective coating",
      "Maintenance advice for your team",
    ],
    icon: "layers",
  },
  {
    slug: "specialist cleaning",
    name: "Specialist Cleaning",
    audience: "Private & Business",
    summary:
      "Construction debris, grease buildup, furniture cleaning, and other tasks outside the routine.",
    body:
      "Not every job fits into a standard package. Building completion, a kitchen after a renovation, upholstered furniture, or a property that has been empty for a long time — tell us what's going on and we'll come take a look.",
    includes: [
      "Building and renovation materials, Degreasing kitchens and ventilation ducts,  Cleaning carpets and upholstery, Disinfecting spaces."
    ],
    icon: "wrench",
  },
];

/* ------------------------------------------------------------------ */
/* Working method                                                          */
/* ------------------------------------------------------------------ */

// NOTE: don't call it 'process' — that shadows the Node-global used above for process.env.
export const workflow = [
  {
    step: "01",
    title: "Request",
    body:
      "You tell us briefly what you're looking for, via the form or by phone. We respond within one business day.",
  },
  {
    step: "02",
    title: "Site Visit",
    body:
      "We stop by, check out the space, and ask the right questions. That way we know exactly what's needed — and you know who's coming.",
  },
  {
    step: "03",
    title: "Proposal and Planning",
    body:
      "You get a clear quote with a job description and a fixed price. No surprises later.",
  },
  {
    step: "04",
    title: "Execution and Control",
    body:
      "Your fixed team gets to work. The team leader checks periodically and sends updates when needed.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
 title: "Cleaning is trust, not a transaction",
 intro:
 "We come to your home or workplace when you're not there. That requires people you know and agreements that are reliable.",
  paragraphs: [
    "Cleopatra Professional Cleaning is built around a simple idea: a customer doesn’t want a cleaning company, a customer wants a space that feels right without having to think about it. That only works if the same people come back, know the space, and are proud of what they leave behind.",
    "That’s why we work with dedicated teams for each client instead of a pool of substitutes. Our employees are hired, trained, and paid for the work they do. Organizing it this way is more expensive, and that’s exactly why the results stay consistent.",
    "We serve private clients in and around the Randstad and business clients from offices to practice spaces. Small enough to know you personally, big enough to keep going even during illness or vacations.",
  ],
  values: [
    {
      title: "Regular People", body: "The same team every time. They know your space and your preferences."
    },
    {
      title: "Clear Agreements",
      body: "A written job description and a fixed price. No small print.",
    },
    {
      title: "Insured and Screened",
      body: "All employees are employed, screened, and covered by our liability insurance.",
    },
    {
      title: "Collaborative Approach",
      body: "Do you see something that needs attention? You'll hear about it, even if it's not in the order.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
    "Impeccable service. Our house shines over and over again, and it's always the same familiar face that comes by.",
    name: "Eva Jansen",
    role: "Private customer, Amsterdam" 
  },
  {
    quote:
    "Cleopatra delivers excellent work. Our office is always ready in the morning, and the communication goes through a single contact person.",
    name: "Mark de Vries",
    role: "Office Manager, Rotterdam"
  },
  {
    quote:
      "When our property was handed over, they made the difference. The landlord had no remarks at all.",
      name: "Sanne Bakker",
      role: "Business client, Utrecht"
        },
] as const;

/* ------------------------------------------------------------------ */
/* Werkgebied                                                          */
/* ------------------------------------------------------------------ */

export const locations = [
  { city: "Amsterdam", region: "North Holland" },
  { city: "Rotterdam", region: "South Holland" },
  { city: "Utrecht", region: "Utrecht" },
  { city: "The Hague", region: "South Holland" },
  { city: "Eindhoven", region: "North Brabant" },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faq = [
  {
   question: "Do you work with permanent staff?",
answer: "Yes. You will be assigned a permanent team that returns for each cleaning. In case of vacation or illness, we arrange substitutes who are already familiar with your location.",
},
{
question: "How much does cleaning cost with you?",
answer: "That depends on the area, frequency, and type of work. So we first come by and then give a fixed price per visit or per month, so you know exactly what to expect in advance.",
},
{
question: "Do I need to provide cleaning supplies myself?",
answer: "No. We bring our own eco-friendly supplies and materials. If you prefer a specific product, of course we can use that.",
},
{
question: "Are you insured?",
answer: "All staff are employed and covered by our business liability insurance. If anything unfortunately gets damaged, it's taken care of.",
},
{
question: "How quickly can you start?",
answer: "We respond within one business day to your aUsually, we schedule an on-site meeting within a week of the request. After that, in most cases, we can start within two weeks."


  },
  {
    question: "Can I book a one-time cleaning?",
    answer: "Sure. We also do final cleaning, construction dust after a renovation, or a big spring cleaning as a one-off job, no subscription needed."
  },
] as const;
