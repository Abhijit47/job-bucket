declare interface Region {
  id: string;
  name: string;
  hasCountries: boolean;
}

declare interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string | null;
  region: string;
  subregion: string;
  latitude: string;
  longitude: string;
  emoji: string;
  hasStates: boolean;
}

declare interface State {
  id: number;
  states: {
    id: number;
    name: string;
    state_code: string;
    hasCities: boolean;
    latitude?: string;
    longitude?: string;
  }[];
}

declare interface StatesWithCity {
  id: number;
  states: {
    id: number;
    cities: {
      id: number;
      name: string;
      latitude: string;
      longitude: string;
    }[];
  }[];
}

declare interface City {
  id: number;
  cities: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
  }[];
}

declare interface KnownLanguage {
  code: string;
  name: string;
  native: string;
}
