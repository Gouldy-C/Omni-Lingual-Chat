"use client"
import useAdminId from "@/hooks/useAdminId"
import InviteUser from "./InviteUser"
import DeleteChatButton from "./DeleteChatButton"


function AdminControls({chatId, deleteChatId} : {chatId:string, deleteChatId: ({chatId} : {chatId:string}) => void}) {
  const adminId = useAdminId({chatId})

  return (
    <div className="flex justify-end space-x-2 m-5 mb-0">
      <InviteUser chatId={chatId}/>
      <DeleteChatButton chatId={chatId} deleteChatId={deleteChatId}/>
    </div>
  )
}

export default AdminControls