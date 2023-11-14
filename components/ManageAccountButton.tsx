"use client"

import { redirect } from "next/navigation";
import { Button } from "./ui/button";


function ManageAccountButton({generatePortalLinkAction} : {generatePortalLinkAction: () => string}) {

  const handleAction = async () => {
    const portalUrl = await generatePortalLinkAction()
    redirect(portalUrl);
  }

  return (
    <form action={handleAction}>
      <Button
        type="submit"
        className="shadow-md w-60 mb-6 rounded-xl"
        variant="secondary">
        Manage Billing
      </Button>
    </form>
  )
}

export default ManageAccountButton;
