import z from 'zod';

export const locationSchema = z.object({
  region: z
    .object({
      id: z.string(),
      name: z.string().min(1, 'Region is required'),
      hasCountries: z.boolean(),
    })
    .required(),
  country: z
    .object({
      id: z.number(),
      name: z.string().min(1, 'Country is required'),
      code: z.string(),
      hasStates: z.boolean(),
    })
    .required(),
  state: z
    .object({
      id: z.number(),
      name: z.string().min(1, 'State is required'),
      code: z.string(),
      hasCities: z.boolean(),
    })
    .required(),
  city: z
    .object({
      id: z.number(),
      name: z.string().min(1, 'City is required'),
      latitude: z.string().optional(),
      longitude: z.string().optional(),
    })
    .required(),
});

export const languageSchema = z.object({
  code: z.string(),
  name: z.string(),
  native: z.string(),
});

export type LocationValues = z.infer<typeof locationSchema>;
export type LanguageValues = z.infer<typeof languageSchema>;
