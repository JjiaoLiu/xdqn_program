import Taro,{useState,useDidShow} from '@tarojs/taro'
import {Image,Input,View,Button,Text} from '@tarojs/components'
import './index.scss'
import icon_location from './icon_location.png'
import icon_search from './icon_search.png'
import request from './../../util/request'

export default function Search(props) {

  const [history,setHistory] = useState([]);
  const [hot,setHot] = useState([]);

  const [searchkey,setSearchkey] = useState('');

  const toPrev = ()=>{
    return Taro.getCurrentPages().length > 1 ?  Taro.navigateBack({ delta: 1 }) :  Taro.redirectTo({ url: `/pages/layout/index?current=0` })
  }

  const toSearchresult  = ()=>{
    return Taro.navigateTo({url:`/pages/searchresult/index?searchKey=${searchkey}`});
  }

  const handleChange = (e)=>{
    setSearchkey(e.detail.value)
  }

  useDidShow(()=>{
    request({
      url:'/search/hot-keyword',
      auth:false
    }).then(res=>{
      setHot(res)
    });
  })

  return (
   <View className='search'>
   	<View className='fixed-top'>
      <View className='search-box'>
        <View className='location'>
          <Image src={icon_location} className='icon_location' />
          <View className='space-15' />
          <Text>地址</Text>
        </View>
        <View className='space-40' />
        <View className='search-wrap'>
          <View className='search'>
            <Image src={icon_search} onClick={toSearchresult.bind(this)} className='icon_search' />
            <View className='space-15' />
            <Input placeholder='请输入职位或公司' value={searchkey} onChange={(e)=> handleChange(e)} placeholder='' focus/>
          </View>
        </View>
        <View className='space-40' />
        <View className='cancel' onClick={toPrev.bind(this)}><Text>取消</Text></View>
      </View>
    </View>
    <View className='section'>
      <View className='section-title'>搜索历史</View>
      <View className='item'>
        {
          history.map((f,index)=>{
            return <Button className='btn' key={index+'_hot'}>{f.keyword}</Button>
          })
        }
      </View>
    </View>
    <View className='section'>
      <View className='section-title'>热门搜索</View>
      <View className='item'>
        {
          hot.map((f,index)=>{
            return <Button className='btn' key={index+'_hot'}>{f.keyword}</Button>
          })
        }
      </View>
    </View>
   </View>
  )
}