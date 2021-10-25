import User from "../../core/interfaces/User";
import Credential from "../../core/interfaces/Credential";

export interface UserWithCredential extends User, Credential {}
