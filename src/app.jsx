import '@tarojs/async-await'
import 'taro-ui/dist/style/index.scss'
import Taro, {Component} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'
import Index from './pages/index'
import configStore from './store'
import request from './util/request'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {

  config = {
    pages: [
      'pages/layout/index',
      'pages/joblist/index',
      'pages/webViewPage/index',
      'pages/jobid/index',
      'pages/employer/index',
      'pages/auth/index',
      'pages/search/index',
      'pages/searchresult/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '小豆青年',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
      backgroundColor:'#f4f4f4'
    },
    plugins: {
      calendar: {
        version: '1.1.3',
        provider: 'wx92c68dae5a8bb046'
      },
    }
  }

  componentDidMount() {
  }

  componentDidShow() {
      // Taro.getSetting({
      //   success: res=> {
      //     if (res.authSetting && res.authSetting['scope.userInfo']) {
      //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      //       Taro.getUserInfo({
      //         success: function (data) {
      //           console.log(data.userInfo);
      //           // {
      //           //   avatarUrl: '微信头像img文件path'
      //           //   nickname: '微信昵称'
      //           // }
      //         }
      //       });
      //     } else {
            
      //     }
      //   }
      // });


      // Taro.checkSession({
      //   success (res) {
      //     console.log(res);
      //   },
      //   fail (res) {
      //     Taro.login().then(res=>{
      //       request({
      //         url:'/social/login',
      //         data:{
      //           code:res.code
      //         }      
      //       }).then(res=>{
      //         console.log(res);
      //       })
      //     })
      //   }
      // })

    // Taro.checkSession().then(() => {
    
    // }).catch(() => {
    //     return Taro.login()
    //       .then(res => {
    //         console.log(res);
    //         return Taro.request({
    //           // eslint-disable-next-line no-undef
    //           url: REQUEST_URL + '/social/login',
    //           data: {code: res.code},
    //           success: function (r) {
    //             if (r.statusCode == 200 && r.data.ret == 200) {
    //               Taro.setStorage({
    //                 key: "session3rd",
    //                 data: r.statusCode.code
    //               });
    //             } else if (r.statusCode == 500) {
    //               Taro.showToast({
    //                 title: "发生错误,请重试！",
    //                 icon: "none"
    //               });
    //             }
    //           }
    //         });
    //       })
    //       .catch(e => {
    //         console.log(e);
    //         Taro.showToast({
    //           title: "发生错误,请重试！",
    //           icon: "none"
    //         });
    //       });
    //   });
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'));
