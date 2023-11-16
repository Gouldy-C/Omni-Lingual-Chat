import { db } from "@/firebase";
import { User } from "@/lib/types"
import { FirestoreDataConverter, 
        DocumentData,
        QueryDocumentSnapshot,
        SnapshotOptions,
        collection,
        limit,
        orderBy,
        query,
        where,
      } from "firebase/firestore"




const userConverter: FirestoreDataConverter<User> = {
  toFirestore: function (user: User): DocumentData {
    return {
      email: user.email,
      image: user.image,
      name: user.name,
    }
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options)

    return {
      id: snapshot.id,
      email: data.email,
      image: data.image,
      name: data.name,
    }
  }
}

export const getUserByEmailRef = (email: string) => query(
    collection(db, "users"), where("email", "==", email)
  ).withConverter(userConverter)

