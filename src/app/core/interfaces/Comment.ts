import FirestoreData from "./FirestoreData";

interface Comment extends FirestoreData{
  userId: string
  value: string
}

export default Comment
