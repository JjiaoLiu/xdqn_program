import Taro, {useState, useDidShow} from '@tarojs/taro';
import {AtButton, AtAvatar} from "taro-ui";
import {View, Text} from "@tarojs/components";

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

  return (
    <View className='Auth body'>
      <View className='textAlign need'>
        <AtAvatar circle image='https://jdc.jd.com/img/200'/>
        <Text>你的微信头像、昵称、地区和性别信息</Text>
      </View>
      <View className='auth-button'>
        <AtButton
          size='small'
          type='primary'
          loading={loading}
          openType='getUserInfo'
          onGetUserInfo={tobegin}
        >
          同意
        </AtButton>
        <AtButton
          type='secondary'
          size='small'
          onClick={() => Taro.switchTab({url: '/pages/index/index'})}
        >
          拒绝
        </AtButton>
      </View>
    </View>
  );
}
