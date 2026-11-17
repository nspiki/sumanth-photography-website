import { InquiryCategory, InquiryFormData } from '../types/wedding';

type FormConfig = {
  action: string;
  entries: Partial<Record<keyof InquiryFormData, string>>;
};

const FORMS: Record<InquiryCategory, FormConfig> = {
  weddings: {
    action:
      'https://docs.google.com/forms/d/e/1FAIpQLSffz2VyTgacn249CbqNWBTdcp0EEGU7YSmelWRRjB_QZKajiQ/formResponse',
    entries: {
      names: 'entry.1964356375',
      email: 'entry.1587396121',
      weddingDate: 'entry.1656869341',
      venueCity: 'entry.1877979316',
      coverageType: 'entry.67238836',
      guestCount: 'entry.1811026618',
      notes: 'entry.425914111',
    },
  },
  candid: {
    action:
      'https://docs.google.com/forms/d/e/1FAIpQLSdzAe6NUfLOczDBRLuGGSQU2UN8C2FrQKq34J8SQERcCapgiQ/formResponse',
    entries: {
      names: 'entry.777906756',
      email: 'entry.1092390830',
      weddingDate: 'entry.1841654559',
      venueCity: 'entry.382724025',
      coverageType: 'entry.94304814',
      notes: 'entry.1309912112',
    },
  },
  travel: {
    action:
      'https://docs.google.com/forms/d/e/1FAIpQLSe30oAo0Yh5M9In7Eg5aqdGj1NJw7ZbOEUjM0zUWQGgdM4aRw/formResponse',
    entries: {
      names: 'entry.1864097506',
      email: 'entry.2108787305',
      weddingDate: 'entry.1440450660',
      venueCity: 'entry.2104150779',
      coverageType: 'entry.840316270',
      notes: 'entry.1729096784',
    },
  },
};

export const submitInquiryToGoogle = async (
  category: InquiryCategory,
  values: InquiryFormData,
) => {
  const form = FORMS[category];
  const body = new URLSearchParams();

  (Object.entries(form.entries) as [keyof InquiryFormData, string][]).forEach(
    ([field, entryId]) => {
      body.set(entryId, values[field] ?? '');
    },
  );

  await fetch(form.action, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
};
