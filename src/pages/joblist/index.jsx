import Taro, {useState, useDidShow} from "@tarojs/taro";
import {View, Image, Text, Button, ScrollView} from "@tarojs/components";
import ImageRoot from "../boots/imageRoot";
import JobCard from "../boots/jobcard";
// import {AtButton} from 'taro-ui'
import icon_down_select_checked from './icon_down_select_checked.png'
import icon_down_select_default from './icon_down_select_default.png'
import request from './../../util/request'
import './index.scss'

const tabheaderData = [
  {title: '类型', id: 1},
  {title: '区域', id: 2},
  {title: '排序', id: 3}];
const jobsortData = [
  {id: '', title: '综合排序'},
  {id: 'time', title: '最新发布'},
  {id: 'instance', title: '离我最近'},
  {id: 'salary', title: '时薪最高'},
  {id: 'recruitNum', title: '招人最多'}
];
export default function Joblist() {
  const [tabhead] = useState(tabheaderData); //筛选分类数据
  const [tabcurrent, setTabcurrent] = useState({}); //当前选中帅选分类
  const [jobtype, setJobtype] = useState([]); //职位类型数据
  const [tabbodyheight, setTabbodyheight] = useState(0); //职位类型View高度
  const [jobsort] = useState(jobsortData); //职位列表参数数据
  const [jobsortcurrent] = useState(jobsortData[0]); //职位列表参数数据-选中的职位类型
  const [joblist, setJoblist] = useState([]); //职位列表参数数据-选中的职位类型
  useDidShow(() => {
    request({
      url: '/code/job_types',
      auth: false
    }).then((res) => {
      setJobtype(res);
    });
    request({
      url: '/search/job',
      auth: false
    }).then((res) => {
      setJoblist(res);
    });
    const res = Taro.getSystemInfoSync();
    Taro.createSelectorQuery()
      .selectAll('#tab-header,#tab-submit-btn')
      .boundingClientRect().exec((v) => {
      setTabbodyheight(res.windowHeight - v[0][0].height - v[0][1].height);
    });
  });

  return (
    <View className='joblist' id='joblist'>
      {tabcurrent.id && <View className='mask' onClick={() => setTabcurrent({})} />}
      <View className='fixed-filter' id='fixed-filter'>
        <View className='tab-header' id='tab-header'>
          {
            tabhead.map((f) => {
              return <View className='item' key={f.id + '_tabhead'} onClick={() => setTabcurrent(f)}>
                <Text className={tabcurrent.id === f.id ? 'primary-color' : ''}>{f.title}</Text>
                <View className='space-15' />
                <View className='space-15' />
                <Image src={tabcurrent.id === f.id ? icon_down_select_checked : icon_down_select_default}
                  className='icon_down_select_checked'
                />
              </View>
            })
          }
        </View>
        {
          <View className={['tranlate-wrap type-jobtype', tabcurrent.id === 1 ? 'selected' : '']}>
            <ScrollView scrollY id='tab-body' style={{height: tabbodyheight + 'px'}}>
              <View className='tab-body'>
                <View className='all'>
                  <Button className='btn btn-primary'>全部</Button>
                </View>
                {
                  jobtype.map((f) => {
                    return <View className='item' key={f.id + '_jobtype'}>
                      <View className='title'>
                        <View className='imgUrl'><ImageRoot imageUrl={f.imgUrl} /></View>
                        <View className='space-9' />
                        <View className='space-9' />
                        <Text>{f.jobTypeName}</Text>
                      </View>
                      <View className='next-item'>
                        {
                          f.jobTypes.map((v, i) => {
                            return <Button className='btn' key={i + '_jobTypes'}>
                              {v.jobTypeName}
                            </Button>
                          })
                        }
                      </View>
                    </View>
                  })
                }
              </View>
            </ScrollView>
            <View className='tab-submit-btn' id='tab-submit-btn'>
              <Button className='btn btn-primary btn-rect btn-large btn-fluid'>确定</Button>
            </View>
          </View>
        }
        {
          <View className={['tranlate-wrap type-area', tabcurrent.id === 2 ? 'selected' : '']}>
            <View className='item'>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
              <Button className='btn btn-rect'>地区</Button>
            </View>
            <View className='tab-submit-btn'>
              <Button className='btn btn-primary btn-rect btn-large btn-fluid'>确定</Button>
            </View>
          </View>
        }
        {
          <View className={['tranlate-wrap type-jobsort', tabcurrent.id === 3 ? 'selected' : '']}>
            {
              jobsort.map((f, index) => {
                return <View key={index + '_jobsort'}
                  className={['item ', jobsortcurrent.id === f.id ? 'primary-color' : '']}
                >{f.title}</View>
              })
            }
          </View>
        }

      </View>
      {
        joblist.records.map((f, index) => {
          return <JobCard key={index + '_joblist'} data={f} />
        })
      }

    </View>
  )
}
