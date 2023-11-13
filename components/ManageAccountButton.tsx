"use client"

import { Button } from "./ui/button";
import { generatePortalLinkAction } from "@/actions/generatePortalLinkAction";


function ManageAccountButton() {

  const handler = async () => {
    console.log("object here here");
    generatePortalLinkAction()
  }

  return (
    <form>
      <Button
        type="submit"
        className="shadow-md w-60 mb-6 rounded-xl"
        variant="secondary"
        formAction={handler}>
        Manage Billing
      </Button>
    </form>
  )
}

export default ManageAccountButton;
