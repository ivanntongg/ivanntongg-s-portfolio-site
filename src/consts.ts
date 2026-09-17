// Single source of truth for anything that appears in more than one place.
export const SITE = {
  name: 'Ivan Tong',
  role: 'UI/UX Designer',
  // TODO: this is the line to rewrite. Deferred pending the content pass.
  tagline: 'UI/UX Designer building internal systems for teams that still run on spreadsheets.',
  email: 'ivanntongg@gmail.com',
  url: 'https://example.com',
  links: [
    { label: 'Email', href: 'mailto:ivanntongg@gmail.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivantong21/' },
    { label: 'Instagram', href: 'https://www.instagram.com/eyevuhn____/' },
    // TODO: self-host the PDF instead of linking to Drive.
    { label: 'Resume', href: 'https://drive.google.com/file/d/1FYdJtv1iOD9q4NYJpZbFXekNqZCKmM_i/view?usp=sharing' },
  ],
} as const;
