import Taro, {Text, View} from "@tarojs/components";
import ImageRoot from "./../imageRoot";
import './index.scss';

export default function EmployerCard(props) {

  const job = props.data || {};

  return (
    <View className='job-card' onClick={this.props.onClick}>
      <View className='media'>
        <View className='typeImgUrl'>
          <ImageRoot imageUrl={job.logo} />
        </View>
        <View>
          <View className='title'><Text>{job.employerName}</Text></View>
          <View className='content'>
            <Text>{job.city}</Text>
            <View className='space-15' />
            <Text className='light-color'>|</Text>
            <View className='space-15' />
            <Text>{job.area}</Text>
            <View className='space-40' />
            <Text>热招职位</Text>
            <View className='space-15' />
            <Text className='primary-color'>{job.jobNum}</Text>
          </View>
          <View>
            <View className='tag'>
              {job.rygmName}
            </View>
            <View className='tag'>
              {job.hyflName}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
