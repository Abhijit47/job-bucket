'use server';

import { cache } from 'react';

export const getRegions = cache(async () => {
  const data = (await import('@/data/regionsminified.json')).default;

  return data;
});

export const getCountries = cache(async (regionName: string) => {
  const data = (await import('@/data/countriesminified.json')).default;

  // filter by name
  return data.filter((country) =>
    country.region.toLowerCase().includes(regionName.toLowerCase())
  );
});

export const getStates = cache(async (countryId: number) => {
  const data = (await import('@/data/statesminified.json')).default;

  const country = data.find((state) => state.id === countryId);
  return country?.states ?? [];
});

export const getCities = cache(async (stateId: number) => {
  const data = (await import('@/data/citiesminified.json'))
    .default as unknown as StatesWithCity[];

  const stateData = data.find((state) =>
    state.states.some((s) => s.id === stateId)
  );
  const cityData = stateData?.states.find((s) => s.id === stateId);
  return cityData;
});

export const getLanguages = cache(async () => {
  const data = (await import('@/data/languagesminified.json')).default;

  return data;
});
