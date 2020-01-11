import Taro, {useState, useDidShow, usePullDownRefresh, useReachBottom} from "@tarojs/taro";
import {View, Image, Text, Button, ScrollView} from "@tarojs/components";
import ImageRoot from "../boots/imageRoot";
import JobCard from "../boots/jobcard";
import icon_down_select_checked from './icon_down_select_checked.png';
import icon_down_select_default from './icon_down_select_default.png';
import icon_right_down_arrow from './icon_right_down_arrow.png';
import icon_close from './icon_close.png';
import icon_view_state_empty from './icon_view_state_empty.png';
import request from './../../util/request';
import {province as provinceJson} from './../../util/province';
import {formatDate} from './../../util/formatter';
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
const genderData = [
  {value: 'all', label: '不限'},
  {value: 'man', label: '男'},
  {value: 'woman', label: '女'},
];

const provinceData = provinceJson.find((f) => {
  return f.name === '河南省';
}).city[0]['area'];

export default function Joblist() {
  const [winheight,setWinheight] = useState(500);

  const [mask, setMask] = useState(false);

  const [loading, setLoading] = useState(false);
  const [canload, setCanload] = useState(true);

  const [tabhead] = useState(tabheaderData); //筛选分类数据
  const [tabselected, setTabselected] = useState({}); //当前选中分类

  const [tabbodyheight, setTabbodyheight] = useState(0); //类型View高度

  const [filterscrollpageheight, setFilterscrollpageheight] = useState(0); //筛选页面可滚动区域高度
  const [filterscrollpageshow, setFilterscrollpageshow] = useState(false); //筛选页面是否显示

  const [jobtype, setJobtype] = useState([]); //类型数据

  const [province] = useState(provinceData); //区域数据

  const [jobsortArr] = useState(jobsortData); //排序数据

  const [gender] = useState(genderData); //性别数据

  const [job, setJob] = useState(null); //职位列表数据

  const [joblistheight, setJoblistheight] = useState(0); //职位列表高度

  const [filterparams, setFilterparams] = useState({
    gender: 'all',
  }); //筛选页面数据备份

  const [params, setParams] = useState({
    jobTypeId: this.$router.params.jobTypeId,
    pageNo: 1,
    gender: 'all',
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
      .selectAll('#tab-header,#tab-submit-btn,#filter-page-title,#filter-page-tab-submit-btn')
      .boundingClientRect().exec((v) => {
      setTabbodyheight(res.windowHeight - v[0][0].height - v[0][1].height);
      setFilterscrollpageheight(res.windowHeight - v[0][2].height - v[0][3].height);
      setJoblistheight(v[0][0].bottom);
    });
  });

  const getJob = (defined) => {
    request({
      url: '/search/job',
      auth: false,
      data: Object.assign({}, params, filterparams, defined)
    }).then((res) => {
      res.records.length < res.pageSize ? setCanload(false) : ''
      res.pageNo === 1 ? setJob(res.records) : setJob(job.concat(res.records));
      setLoading(false);
      let _params = Object.assign({},params,filterparams,defined,{pageNo: ++res.pageNo})
      setParams(_params);
      setLoading(false)
      Taro.stopPullDownRefresh();
    });
  };

  const handleTab = (v) => {
    if (mask && v === tabselected) {
      setMask(false);
    } else if (mask && v !== tabselected) {
      setTabselected(v);
    } else {
      setTabselected(v);
      setMask(true);
    }
  };

  const handleParams = (v) => {
    let _params = Object.assign({}, params, v);
    setParams(_params);
  };

  const handleFilterParams = (v) => {
    let _params = Object.assign({}, filterparams, v);
    setFilterparams(_params);
  };

  const handleSubmit = (() => {
    setCanload(true);
    getJob({pageNo:1});
    mask && setMask(false);
    filterscrollpageshow && setFilterscrollpageshow(false);
  });

  const handleParamsDefineDate = ()=>{
      setFilterparams({date:formatDate(new Date())})
  };

  const handleCloseFilterPage = ()=>{
    let _params = Object.assign({}, {
        gender: params.gender,
        date: params.date ? params.date : '',
        dayShift: params.dayShift ? params.dayShift : ''
      });
      setFilterparams(_params);
      setFilterscrollpageshow(false);
  };

  const handleResetFilterPage = ()=>{
    let _params = Object.assign({}, {gender:'all'});
    setFilterparams(_params);
  };

  const handleTabFilter = (()=>{
    setFilterscrollpageshow(true);
    setTabselected(false);
  })

  usePullDownRefresh(() => {
    setCanload(true);
    getJob({pageNo: 1});
  });

  useReachBottom(() => {
    canload && getJob();
  });

   const toJobid = (jobid) => {
    return Taro.navigateTo({url: `/pages/jobid/index?jobid=${jobid}`})
  };

  return (
    <View className={['joblist ',tabselected.id && mask ? 'with-mask' : '']} style={{'min-height':winheight+'px'}}>
      {tabselected.id && mask && <View className='mask' onClick={setMask.bind(this, false)} />}
      {/*fixed定位元素*/}
      <View className='fixed-top' id='fixed-top'>
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
          <View className='filter-btn' onClick={handleTabFilter.bind(this)}>
            <Text>筛选</Text>
            <Image src={icon_right_down_arrow} className='icon_right_down_arrow' />
          </View>
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
      {/*fixed定位元素*/}
      {/* 职位列表数据 */}
      {
        job && job.length && job.map((f, index) => {
          return <JobCard onClick={toJobid.bind(this,f.id)} key={index + '_job'} data={f} />
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
        <View className={['translate-page ', filterscrollpageshow ? 'selected' : '']}>
          <View className='page-title' id='filter-page-title'><Text>筛选</Text><Image className='icon_close' src={icon_close} onClick={handleCloseFilterPage.bind(this)} /></View>
          <ScrollView  scrollY style={{height: filterscrollpageheight + 'px'}}>
            <View className='filter-scroll-page'>
              <View className='item'>
                <View className='title'><Text>性别要求</Text></View>
                <View className='next-item'>
                   {
                        gender.map((v, i) => {
                          return <Button className={['btn ', filterparams.gender === v.value ? 'btn-primary' : '']}
                            key={i + '_gender'}
                            onClick={handleFilterParams.bind(this, {gender: v.value})}
                          >
                            {v.label}
                          </Button>
                        })
                      }
                </View>
              </View>
              <View className='item'>
                <View className='title'>上班时段<View className='space-9' />(可多选)</View>
                <View className='next-item'>
                   <Button className={['btn ', filterparams.dayShift !== true && filterparams.dayShift !== false ? 'btn-primary' : '']} onClick={handleFilterParams.bind(this, {dayShift:'' })}>不限</Button>
                   <Button className={['btn ', filterparams.dayShift === true ? 'btn-primary' : '']} onClick={handleFilterParams.bind(this, {dayShift:true})}>白班</Button>
                   <Button className={['btn ', filterparams.dayShift === false ? 'btn-primary' : '']} onClick={handleFilterParams.bind(this, {dayShift:false })}>晚班</Button>
                </View>
              </View>
              <View className='item'>
                <View className='title'>开始工作时间</View>
                <View className='next-item'>
                   <Button className={['btn ', !filterparams.date ? 'btn-primary' : '']} onClick={handleFilterParams.bind(this, {date: ''})}>不限</Button>
                   <Button className={['btn ', filterparams.date ? 'btn-primary' : '']} onClick={handleParamsDefineDate.bind(this)}>指定</Button>
                   <Text>{filterparams.date}</Text>
                </View>
                <View>

                </View>
              </View>
            </View>
          </ScrollView>
          <View className='tab-submit-btn' id='filter-page-tab-submit-btn'>
            <Button className='btn btn-large btn-rect btn-reset' onClick={handleResetFilterPage.bind(this)}>重置</Button>
            <Button className='btn btn-primary btn-rect btn-large btn-submit' onClick={handleSubmit.bind(this)}>确定</Button>
          </View>
        </View>
      }
    </View>
  )
}
