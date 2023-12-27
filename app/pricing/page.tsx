import PricingCard from "@/components/PricingCard";


export default function PricingPage() {
  return (
    <div className="m-5">
      <h1>Pricing</h1>
      <PricingCard redirect={true} />
    </div>
  )
}
