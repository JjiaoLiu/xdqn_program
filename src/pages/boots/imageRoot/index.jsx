import Taro,{useState} from '@tarojs/taro'
import {Image,Text} from '@tarojs/components'

export default function ImageRoot(props) {
	const [show,setShow] = useState(0);

  return (
    // eslint-disable-next-line no-undef
   <Image style={{width:'100%',opacity:show}} onLoad={setShow.bind(this,1)} mode='widthFix' src={IMAGE_URL + props.imageUrl} />
  )
}
// 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' |