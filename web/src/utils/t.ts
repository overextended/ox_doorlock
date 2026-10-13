import { useLocale } from '../store/locale';

export function t(key: string, args?: Record<string, string | number>): string {
  const locales = useLocale.getState().locales;
  let str = locales[key] ?? key;

  if (args) {
    for (const [k, v] of Object.entries(args)) {
      str = str.replace(new RegExp(`{${k}}`, 'g'), String(v));
    }
  }

  return str;
}
