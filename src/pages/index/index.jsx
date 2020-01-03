import Taro, {useDidShow, useState} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Text, Image} from '@tarojs/components'
import request from "./../../util/request";
import './index.scss'
import ImageRoot from "../boots/imageRoot";
import icon_arrow_right_small from './icon_arrow_right_small.png';
import icon_location from './icon_location.png';
import icon_search from './icon_search.png';
import './../../app.scss'

const helpData = [{
  label: "求职指南",
  linkUrl: "https://app.jxd007.cn/static/pages/JobSearchGuide.html",
  // eslint-disable-next-line import/no-commonjs
  imgUrl: require("./icon_home_search_job_item.png")
}, {
  label: "帮助中心",
  linkUrl: "https://app.jxd007.cn/static/pages/HelpCenter/index.html",
  // eslint-disable-next-line import/no-commonjs
  imgUrl: require("./icon_home_job_help_item.png")
}];

export default function Index() {
  const [swiper, setSwiper] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [recommendpage, setRecommendpage] = useState(1);
  const [help] = useState(helpData);

  useDidShow(() => {
    request({
      url: '/home/swiper',
      auth: false
    }).then((res) => {
      let _data = res.filter((f) => f.enable).sort((a, b) => {
        return a.orderNum > b.orderNum
      });
      setSwiper(_data);
    });
    request({
      url: '/code/job_types',
      auth: false
    }).then((res) => {
      let _data = [];
      res.forEach((f) => {
        f.jobTypes && f.jobTypes.length ? _data.push(...f.jobTypes) : ''
      });
      _data = _data.filter((f) => f.enable && f.hot);
      setJobType(_data);
    });
    request({
      url: '/home/job/recommend',
      data: {
        pageNo: recommendpage
      },
      auth: false
    }).then((res) => {
      setRecommend(res.records);
      setRecommendpage(res.pageNo++);
    });
  });

  const toWebView = (url) => {
    return () => Taro.navigateTo({url: `/pages/webViewPage/index?url=${url}`})
  };

  return (
    <View className='index'>
      <View className='fixed-top'>
        <View className='location'>
          <Image src={icon_location} className='icon_location' />
          <View className='space-15' />
          <Text className='primary-color'>地址</Text>
        </View>
        <View className='space-40' />
        <View className='search-wrap'>
          <View className='search'>
            <Image src={icon_search} className='icon_search' />
            <View className='space-15' />
            <Text className='light-color'>你想要的都在这里</Text>
          </View>
        </View>
      </View>
      <Swiper
        className='banner'
        indicatorColor='#666'
        indicatorActiveColor='#82A2FE'
        circular
        indicatorDots
        autoplay
      >
        {
          swiper.map((f, index) => {
            return <SwiperItem key={index} onClick={toWebView(f.targetUrl)}>
              <ImageRoot imageUrl={f.imageUrl} />
            </SwiperItem>
          })
        }
      </Swiper>
      <View className='nav'>
        {
          jobType.map((f, index) => {
            return <View className='item' key={index}>
              <View className='icon'>
                <ImageRoot imageUrl={f.imgUrl} />
              </View>
              <Text className='label'>{f.jobTypeName}</Text>
            </View>
          })
        }
      </View>
      <View className='help'>
        {
          help.map((f, index) => {
            return <Image onClick={toWebView(f.linkUrl)} mode='widthFix' src={f.imgUrl} className='item' key={index} />
          })
        }
      </View>
      <View className='recommend'>
        <View className='title'>
          <Text>职位列表</Text>
          <View className='more-btn'>
            <Text>更多</Text>
            <View className='space-9' />
            <Image src={icon_arrow_right_small} className='icon_arrow_right_small' />
          </View>
        </View>
        {
          recommend.map((f, index) => {
            return <View className='item' key={index}>
              <View className='left'>
                <View className='typeImgUrl'>
                  <ImageRoot imageUrl={f.typeImgUrl} />
                </View>
                <View>
                  <View className='top'>
                    <Text>{f.title}</Text>
                  </View>
                  <View className='bottom'>
                    <Text>{f.city}</Text>
                    <View className='space-15' />
                    <Text className='light-color'>|</Text>
                    <View className='space-15' />
                    <Text>{f.area}</Text>
                    <View className='space-40' />
                    <Text>招用</Text>
                    <View className='space-15' />
                    <Text className='primary-color'>{f.recruitNum}</Text>
                  </View>
                </View>
              </View>
              <View className='right'>
                <Text>{f.salary}币/时</Text>
              </View>
            </View>
          })
        }
      </View>
    </View>
  )
}
