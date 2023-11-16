import { db } from "@/firebase";
import { FirestoreDataConverter,
        DocumentData,
        QueryDocumentSnapshot,
        SnapshotOptions,
        collection,
        collectionGroup,
        doc,
        query,
        where,
      } from "firebase/firestore"
import { ChatMembers } from "../types";




const chatMembersConverter: FirestoreDataConverter<ChatMembers> = {
  toFirestore: function (members: ChatMembers): DocumentData {
    return {
      userId: members.userId,
      email: members.email,
      timestamp: members.timestamp,
      isAdmin: members.isAdmin,
      chatId: members.chatId,
      image: members.image,
    }
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ChatMembers {
    const data = snapshot.data(options)

    return {
      userId: snapshot.id,
      email: data.email,
      timestamp: data.timestamp,
      isAdmin: data.isAdmin,
      chatId: data.chatId,
      image: data.image,
    }
  }
}

export const addChatRef = (chatId: string, userId: string) => doc(db,'chats', chatId, 'members', userId).withConverter(chatMembersConverter)

export const chatMembersRef = (chatId: string) => collection(db,'chats', chatId, 'members').withConverter(chatMembersConverter)

export const chatMemberAdminRef = (chatId: string) => 
  query(
    collection(db,'chats', chatId, 'members'),
    where("isAdmin", "==", true)
  ).withConverter(chatMembersConverter)

export const chatMembersCollectionGroupRef = (userId: string) => 
  query(
    collectionGroup(db, 'members'),
    where("userId", "==", userId)
  ).withConverter(chatMembersConverter)