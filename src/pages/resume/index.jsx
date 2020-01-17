import Taro, {useState, useDidShow} from '@tarojs/taro';
import {View, Text, Button, Picker, Textarea} from "@tarojs/components";
import { AtMessage, AtImagePicker } from 'taro-ui';
import PageTitle from './../boots/pagetitle/'
import './../../app.scss';
import './index.scss';

const genderData = {
   'all':  '不限',
   'man':  '男',
   'woman': '女'
};

const academicData = {
   'all':  '不限',
   'man':  '男',
   'woman': '女'
};

export default function Resume() {
  
  const [gendervalue] = useState(Object.values(genderData));
  const [genderkey] = useState(Object.keys(genderData));

  const [academicvalue] = useState(Object.values(academicData));
  const [academickey] = useState(Object.keys(academicData));

  const [resume,setResume] = useState({
    photos:[]
  });

  useDidShow(()=>{
    Taro.atMessage({
      'message': '*为必填项，简历越完善，录用率越高哦',
      'type':'warning'
    })
  })

  const handleparams = (value) => {
    let params = Object.assign({}, resume, value);
    setResume(params);
  }

  return (
    <View className='resume'>
      <AtMessage />
      <PageTitle title='个人简历'/>
      <View className='item'>
      	<Text className='label'>姓名</Text>
      	<Input className='input' type='number' />
      </View>
      <View className='item'>
      	<Text className='label'>性别</Text>
      	<Picker mode='selector' range={gendervalue} onChange={(e) => handleparams({gender:gendervalue[e.detail.value]})}>
          <Text>{resume.gender}</Text>
        </Picker>
      </View>
      <View className='item'>
      	<Text className='label'>出生年月日</Text>
      	<Picker mode='date' onChange={(e) => handleparams({birthday:gendervalue[e.detail.value]})}>
          <Text>{resume.birthday}</Text>
        </Picker>
      </View>
      <View className='item'>
        <Text className='label'>年龄/星座</Text>
        <Input className='input' type='number' />
      </View>
      <View className='item'>
      	<Text className='label'>联系电话</Text>
      	<Input className='input' value={resume.tel} type='phone' onChange={(e) => handleparams({tel:e.detail.value})}/>
      </View>
      <View className='item'>
        <Text className='label'>学历</Text>
        <Picker mode='selector' range={academicvalue} onChange={(e) => handleparams({academic:academicvalue[e.detail.value]})}>
          <Text>{resume.academic}</Text>
        </Picker>
      </View>
      <View className='item'>
        <Text className='label'>身高</Text>
        <Input className='input' type='number' value={resume.height} onChange={(e) => handleparams({height:e.detail.value})} />
      </View>
      <View className='item'>
        <Text className='label'>体重</Text>
        <Input className='input' type='number' value={resume.weight} onChange={(e) => handleparams({weight:e.detail.value})} />
      </View>
      <View className='item textarea'>
        <Text className='label'>职位描述</Text>
        <Textarea placeholder='介绍一下自己的优势吧' value={resume.perfectionDegree} onChange={(e) => handleparams({perfectionDegree:e.detail.value})} />
      </View>
      <View className='item image'>
        <Text className='label'>形象展示 0/6</Text>
        {/*<AtImagePicker
          files={resume.photos}
          onChange={(photos) => handleparams({photos:photos})}>
        />*/}
      </View>
    </View>
  );
}