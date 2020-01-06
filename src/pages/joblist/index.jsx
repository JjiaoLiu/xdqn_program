import Taro, {useState, useDidShow, usePullDownRefresh, useReachBottom} from "@tarojs/taro";
import {View, Image, Text, Button, ScrollView} from "@tarojs/components";
import ImageRoot from "../boots/imageRoot";
import JobCard from "../boots/jobcard";
import icon_down_select_checked from './icon_down_select_checked.png'
import icon_down_select_default from './icon_down_select_default.png'
import icon_view_state_empty from './icon_view_state_empty.png'
import request from './../../util/request'
import {province as provinceJson} from './../../util/province'
import './../../app.scss';
import './index.scss';

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
const provinceData = provinceJson.find((f) => {
  return f.name === '河南省';
}).city[0]['area'];


export default function Joblist() {
  const [winheight, setWinheight] = useState(500);

  const [mask, setMask] = useState(false);

  const [tabhead] = useState(tabheaderData); //筛选分类数据
  const [tabselected, setTabselected] = useState({}); //当前选中分类

  const [tabbodyheight, setTabbodyheight] = useState(0); //类型View高度
  const [filterpage, setFilterpage] = useState(0); //筛选页面可滚动区域高度
  const [filterpageshow, setFilterpageshow] = useState(false); //筛选页面可滚动区域高度

  const [jobtype, setJobtype] = useState([]); //类型数据

  const [province] = useState(provinceData); //区域数据

  const [jobsortArr] = useState(jobsortData); //排序数据

  const [job, setJob] = useState(null); //职位列表数据

  const [params, setParams] = useState({
    jobTypeId: this.$router.params.jobTypeId,
    pageNo: 1
  });

  useDidShow(() => {
    request({
      url: '/code/job_types',
      auth: false
    }).then((res) => {
      setJobtype(res);
    });
    getJob();
    const res = Taro.getSystemInfoSync();
    setWinheight(res.windowHeight);
    Taro.createSelectorQuery()
      .selectAll('#tab-header,#tab-submit-btn,#filter-page-title')
      .boundingClientRect().exec((v) => {
      setTabbodyheight(res.windowHeight - v[0][0].height - v[0][1].height);
      setFilterpage(res.windowHeight - v[0][2].height - v[0][1].height);
    });
  });

  const getJob = ((defined) => {
    request({
      url: '/search/job',
      auth: false,
      data: Object.assign({}, params, defined)
    }).then((res) => {
      if (res.pageNo === 1) {
        setJob(res.records);
      } else {
        setJob(job.concat(res.records));
      }
      setParams({pageNo: ++res.pageNo});
      Taro.stopPullDownRefresh();
    });
  });

  const handleTab = ((v) => {
    if (mask && v === tabselected) {
      setMask(false);
    } else if (mask && v !== tabselected) {
      setTabselected(v);
    } else {
      setTabselected(v);
      setMask(true);
    }
  });

  const handleParams = ((v) => {
    let _params = Object.assign({}, params, v);
    setParams(_params);
  });

  const handleSubmit = (() => {
    getJob();
    mask && setMask(false);
    filterpageshow && setFilterpageshow(false);
  });

  usePullDownRefresh(() => {
    getJob({pageNo: 1});
  });

  useReachBottom(() => {
    getJob();
  });

  return (
    <View className='joblist' id='joblist' style={{height: winheight + 'px'}}>
      {tabselected.id && mask && <View className='mask' onClick={setMask.bind(this, false)} />}
      <View className='fixed-filter' id='fixed-filter'>
        <View className='tab-header' id='tab-header'>
          {
            tabhead.map((f, index) => {
              return <View className='item' key={index + '_tabhead'} onClick={handleTab.bind(this, f)}>
                {
                  index && <View className='line' />
                }
                <Text className={tabselected.id === f.id ? 'primary-color' : ''}>{f.title}</Text>
                <View className='space-15' />
                <View className='space-15' />
                <Image src={tabselected.id === f.id ? icon_down_select_checked : icon_down_select_default}
                  className='icon_down_select_checked'
                />

              </View>
            })
          }
          <View className='filter-btn' onClick={setFilterpageshow.bind(this, true)}>筛选</View>
        </View>
        {/* 类型 */}
        <View className={['tranlate-wrap type-jobtype', mask && tabselected.id === 1 ? 'selected' : '']}>
          <ScrollView scrollY id='tab-body' style={{height: tabbodyheight + 'px'}}>
            <View className='tab-body'>
              <View className='all'>
                <Button className={['btn ', !params.jobTypeId ? 'btn-primary' : '']}
                  onClick={handleParams.bind(this, {jobTypeId: ''})}
                >全部</Button>
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
                          return <Button className={['btn ', params.jobTypeId === v.id ? 'btn-primary' : '']}
                            key={i + '_jobTypes'}
                            onClick={handleParams.bind(this, {jobTypeId: v.id})}
                          >
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
            <Button className='btn btn-primary btn-rect btn-large btn-fluid'
              onClick={handleSubmit.bind(this)}
            >确定</Button>
          </View>
        </View>
        {/* 类型 */}
        {/* 区域 */}
        <View className={['tranlate-wrap type-area', mask && tabselected.id === 2 ? 'selected' : '']}>
          <View className='item'>
            <Button onClick={handleParams.bind(this, {area: ''})}
              className={['btn btn-rect ', !params.area ? 'btn-primary' : '']} key='province'
            >全郑州市</Button>
            {
              province.map((f, index) => {
                return <Button onClick={handleParams.bind(this, {area: f})}
                  className={['btn btn-rect ', params.area === f ? 'btn-primary' : '']}
                  key={index + '_province'}
                >{f}</Button>
              })
            }
          </View>
          <View className='tab-submit-btn'>
            <Button className='btn btn-primary btn-rect btn-large btn-fluid'
              onClick={handleSubmit.bind(this)}
            >确定</Button>
          </View>
        </View>
        {/* 区域 */}
        {/* 排序 */}
        <View className={['tranlate-wrap type-jobsort', mask && tabselected.id === 3 ? 'selected' : '']}>
          {
            jobsortArr.map((f, index) => {
              return <View key={index + '_jobsort'} onClick={handleParams.bind(this, {jobSort: f.id})}
                className={['item ', params.jobSort ? (params.jobSort === f.id ? 'primary-color' : '') : !f.id ? 'primary-color' : '']}
              >{f.title}</View>
            })
          }
          <View className='tab-submit-btn'>
            <Button className='btn btn-primary btn-rect btn-large btn-fluid'
              onClick={handleSubmit.bind(this)}
            >确定</Button>
          </View>
        </View>
        {/* 排序 */}
      </View>
      {/* 职位列表数据 */}
      {
        job && job.length && job.map((f, index) => {
          return <JobCard key={index + '_job'} data={f} />
        })
      }
      {/* 职位列表数据 */}
      {/* 职位列表无数据 */}
      {
        job && !job.length && <View className='job-empty'>
          <Image src={icon_view_state_empty} className='icon_view_state_empty' />
          <Text className='txt'>没有找到相关内容哦</Text>
        </View>
      }
      {/* 职位列表无数据 */}
      {/* 左滑筛选 */}
      {
        <View className={['translate-page ', filterpageshow ? 'selected' : '']}>
          <View className='title' id='filter-page-title'><Text>筛选</Text></View>
          <ScrollView className='filter-page' scrollY style={{height: filterpage + 'px'}}>

          </ScrollView>
          <View className='tab-submit-btn'>
            <Button className='btn btn-large btn-rect btn-reset'>重置</Button>
            <Button className='btn btn-primary btn-rect btn-large btn-submit'
              onClick={handleSubmit.bind(this)}
            >确定</Button>
          </View>
        </View>
      }
    </View>
  )
}
