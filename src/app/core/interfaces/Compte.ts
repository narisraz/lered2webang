import FirestoreData from "./FirestoreData";

interface Compte extends FirestoreData {
  name: string,
  firstName?: string,
  platformId: string
}

export default Compte
