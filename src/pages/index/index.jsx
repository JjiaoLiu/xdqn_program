import Taro, {useDidShow, useState} from '@tarojs/taro'
import {View, Swiper, SwiperItem, Text, Image} from '@tarojs/components'
import request from "./../../util/request";
import './index.scss'
import ImageRoot from "../boots/imageRoot";
import JobCard from "../boots/jobcard";
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
  const [swiper, setSwiper] = useState([]);  //banner数据
  const [jobType, setJobType] = useState([]); //职位类型数据
  const [recommend, setRecommend] = useState([]); // 职位列表数据
  const [pageno, setPageno] = useState(1); //职位列表分页参数
  const [help] = useState(helpData); //求职指南数据

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
      data: {'pageNo': pageno},
      auth: false
    }).then((res) => {
      setRecommend(res.records);
      setPageno(++res.pageNo);
    });
  });

  const toWebView = (url) => {
    return Taro.navigateTo({url: `/pages/webViewPage/index?url=${url}`})
  };

  const toJoblist = (jobTypeId) => {
    return Taro.navigateTo({url: `/pages/joblist/index?jobTypeId=${jobTypeId}`})
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
            return <SwiperItem key={index + '_swiper'} onClick={toWebView.bind(this,f.targetUrl)}>
              <ImageRoot imageUrl={f.imageUrl} />
            </SwiperItem>
          })
        }
      </Swiper>
      <View className='nav'>
        {
          jobType.map((f, index) => {
            return <View className='item' key={index + '_jobType'}>
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
            return <Image onClick={toWebView.bind(this,f.linkUrl)} mode='widthFix' src={f.imgUrl} className='item'
              key={index + '_help'}
            />
          })
        }
      </View>
      <View className='recommend'>
        <View className='title'>
          <Text>职位列表</Text>
          <View className='more-btn' onClick={toJoblist.bind(this,'')}>
            <Text>更多</Text>
            <View className='space-9' />
            <Image src={icon_arrow_right_small} className='icon_arrow_right_small' />
          </View>
        </View>
        {
          recommend.map((f, index) => {
            return <JobCard data={f} key={index + '_recommend'} />
          })
        }
      </View>
    </View>
  )
}
