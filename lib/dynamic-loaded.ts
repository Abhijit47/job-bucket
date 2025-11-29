'use server';

export async function getRegions(): Promise<Region[]> {
  const data = (await import('@/data/regionsminified.json')).default;

  return data;
}
export async function getCountries(): Promise<Country[]> {
  const data = (await import('@/data/countriesminified.json')).default;

  return data;
}
export async function getStates(countryId: number) {
  const data = (await import('@/data/statesminified.json')).default;

  // find states by countryId
  return data.filter((state) => state.id === countryId);
}
export async function getCities(stateId: number) {
  const data = (await import('@/data/citiesminified.json'))
    .default as unknown as StatesWithCity[];

  // find cities by stateId
  const cities = data.flatMap((state) =>
    state.states.filter((s) => s.id === stateId)
  );

  return cities[0];
}
export async function getLanguages() {
  const data = (await import('@/data/languagesminified.json')).default;

  return data;
}
