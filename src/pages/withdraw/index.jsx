import Taro, {useState, useDidShow} from '@tarojs/taro';
import {View, Text, Button} from "@tarojs/components";
import PageTitle from './../boots/pagetitle/'
import './../../app.scss';
import './index.scss';
export default function Withdraw() {
  
  useDidShow(()=>{
     
  })

  return (
    <View className='withdraw'>
      <PageTitle title='提现' pagetitleactive={true} />
      <View className='item'>
      	<Text className='label'>提取豆币</Text>
      	<Input className='input' type='number' placeholder='请输入提取数量，最多可提取1000豆币'/>
      </View>
      <View className='item'>
      	<Text className='label'>支付宝账户</Text>
      	<Text>198****9182</Text>
      </View>
      <View className='item'>
      	<Text className='label'>姓名</Text>
      	<Text>何莉莉</Text>
      </View>
      <View className='item'>
      	<Text className='label'>手机号码</Text>
      	<Text>198****9182</Text>
      </View>
      <View className='item'>
      	<Text className='label'>验证码</Text>
      	<Input className='input' type='number' placeholder='请输入短信验证码'/>
      	<Button className='btn btn-primary'>获取验证码</Button>
      	<View className='space-40' />
      </View>
      <View className='item'>
      	<Text className='label'>折合</Text>
      	<Text>¥0</Text>
      </View>
      <View className='fixed-bottom'>确认提现</View>
    </View>
  );
}
