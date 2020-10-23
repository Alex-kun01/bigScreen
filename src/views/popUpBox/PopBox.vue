<template>
<!-- 弹出信息展示内容 -->
    <div class="popBox">
        <img class="close" src="../../assets/images/close.png" alt="">
        <!-- 顶部信息展示区 -->
        <div class="topInfoBox">
            <!-- 左侧信息 -->
            <div class="leftInfo">
                <div class="title">
                    <img src="../../assets/images/icon@2x.png" alt="">
                    <span>个人信息</span>
                </div>
                <div class="itemBox">
                    <div class="info">
                        <img :src="popData.url" alt="">
                       <div class="box">
                            <div class="item">{{popData.name}}</div>
                            <div class="item">年龄：25</div>
                            <div class="item">居住地址：2栋2单元4楼4号</div>
                            <div class="item">身份证号：513877454754888554</div>
                            <div class="item">户籍：四川省成都市锦江区</div>
                            <div class="item">重点类型：非法上访（重点监管）</div>
                       </div>
                    </div>
                </div>
            </div>
            <!-- 右侧列表 -->
            <div class="rightList">
                 <div class="title">
                    <img src="../../assets/images/icon@2x.png" alt="">
                    <span>门禁记录</span>
                 </div>
                <div class="itemBox list">
                    <table class="mtable">
                    <thead>
                      <tr>
                        <th>时间</th>
                        <th>行为</th>
                        <th>地点</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                      v-for="(item,index) in showTableData"
                      :key="index"
                      >
                        <td>{{item.date}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.address}}</td>
                        <td style="color:#38A2F7;cursor:pointer;">查看图片</td>
                      </tr>
                    </tbody>  
                  </table>
                </div>
            </div>

        </div>
        <!-- 底部图形区 -->
        <div class="mapBox">
            <div class="title" style="margin-top:20px">
                <img src="../../assets/images/icon@2x.png" alt="">
                <span>出入记录轨迹图</span>
            </div>
            <div class="mapComBox">
                <div class="showB"
                v-for="item in addressList"
                :key="item.id"
                :style="{top: item.top,left: item.left}"
                >
                    <div class="floatB">
                        <span
                        v-for="(option,index) in item.text"
                        :key="index"
                        >{{option}}</span>
                        </div>
                    <img src="../../assets/images/address.png" alt="">
                </div>
                 <img class="luxian" src="../../assets/images/luxian.png" alt="">
            </div>
           
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showTableData: [
                {
                    date: '2019.12.31 00:00',
                    type: '进',
                    address: '1栋1单元门'
                },
                {
                    date: '2019.12.31 00:00',
                    type: '进',
                    address: '1栋1单元门'
                },
                {
                    date: '2019.12.31 00:00',
                    type: '进',
                    address: '1栋1单元门'
                },
                {
                    date: '2019.12.31 00:00',
                    type: '进',
                    address: '1栋1单元门'
                },
                {
                    date: '2019.12.31 00:00',
                    type: '进',
                    address: '1栋1单元门'
                }
            ],
            mapShow: [
                {
                    top: '340px',
                    left: '450px',
                    id: 0,
                    infoData: [
                        {
                            showInfo:'9:30进西大门',
                            src: require('../../assets/images/people/people1.png'),
                            snapTime: '2020-10-10 9:30:44',
                            snapPren: '小左 男 25岁',
                            typeCn: '吸毒人员',
                            sanpAddress: '香槟国际-东大门'
                        },
                        {
                            showInfo:'12:30出西大门',
                            src: require('../../assets/images/people/people2.png'),
                            snapTime: '2020-10-10 12:30:30',
                            snapPren: '小左 男 25岁',
                            typeCn: '吸毒人员',
                            sanpAddress: '香槟国际-西大门'
                        },
                    ]
                },
                {
                    top: '270px',
                    left: '710px',
                    infoData: [
                        {
                            showInfo:'10:30经过南广场',
                            src: require('../../assets/images/people/people3.png'),
                            snapTime: '2020-10-10 10:30:34',
                            snapPren: '小明 男 5岁',
                            typeCn: '非法上访',
                            sanpAddress: '香槟国际-东大门'
                        },
                        {
                            showInfo:'11:30经过南广场',
                            src: require('../../assets/images/people/people4.png'),
                            snapTime: '2020-10-10 11:30:39',
                            snapPren: '小明 男 5岁',
                            typeCn: '非法上访',
                            sanpAddress: '香槟国际-东大门'
                        },
                    ]
                },
                {
                    top: '160px',
                    left: '880px',
                    infoData: [
                        {
                            showInfo:'14:30进2栋2单元',
                            src: require('../../assets/images/people/people1.png'),
                            snapTime: '2020-10-10 14：30：35',
                            snapPren: '小黄 女 28岁',
                            typeCn: '非法上访',
                            sanpAddress: '香槟国际-东大门'
                        },
                        {
                            showInfo:'15:30出2栋2单元',
                            src: require('../../assets/images/people/people1.png'),
                            snapTime: '2020-10-10 15：30：20',
                            snapPren: '小黄 女 28岁',
                            typeCn: '非法上访',
                            sanpAddress: '香槟国际-东大门'
                        },
                    ]
                }
            ],
            dialogVisible: false,
            sanpList: [],
            showSanpInfo: {
                src: '',
                snapTime: '',
                snapPren: '',
                typeCn: '',
                sanpAddress: ''
            },
            // 地图标记列表
            addressList: [
                {
                    id: 0,
                    top: '44%',
                    left: '34%',
                    text: ['09:34进大门','12:33出大门']
                },
                {
                    id: 1,
                    top: '45%',
                    left: '80%',
                    text: ['11:00经过广场','11:33经过广场']
                },
                {
                    id: 2,
                    top: '15%',
                    left: '47%',
                    text: ['9:50进1栋2单元门','12:10出1栋2单元门']
                }
            ]
        }
    },
    methods:{
        // 控制弹出层
        floatClick(data){
            this.sanpList = data
            this.showSanpInfo = this.getSanpData(data,this.nowFloatId)
            this.dialogVisible = true
        },
    },
    props:{
        popData: Object
    }
}
</script>
<style lang="less" scoped>
.popBox{
    width: 100%;
    box-sizing: border-box;
    position: relative;
    .close{
        width: 20px;
        height: 20px;
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .topInfoBox{
        width: 100%;
        display: flex;
        position: relative;
        .leftInfo{
            width: 40%;
            border-bottom: 1px solid #030B22;
            .info{
                display: flex;
                img{
                    width: 104px;
                    height: 142px;
                    margin-right: 20px;
                }
            }
        }
        .leftInfo, .rightList{
            box-sizing: border-box;
            padding: 10px;
            .itemBox{
                width: 100%;
                height: 250px;
                min-width: 250px;
                display: flex;
                align-items: center;
                .box{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 0.9rem;
                }
            }
            .itemBox.list{
                justify-content: center;
            }
        }
        .rightList{
            width: 60%;
            border-bottom: 1px solid #030B22;
            border-left: 1px solid #030B22;
        }
    }
    .mapBox{
        width: 100%;
        .mapComBox{
            width: 100%;
            height: 400px;
            background-color: cornsilk;
            background-image: url('../..//assets/images/componcty.png');
            background-repeat:no-repeat;
            background-size:100% 100%;
            -moz-background-size:100% 100%;
            position: relative;
            .luxian{
                width: 50%;
                height: 50%;
                position: absolute;
                top: 40%;
                left: 35%;
            }
            .showB{
                position: absolute;
                img{
                    width: 20px;
                    height: 24px;
                }
               .floatB{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center ;
                width: 128px;
                height: 78px;   
                font-size: 0.7rem;
                font-family: MicrosoftYaHei;
                color: #FFFFFF;
                line-height: 19px;
                letter-spacing: 1px;
                background: rgba(17, 25, 64, 0.69);
                box-shadow: 0px 0px 4px 2px rgba(83, 157, 254, 0.59), 0px 0px 4px 2px #739BFF;
                border-radius: 5px;
                border: 2px solid;
                border-image: linear-gradient(138deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 2 2;
               }
            }
        }
    }
}
.mtable{
    width: 80%;
    font-size: 0.9rem;
    border: 1px #111940 solid;
    border-spacing: 0px;//单元格间距为0px
    border-collapse: collapse;//=改为合并
    th{
      font-weight: 100;
      height: 33px;
      margin: 0;
      min-width: 20%;
      border: 1px #111940 solid;
      background-color: #252C50;
    }
    td{
      font-weight: 100;
      height: 33px;
      border: 1px #111940 solid;
      min-width: 20%;
      text-align: center;
      background-color: #252C50;
    }
  }
  .title{
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #38A2F7;
        line-height: 21px;
        letter-spacing: 1px;
        margin-bottom: 20px;
        img{
            width: 11px;
            height: 11px;
            margin-right: 10px;
        }
    }
</style>