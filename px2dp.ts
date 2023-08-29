import { Dimensions } from 'react-native';
// 58 app 只有竖屏模式，所以可以只获取一次 width
const deviceWidthDp = Dimensions.get('window').width;
// UI 默认给图是 750 
const uiWidthPx = 375;

function px2dp(size:number) {
    return size * deviceWidthDp / uiWidthPx;
}
export default px2dp;