"use client";

import React, { useState, useEffect } from "react";
import "./i18n";
import { useTranslation } from "react-i18next";
import { languagesMap, LanguagesSupported } from "./languages-config";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem(
      "preferredLanguage"
    ) as LanguagesSupported;

    if (storedLang && languagesMap.some((lang) => lang.value === storedLang)) {
      i18n.changeLanguage(storedLang).finally(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className={isLoaded ? "i18n-loaded" : "i18n-loading"}>
      {!isLoaded ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
