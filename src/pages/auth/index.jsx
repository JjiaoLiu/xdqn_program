import Taro, {useState, useDidShow} from '@tarojs/taro';
import {View, Text, Button} from "@tarojs/components";
import './index.scss';
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const tobegin = (res) => {
    console.log('getUserInfo', res);
    if (res.detail.userInfo) {//返回的信息中包含用户信息则证明用户允许获取信息授权
      Taro.setStorageSync('userInfo', res.detail.info);
      // avatarUrl:
      // gender: 2
      // nickName: "咔咔"
      setLoading(!loading);
      Taro.login().then(result => {
        console.log('Taro.Auth', result);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (result.code) {
          // 登录
          setLoading(!loading);
        }
      });
    } else {
      //定位到首页 首页不需要权限
      Taro.switchTab({url: '/pages/index/index'})
    }
  };

  useDidShow(()=>{
     
  })

  return (
    <View className='auth body'>
      <View><Text>小豆青年</Text></View>
      <View className='auth-button'>
        <Button
          type='primary'
          openType='getUserInfo'
          onGetUserInfo={tobegin}
        >
          登录
        </Button>
      </View>
    </View>
  );
}
