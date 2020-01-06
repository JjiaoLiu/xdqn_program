import Taro, {Text, View} from "@tarojs/components";
import ImageRoot from "../imageRoot";
import './index.scss'
import './../../../app.scss'

export default function JobCard(props) {
  const data = props.data || {};

  return (
    <View className='job-card'>
      <View className='left'>
        <View className='typeImgUrl'>
          <ImageRoot imageUrl={data.typeImgUrl} />
        </View>
        <View>
          <View className='top'>
            <Text>{data.title}</Text>
          </View>
          <View className='bottom'>
            <Text>{data.city}</Text>
            <View className='space-15' />
            <Text className='light-color'>|</Text>
            <View className='space-15' />
            <Text>{data.area}</Text>
            <View className='space-40' />
            <Text>招用</Text>
            <View className='space-15' />
            <Text className='primary-color'>{data.recruitNum}</Text>
          </View>
        </View>
      </View>
      <View className='right'>
        <Text>{data.salary}币/时</Text>
      </View>
    </View>
  )
}
