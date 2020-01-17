import Taro, {useState, useDidShow} from '@tarojs/taro';
import {View, Text} from "@tarojs/components";
import MessageCard from './../boots/messagecard/'
import './../../app.scss';
import './index.scss';

export default function About(){

	const [list] = useState([{id:0},{id:1},{id:2},{id:0},{id:1},{id:2},{id:0},{id:1},{id:2}]);

	useDidShow(()=>{
		Taro.setNavigationBarTitle({'title':'消息'})
	})

  return (
    <View className='message'>
    	{
    		list.map((f,index) => {
    			return <MessageCard data={f} key={index + 'list'} />
    		})
    	}
    </View>
  );
}