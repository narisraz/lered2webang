import FirestoreData from "./FirestoreData";

interface Task extends FirestoreData{
  title: string
  description: string
  statusId: string
  userId: string
  platformId: string
  compteId: string
}

export default Task
