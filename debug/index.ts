import { parseArticleUrl } from '../src/core/parser.ts'

const url =
  'http://mp.weixin.qq.com/s?__biz=Mzk3NTMzOTU1Mg==&mid=2247486384&idx=2&sn=b737ac572f301ce208a4f7ca051c22e9&chksm=c4cc62fff3bbebe90448d7f9d0da47a34c081abc9dd6b88f766e9925ded39ec2fe8958a5b401#rd'

console.log(parseArticleUrl(url))
