import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          switchLanguage: "Switch Language",
          dashboardTitle: "Dashboard Content",
          sidebar: "Sidebar"
        }
      },
      ar: {
        translation: {
          switchLanguage: "تغيير اللغة",
          dashboardTitle: "محتوى لوحة التحكم",
          sidebar: "الشريط الجانبي"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;