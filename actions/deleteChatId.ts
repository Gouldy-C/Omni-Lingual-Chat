"use server"

import { adminDb } from "@/firebase-admin"



export async function deleteChatId({chatId} : {chatId:string}) {
  const chatRef = adminDb.collection("chats").doc(chatId)
  const bulkWriter = adminDb.bulkWriter()
  const MAX_RETRY = 7

  bulkWriter.onWriteError((err) => {
    if(err.failedAttempts < MAX_RETRY) {
      return true
    } else {
      console.log("Failed delete at document: ", err.documentRef.path)
      return false
    }
  })

  try {
    await adminDb.recursiveDelete(chatRef, bulkWriter)
  } catch (err) {
    console.log("Error deleting chat: ", err);
  }
}