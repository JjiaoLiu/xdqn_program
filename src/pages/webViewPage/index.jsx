import Taro, {useRouter} from '@tarojs/taro'
import {WebView} from '@tarojs/components'

export default function WebViewPage() {
  const router = useRouter();
  return (
    <WebView src={router.params.url} />
  )
}
