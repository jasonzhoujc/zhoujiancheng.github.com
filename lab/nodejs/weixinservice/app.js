var wxConnect = require('wx-connect');
var app = wxConnect({appToken: ''})

app.text(function(req, res) {
  res.text('您好，欢迎使用微信公众平台！')
});

app.listen(80);
