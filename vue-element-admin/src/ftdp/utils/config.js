// 全局配置
var ftdpConfig = {
  apiBase: 'http://localhost',
  apiBase2: '',
  apiBase3: '',
  apiBase4: '',
  apiBase5: '',
  apiBase6: '',
  apiBase7: '',
  apiBase8: '',
  tokenKey: 'token',
  getTokenLocal: function() { return getTokenLocal() }
}
// 在客户端获取已保存的token
function getTokenLocal() {
  return '12345'
}
export {
  ftdpConfig
}
