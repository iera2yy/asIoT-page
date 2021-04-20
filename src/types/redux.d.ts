import title from './title'
import { onPush, onBack } from '../src/redux/actions/title'

interface ReduxStateToPropsParam {
    title: title,
    onPush: onPush,
    onBack: onBack
}