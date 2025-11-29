import z from 'zod';

export const defaultRegion = { id: '0', name: '', hasCountries: false };
export const defaultCountry = {
  id: 0,
  name: '',
  code: '',
  hasStates: false,
};
export const defaultState = {
  id: 0,
  name: '',
  code: '',
  hasCities: false,
};
export const defaultCity = {
  id: 0,
  name: '',
  latitude: '',
  longitude: '',
};

export const defaultLanguage = { code: '', name: '', native: '' };

export const locationSchema = z.object({
  region: z.object({
    id: z.string(),
    name: z.string().min(1, 'Region is required'),
    hasCountries: z.boolean(),
  }),
  country: z.object({
    id: z.number(),
    name: z.string().min(1, 'Country is required'),
    code: z.string(),
    hasStates: z.boolean(),
  }),
  state: z.object({
    id: z.number(),
    name: z.string().min(1, 'State is required'),
    code: z.string(),
    hasCities: z.boolean(),
  }),
  city: z.object({
    id: z.number(),
    name: z.string().min(1, 'City is required'),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
  }),
});

export const languageSchema = z.object({
  code: z.string(),
  name: z.string(),
  native: z.string(),
});

export type LocationValues = z.infer<typeof locationSchema>;
export type LanguageValues = z.infer<typeof languageSchema>;
