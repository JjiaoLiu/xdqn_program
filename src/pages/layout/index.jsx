import Taro, {useState, useDidShow} from '@tarojs/taro'
import {ScrollView, View, Image, Text} from '@tarojs/components'
import Index from "../index";
import My from "../my/";
import './index.scss'

const navData = [{
  title: "首页",
  // eslint-disable-next-line import/no-commonjs
  imgUrl: require("./icon_home_default.png"),
  // eslint-disable-next-line import/no-commonjs
  imgUrlSelect: require("./icon_home_select.png")
},{
  title: "我的",
  // eslint-disable-next-line import/no-commonjs
  imgUrl: require("./icon_my_default.png"),
  // eslint-disable-next-line import/no-commonjs
  imgUrlSelect: require("./icon_my_select.png")
}];
//  {
//   title: "工作台",
//   // eslint-disable-next-line import/no-commonjs
//   imgUrl: require("./icon_work_default.png"),
//   // eslint-disable-next-line import/no-commonjs
//   imgUrlSelect: require("./icon_work_select.png")
// }, 
export default function Layout() {
  const [current, setCurrent] = useState(0);
  const [nav] = useState(navData);
  const [systeminfo, setSysteminfo] = useState(0);

  useDidShow(() => {
    Taro.createSelectorQuery()
      .select('#fixed-nav')
      .boundingClientRect().exec((res) => setSysteminfo(res[0].top));
  });

  return (
    <View>
      <ScrollView
        scrollY
        style={{height: systeminfo + 'px'}}
      >
        {
          current === 0 ? <Index /> : ''
        }
        {
          current === 1 ? <My /> : ''
        }
      </ScrollView>
      <View className='fixed-nav' id='fixed-nav'>
        {
          nav.map((f, index) => {
            return <View key={index+'_nav'} className='item' onClick={() => setCurrent(index)}>
              <Image src={index === current ? f.imgUrlSelect : f.imgUrl} className='icon' />
              <Text className={index === current ? 'primary-color' : ''}>{f.title}</Text>
            </View>
          })
        }
      </View>
    </View>
  )
}
