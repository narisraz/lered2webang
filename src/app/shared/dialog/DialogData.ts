interface DialogData<T> {
  title: string
  content?: any
  fields?: T
  disabledField?: string[]
}

export default DialogData
