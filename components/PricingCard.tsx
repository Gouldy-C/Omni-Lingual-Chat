import { tiers } from "@/lib/data"
import { Card,
        CardContent,
        CardDescription,
        CardFooter,
        CardHeader,
        CardTitle, } from "./ui/card"
import { CheckIcon } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import CheckoutButton from "./CheckoutButton"
import { generatePortalLinkAction } from "@/actions/generatePortalLinkAction"


export default function PricingCard({ redirect } : { redirect : boolean}) {

  return (
    <div className="grid mx-auto max-w-md grid-col-1 gap-8 lg:max-w-6xl lg:grid-cols-3 my-16">
      {tiers.map((tier) => (
        <Card className="rounded-3xl p-2 bg-tiber-950 text-oasis-50 w-full flex flex-col justify-between items-center duration-200 shadow-xl  border-0 shadow-tiber-950/40 dark:bg-livid-brown-950 dark:text-oasis-100 dark:shadow-black/10 hover:scale-105 hover:shadow-slate-900/60 hover:dark:shadow-black/20" key={tier.id}>
          <div>
            <CardHeader >
              <CardDescription className="text-xl dark:text-oasis-100/70 text-white/70">{tier.name}</CardDescription>
              <CardTitle className="text-5xl">{tier.priceMonthly}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tier.description}</p>
            </CardContent>
            <CardFooter>
              <div>
                {tier.features.map((feature, index) => (
                  <div className="flex gap-2 py-2" key={index}>
                    <CheckIcon className="h-6 w-5 flex-none"/>
                    <p className="text-lg">{feature}</p>
                  </div>
                ))}
              </div>
            </CardFooter>
          </div>
          { redirect ? (
            <Link 
              href={"/register"}
              className="">
              <Button 
                className="shadow-md w-60 mb-6 p-0 rounded-xl text-black bg-oasis-100"
                variant="outline">
                Get Started Today
              </Button>
            </Link>
            ) : (
              <CheckoutButton generatePortalLinkAction={generatePortalLinkAction} id={tier.id}/>
            )
          }
        </Card>
      ))}
    </div>
  )
}
