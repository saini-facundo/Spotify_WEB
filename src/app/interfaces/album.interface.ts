export interface Album {
  artists: any[];
  available_markets: string[];
  external_urls: any;
  href: string;
  id: string;
  images: any[];
  name: string;
  release_date: Date;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
  isFav: boolean;
}