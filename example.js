
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

//자막 생성 모듈 Include
const subtitileVideo = require('./module/subtitleVideo')

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 프론트 확인 View Page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/view.html'));
});


app.post('/srtMake', async function(req, res) {
  console.log(req.body)
  const subtitle = req.body.subtitle
  
  const srtOutput = `${__dirname}/public/${Date.now()}.srt`

  const srtFile = await subtitileVideo.srt_maker(      srtOutput ,        subtitle  )
  //_____________________________________________ (자막파일 생성 파일 지정, 자막 텍스트)
  // Return => {path : 파일경로}
  
  const inputVideoFile = `${__dirname}/public/sample.mp4`
  const genVideoFileName = `${Date.now()}.mp4`
  const outputVideoFile = `${__dirname}/public/${genVideoFileName}`
  console.log(inputVideoFile)
  const subtitleOptions= {
    FontName: 'NanumGothic',// Linux일경우 폰트가 설치되어있어야 합니다. default: NanumGothic
    Fontsize: 12, 
    MarginV: 20 // 하단으로부터 Margin 
  }
  const result = await subtitileVideo.subtitle_overlay(inputVideoFile,srtFile,outputVideoFile,subtitleOptions)
  console.log(result)
  res.redirect(`/${genVideoFileName}`)
})

app.get('/test', async function(req, res) {

})


app.listen(7777)