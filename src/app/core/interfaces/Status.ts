import FirestoreData from "./FirestoreData";

interface Status extends FirestoreData {
  label: string
  userRole: number
}

export default Status
