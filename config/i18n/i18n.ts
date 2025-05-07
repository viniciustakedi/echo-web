import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enContentConfig, ptContentConfig } from "./languages-config";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: enContentConfig,
    pt: ptContentConfig,
  },
});

export default i18n;
