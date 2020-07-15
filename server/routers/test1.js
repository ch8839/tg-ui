const Router = require('koa-router')
const router = new Router()
const crypto = require("crypto")

router.get('/test1', async(ctx)=>{
  let people = {age: 12, name: 'Tom'}
  ctx.body = {
    success: true,
    msg: people,
    status: 200
  }
})

router.get('/upload', async(ctx)=>{
  const config = {
    dirPath: 'abc/', // 存放到哪个目录下
    bucket: 'shu-project1',
    region: 'oss-cn-shanghai',// 我的是 hangzhou
    accessKeyId: 'LTAI4FsDc3UdJF6oNbNr5sZv',
    accessKeySecret: 'LpZtCHwK4eKcY9n5AxrbEsPZu36tKc',
    expAfter: 300000, // 签名失效时间，毫秒
    maxSize: 1048576000 // 文件最大的 size
  }

  const host = `https://${config.bucket}.${config.region}.aliyuncs.com`
  const expireTime = new Date().getTime() + config.expAfter
  const expiration = new Date(expireTime).toISOString()
  const policyString = JSON.stringify({
    expiration,
    conditions: [
      ['content-length-range', 0, config.maxSize],
      ['starts-with', '$key', config.dirPath]
    ]
  })
  const policy = Buffer.from(policyString).toString('base64')

  const signature = crypto.createHmac('sha1', config.accessKeySecret).update(policy).digest("base64")
  let callback_dict = {}
  callback_dict['callbackUrl'] = 'http://localhost:3030';
  callback_dict['callbackBody'] = 'filename=${object}&size=${size}&mimeType=${mimeType}' +
                                    '&height=${imageInfo.height}&width=${imageInfo.width}';
  callback_dict['callbackBodyType'] = 'application/x-www-form-urlencoded';

  ctx.body = {
    signature,
    policy,
    host,
    expire: expireTime,
    callback: callback_dict,
    'accessid': 'LTAI4FsDc3UdJF6oNbNr5sZv',
    'OSSAccessKeyId': config.accessKeyId,
    'key': expireTime,
    'success_action_status': 201,
    'dir': config.dirPath,
  }
})

module.exports = router
