import { paseArticleUrl } from '../src/parse-article-url.ts'

const url =
  'http://mp.weixin.qq.com/s?__biz=Mzk3NTMzOTU1Mg==&mid=2247485132&idx=1&sn=72fd64e8e8063f18f08fb08d212b9ca6'

console.log(paseArticleUrl(url))
