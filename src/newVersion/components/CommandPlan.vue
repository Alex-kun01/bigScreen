<template>
<!-- 楼层指挥平面图 -->
    <div class="commandPlan">
        <div class="comm_left">
            <div class="lineList">
                <div :class="foolIndex == index ? 'item active':'item'"
                 v-for="(item,index) in foolTreeList"
                 :key="item.id"
                @click="changeFoolIndex(item,index)"
                 >{{item.name}}</div>
            </div>
            <div class="tables">
                <div class="community" style="margin-bottom:20px;font-weight:bold;">{{commname}}</div>
                <div class="titl">设备列表</div>
                <table class="mtable">
                    <thead>
                    <tr>
                        <th>设备名称</th>
                        <th>设备型号</th>
                        <th style="min-width:60px;">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.type_name }}</td>
                        <td
                        @click="lookDetail(item)"
                        style="color: #38a2f7; cursor: pointer"
                        >
                        查看
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="comm_con">
            <div class="imgBox">
                <img :src="contentImg" alt="">
                <!-- 平层图设备点位 alarm -->
                <div class="deviceBox"
                 v-for="(item,index) in pingcDList"
                    :key="index+'d'"
                    :style="{top: item.y,left: item.x}"
                >
                    <img v-if="item.type == 12" src="../../assets/images/camera.png"
                    @click="camareClick(item)"
                     style="width: 20px;height:20px;" class="camare" alt="">
                    <div v-else @click="lookDetail(item)" :class="{deviceD: 1, active: item.alarm == 1}"></div>
                </div>
                
            </div>
        </div>
        <div class="comm_right">
            <el-button @click="backPage" size="mini">返回</el-button>
            <div class="red">信息</div>
             <div>小区：{{rightDevice.company_name}}</div>
            <div>设备名：{{rightDevice.device_name}}</div>
            <div>设备编码：{{rightDevice.device_code}}</div>
            <div>楼层：{{rightDevice.floor_name}}</div>
            <div class="btn">
                <el-button size="small" @click="wbClick">误报</el-button>
                <el-button size="small" @click="wxClick">维修</el-button>
                <el-button size="small" @click="confirmbj" type="primary">确认报警</el-button>
            </div>
        </div>
        <!-- 火警误报 -->
        <template v-if="fierErrorShow">
            <FierError @closethis="fierErrorClose" :id="id" />
        </template>
        <!-- 火警确认 -->
        <template v-if="fierConfirm">
            <FierConfirm @closethis="fierConfirClose" :id="id" />
        </template>
        <!-- 维保确认 -->
        <template v-if="fierWBShow">
            <FierWB @closethis="fierWBClose" :id="id" />
        </template>
        <!-- 设备详情 -->
        <template v-if="deviceDetailsShow">
            <DeviceDetails @closethis="deviceDetailsClose" />
        </template>
        <!-- 视频播放 -->
        <template v-if="vidioShow">
            <VidioComp @closeVidio="vidioClose" :voUrl="voUrl" />
        </template>
    </div>
</template>
<script>
import FierError from '../components/FierError' // 火警误报
import FierConfirm from '../components/FierConfirm' // 火警确认
import FierWB from '../components/FierWB' // 维保确认
  import DeviceDetails from '../components/DeviceDetails' // 设备详情
  import VidioComp from '../components/VidioComp' // 视频播放
export default {
    props:{
        commname: String,
        id: Number, // 设备id 传递进来 右侧信息
        items: String
    },
    components:{
        FierError,
        FierConfirm,
        FierWB,
        DeviceDetails,
        VidioComp
    },
    data(){
        return{
            voUrl: '',
            vidioShow: false,
            device: '',
            deviceDetailsShow: false,
            fierWBShow: false, //维保确认
            fierConfirm: false, // 火警确认
            fierErrorShow: false, // 火警误报
            tableData:[],
            guzInfo:{
                date: '2020-12-12 11:12:15'
            },
            foolIndex: 0,
            foolTreeList: [],
            contentImg: '', //平层图
            pingcDList: [], // 平层图点位列表
            rightDevice: {}
        }
    },
    mounted(){
        console.log('oooooooooooooooooooooooooooooooooooo', this.items)
        this.rightDevice = JSON.parse(this.items)
        this.getDeviceList(this.rightDevice.floor_id)
        this.getFoolTree()
    },
    methods:{
        // 视频播放 34020000001320000003
        camareClick(item){
            console.log('item', item)
            let id = '34020000001320000006'
            this.getDviInfo(id)
        },
        // 根据id获取视频数据
        getDviInfo(id){
            this.$http.get(`${process.env.VUE_APP_3_URL}/api/v1/stream/start.php`,{params:{serial: id}}).then(res =>{
                console.log('视频详情数据', res)
                if(res.status == 200){
                    this.voUrl = res.data.HLS
                    console.log('视频URLxxxxxx',this.voUrl)
                    this.vidioShow = true
                }
            })
        },
        vidioClose(){
            this.vidioShow = false
        },
        deviceDetailsClose(){
        this.deviceDetailsShow = false
      },
        //closethis
        lookDetail(item){
            console.log('item', item)
            this.device = JSON.stringify(item)
            this.deviceDetailsShow = true
        },
        // 返回
        backPage(){
            this.$emit('closethis')
        },
        wbClick(){
            console.log('误报')
            this.fierErrorShow = true
        },
        wxClick(){
            console.log('维修')
            this.fierWBShow = true
        },
        confirmbj(){
            console.log('确认报警')
            this.fierConfirm = true
        },
        fierErrorClose(){
            this.fierErrorShow = false
        },
        fierConfirClose(){
            this.fierConfirm = false
        },
        fierWBClose(){
            this.fierWBShow = false
        },
        changeFoolIndex(item,index){
            this.foolIndex = index
            
            let id = item.id.replace(/[^0-9]/ig,"");
            console.log('item', item, id)
            this.getDeviceList(+id)
        },
        // 获取左侧楼层树
        getFoolTree(){
            const _this = this
            let program_id = this.rightDevice.company_name == "锦屏佳苑" ? 6:5;
            let json = {
                user_id: 1,
                level: 4,
                program_id
            }
            this.$http.post(`${process.env.VUE_APP_4_URL}/floor/tree`,json,{
                headers:{
                    'shomes-user': 5
                }
            }).then(res =>{
                const datas = res.data.data
                const bDatas = datas.filter(item => {
                    if(item.id.includes('b')){
                        return item
                    }
                })
                const fDatas = datas.filter(item => {
                     
                    if(item.id.includes('f')){
                        return {
                            ...item
                        }
                    }
                })
                const newDatas = fDatas.map(item => {
                    let option = {}
                    bDatas.forEach(bit => {
                        if(item.parent_id == bit.id){
                            option = {
                                ...item,
                                name: bit.name + '-' +item.name
                            }
                            
                        }   
                    })
                    // console.log('lll', option )
                    return option
                    
                })
                const targetDatas = newDatas.filter(item => {
                    if(item.name.includes('1栋')){
                        if(!item.name.includes('11栋')){
                            return {
                                ...item
                            }
                        }
                    }
                })
                this.foolTreeList = targetDatas
                
            })
        },
        // 根据楼层查询设备列表
        getDeviceList(id){
            let json = {
                floor_id: id,
                limit: 1000,
                page: 1
            }
            //设备列表
            this.$http.post(`${process.env.VUE_APP_4_URL}/device/list`,json,{
                headers:{
                   'shomes-user': 5 
                }
            }).then(res =>{
                this.tableData = res.data.data
                this.pingcDList = res.data.data.map(item =>{
                    return {
                        ...item,
                        x: item.x * 100 + "%",
                        y: item.y * 100 + '%'
                    }
                })
                // console.log('平层图点位列表', this.pingcDList)
            })
            this.getPingcImg(id)
        },
        getPingcImg(id){
            // 平层图 
            this.$http.post(`${process.env.VUE_APP_4_URL}/floor/read`,{
                id
            },{
                headers:{
                   'shomes-user': 5 
                }
            }).then(res =>{
                this.contentImg = 'https://file.webizz.cn/minio/' + res.data.photo
            })
        }
    }
}
</script>
<style lang="less" scoped>
.commandPlan{
    width: 100%;
    height: calc(100% - 70px);
    background: #fff;
    position: fixed;
    top: 70px;
    z-index: 2001;
    .comm_left,.comm_con,.comm_right{
        height: 100%;
        box-sizing: border-box;
        padding: 10px;
        position: absolute;
        top: 0;
    }
    .comm_left{
        left: 0;
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #666666;
        letter-spacing: 1px;
        .lineList{
            width: 35%;
            height: 100%;
            overflow-y: scroll;
            .item{
                width: 100%;
                // height: 30px;
                line-height: 30px;
                text-align: center;
                background: #EFEFEF;
                border-radius: 2px;
                margin-bottom: 10px;
                cursor: pointer;
            }
            .item.active{
                background-color: #008c8c;
                color: #fff;
            }
        }
        .lineList::-webkit-scrollbar {/*滚动条整体样式*/
          width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
      }
      .lineList::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #535353;
      }
      .lineList::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          border-radius: 10px;
          background: #EDEDED;
      }
        .tables{
            height: 100%;
            width: 60%;
            overflow-y: scroll;
            .mtable {
                width: 100%;
                color: #333333;
                font-size: 0.6rem;
                border: 1px #111940 solid;
                border-spacing: 0px; //单元格间距为0px
                border-collapse: collapse; //=改为合并
                th {
                    font-weight: 100;
                    height: 30px;
                    margin: 0;
                    background-color: #dff1ff;
                    border: 1px #fff solid;
                    min-width: 25%;
                }
                td {
                    font-weight: 100;
                    height: 30px;
                    border: 1px #fafafa solid;
                    min-width: 25%;
                    text-align: center;
                }
                }
        }
        .tables::-webkit-scrollbar {/*滚动条整体样式*/
          width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
      }
      .tables::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #535353;
      }
      .tables::-webkit-scrollbar-track {/*滚动条里面轨道*/
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          border-radius: 10px;
          background: #EDEDED;
      }
    }
    .comm_con{
        left: 30%;
        width: 50%;
        border-left: 2px solid #eee;
        border-right: 2px solid #eee;
        .imgBox{
            position: relative;
            .deviceBox{
                position: absolute;
                cursor: pointer;
                .deviceD{
                    height: 20px;
                    width: 20px;
                    background-color: blue;
                    border-radius: 50%;
                }
                .deviceD.active{
                    background-color: #f40;
                    animation: sahnchu 2s infinite;
                }
                @keyframes sahnchu {
                    0%{
                        transform:rotate(45deg) scale(0.8,0.8);
                        opacity:1;
                    }
                    50%{
                        transform:rotate(45deg) scale(1,1);
                        opacity:0.8;
                    }
                    100%{
                        transform:rotate(45deg) scale(0.8,0.8);
                        opacity:1;
                    }
                }

            }
            
            img{
                width: 100%;
            }
        }
        
    }
    .comm_right{
        right: 0;
        width: 20%;
            height: 125px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #333333;
            line-height: 25px;
            letter-spacing: 1px;
        .btn{
            margin-top: 30px;
        }
        .red{
            color: #FF0000;
            margin-bottom: 10px;
            margin-top: 20px;
        }
    }
}
</style>