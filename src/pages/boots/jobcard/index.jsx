import Taro, {Text, View} from "@tarojs/components";
import ImageRoot from "./../imageRoot";
import './../../../app.scss';
import './index.scss';

export default function JobCard(props) {

  const job = props.data || {};

  return (
    <View className='job-card' onClick={this.props.onClick}>
      <View className='media'>
        <View className='typeImgUrl'>
          {job.typeImgUrl && <ImageRoot imageUrl={job.typeImgUrl} />}
        </View>
        <View>
          <View className='title'><Text>{job.title}</Text></View>
          <View className='content'>
            <Text>{job.city}</Text>
            <View className='space-15' />
            <Text className='light-color'>|</Text>
            <View className='space-15' />
            <Text>{job.area}</Text>
            <View className='space-40' />
            <Text>招用</Text>
            <View className='space-15' />
            <Text className='primary-color'>{job.recruitNum}</Text>
          </View>
        </View>
      </View>
      <View className='salary'><Text>{job.salary}币/时</Text></View>
    </View>
  )
}
