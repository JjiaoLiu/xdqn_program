import Taro, {useState, useDidShow} from '@tarojs/taro';
import {View, Text, Button} from "@tarojs/components";
import PageTitle from './../boots/pagetitle/'
import icon_wallet_payment from './../../asserts/icon_wallet_payment.png'
import icon_wallet_zhifubao from './../../asserts/icon_wallet_zhifubao.png'
import './../../app.scss';
import './index.scss';
export default function Wallet() {
  
  useDidShow(()=>{
     
  })

  return (
    <View className='account'>
      <PageTitle title='钱包' transparent={true} />
      <View className='huge'>
      	<View className='p1'>豆币余额（币）</View>
      	<View className='p2'>3000</View>
      	<View className='p3'>冻结2000币，可提现1000币</View>
      	<View className='benifits'>
      		<View className='today item'>
      			<Text>150</Text>
      			<Text>今日收益</Text>
      		</View>
      		<View className='line' />
      		<View className='yesterday item'>
      			<Text>150</Text>
      			<Text>昨日收益</Text>
      		</View>
      		<View className='line' />
      		<View className='all item'>
      			<Text>150</Text>
      			<Text>累计收益</Text>
      		</View>
      	</View>
      </View>
      <View className='stored'>
      	<View className='left'>
      		<Text>1000</Text>
      		<Text className='label'>小豆金库(豆币)</Text>
      	</View>
      	<View className='right'>
      		<View className='btn btn-primary'>充值</View>
      	</View>
      </View>
      <View className='list'>
      	<View className='item'>
      		<Image src={icon_wallet_payment} className='icon_wallet_payment' />
      		<Text className='label'>交易明细</Text>
      	</View>
      	<View className='item'>
      		<Image src={icon_wallet_zhifubao} className='icon_wallet_zhifubao' />
      		<Text className='label'>支付宝</Text>
      	</View>
      </View>
      <View className='fixed-bottom'>提现</View>
    </View>
  );
}
