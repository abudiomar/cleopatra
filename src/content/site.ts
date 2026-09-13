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
  tagline: "Professionele schoonmaak voor particulier en zakelijk",
  description:
    "Cleopatra Professional Cleaning verzorgt professionele schoonmaak voor particuliere en zakelijke klanten in Amsterdam, Rotterdam, Utrecht, Den Haag en Eindhoven. Milieuvriendelijk, flexibel en met gecontroleerde kwaliteit.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cleopatraschoonmaak.nl",
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
    { days: "Maandag t/m vrijdag", time: "08:00 – 18:00" },
    { days: "Zaterdag", time: "09:00 – 16:00" },
    { days: "Zondag", time: "Op afspraak" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Diensten", href: "/diensten" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Schoonmaak in de Randstad en daarbuiten",
  title: "Een omgeving die klopt,",
  titleAccent: "elke dag opnieuw",
  intro:
    "Cleopatra Professional Cleaning verzorgt de schoonmaak van woningen, kantoren en bedrijfspanden. Vast team, vaste afspraken en een resultaat waar u niet meer over na hoeft te denken.",
  primaryCta: { label: "Offerte aanvragen", href: "/contact" },
  secondaryCta: { label: "Bekijk onze diensten", href: "/diensten" },
  stats: [
    { value: "5", label: "steden in ons werkgebied" },
    { value: "100%", label: "milieuvriendelijke middelen" },
    { value: "24u", label: "reactietijd op een aanvraag" },
  ],
} as const;

export const usps = [
  {
    title: "Milieuvriendelijke reinigingsmethoden",
    body:
      "Wij werken uitsluitend met biologisch afbreekbare middelen en technieken die veilig zijn voor kinderen, huisdieren en uw personeel. Schoon zonder scherpe chemische lucht, en zonder belasting voor het milieu.",
    icon: "leaf",
  },
  {
    title: "Flexibele dienstverlening",
    body:
      "Uw rooster is het uitgangspunt, niet het onze. Wij komen 's ochtends vroeg, na sluitingstijd of in het weekend — wekelijks, tweewekelijks of eenmalig bij oplevering of verhuizing.",
    icon: "clock",
  },
  {
    title: "Grondige kwaliteitscontrole",
    body:
      "Elke opdracht wordt afgetekend aan de hand van een vaste checklist en periodiek gecontroleerd door een teamleider. Wat niet klopt, lossen wij op vóór u het opmerkt.",
    icon: "shield",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Diensten                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  name: string;
  audience: "Particulier" | "Zakelijk" | "Particulier & zakelijk";
  summary: string;
  body: string;
  includes: string[];
  icon: string;
};

export const services: Service[] = [
  {
    slug: "woningschoonmaak",
    name: "Woningschoonmaak",
    audience: "Particulier",
    summary:
      "Een vast gezicht dat uw woning wekelijks of tweewekelijks onder handen neemt.",
    body:
      "U spreekt met ons af wat er gebeurt en hoe vaak. Dezelfde medewerker komt terug, kent uw huis en weet waar de aandacht naartoe moet. Geen wisselende invalkrachten, geen uitleg die u elke keer opnieuw moet geven.",
    includes: [
      "Keuken, sanitair en toiletten",
      "Stofzuigen en dweilen van alle vloeren",
      "Stofvrij maken van meubels en oppervlakken",
      "Ramen aan de binnenzijde",
      "Bedden verschonen op verzoek",
    ],
    icon: "home",
  },
  {
    slug: "kantoorschoonmaak",
    name: "Kantoor- en bedrijfsschoonmaak",
    audience: "Zakelijk",
    summary:
      "Dagelijks of wekelijks onderhoud van kantoren, praktijken en bedrijfsruimtes.",
    body:
      "Wij plannen buiten uw werktijden, zodat uw team 's ochtends binnenkomt in een pand dat af is. Vaste contactpersoon, heldere werkomschrijving en één factuur per maand.",
    includes: [
      "Werkplekken, vergaderruimtes en receptie",
      "Pantry, koffiecorner en sanitair",
      "Afvalbeheer en scheiding",
      "Aanvullen van verbruiksartikelen",
      "Periodieke dieptereiniging",
    ],
    icon: "building",
  },
  {
    slug: "opleverschoonmaak",
    name: "Opleveringsschoonmaak",
    audience: "Particulier & zakelijk",
    summary:
      "Bij verhuizing, verkoop of einde huurcontract — bezemschoon is niet genoeg.",
    body:
      "Wij leveren het pand op zoals de verhuurder of makelaar het wil zien: kozijnen, plinten, binnenkant van kasten, kalkaanslag en lijmresten. Inclusief eindcontrole, zodat u de sleutel zonder discussie kunt overdragen.",
    includes: [
      "Volledige reiniging van alle ruimtes",
      "Binnenkant kasten, laden en apparatuur",
      "Kozijnen, plinten, deuren en schakelaars",
      "Kalk- en lijmresten verwijderen",
      "Eindcontrole met opleverrapport",
    ],
    icon: "sparkle",
  },
  {
    slug: "glasbewassing",
    name: "Glasbewassing",
    audience: "Particulier & zakelijk",
    summary: "Ramen binnen en buiten, streeploos en op afgesproken frequentie.",
    body:
      "Van een woonhuis tot een pui van meerdere verdiepingen. Wij werken met zuiver water en telescoopsystemen, zodat er geen strepen achterblijven en er geen ladder tegen uw gevel hoeft.",
    includes: [
      "Ramen binnen- en buitenzijde",
      "Kozijnen en vensterbanken",
      "Glazen puien en entrees",
      "Vaste frequentie of losse beurt",
    ],
    icon: "window",
  },
  {
    slug: "vloeronderhoud",
    name: "Vloeronderhoud",
    audience: "Zakelijk",
    summary: "Dieptereiniging, kristalliseren en coaten van harde vloeren.",
    body:
      "Een vloer die dof wordt, is bijna nooit versleten — hij is verzadigd. Wij halen oude lagen eruit en brengen een nieuwe beschermlaag aan, waardoor dagelijks onderhoud daarna weer eenvoudig wordt.",
    includes: [
      "Dieptereiniging van pvc, linoleum en tegels",
      "Verwijderen van oude waslagen",
      "Aanbrengen van beschermende coating",
      "Onderhoudsadvies voor uw team",
    ],
    icon: "layers",
  },
  {
    slug: "specialistische-reiniging",
    name: "Specialistische reiniging",
    audience: "Particulier & zakelijk",
    summary:
      "Bouwstof, vetaanslag, meubelreiniging en andere klussen buiten de routine.",
    body:
      "Niet elke opdracht past in een standaardpakket. Bouwoplevering, een keuken na een verbouwing, gestoffeerde meubels of een pand dat lang heeft leeggestaan — vertel ons wat er speelt en wij komen kijken.",
    includes: [
      "Bouw- en verbouwingsstof",
      "Ontvetten van keukens en afzuiging",
      "Reiniging van tapijt en stoffering",
      "Desinfectie van ruimtes",
    ],
    icon: "wrench",
  },
];

/* ------------------------------------------------------------------ */
/* Werkwijze                                                           */
/* ------------------------------------------------------------------ */

// LET OP: niet 'process' noemen — dat schaduwt de Node-global die
// hierboven wordt gebruikt voor process.env.
export const workflow = [
  {
    step: "01",
    title: "Aanvraag",
    body:
      "U vertelt ons kort wat u zoekt, via het formulier of per telefoon. Wij reageren binnen één werkdag.",
  },
  {
    step: "02",
    title: "Kennismaking op locatie",
    body:
      "Wij komen langs, bekijken de ruimte en stellen de juiste vragen. Zo weten we precies wat er nodig is — en u weet wie er komt.",
  },
  {
    step: "03",
    title: "Voorstel en planning",
    body:
      "U krijgt een heldere offerte met een werkomschrijving en een vaste prijs. Geen verrassingen achteraf.",
  },
  {
    step: "04",
    title: "Uitvoering en controle",
    body:
      "Uw vaste team gaat aan de slag. De teamleider controleert periodiek en stuurt bij waar nodig.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Over ons                                                            */
/* ------------------------------------------------------------------ */

export const about = {
  title: "Schoonmaak is vertrouwen, geen transactie",
  intro:
    "Wij komen in uw huis of op uw werkplek als u er niet bent. Dat vraagt om mensen die u kent en om afspraken die kloppen.",
  paragraphs: [
    "Cleopatra Professional Cleaning is opgebouwd rond een eenvoudig idee: een klant wil geen schoonmaakbedrijf, een klant wil een ruimte die klopt zonder erover na te hoeven denken. Dat lukt alleen als dezelfde mensen terugkomen, de ruimte kennen en trots zijn op wat ze achterlaten.",
    "Daarom werken wij met vaste teams per klant in plaats van een pool van invalkrachten. Onze medewerkers zijn in dienst, worden opgeleid en krijgen betaald voor het werk dat ze leveren. Dat is duurder om te organiseren, en het is precies waarom het resultaat consistent blijft.",
    "Wij bedienen particuliere klanten in en rond de Randstad en zakelijke opdrachtgevers van kantoren tot praktijkruimtes. Klein genoeg om u persoonlijk te kennen, groot genoeg om ook bij ziekte of vakantie gewoon door te draaien.",
  ],
  values: [
    {
      title: "Vaste mensen",
      body: "Hetzelfde team bij elke beurt. Zij kennen uw ruimte en uw voorkeuren.",
    },
    {
      title: "Duidelijke afspraken",
      body: "Een schriftelijke werkomschrijving en een vaste prijs. Geen kleine lettertjes.",
    },
    {
      title: "Verzekerd en gescreend",
      body: "Alle medewerkers zijn in dienst, gescreend en gedekt door onze bedrijfsaansprakelijkheid.",
    },
    {
      title: "Meedenken",
      body: "Ziet ons team iets dat aandacht nodig heeft? Dan hoort u dat, ook als het niet in de opdracht staat.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      "Onberispelijke service. Ons huis glanst keer op keer, en het is altijd hetzelfde vertrouwde gezicht dat langskomt.",
    name: "Eva Jansen",
    role: "Particuliere klant, Amsterdam",
  },
  {
    quote:
      "Cleopatra levert uitstekend werk. Ons kantoor is 's ochtends altijd af en de communicatie verloopt via één vast aanspreekpunt.",
    name: "Mark de Vries",
    role: "Officemanager, Rotterdam",
  },
  {
    quote:
      "Bij de oplevering van ons pand hebben zij het verschil gemaakt. De verhuurder had geen enkele opmerking.",
    name: "Sanne Bakker",
    role: "Zakelijke klant, Utrecht",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Werkgebied                                                          */
/* ------------------------------------------------------------------ */

export const locations = [
  { city: "Amsterdam", region: "Noord-Holland" },
  { city: "Rotterdam", region: "Zuid-Holland" },
  { city: "Utrecht", region: "Utrecht" },
  { city: "Den Haag", region: "Zuid-Holland" },
  { city: "Eindhoven", region: "Noord-Brabant" },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faq = [
  {
    question: "Werken jullie met vaste medewerkers?",
    answer:
      "Ja. U krijgt een vast team toegewezen dat bij elke beurt terugkomt. Bij vakantie of ziekte regelen wij vervanging die vooraf is ingewerkt op uw locatie.",
  },
  {
    question: "Wat kost schoonmaak bij jullie?",
    answer:
      "Dat hangt af van de oppervlakte, de frequentie en het soort werk. Wij komen daarom eerst langs en geven daarna een vaste prijs per beurt of per maand, zodat u vooraf precies weet waar u aan toe bent.",
  },
  {
    question: "Moet ik zelf schoonmaakmiddelen leveren?",
    answer:
      "Nee. Wij nemen onze eigen milieuvriendelijke middelen en materialen mee. Gebruikt u liever een specifiek product, dan werken wij daar uiteraard mee.",
  },
  {
    question: "Zijn jullie verzekerd?",
    answer:
      "Alle medewerkers zijn in dienst en gedekt door onze bedrijfsaansprakelijkheidsverzekering. Mocht er onverhoopt iets beschadigd raken, dan is dat geregeld.",
  },
  {
    question: "Hoe snel kunnen jullie beginnen?",
    answer:
      "Wij reageren binnen één werkdag op uw aanvraag en plannen doorgaans binnen een week een kennismaking op locatie. Daarna kunnen we in de meeste gevallen binnen twee weken starten.",
  },
  {
    question: "Kan ik een eenmalige schoonmaak boeken?",
    answer:
      "Zeker. Opleveringsschoonmaak, bouwstof na een verbouwing of een grote voorjaarsbeurt doen wij ook als losse opdracht, zonder abonnement.",
  },
] as const;
