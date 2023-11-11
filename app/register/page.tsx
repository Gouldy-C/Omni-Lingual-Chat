import PricingCard from '@/components/PricingCard'
import { getServerSession } from 'next-auth'
import React from 'react'

async function RegistrationPage() {
  const session = await getServerSession()

  return (
    <div>
      <PricingCard redirect={false}/>
    </div>
  )
}

export default RegistrationPage