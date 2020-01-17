import Taro, {Text, View} from "@tarojs/components";
import './index.scss';

export default function PageTitle(props) {

  const title = props.title || '';
  const pagetitleactive  = props.pagetitleactive  || false;
  const transparent  = props.transparent  || false;

// const toPrev = ()=>{
// 	return Taro.getCurrentPages().length > 0 ?  Taro.navigateBack({ delta: 1 }) :  Taro.reLaunch({ url: `/pages/layout/index?current=0` })
// }
  return (
    <View className={['page-title',transparent ? 'transparent' : '', pagetitleactive ? 'active' : '']}>
        <Text className='center'>{title}</Text>
        { this.props.children }
    </View>
  )
}
{/*<View onClick={toPrev.bind(this)} className='action-btn'><Image src={icon_back_white} className='icon_back_white' /></View>*/}
