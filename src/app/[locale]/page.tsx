import {useTranslations} from 'next-intl';
 
export default function page() {
  const t = useTranslations('Home');
  return <h1>{t('title')}</h1>;
}