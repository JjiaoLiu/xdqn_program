import Taro, {useState, useDidShow} from '@tarojs/taro';
import {View, Text,Button} from "@tarojs/components";
import icon_arrow_right from './../../asserts/icon_arrow_right.png';
import icon_default_head_photo from './../../asserts/icon_default_head_photo.png';
import icon_resume from './../../asserts/icon_resume.png';
import icon_my_service from './../../asserts/icon_my_service.png';
import icon_my_setting from './../../asserts/icon_my_setting.png';
import icon_my_message from './../../asserts/icon_my_message.png';
import icon_my_collection from './../../asserts/icon_my_collection.png';
import icon_my_about from './../../asserts/icon_my_about.png';
import icon_my_call_phone from './../../asserts/icon_my_call_phone.png';
import icon_my_copy_wx from './../../asserts/icon_my_copy_wx.png';
import icon_my_company_attestation from './../../asserts/icon_my_company_attestation.png';
import './../../app.scss';
import './index.scss';

export default function My(){
	const [isOpened,setIsOpened] = useState(false);
	const [phone] = useState('0371-87661691621');
	const [weixin] = useState('XDJZ001');

	const call = ()=>{
		return	Taro.makePhoneCall({
			phoneNumber:phone
		})
	}

	const cliCode =(data)=> {
	    Taro.setClipboardData({
	    	data:data,
	    	fail:()=>{
	    		Taro.showToast({
	    			 title: '复制失败,请长按复制',
 						 icon: 'success',
	    		})
	    	}
	    })
	}

	const toAbout =()=> {
	   return Taro.navigateTo({url:'/pages/about/index'});
	}

	const toMessage =()=> {
	   return Taro.navigateTo({url:'/pages/message/index'});
	} 

  return (
    <View className='my'>
	    <View className='btn-setting'><Image src={icon_my_setting} className='icon_my_setting' /></View>
			<View className='user-data'>
				<Image src={icon_default_head_photo} className='icon_default_head_photo avatar' />
				<View className='user-info'>
					<View className='user-name'>立即登录</View>
					<View className='user-resume'>
						<View className='btn-resume'>
							<Image src={icon_resume} className='icon_resume' />
							<View className='space-9' />
							<View className='space-9' /><Text>简历</Text>
						</View>
						<View className='space-30' />
						<View className='space-10' />
						<Text>登录后才可以填写简历哦</Text>
					</View>
				</View>
			</View>
			<View className='flex'>
				<View className='bag'>
					<Text>0</Text>
					<Text className='label'>钱包</Text>
				</View>
				<View className='line' />
				<View className='bag'>
					<Text>0</Text>
					<Text className='label'>积分</Text>
				</View>
			</View>
			<View className='item' onClick={toMessage.bind(this)}>
				<View className='left'>
					<Image src={icon_my_message} className='icon_my_message' />
					<View className='space-30' />
					<View className='space-30' />
					<Text>我的消息</Text>
				</View>
				<View className='right'>
					<Image src={icon_arrow_right} className='icon_arrow_right' />
				</View>
			</View>
			<View className='item'>
				<View className='left'>
					<Image src={icon_my_collection} className='icon_my_collection' />
					<View className='space-30' />
					<View className='space-30' />
					<Text>我的收藏</Text>
				</View>
				<View className='right'>
					<Image src={icon_arrow_right} className='icon_arrow_right' />
				</View>
			</View>
			{/*<View className='item'>
				<View className='left'>
					<Image src={icon_my_company_attestation} className='icon_my_company_attestation' />
					<View className='space-30' />
					<View className='space-30' />
					<Text>企业认证</Text>
				</View>
				<View className='right'>
					<Image src={icon_arrow_right} className='icon_arrow_right' />
				</View>
			</View>*/}
			<View className='item' onClick={setIsOpened.bind(this,true)}>
				<View className='left'>
					<Image src={icon_my_service} className='icon_my_service' />
					<View className='space-30' />
					<View className='space-30' />
					<Text>客服</Text>
				</View>
				<View className='right'>
					<Image src={icon_arrow_right} className='icon_arrow_right' />
				</View>
			</View>
			<View className='item' onClick={toAbout.bind(this)}>
				<View className='left'>
					<Image src={icon_my_about} className='icon_my_about' />
					<View className='space-30' />
					<View className='space-30' />
					<Text>关于我们</Text>
				</View>
				<View className='right'>
					<Image src={icon_arrow_right} className='icon_arrow_right' />
				</View>
			</View>
			{ isOpened && <View className='mask' onClick={setIsOpened.bind(this,false)} /> }
			{
				isOpened && <View className='model'>
							  <View className='content'>
							    <View className='model-item'><Text selectable='true'>电话:{phone}</Text><Image src={icon_my_call_phone} onClick={cliCode.bind(this,phone)} className='icon_my_call_phone' /></View>
							    <View className='model-item'><Text selectable='true'>微信:{weixin}</Text><Image src={icon_my_copy_wx} onClick={cliCode.bind(this,weixin)} className='icon_my_copy_wx' /></View>
							    <View className='model-item'><Text selectable='true'>QQ:19071187121</Text><Image src={icon_my_copy_wx} className='icon_my_copy_wx' /></View>
							  </View>
							  <View className='tip'>
							  	<Text>客服工作时间:上午 9:00—12:00,</Text>
							  	<Text>下午 14:00—18:00</Text>
							  </View>
							</View>
			}
    </View>
  );
}
