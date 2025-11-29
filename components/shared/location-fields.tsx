'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, useTransition } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getCities,
  getCountries,
  getRegions,
  getStates,
} from '@/lib/dynamic-loaded';
import { CandidateProfileFormValues } from '@/lib/zodSchemas/candidate.schema';
import FieldErrorMessageAndDescription from '../../features/candidate/components/field-error-message-and-description';

export default function LocationFields() {
  const [regionsList, setRegionsList] = useState<Region[]>([]);
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [statesList, setStatesList] = useState<State[] | undefined>();
  const [citiesList, setCities] = useState<City | undefined>();

  const [isRegionPending, startRegionTransition] = useTransition();
  const [isCountryPending, startCountryTransition] = useTransition();
  const [isStatePending, startStateTransition] = useTransition();
  const [isCityPending, startCityTransition] = useTransition();

  const form = useFormContext<Pick<CandidateProfileFormValues, 'location'>>();

  const watchRegion = useWatch({
    control: form.control,
    name: 'location.region',
  });
  const watchCountry = useWatch({
    control: form.control,
    name: 'location.country',
  });
  const watchState = useWatch({
    control: form.control,
    name: 'location.state',
  });
  const watchCity = useWatch({
    control: form.control,
    name: 'location.city',
  });

  useEffect(() => {
    startRegionTransition(async () => {
      const data = await getRegions();
      setRegionsList(data);
    });
  }, []);

  useEffect(() => {
    if (watchRegion.hasCountries) {
      startCountryTransition(async () => {
        const data = await getCountries();
        setCountriesList(data);
      });
    }
  }, [watchRegion.hasCountries]);

  useEffect(() => {
    if (watchCountry.hasStates) {
      startStateTransition(async () => {
        const data = await getStates(watchCountry.id);
        setStatesList(data);
      });
    }
  }, [watchCountry.id, watchCountry.hasStates]);

  useEffect(() => {
    if (watchState.hasCities) {
      startCityTransition(async () => {
        const data = await getCities(watchState.id);
        setCities(data);
      });
    }
  }, [watchState.id, watchState.hasCities]);

  return (
    <FieldGroup className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
      <Controller
        name='location.region'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='country'>Region</FieldLabel>
            {isRegionPending ? (
              <Skeleton className={'h-9 w-full animate-pulse'} />
            ) : (
              <Select
                value={JSON.stringify(field.value)}
                onValueChange={(e) => {
                  // before parse check if e is not empty
                  if (e === '') {
                    form.setValue('location.region', {
                      id: '0',
                      name: '',
                      hasCountries: false,
                    });
                    return;
                  }

                  const selectedRegion = JSON.parse(e) as Pick<
                    Region,
                    'id' | 'name' | 'hasCountries'
                  >;
                  field.onChange(selectedRegion);
                }}>
                <SelectTrigger
                  id='country'
                  className='w-full'
                  aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder='Choose a region' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose your region</SelectLabel>
                    {regionsList.map((region) => (
                      <SelectItem
                        key={crypto.randomUUID()}
                        value={JSON.stringify({
                          id: region.id,
                          name: region.name,
                          hasCountries: region.hasCountries,
                        })}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Select your region of residence'
            />
          </Field>
        )}
      />

      <Controller
        name='location.country'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='country'>Country</FieldLabel>
            {isCountryPending ? (
              <Skeleton className={'h-9 w-full animate-pulse'} />
            ) : (
              <Select
                disabled={!watchRegion.hasCountries || isCountryPending}
                value={JSON.stringify(field.value)}
                onValueChange={(e) => {
                  if (e === '') {
                    form.setValue('location.country', {
                      id: 0,
                      name: '',
                      code: '',
                      hasStates: false,
                    });
                    return;
                  }
                  const selectedCountry = JSON.parse(e) as Pick<
                    Country,
                    'id' | 'name' | 'iso2' | 'hasStates'
                  >;
                  field.onChange(selectedCountry);
                }}>
                <SelectTrigger
                  id='country'
                  className='w-full'
                  aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder='Choose a country' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose your country</SelectLabel>
                    {countriesList.map((country) => (
                      <SelectItem
                        key={crypto.randomUUID()}
                        value={JSON.stringify({
                          id: country.id,
                          name: country.name,
                          code: country.iso2,
                          hasStates: country.hasStates,
                        })}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Select your country of residence'
            />
          </Field>
        )}
      />

      <Controller
        name='location.state'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='state'>State/Province</FieldLabel>
            {isStatePending ? (
              <Skeleton className={'h-9 w-full animate-pulse'} />
            ) : (
              <Select
                disabled={!watchCountry.hasStates || isStatePending}
                value={JSON.stringify(field.value)}
                onValueChange={(e) => {
                  if (e === '') {
                    form.setValue('location.state', {
                      id: 0,
                      name: '',
                      code: '',
                      hasCities: false,
                    });
                    return;
                  }

                  const selectedState = JSON.parse(e) as Pick<
                    State['states'][0],
                    'id' | 'name' | 'state_code' | 'hasCities'
                  >;
                  field.onChange(selectedState);
                }}>
                <SelectTrigger
                  id='state'
                  className='w-full'
                  aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder='Choose a state' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose your state/province</SelectLabel>
                    {statesList?.map((state) =>
                      state.states.map((substate) => (
                        <SelectItem
                          key={crypto.randomUUID()}
                          value={JSON.stringify({
                            id: substate.id,
                            name: substate.name,
                            code: substate.state_code,
                            hasCities: substate.hasCities,
                          })}>
                          {substate.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Select your state of residence'
            />
          </Field>
        )}
      />

      <Controller
        name='location.city'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field
            data-invalid={fieldState.invalid}
            aria-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='city'>City/Town</FieldLabel>
            {isCityPending ? (
              <Skeleton className={'h-9 w-full animate-pulse'} />
            ) : (
              <Select
                disabled={!watchState.hasCities || isCityPending}
                value={JSON.stringify(field.value)}
                onValueChange={(e) => {
                  if (e === '') {
                    form.setValue('location.city', {
                      id: 0,
                      name: '',
                      latitude: '',
                      longitude: '',
                    });
                    return;
                  }

                  const selectedCity = JSON.parse(e) as Pick<
                    City['cities'][0],
                    'id' | 'name' | 'latitude' | 'longitude'
                  >;
                  field.onChange(selectedCity);
                }}>
                <SelectTrigger
                  id='city'
                  className='w-full'
                  aria-invalid={fieldState.invalid}>
                  <SelectValue placeholder='Choose a city' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose your city/town</SelectLabel>
                    {citiesList?.cities.map((city) => (
                      <SelectItem
                        key={crypto.randomUUID()}
                        value={JSON.stringify({
                          id: city.id,
                          name: city.name,
                          latitude: city.latitude,
                          longitude: city.longitude,
                        })}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <FieldErrorMessageAndDescription
              error={fieldState.error}
              description='Select your city of residence'
            />
          </Field>
        )}
      />

      <Field>
        <FieldLabel htmlFor='latitude'>Latitude</FieldLabel>
        <Input
          id='latitude'
          placeholder='0.0000'
          defaultValue={watchCity.latitude}
          readOnly
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='longitude'>Longitude</FieldLabel>
        <Input
          id='longitude'
          placeholder='01.00000'
          defaultValue={watchCity.longitude}
          readOnly
        />
      </Field>
    </FieldGroup>
  );
}

export const LazyLocationFields = dynamic(
  () => import('./location-fields').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className={'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div className={'space-y-2'}>
          <Skeleton className={'h-3 w-3/12 animate-pulse'} />
          <Skeleton className={'h-9 w-full animate-pulse'} />
          <Skeleton className={'h-2 w-6/12 animate-pulse'} />
        </div>
        <div className={'space-y-2'}>
          <Skeleton className={'h-3 w-3/12 animate-pulse'} />
          <Skeleton className={'h-9 w-full animate-pulse'} />
          <Skeleton className={'h-2 w-6/12 animate-pulse'} />
        </div>
        <div className={'space-y-2'}>
          <Skeleton className={'h-3 w-3/12 animate-pulse'} />
          <Skeleton className={'h-9 w-full animate-pulse'} />
          <Skeleton className={'h-2 w-6/12 animate-pulse'} />
        </div>
        <div className={'space-y-2'}>
          <Skeleton className={'h-3 w-3/12 animate-pulse'} />
          <Skeleton className={'h-9 w-full animate-pulse'} />
          <Skeleton className={'h-2 w-6/12 animate-pulse'} />
        </div>
        <div className={'space-y-2'}>
          <Skeleton className={'h-3 w-3/12 animate-pulse'} />
          <Skeleton className={'h-9 w-full animate-pulse'} />
          <Skeleton className={'h-2 w-6/12 animate-pulse'} />
        </div>
        <div className={'space-y-2'}>
          <Skeleton className={'h-3 w-3/12 animate-pulse'} />
          <Skeleton className={'h-9 w-full animate-pulse'} />
          <Skeleton className={'h-2 w-6/12 animate-pulse'} />
        </div>
      </div>
    ),
  }
);
