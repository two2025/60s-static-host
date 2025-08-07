import { paseArticleUrl } from '../src/parse-article-url.ts'

const url =
  'http://mp.weixin.qq.com/s?__biz=Mzk3NTMzOTU1Mg==&mid=2247486342&idx=2&sn=d89e2fd8e443047d506d52f514c5fd92&chksm=c4cc62c9f3bbebdf104cce56e6645c7a56f7cca5d544cd067da0e97dcc67623eba015728cefa#rd '

console.log(paseArticleUrl(url))
