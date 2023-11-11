"use client"

import { Button } from "./ui/button"


function CheckoutButton() {


  const createCheckoutSession = async () => {

  }



  return (
    <Button 
      className="shadow-md w-60 mb-6 rounded-xl"
      variant="secondary"
      onClick={() => createCheckoutSession()}>
        Purchase
    </Button>
)
}

export default CheckoutButton