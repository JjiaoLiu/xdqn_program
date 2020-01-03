import Taro from '@tarojs/taro'
import {Image} from '@tarojs/components'

export default function ImageRoot(props) {
  return (
    // eslint-disable-next-line no-undef
    <Image style={{width:'100%'}} mode='widthFix' src={IMAGE_URL + props.imageUrl} />
  )
}
// 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' |
