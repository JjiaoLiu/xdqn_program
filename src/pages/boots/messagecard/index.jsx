import Taro, {Text, View} from "@tarojs/components";
import './index.scss';

export default function MessageCard(props) {

  const data = props.data || {};

  return (
    <View className='message-card' onClick={this.props.onClick}>
      <View className='time'><Text>8月18日 19:31</Text></View>
      <View className='content'>
        <Text className='title'>绑定支付宝成功</Text>
        <Text className='discribtion'>绑定支付宝账户成功，可以去提现啦～</Text>
      </View>
    </View>
  )
}