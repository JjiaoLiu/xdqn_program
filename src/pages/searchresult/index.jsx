
import Taro, {useState, useDidShow, usePullDownRefresh, useReachBottom,useEffect,useLayoutEffect} from "@tarojs/taro";
import {View, Image, Text, Button, ScrollView,Input} from "@tarojs/components";
import {AtMessage} from "taro-ui";
import ImageRoot from "../boots/imageRoot";
import JobCard from "../boots/jobcard";
import EmployerCard from "../boots/employercard";
import icon_sort_select_arrow from './icon_sort_select_arrow.png';
import icon_right_down_arrow from './icon_right_down_arrow.png';
import icon_close from './icon_close.png';
import icon_back from './icon_back.png';
import icon_view_state_empty from './icon_view_state_empty.png';
import request from './../../util/request';
import {province as provinceJson} from './../../util/province';
import './index.scss'
import icon_location from './icon_location.png'
import icon_search from './icon_search.png'
import {formatDate} from './../../util/formatter';

const tabheaderData = [
  {title: '类型', id: 1},
  {title: '区域', id: 2},
  {title: '排序', id: 3}];
  
const jobsortData = [
  {id: '', title: '综合排序'},
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

export default function Searchresult() {

  const [history,setHistory] = useState([]);
  const [hot,setHot] = useState([]);

  const [searchkey,setSearchkey] = useState('');
  const [tabtype ,setTabtype] = useState('job');

  const [winheight,setWinheight] = useState(500);

  const [mask, setMask] = useState(false);

  const [loading, setLoading] = useState(false);
  const [canload, setCanload] = useState(true);

  const [tabhead] = useState(tabheaderData); //筛选分类数据

  const [fixedheight, setFixedheight] = useState(0); //setFixedheight

  const [filterscrollpageheight, setFilterscrollpageheight] = useState(0); //筛选页面可滚动区域高度
  const [filterscrollpageshow, setFilterscrollpageshow] = useState(false); //筛选页面是否显示

  const [jobtype, setJobtype] = useState([]); //类型数据

  const [province] = useState(provinceData); //区域数据

  const [jobsortArr] = useState(jobsortData); //排序数据
  const [selectedjobsort,setSelectedjobsort] = useState(''); //排序数据

  const [gender] = useState(genderData); //性别数据

  const [job, setJob] = useState([]); //职位列表数据

  const [filterparams, setFilterparams] = useState({
    gender: 'all',
  }); //筛选页面数据备份

  const [params, setParams] = useState({
    pageNo: 1,
    gender: 'all',
  });

  useDidShow(() => {
    const res = Taro.getSystemInfoSync();
    setWinheight(res.windowHeight);
    Taro.createSelectorQuery()
      .selectAll('#fixed-top,#filter-page-title,#filter-page-tab-submit-btn')
      .boundingClientRect().exec((v) => {
      setFilterscrollpageheight(res.windowHeight - v[0][1].height - v[0][2].height);
      setFixedheight(v[0][0].height);
    });
    let _selectedjobsort = jobsortArr.find(f => {
       return f.id === (params.jobSort ? params.jobSort :'');
    });
    setSelectedjobsort(_selectedjobsort.title);
  });

  useEffect(() => {
    if(mask){
      let _selectedjobsort = jobsortArr.find(f => {
        return f.id === (params.jobSort ? params.jobSort :'');
      });
      setSelectedjobsort(_selectedjobsort.title);
      setMask(false);
    }
    getJob()
  },[params]);

  useLayoutEffect(() => {
    handleParams({pageNo:1});
    Taro.createSelectorQuery()
      .select('#fixed-top')
      .boundingClientRect().exec((v) => setFixedheight(v[0].height));
    mask && setMask(false);
  },[tabtype]);

  const getJob = () => {
    // if(!searchkey){
    //   setLoading(false);
    //   return Taro.atMessage({
    //     'message': '请输入关键字',
    //     'type':'info'
    //   })
    // }
    request({
      url: `/search/${tabtype}`,
      auth: false,
      data: tabtype === 'job' ? Object.assign({},params,{searchKey:searchkey}) : Object.assign({},{pageNo:params.pageNo},{searchKey:searchkey})
    }).then((res) => {
      res.records.length < res.pageSize ? setCanload(false) : ''
      res.pageNo === 1 ? setJob(res.records) : setJob(job.concat(res.records));
      setLoading(false);
      Taro.stopPullDownRefresh();
    });
  };

  const toPrev = ()=>{
    return Taro.getCurrentPages().length > 1 ?  Taro.navigateBack({ delta: 1 }) :  Taro.redirectTo({ url: `/pages/layout/index?current=0`})
  }

  const handleChange = (e)=>{
    setSearchkey(e.detail.value)
  }

  const handleTab = (v) => {
    v === 'jobSort' && mask && setMask(false);
    v === 'jobSort' && !mask && setMask(true);
    v !== 'jobSort' && handleParams({'jobSort':v,pageNo:1});
  };

  const handleTabtype = (v) => {
    setLoading(true);
    setCanload(true);
    setTabtype(v);
  };

  const handleParams = (v) => {
    setLoading(true);
    setCanload(true);
    let _params = Object.assign({}, params, v,{pageNo:1});
    setParams(_params);
  };

  const handleFilterParams = (v) => {
    let _params = Object.assign({}, filterparams, v);
    setFilterparams(_params);
  };

  const handleSubmit = (() => {
    let _params = Object.assign({},params,filterparams,{pageNo:1});
    setParams(_params);
    filterscrollpageshow && setFilterscrollpageshow(false);
  });

  const handleParamsDefineDate = ()=>{
      let _params = Object.assign({}, filterparams, {date:formatDate(new Date())});
      setFilterparams(_params)
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

  const handleTabFilter = (()=>{ //显示删选页面
    setFilterscrollpageshow(true);
  })

  usePullDownRefresh(() => {
    setCanload(true);
    handleParams({pageNo:1})
  });

  useReachBottom(() => {
    canload && handleParams({pageNo:++params.pageNo})
  });

  const toJobid = (jobid) => {
    return Taro.navigateTo({url: `/pages/jobid/index?jobid=${jobid}`})
  };

  const toEmployer = (employerId) => {
    return Taro.navigateTo({url: `/pages/employer/index?employerId=${employerId}`})
  };

  return (
<View className={['search-result',mask ? 'with-mask' : '']} style={{'min-height':winheight+'px','padding-top':fixedheight+'px'}}>
    <AtMessage />
    {/*fixed定位元素*/}
    <View className='fixed-top' id='fixed-top'>
      <View className='search-box'>
        <View className='action'>
          <View onClick={toPrev.bind(this)} className='action-btn'><Image src={icon_back} className='icon_back' /></View>
        </View>
        <View className='search-wrap'>
          <View className='search'>
            <Image src={icon_search} onClick={toPrev.bind(this)} className='icon_search' />
            <View className='space-15' />
            <Input placeholder='请输入职位或公司' value={searchkey} onChange={(e)=> handleChange(e)} placeholder='' focus/>
          </View>
        </View>
        <View className='cancel' onClick={handleParams.bind(this,{pageNo:1})}><Text>搜索</Text></View>
      </View>
      <View className='tab-type'>
        <View className={['item ',tabtype === 'job' ? 'selected' : '']} onClick={handleTabtype.bind(this,'job')}>搜职位</View>
        <View className={['item ',tabtype === 'employer' ? 'selected' : '']}  onClick={handleTabtype.bind(this,'employer')}>搜公司</View>
      </View>
      {
        tabtype === 'job' && <View className='tab-header'>
                                <View className='item' onClick={handleTab.bind(this,'jobSort')}>
                                  <Text>{selectedjobsort}</Text>
                                  <View className='space-15' />
                                  <View className='space-15' />
                                  <Image src={icon_sort_select_arrow} className='icon_sort_select_arrow' />
                                </View>
                                <View className={['item ',params.jobSort === 'time' ? 'selected' : '']} onClick={handleTab.bind(this,'time')}>
                                  <Text>最新发布</Text>
                                  <View className='space-15' />
                                  <View className='space-15' />
                                </View>
                                <View className={['item ',params.jobSort === 'instance' ? 'selected' : '']} onClick={handleTab.bind(this,'instance')}>
                                  <Text>离我最近</Text>
                                  <View className='space-15' />
                                  <View className='space-15' />
                                </View>
                                <View className='filter-btn' onClick={handleTabFilter.bind(this)}>
                                  <Text>筛选</Text>
                                  <Image src={icon_right_down_arrow} className='icon_right_down_arrow' />
                                </View>
                              </View>
      }
      {/* 排序 */}
      <View className={['tranlate-wrap type-jobsort', mask ? 'selected' : '']}>
        {
          jobsortArr.map((f, index) => {
            return <View key={index + '_jobsort'} onClick={handleParams.bind(this, {jobSort: f.id})}
              className={['item ', params.jobSort ? (params.jobSort === f.id ? 'primary-color' : '') : !f.id ? 'primary-color' : '']}
            >{f.title}</View>
          })
        }
      </View>
      {/* 排序 */}
    </View>
    {/*fixed定位元素*/}
    {mask && <View className='mask' onClick={setMask.bind(this, false)} />}
    {/* 职位列表数据 */}
    {
      !loading && tabtype === 'job' && job.length && job.map((f, index) => {
        return <JobCard onClick={toJobid.bind(this,f.id)} key={index + '_job'} data={f} />
      })
    }
    {/* 职位列表数据 */}
    {/* 公司列表数据 */}
    {
      !loading && tabtype === 'employer' &&  job.length && job.map((f, index) => {
        return <EmployerCard onClick={toEmployer.bind(this,f.id)} key={index + '_job'} data={f} />
      })
    }
    {/* 公司列表数据 */}
    {/* 列表无数据 */}
    {
      !loading && !job.length && <View className='job-empty'>
        <Image src={icon_view_state_empty} className='icon_view_state_empty' />
        <Text className='txt'>没有找到相关内容哦</Text>
      </View>
    }
    {/* 列表无数据 */}
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