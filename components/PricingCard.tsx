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


export default function PricingCard({ redirect } : { redirect : boolean}) {
  return (
    <div className="grid mx-auto max-w-md grid-col-1 gap-8 lg:max-w-6xl lg:grid-cols-3 my-16">
      {tiers.map((tier) => (
        <Card className="rounded-3xl p-2 bg-slate-800 text-white w-full flex flex-col justify-between items-center duration-200 shadow-xl  border-0 shadow-slate-900/40 dark:bg-white dark:text-slate-900 dark:shadow-white/10 hover:scale-105 hover:shadow-slate-900/60 hover:dark:shadow-white/20" key={tier.id}>
          <div>
            <CardHeader >
              <CardDescription className="text-xl dark:text-slate-900/70 text-white/70">{tier.name}</CardDescription>
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
            <Button 
              className="shadow-md w-60 mb-6 p-0 rounded-xl"
              variant="secondary">
              <Link 
                href={"/register"}
                className="w-full h-full flex justify-center items-center">
                Get Started Today
              </Link>
            </Button>
            ) : tier.priceMonthly === "Free" ? "" : 
              (
                <CheckoutButton/>
              )
          }
        </Card>
      ))}
    </div>
  )
}
