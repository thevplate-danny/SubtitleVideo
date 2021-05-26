# SubtitleVideo (마인드어스)

## Prerequisites (사전 설치 사항)

1. ffmpeg 설치
- Ubuntu 
```bash
$ sudo apt install update
$ sudo apt install ffmpeg
```



- AMI(aws) - Root 권한 필요
```bash
$ rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
$ rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-1.el7.nux.noarch.rpm
$ yum -y install autoconf automake cmake freetype-devel gcc gcc-c++ git libtool make mercurial pkgconfig zlib-devel
$ yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm

$ rpm -ivh libass-0.13.4-6.el7.x86_64.rpm
$ yum install -y ffmpeg ffmpeg-devel

```

- 설치확인
```bash
$ ffmpeg -version
```

2. 한글 글꼴 설치 
- ubuntu 
```bash
$ sudo apt-get install fonts-nanum*
// 나눔 이라는 단어가 포함된 글꼴 패키지 모두 설치
$ sudo fc-cache -fv
// 글꼴 캐시 삭제
```

- AMI(AWS) - 아래 링크 참조
 > https://zetawiki.com/wiki/%EB%A6%AC%EB%88%85%EC%8A%A4_%EB%82%98%EB%88%94%ED%8F%B0%ED%8A%B8_%EC%84%A4%EC%B9%98


## Installation (설치방법)
> module/subtitleVideo.js 다운로드 후 프로젝트 폴더에 포함
```bash
$ npm install fs --save
$ npm install fluent-ffmpeg --save
```

```javascript
const subtitileVideo = require('./module/subtitleVideo')
```

## Usage (사용법)

```javascript
//자막 파일 생성
const srtFile = await subtitileVideo.srt_maker(      srtOutput ,        subtitle  )
//___________________________________________ (자막파일 생성 파일 지정, 자막 텍스트)
// Return => String : 자막파일경로


const inputVideoFile = `${__dirname}\\public\\sample.mp4` //예시 경로 - 윈도우일 경우 Path 확인해주세요
const outputVideoFile = `${__dirname}\\public\\${Date.now()}.mp4` //예시 경로 - - 윈도우일 경우 Path 확인해주세요


//스타일 설정
const subtitleOptions= {
    FontName: 'NanumGothic',// Linux일경우 폰트가 설치되어있어야 합니다. (사전 설치 사항 확인)
    Fontsize: 12, 
    MarginV: 20 // 하단으로부터 Margin 
  }
const result = await subtitileVideo.subtitle_overlay(inputVideoFile,srtFile,outputVideoFile,subtitleOptions)
//______________________________________________(입력 비디오 파일 경로, 자막파일경로, 출력 비디오파일 경로, 옵션)
// Return => String : 비디오파일경로
```

## Example 
```bash
$ npm install
$ node example.js
```
> https://locahost:7777 
자막 생성 버튼을 누르면 Textarea 입력되어있는 자막 포맷에 맞춰 자막을 생성한 후 생성된 비디오파이롤 Redirect 됩니다.

문의 Vplate. Danny




