// Company details shared by every page and language. Edit here only.
export const site = {
  name: 'Grandas',
  tagline: { fr: 'Carrelage & Rénovation', en: 'Tiling & Renovation', de: 'Plattenleger & Renovation', it: 'Piastrelle & Ristrutturazioni' },
  owner: 'Grandas Michael',
  address: ['Case Postale 33', '1032 Romanel-sur-Lausanne'],
  region: 'Lausanne',
  phone: '079 631 56 19',
  phoneHref: 'tel:+41796315619',
  email: 'info@grandas.ch',
  hours: { fr: 'Lu–Ve 8h00–12h00 et 13h30–17h00', en: 'Mon–Fri 8:00–12:00 and 13:30–17:00', de: 'Mo–Fr 8:00–12:00 und 13:30–17:00', it: 'Lun–Ven 8:00–12:00 e 13:30–17:00' },
  // Contact form endpoint (Formspree). Log in to Formspree to change the destination e-mail.
  formAction: 'https://formspree.io/f/xldgqzbb',
  // Optional: fill in to show these links in the footer.
  social: { instagram: '', facebook: '' },
} as const;
