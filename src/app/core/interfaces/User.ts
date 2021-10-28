import FirestoreData from "./FirestoreData";

interface User extends FirestoreData{
  authId: string
  email: string
  name: string
  firstName: string
  role: number
  hiringDate: string
  active: boolean
}

export default User
