"use client"

import { LanguagesSupported } from "@/lib/types"
import { LanguagesSupportedMap, useLanguageStore, useSubscriptionStore } from "@/store/store"
import { usePathname } from "next/navigation"
import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from "./ui/select"
import LoadingSpinner from "./LoadingSpinner"
import Link from "next/link"

function LanguageSelector() {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] = useLanguageStore(
    (state) => [
    state.language,
    state.setLanguage,
    state.getLanguages,
    state.getNotSupportedLanguages,
  ])
  const subscription = useSubscriptionStore((state) => state.subscription)
  const isPro = subscription?.role === "pro" && subscription?.status === "active"

  const pathName = usePathname()
  const isChatPage = pathName.includes("/chat")



  return  isChatPage && (
    <>
      <Select
        onValueChange={(value: LanguagesSupported) => setLanguage(value)}>
        <SelectTrigger className="w-[150px] text-black dark:text-white">
          <SelectValue
            placeholder={LanguagesSupportedMap[language]}
            className=""/>
        </SelectTrigger>

        <SelectContent>
          {subscription === undefined ? <LoadingSpinner/> :
            <>
              {getLanguages(isPro).map((language) =>(
                <SelectItem key={language} value={language}>
                  {LanguagesSupportedMap[language]}
                </SelectItem>
              ))}
              {getNotSupportedLanguages(isPro).map((language) => (
                <Link href={"/register"} key={language} prefetch={false}>
                  <SelectItem
                    key={language}
                    value={language}
                    disabled
                    className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1">
                      {LanguagesSupportedMap[language]} (PRO)
                    </SelectItem>
                </Link>
              ))}
            </>
          }
        </SelectContent>
      </Select>
    </>
  )
}

export default LanguageSelector