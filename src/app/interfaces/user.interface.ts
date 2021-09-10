export interface User {
  country: string,
  display_name: string,
  email: string,
  explicit_content: { filter_enabled: boolean, filter_locked: boolean; },
  external_urls: { spotify: string; },
  followers: { href: null, total: 0; },
  href: string,
  id: string,
  images: [any],
  product: string,
  type: string,
  uri: string,
}