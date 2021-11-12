export const CANCEL = 0
export const CONFIRM = 1
export const SAVE = 2
export const RESET = 3

export const FORM_ERRORS = {
  required: 'Ce champ est obligatoire',
  email: 'Email invalide',
  passwordMustMatch: 'Les mots de passe doivent correspondre',
  passwordMinLengthError: 'Le mot de passe doit contenir au moins 6 caractères'
}

export const ADMIN = "Administrateur"
export const USER = "Utilisateur"
export const ROLES = [USER, ADMIN]

export const USER_COLLECTION = 'users'
export const PLATFORM_COLLECTION = 'platforms'
export const COMPTE_COLLECTION = 'comptes'
export const STATUS_COLLECTION = 'statutes'
export const TASK_COLLECTION = 'tasks'
export const COMMENT_COLLECTION = 'comments'

export const LOCALSTORAGE_ROLE_ID = 'role'

export const ROUTE_TYPE_ADD = "ADD"
export const ROUTE_TYPE_UPDATE = "UPDATE"
export const ROUTE_TYPE = [ROUTE_TYPE_ADD, ROUTE_TYPE_UPDATE]
