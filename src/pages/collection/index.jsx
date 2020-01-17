import Taro, {useState, useDidShow} from '@tarojs/taro';
import {View, Text,Button} from "@tarojs/components";
import ImageRoot from './../boots/imageRoot/'
import JobCard from './../boots/jobcard/'
import PageTitle from './../boots/pagetitle/'
import './../../app.scss';
import './index.scss';

export default function Collection(){
	
  const [list] = useState([{id:0},{id:1}]);

  return (
    <View className='collection'>
  		<PageTitle title='我的收藏'>
        <View className='fixed-top-action'>
          <View className='action-btn'>
            <Text>选择</Text>
          </View>
        </View>
      </PageTitle>
    	<View className='fixed-bottom'>
    		<View className='action'>
	    		<View className='action-btn'>全选</View>
	    		<View className='action-btn'>删除</View>
	    	</View>
    	</View>
    	{
    		list.map((f,index) => {
    			return <JobCard data={f} key={index + 'list'} />
    		})
    	}
    </View>
  );
}