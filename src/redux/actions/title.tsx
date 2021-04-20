export const onPush = (title: string[], nxtTitle: string) => ({ type: 'PUSH', title, nxtTitle })
export const onBack = (title: string[]) => ({ type: 'BACK', title })