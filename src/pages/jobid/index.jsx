import Taro, {useState, useDidShow, usePageScroll, useShareAppMessage } from "@tarojs/taro";
import {View, Image, Text,Button} from "@tarojs/components";
import icon_job_details_drop_down from './icon_job_details_drop_down.png';
import icon_arrow_right from './icon_arrow_right.png';
import icon_back_white from './icon_back_white.png';
import icon_collection from './icon_collection.png';
import icon_collection_checked from './icon_collection_checked.png';
import icon_location from './icon_location.png';
import icon_consult from './icon_consult.png';
import icon_goback_home from './icon_goback_home.png';
import icon_share from './icon_share.png';
import icon_report from './icon_report.png';
import request from './../../util/request';
import ImageRoot from "../boots/imageRoot";
import './../../app.scss';
import './index.scss';

export default function Jobid(){

	const [jobid] = useState(this.$router.params.jobid);
	const [job,setJob] = useState({});

	const [pagetitleactive,setPagetitleactive] = useState(false);
	const [pagescrolldistance,setPagescrolldistance] = useState(100);

	const [actiondrop,setActiondrop] = useState(false);

	useDidShow(()=>{
		request({
			url: `/search/job/${jobid}`,
			auth:false
		}).then((res)=>{
      let datesArr = new Array();
      let arr = new Array();
      let oneday = 60 * 60 * 24 * 1000;
      let datesJsonToArr = JSON.parse(res.datesJson);
      let datesJsonLength = datesJsonToArr.length;
		  
		  datesJsonToArr.reduce((accumulator, value, index, collection)=>{
		  		let p = value.replace(/-/g, '/');
          let n = collection[index + 1] && collection[index + 1].replace(/-/g, '/');

          if(!n) {
          	arr.push(p);
          	arr.length === 1 ? arr.push(p) : '';
          	datesArr.push(arr);
          	return n;
          }

        	if ((Date.parse(n) - Date.parse(p)) === oneday) {
            arr.length === 0 ? arr.push(p) : '';
          } else {
          	arr.push(p);
          	datesArr.push(arr);
            arr = new Array();
          }
          return n
		  },[])

      let _res = Object.assign({},res,{datesJson:datesArr,timesJson:JSON.parse(res.timesJson)});
			setJob(_res);
		});
		Taro.createSelectorQuery().selectAll('#page-title, #huge').boundingClientRect().exec((v) => {
  			setPagescrolldistance(v[0][1].height - v[0][0].height);
  		})
	});

	const openLocation = (latitude,longitude)=>{
		Taro.chooseLocation({
			latitude,longitude,scale: 18
		})
	}

	const toIndex = ()=>{
		return Taro.redirectTo({url:`/pages/layout/index?current=0`})
	}

	const toEmployer = (employerId)=>{
		return Taro.redirectTo({url:`/pages/employer/index?employerId=${employerId}`})
	}

	const toPrev = ()=>{
		return Taro.getCurrentPages().length > 0 ?  Taro.navigateBack({ delta: 1 }) :  Taro.reLaunch({ url: `/pages/layout/index?current=0` })
	}

	usePageScroll(res => {
		actiondrop && setActiondrop(false);
  		res.scrollTop > pagescrolldistance ? !pagetitleactive && setPagetitleactive(true) : pagetitleactive && setPagetitleactive(false);
	})

	useShareAppMessage(res => {
		let params = {
		    	title: job.title,
		    	path: `/page/jobid?jobid=${job.jobid}`
		    }; 
	  return params
	})
	return (
		<View className='job-id'>
			<View className={['page-title transparent ',pagetitleactive ? 'active' : '']} id='page-title'>
				<Text className='center'>兼职详情</Text>
				<View className='action'>
					<View onClick={toPrev.bind(this)} className='action-btn'><Image src={icon_back_white} className='icon_back_white' /></View>
					<View onClick={setActiondrop.bind(this,!actiondrop)} className='action-btn'><Image src={icon_job_details_drop_down} className='icon_job_details_drop_down' /></View>
				</View>
				<View className={['action-drop',actiondrop ? 'active' : '']}>
					<Button className='item' openType='share'><Image src={icon_share} className='icon_share'/>分享</Button>
					<View className='item'><Image src={icon_report} className='icon_report' />投诉</View>
					<View className='item' onClick={toIndex.bind(this)}><Image src={icon_goback_home} className='icon_goback_home'/>回首页</View>
				</View>
			</View>
			<View className='huge' id='huge'>
				<View className='p1'>{job.title}</View>
				<View className='p2'>{job.salary}豆/小时</View>
				<View className='p3'>{job.area} | {job.jobTypeName}</View>
			</View>
			<View className='needs'>
				<View className='title'>招聘要求</View>
				<View className='item'>招{job.recruitNum}人</View>
				<View className='item'>{job.gender}</View>
			</View>
			<View className='section'>
				<View className='section-title'>
					<View className='block' />
					<View className='space-12' />
					<Text>工作内容</Text>
					<View className='space-12' />
					<View className='space-12' />
					<View className='line' />
				</View>
				<View className='content'>工作包括网站首页、二级栏目、详情页、产品展示等一共20多个页面</View>
				<View className='tip'>
					<Text>小豆提示:凡收取费用的或工作内容不符的兼职，请你提高警惕并第一时间向我们举报。</Text>
				</View>
			</View>
			<View className='section'>
				<View className='section-title'>
					<View className='block' />
					<View className='space-12' />
					<Text>工作时间</Text>
					<View className='space-12' />
					<View className='space-12' />
					<View className='line' />
				</View>
				{
					job.datesJson && job.datesJson.map((f,index)=>{
						return <View className='times-wrap' key={index+'_datesJson'}>
											<View className='start-date'>
												<View className='label start-label'>
													<Text>开始日期</Text>
												</View>
												{f[0]}
											</View>
											<View className='timesHtml'>
												{
													job.timesJson &&job.timesJson.map((m,i)=>{
														return <Text key={i+'_timesJson'} className='time'>{m.start}:{m.end}</Text>
													})
												}
											</View>
											<View className='end-date'>
												<View className='label'>
													<Text>结束日期</Text>
												</View>
												{f[1]}
											</View>
									 </View>
					})
				}
				<View className='map-wrap' onClick={openLocation.bind(this,job.longitude,job.latitude)}>
					<Map className='map' longitude={job.longitude} latitude={job.latitude} enable-zoom={false}  />
					<View className='data'>
						<Image src={icon_location} className='icon_location' />
						<View className='space-30' />
						<Text>{job.city+job.area+job.address+job.addressDetail}</Text>
						<View className='btn-next'><Image src={icon_arrow_right} className='icon_arrow_right' enable-scroll={false}/></View>
					</View>
				</View>
			</View>
			<View className='section'>
				<View className='section-title'>
					<View className='block' />
					<View className='space-12' />
					<Text>公司信息</Text>
					<View className='space-12' />
					<View className='space-12' />
					<View className='line' />
				</View>
				<View className='company' onClick={toEmployer.bind(this,job.employerId)}>
					<View className='avatar'>
						{job.logo && <ImageRoot imageUrl={job.logo} />}
					</View>
					<View className='txt'>
						<Text>{job.employerName}</Text>
						<Text>{job.contact}</Text>
					</View>
					<View className='btn-next'>
						<Image className='icon_arrow_right' src={icon_arrow_right} />
					</View>
				</View>
			</View>
			<View className='fixed-action'>
				<View className='action-btn'>
					<Image src={icon_consult} className='icon_consult' />
					<Text>咨询</Text>
				</View>
				<View className='line'></View>
				<View className='action-btn'>
					<Image src={job.isCollection ? icon_collection_checked : icon_collection} className='icon_collection' />
					<Text>收藏</Text>
				</View>
				<View className='btn-book'>
					<Text>我要报名(1人已报名)</Text>
				</View>
			</View>
		</View>
	)
}