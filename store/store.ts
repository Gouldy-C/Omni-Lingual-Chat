import { LanguagesSupported, Subscription } from "@/lib/types";
import { create } from 'zustand'


export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  es: "Spanish",
  de: "German",
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
}

interface SubscriptionState {
  subscription: Subscription | null | undefined,
  setSubscription: (subscription: Subscription | null) => void,
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({subscription})
}))
