<template>
    <div class="bom_Box">
        <div class="videoBox">
            <div class="video">
                <div class="v_box">
                    <div class="updata" @click="updata(1)"><i class="el-icon-refresh"></i></div>
                    <template v-if="videoUrl1!=''"> 
                        <ItemVideo :videoUrl="videoUrl1" />
                    </template>
                </div>
            </div>
            <div class="video">
                <div class="v_box">
                    <div class="updata" @click="updata(2)"><i class="el-icon-refresh"></i></div>
                    <template v-if="videoUrl2!=''"> 
                        <ItemVideo :videoUrl="videoUrl2" />
                    </template>
                </div>
            </div>
            <div class="video">
                <div class="v_box">
                    <div class="updata" @click="updata(3)"><i class="el-icon-refresh"></i></div>
                    <template v-if="videoUrl3!=''"> 
                        <ItemVideo :videoUrl="videoUrl3" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ItemVideo from './ItemVideo';
export default {
    components: {
        ItemVideo
    },
    data(){
        return{
            // 设备列表
            deviceList: [],
            urls: 0, // 请求过来的视频数量 为3则展示
            videoUrl1: '',
            videoUrl2: '',
            videoUrl3: '',
        }
    },
    mounted(){
        this.getDeviceIds()
    },
    methods:{
        /**
         * 获取设备列表
         */
        getDeviceIds(){
            this.$http.get(`${process.env.VUE_APP_3_URL}/api/v1/device/list.php`).then(res =>{
                console.log('设备列表数据', res)
                if(res.status == 200){
                    this.deviceList = res.data.DeviceList.splice(0,3); // 只需要展示三个设备
                    this.getMuDatas(this.deviceList[0].ID,1)
                    this.getMuDatas(this.deviceList[1].ID,2)
                    this.getMuDatas(this.deviceList[2].ID,3)
                }
            })
        },
        /**
         * 根据设备列表请求流媒体数据
         */
        getMuDatas(id,i){
            const _this = this;
            this.$http.get(`${process.env.VUE_APP_3_URL}/api/v1/stream/start.php`,{params:{serial: id}}).then(res =>{
                if(res.status == 200){
                    console.log('视频流判断',id, res);
                    if(i == 1) _this.videoUrl1 = res.data.HLS
                    if(i == 2) _this.videoUrl2 = res.data.HLS
                    if(i == 3) _this.videoUrl3 = res.data.HLS
                    console.log('url数据', this.videoUrl1,this.videoUrl2,this.videoUrl3);
                }
            })
        },
        /**
         * 刷新
         */
        updata(id){
            if(id == 1){
                this.videoUrl1 = ''
                this.getMuDatas(this.deviceList[0].ID,1)
            }else if(id == 2){
                this.videoUrl2 = ''
                this.getMuDatas(this.deviceList[1].ID,2)
            }else if(id == 3){
                this.videoUrl3 = ''
                this.getMuDatas(this.deviceList[2].ID,3)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.bom_Box{
    width: 50%;
    height: 22.5%;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    z-index: 1000;
    .videoBox{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .video{
            width: 32%;
            height: 100%;
            // background-color: #D8D8D8;
            display: flex;
            justify-content: center;
            align-items: center;
            .v_box{
                width: 100%;
                height: 100%;
                position: relative;
                .updata{
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    z-index: 999;
                    cursor: pointer;
                    font-size: 25px;
                    text-align: center;
                    line-height: 20px;
                    color: #fff;
                }
            }
        }
    }
}
</style>