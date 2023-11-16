"use client"

import { redirect } from "next/navigation";
import { Button } from "./ui/button";


function ManageAccountButton({generatePortalLinkAction} : {generatePortalLinkAction: () => Promise<string | void>}) {

  const handleAction = async () => {
    const portalUrl = await generatePortalLinkAction()
    redirect(portalUrl as string);
  }

  return (
    <form action={handleAction}>
      <p className="text-center py-2">Current Subscription</p>
      <Button
        type="submit"
        className="shadow-md w-60 mb-6 rounded-xl bg-oasis-100 text-black"
        variant="outline">
        Manage Billing
      </Button>
    </form>
  )
}

export default ManageAccountButton;
