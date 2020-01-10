import Taro, {useState, useDidShow } from "@tarojs/taro";
import {View, Image, Text} from "@tarojs/components";
import icon_back from './icon_back.png';
import icon_arrow_right from './icon_arrow_right.png';
import icon_location  from './icon_location.png';
import request from './../../util/request';
import ImageRoot from "../boots/imageRoot";
import Jobcard from "../boots/jobcard";
import './../../app.scss';
import './index.scss';

export default function Employer(){

	const [employerid] = useState(this.$router.params.employerId);
	const [employer,setEmployer] = useState({});
	const [job,setJob] = useState([]);

	useDidShow(()=>{
		request({
			url: `/search/employer/${employerid}`,
			auth:false
		}).then((res)=>{
			setEmployer(res);
  	})
  	request({
			url: `/search/employer/job?userId=${employerid}`,
			auth:false
		}).then((res)=>{
			setJob(res);
  	})
	});

	const openLocation = (latitude,longitude)=>{
		Taro.chooseLocation({
			latitude,longitude,scale: 18
		})
	}

	const toPrev = ()=>{
		return Taro.getCurrentPages().length > 0 ?  Taro.navigateBack({ delta: 1 }) :  Taro.reLaunch({ url: `/pages/layout/index?current=0` })
	}

	return (
		<View className='employer'>
			<View className='page-title'>
				<Text className='center'>企业详情</Text>
				<View className='action'>
					<View className='action-btn' onClick={toPrev.bind(this)}><Image src={icon_back} className='icon_back' /></View>
				</View>
			</View>
			<View className='section'>
				<View className='company'>
					<View className='avatar'>
						{employer.logo && <ImageRoot imageUrl={employer.logo} />}
					</View>
					<View className='txt'>
						<View>{employer.employerName}</View>
						<View><Text className='tag'>{employer.rygmName}</Text>
						<Text className='tag'>{employer.hyflName}</Text></View>
					</View>
				</View>
			</View>
			<View className='section'>
				<View className='section-title'>
					<Text>公司简介</Text>
				</View>
				<View className='introduction'>
					{employer.introduction}
				</View>
			</View>
			<View className='section'>
				<View className='section-title'>
					<Text>公司地址</Text>
				</View>
				<View className='map-wrap' onClick={openLocation.bind(this,employer.longitude,employer.latitude)}>
					<Map className='map' longitude={employer.longitude} latitude={employer.latitude} enable-zoom={false} />
					<View className='data'>
						<Image src={icon_location} className='icon_location' />
						<View className='space-30' />
						<Text>{employer.city + employer.area + employer.address}</Text>
						<View className='btn-next'><Image src={icon_arrow_right} className='icon_arrow_right' enable-scroll={false}/></View>
					</View>
					<View className='address'>详细地址:{employer.addressDetail}</View>
				</View>
			</View>
			<View className='section'>
				<View className='section-title'>
					<Text>招聘职位</Text>
				</View>
				{
					job.length && job.map((f,index)=>{
						return <Jobcard data={f} key={index+'_job'} />
					})
				}
				{
					!job.length && <View className='empty'>该公司暂无招聘信息</View>
				}
			</View>
		</View>
	)
}