export interface File {
  initialValue: number,
  steps: {
    [key: string | number]: {
      type: 'add' | 'sub' | 'div',
      value: number
    }
  }
}