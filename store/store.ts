import { LanguagesSupported, Subscription, LanguagesState } from "@/lib/types";
import { create } from "zustand";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  de: "German",
  es: "Spanish",
  fr: "French",
  nl: "Dutch",
  da: "Danish",
  cs: "Czech",
  fil: "Tagalog",
  el: "Greek",
  hi: "Hindi",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  ru: "Russian",
  ro: "Romanian",
  sv: "Swedish",
  uk: "Ukrainian",
  vi: "Vietnamese",
};

export const useLanguageStore = create<LanguagesState>((set) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    if (isPro) {
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];
    }
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      2
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];
    return Object.keys(LanguagesSupportedMap).slice(2) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
