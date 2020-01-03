import Taro, {useState} from "@tarojs/taro";
import {View, Image, Text} from "@tarojs/components";
import ImageRoot from "../boots/imageRoot";
import {AtButton} from 'taro-ui'
import icon_down_select_checked from './icon_down_select_checked.png'
import icon_down_select_default from './icon_down_select_default.png'

export default function Joblist(props) {
  const [tabcurrent, setTabcurrent] = useState('');
  const {type} = props.params.type;
  return (
    <View className='joblist'>
      <View className='fixed-filter'>
        <View className='tab-header'>
          <View className='item' onClick={() => setTabcurrent(0)}>
            <Text className={tabcurrent === 0 ? 'primary-color' : ''}>类型</Text>
            <Image src={tabcurrent === 0 ? icon_down_select_checked : icon_down_select_default}
                   className='icon_down_select_checked'
            />
          </View>
          <View className='item' onClick={() => setTabcurrent(1)}>
            <Text className={tabcurrent === 1 ? 'primary-color' : ''}>区域</Text>
            <Image src={tabcurrent === 0 ? icon_down_select_checked : icon_down_select_default}
                   className='icon_down_select_checked'
            />
          </View>
          <View className='item' onClick={() => setTabcurrent(2)}>
            <Text className={tabcurrent === 2 ? 'primary-color' : ''}>排序</Text>
            <Image src={tabcurrent === 0 ? icon_down_select_checked : icon_down_select_default}
                   className='icon_down_select_checked'
            />
          </View>
        </View>
        <View className='tab-body'>
          {
            tabcurrent === 0 ? <View>
              12
            </View> : ''
          }

          {
            tabcurrent === 1 ? <View>
              12
            </View> : ''
          }
          {
            tabcurrent === 2 ? <View>
              12
            </View> : ''
          }
        </View>
      </View>
    </View>
  )
}
