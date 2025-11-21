/**
 * ⚠️⚠️⚠️ WARNING ⚠️⚠️⚠️
 * BE CAREFUL WHEN EDITING THIS FILE
 * This file contains constant arrays used across the application.
 * Any changes here may affect multiple parts of the system.
 * Ensure to review dependencies before making modifications.
 */

import { generateCurrencies } from '@/lib/utils';

// 1.
export const roles = ['admin', 'employer', 'candidate', 'guest'] as const;

// 2.
export const maritalStatus = [
  'single',
  'married',
  'divorced',
  'widowed',
] as const;

// 3.
export const genders = ['male', 'female', 'other'] as const;

// 4.
export const nationalities = [
  'Afghan',
  'Albanian',
  'Algerian',
  'American',
  'Andorran',
  'Angolan',
  'Antiguans',
  'Argentinean',
  'Armenian',
  'Australian',
  'Austrian',
  'Azerbaijani',
  'Bahamian',
  'Bahraini',
  'Bangladeshi',
  'Barbadian',
  'Barbudans',
  'Batswana',
  'Belarusian',
  'Belgian',
  'Belizean',
  'Beninese',
  'Bhutanese',
  'Bolivian',
  'Bosnian',
  'Brazilian',
  'British',
  'Bruneian',
  'Bulgarian',
  'Burkinabe',
  'Burmese',
  'Burundian',
  'Cambodian',
  'Cameroonian',
  'Canadian',
  'Cape Verdean',
  'Central African',
  'Chadian',
  'Chilean',
  'Chinese',
  'Colombian',
  'Comoran',
  'Congolese',
  'Costa Rican',
  'Croatian',
  'Cuban',
  'Cypriot',
  'Czech',
  'Danish',
  'Djibouti',
  'Dominican',
  'Dutch',
  'East Timorese',
  'Ecuadorean',
  'Egyptian',
  'Emirian',
  'Equatorial Guinean',
  'Eritrean',
  'Estonian',
  'Ethiopian',
  'Fijian',
  'Filipino',
  'Finnish',
  'French',
  'Gabonese',
  'Gambian',
  'Georgian',
  'German',
  'Ghanaian',
  'Greek',
  'Grenadian',
  'Guatemalan',
  'GuineaBissauan',
  'Guinean',
  'Guyanese',
  'Haitian',
  'Herzegovinian',
  'Honduran',
  'Hungarian',
  'IKiribati',
  'Icelander',
  'Indian',
  'Indonesian',
  'Iranian',
  'Iraqi',
  'Irish',
  'Israeli',
  'Italian',
  'Ivorian',
  'Jamaican',
  'Japanese',
  'Jordanian',
  'Kazakhstani',
  'Kenyan',
  'Kittian and Nevisian',
  'Kuwaiti',
  'Kyrgyz',
  'Laotian',
  'Latvian',
  'Lebanese',
  'Liberian',
  'Libyan',
  'Liechtensteiner',
  'Lithuanian',
  'Luxembourger',
  'Macedonian',
  'Malagasy',
  'Malawian',
  'Malaysian',
  'Maldivian',
  'Malian',
  'Maltese',
  'Marshallese',
  'Mauritanian',
  'Mauritian',
  'Mexican',
  'Micronesian',
  'Moldovan',
  'Monacan',
  'Mongolian',
  'Moroccan',
  'Mosotho',
  'Motswana',
  'Mozambican',
  'Namibian',
  'Nauruan',
  'Nepalese',
  'New Zealander',
  'NiVanuatu',
  'Nicaraguan',
  'Nigerian',
  'Nigerien',
  'North Korean',
  'Northern Irish',
  'Norwegian',
  'Omani',
  'Pakistani',
  'Palauan',
  'Panamanian',
  'Papua New Guinean',
  'Paraguayan',
  'Peruvian',
  'Polish',
  'Portuguese',
  'Qatari',
  'Romanian',
  'Russian',
  'Rwandan',
  'Saint Lucian',
  'Salvadoran',
  'Samoan',
  'San Marinese',
  'Sao Tomean',
  'Saudi',
  'Scottish',
  'Senegalese',
  'Serbian',
  'Seychellois',
  'Sierra Leonean',
  'Singaporean',
  'Slovakian',
  'Slovenian',
  'Solomon Islander',
  'Somali',
  'South African',
  'South Korean',
  'Spanish',
  'Sri Lankan',
  'Sudanese',
  'Surinamer',
  'Swazi',
  'Swedish',
  'Swiss',
  'Syrian',
  'Taiwanese',
  'Tajik',
  'Tanzanian',
  'Thai',
  'Togolese',
  'Tongan',
  'Trinidadian or Tobagonian',
  'Tunisian',
  'Turkish',
  'Tuvaluan',
  'Ugandan',
  'Ukrainian',
  'Uruguayan',
  'Uzbekistani',
  'Venezuelan',
  'Vietnamese',
  'Welsh',
  'Yemenite',
  'Zambian',
  'Zimbabwean',
] as const;

// 5.
export const currencies = generateCurrencies();

// 6.
export const salaryPeriods = ['yearly', 'monthly', 'hourly'] as const;

// 7.
export const qualifications = [
  'none',
  'high_school',
  'associate_degree',
  'bachelor_degree',
  'master_degree',
  'doctorate_degree',
] as const;

// 8.
export const jobTags = [
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'React', label: 'React' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'CSS', label: 'CSS' },
  { value: 'HTML', label: 'HTML' },
  { value: 'Python', label: 'Python' },
  { value: 'Django', label: 'Django' },
  { value: 'Ruby on Rails', label: 'Ruby on Rails' },
  { value: 'Java', label: 'Java' },
  { value: 'Spring', label: 'Spring' },
  { value: 'C#', label: 'C#' },
  { value: '.NET', label: '.NET' },
  { value: 'PHP', label: 'PHP' },
  { value: 'Laravel', label: 'Laravel' },
  { value: 'Go', label: 'Go' },
  { value: 'Rust', label: 'Rust' },
  { value: 'Kubernetes', label: 'Kubernetes' },
  { value: 'Docker', label: 'Docker' },
  { value: 'AWS', label: 'AWS' },
  { value: 'Azure', label: 'Azure' },
  { value: 'GCP', label: 'GCP' },
] as const;

// extract the value
export const jobTagValues = jobTags.map((tag) => tag.value) as ReadonlyArray<
  (typeof jobTags)[number]['value']
>;

// 9.
export const jobLevels = [
  'internship',
  'entry_level',
  'junior_level',
  'associate',
  'mid_senior_level',
  'senior_level',
  'lead',
  'manager',
  'director',
  'executive',
] as const;

// 10.
export const jobTypes = ['on_site', 'remote', 'hybrid'] as const;

// 11.
export const workTypes = [
  'full_time',
  'part_time',
  'contract',
  'temporary',
  'volunteer',
  'internship',
  'other',
] as const;

// 12.
export const applicationStatus = [
  'pending',
  'under_review',
  'interview_scheduled',
  'offered',
  'rejected',
  'hired',
] as const;

// 13.
export const interviewStatuses = [
  'scheduled',
  'completed',
  'canceled',
  'rescheduled',
] as const;

// 14.
export const jobBenifits = [
  'health_insurance',
  'dental_insurance',
  'vision_insurance',
  'retirement_plan',
  'paid_time_off',
  'flexible_schedule',
  'remote_work_options',
  'professional_development',
  'wellness_programs',
  'commuter_benefits',
  'childcare_assistance',
  'employee_assistance_programs',
  'stock_options',
  'performance_bonus',
  'tuition_reimbursement',
  'life_insurance',
  'disability_insurance',
  'learning_budget',
] as const;

export const organizationTypes = [
  'Public Company',
  'Private Company',
  'Non-Profit',
  'Government Agency',
  'Partnership',
  'Sole Proprietorship',
] as const; // extend as needed

export const locales = [
  'en-US',
  'es-ES',
  'fr-FR',
  'de-DE',
  'zh-CN',
  'ja-JP',
  'ru-RU',
  'ar-SA',
  'pt-BR',
  'hi-IN',
] as const; // extend as needed

export const experiences = [
  'No experience',
  '1 year',
  '2 years',
  '3 years',
  '4 years',
  '5+ years',
  '10+ years',
] as const;

export const vacancies = [
  '1 vacancy',
  '2 vacancies',
  '3 vacancies',
  '4 vacancies',
  '5 vacancies',
  '6 vacancies',
  '7 vacancies',
  '8 vacancies',
  '9 vacancies',
  '10+ vacancies',
] as const;

// Type Definitions
export type Role = (typeof roles)[number];
export type MaritalStatus = (typeof maritalStatus)[number];
export type Gender = (typeof genders)[number];
export type Nationality = (typeof nationalities)[number];
export type SalaryPeriod = (typeof salaryPeriods)[number];
export type Qualification = (typeof qualifications)[number];
export type JobTag = (typeof jobTags)[number]['value'];
export type JobLevel = (typeof jobLevels)[number];
export type JobType = (typeof jobTypes)[number];
export type JobBenifit = (typeof jobBenifits)[number];
export type InterviewStatus = (typeof interviewStatuses)[number];
export type ApplicationStatus = (typeof applicationStatus)[number];
export type WorkType = (typeof workTypes)[number];
export type OrganizationType = (typeof organizationTypes)[number];
export type Locale = (typeof locales)[number];
export type Experience = (typeof experiences)[number];
export type Vacancy = (typeof vacancies)[number];
