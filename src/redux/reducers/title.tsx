export default function changeTitle(preState=["主页"], action: any) {
    const { type, title, nxtTitle } = action
    switch (type) {
        case 'PUSH':
            return [...title, nxtTitle]
        case 'BACK':
            return [...title].splice(0, title.length - 1)
        default:
            return preState
    }
}