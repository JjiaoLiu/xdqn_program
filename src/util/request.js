import Taro from "@tarojs/taro";
import '@tarojs/async-await'

const ajax = (options) => {
  let token = Taro.getStorageSync('access_token'), headers;
  if (options.auth) {
    headers = {
      'Authorization': 'Bearer ' + token
    };
  }
  
  for (const key in options.data) {              // 去除对象内多余的空值key
    if (options.data[key] === '') {
      delete options.data[key]
    }
  }

  return Taro.request({
    // eslint-disable-next-line no-undef
    url: REQUEST_URL + options.url,
    method: options.method,
    data: options.data,
    header: headers,
  }).then(async (res) => {
    const {statusCode, data} = res;
    if (statusCode === 401 || statusCode === 403) {
      return Taro.showToast({
        title: data.msg || data.error,
        duration: 3000,
        icon: 'none'
      }).then(() => {
        return Promise.reject(data)
      });
    }
    if (statusCode >= 500) {
      return Taro.showToast({
        title: data.msg || data.error,
        duration: 3000,
        icon: 'none'
      }).then(() => {
        return Promise.reject(data.msg || data.error)
      });
    }
    if (data.code === 0 && data.message === "success") {
      return data.data
    }
  }).catch((err) => {
    console.log(err)
  })
};

export default function request(options) {
  return ajax(options)
}
