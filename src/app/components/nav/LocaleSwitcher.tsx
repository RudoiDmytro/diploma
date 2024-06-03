import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import {locales} from '@/config';

export default function LocaleSwitcher() {
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={locale}>
      {locales.map((cur) => (
        <option key={cur} value={cur} className='bg-card text-foreground'>
          {cur}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}