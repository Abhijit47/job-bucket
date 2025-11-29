'use server';

export async function getRegions(): Promise<Region[]> {
  const data = (await import('@/data/regionsminified.json')).default;

  return data;
}

// Simple in-memory cache for countries data
let countriesCache: Country[] | null = null;
export async function getCountries(name: string): Promise<Country[]> {
  // const data = (await import('@/data/countriesminified.json')).default;

  // return data;
  if (!countriesCache) {
    countriesCache = (await import('@/data/countriesminified.json')).default;
  }

  // filter by name
  return countriesCache.filter((country) =>
    country.region.toLowerCase().includes(name.toLowerCase())
  );
}

// Simple in-memory cache for states data
let statesCache: State[] | null = null;
export async function getStates(countryId: number) {
  if (!statesCache) {
    statesCache = (await import('@/data/statesminified.json')).default;
  }

  // find states by countryId
  // return data.filter((state) => state.id === countryId);

  const country = statesCache.find((state) => state.id === countryId);
  return country?.states ?? [];
}

export async function getCities(stateId: number) {
  const data = (await import('@/data/citiesminified.json'))
    .default as unknown as StatesWithCity[];

  // find cities by stateId
  // const cities = data.flatMap((state) =>
  //   state.states.filter((s) => s.id === stateId)
  // );

  // return cities[0] ?? null; // Or return the full array if multiple entries are expected;

  const stateData = data.find((state) =>
    state.states.some((s) => s.id === stateId)
  );
  const cityData = stateData?.states.find((s) => s.id === stateId);
  return cityData;
}

export async function getLanguages() {
  const data = (await import('@/data/languagesminified.json')).default;

  return data;
}
