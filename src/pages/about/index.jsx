import Taro, {useState, useDidShow} from '@tarojs/taro';
import {View, Text, Button} from "@tarojs/components";
import icon_wx_code from './../../asserts/icon_wx_code.png'
import PageTitle from './../boots/pagetitle/'
import icon_loading_tips_app_icon from './../../asserts/icon_loading_tips_app_icon.png'
import './index.scss';

export default function About(){

  return (
    <View className='about'>
    	<PageTitle title='关于我们' />
	    <View className='top'>
				<Image src={icon_wx_code} className='icon_wx_code' />
				<View className='block-20' />
				<View className='block-20' />
				<View><Text className='title'>小豆青年</Text></View>
				<View className='block-20' />
				<View className='block-20' />
				<View className='block-20' />
				<View className='text-left'><Text>小豆 ——一款专业服务大学生的筑梦APP。依托大学生兼职为切入点，围绕着大学生活全方面展开服务。包括学习培训、社群活动、创业支持、校内交友等等，大学生可以在这里定制属于自己独一无二的大学生活！我们始终以大学生需求为导向，将尽我们所能，助力大学生由校园到社会完美转型，引领更多的大学生释放个人价值，走向人生巅峰！</Text></View>
				<View className='block-20' />
				<View className='block-20' />
				<Image src={icon_loading_tips_app_icon} className='icon_loading_tips_app_icon' />
				<View className='block-20' />
				<View className='block-20' />
				<View><Text className='title-2'>小豆青年公众号</Text></View>
				<View className='block-20' />
				<View className='block-20' />
				<View className='text-left'><Text>关注我们！无论你是懵懵懂懂的大学新生，还是风华正茂的大二、大三的学生，亦或是即将毕业的大四学长。在这里，每一位同学都可以找到一片属于自己的天地。</Text></View>
	    </View>
	    <View className='bottom'>
	    	<View><Text>Copyright@2020</Text></View>
	    	<View><Text>河南匠小豆品牌管理有限公司 版权所有</Text></View>
	    </View>
    </View>
  );
}