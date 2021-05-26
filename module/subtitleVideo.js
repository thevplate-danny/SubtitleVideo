const fs = require('fs')
const fsp = require('fs').promises
const ffmpeg = require('fluent-ffmpeg');
const ffmpegOnProgress = require('ffmpeg-on-progress')


const durationEstimate = 30000 //영상 예상 렌더 시간입니다. Instance의 성능에 따라 조절하시면됩니다.
const logProgress = (progress, event) => { //로딩 progrees 가 필요하실경우 아래 코드에 추가하여 WebSocket 등으로 사용 하시면됩니다.
    console.log('progress', (progress * 100).toFixed())
}
  

    async function srt_maker(srtPath, data){
        try {
            await fsp.writeFile(srtPath, data, 'utf8')  
        } catch (error) {
            console.error(error)
        }
        return srtPath;
    }

    async function subtitle_overlay(inVideoFile, subtitleFile, outVideoFile, options){
        console.log(options)
        return new Promise((resolve,reject)=>{
            let ffmpegOption= ''
            var stream  = fs.createWriteStream(outVideoFile);
            console.log(outVideoFile)
                if(  !("FontName" in options) || !("Fontsize" in options) || !("MarginV" in options)) new Error('Mustbe Check Option Keys')
                else ffmpegOption = `${Object.keys(options).map(key => `${key}=${options[key]}`).join(',')}`;
                try {
                     ffmpeg(inVideoFile)
                        
                    .outputOptions(
                    
                    `-vf subtitles=${subtitleFile}:force_style='${ffmpegOption},BorderStyle=2,Outline=2,Shadow=1,OutlineColour=&H40000000'`
                    )
                    .on('error', function(err) {
                        console.log(err)
                        reject('Error: ' + err.message);
                    })
                    .on('progress', ffmpegOnProgress(logProgress, durationEstimate))
                    .save(outVideoFile)
                    .on('end', function() {
                        resolve('Success')
                    })
                } catch (error) {
                    resolve(error)
                }
            
            
        })
    }

module.exports.srt_maker = srt_maker
module.exports.subtitle_overlay = subtitle_overlay