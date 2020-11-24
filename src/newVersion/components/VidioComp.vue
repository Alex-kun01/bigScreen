<template>
<!-- 视频组件 -->
    <div class="vidis">
        <div class="show">
            <img
            src="../../assets/images/close.png"
            @click="closeme"
            alt=""
            class="close"
            />
            <!-- 视频 -->
            <video-player  class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
            ></video-player>

        </div>
    </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
export default {
    components: {
    videoPlayer
  },
  props:{
      voUrl: String // 视频链接
  },
  mounted(){
  },
    data(){
        return{
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: true, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', 
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                src: this.voUrl,   // 路径
                type: 'application/x-mpegURL'  // 类型
                }],
                hls: true,
                poster: "../../static/images/test.jpg", //你的封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试', 
                controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
                }
            },
            
        }
    },
    methods:{
        closeme(){
            this.$emit('closeVidio')
        }
    }
}
</script>
<style lang="less" scoped>
.vidis{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    padding-top: 48px;
    top: 0;
    left: 0;
    z-index: 9999999;
    .show{
        width: 60%;
        height: 70%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        // background-color: #fff;
        display: flex;
        box-sizing: border-box;
        padding-top: 50px;
        justify-content: center;
        align-content: center;
        .video-player{
            width: 90%;
            height: 90%;
        }
        .close {
            width: 30px;
            height: 30px;
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
    }
}
</style>