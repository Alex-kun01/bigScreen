<template>
  <!-- 处置组件 -->
  <div class="popBox">
    <img
      @click="closexxx"
      class="close"
      src="../../assets/images/close.png"
      alt=""
    />
    <!-- 顶部信息展示区 -->
    <div class="topInfoBox">
      <!-- 左侧信息 -->
      <div class="leftInfo">
        <div class="boxItem">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <span>个人信息</span>
          </div>
          <div class="itemBox">
            <div class="info">
              <img
                style="height: 120px; width: 90px"
                :src="personInfo.人像"
                alt=""
              />
              <div class="box">
                <div class="item">姓名：{{ personInfo.姓名 }}</div>
                <div class="item">年龄：{{ personInfo.年龄 }}岁</div>
                <div class="item">居住地址：{{ personInfo.居住地址 }}</div>
                <div class="item">身份证号：{{ personInfo.身份证号 }}</div>
                <div class="item">户籍：{{ personInfo.户籍 }}</div>
                <div class="item">重点类型：{{ personInfo.类型 }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="boxItem">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <span>网格员</span>
          </div>
          <div class="itemBox">
            <div class="info">
              <img
                style="height: 120px; width: 90px"
                :src="groupAvatar[groudIndex]"
                alt=""
              />
              <div class="box">
                <div class="item">姓名：{{ groundNames[groudIndex] }}</div>
                <div class="item">管理小区：{{ personInfo.通道?personInfo.通道.substring(0,4):'' }}</div>
                <div class="item">电话：{{ personInfo.网格员电话 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧列表 -->
      <div class="rightList">
        <div class="checkMenu">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <span
              @click="checkCMenu(1)"
              style="margin-right: 10px"
              :style="menuChoose == 1 ? 'color:#38A2F7;' : 'color:#2C5677;'"
              >处置记录</span
            >
            <span
              @click="checkCMenu(2)"
              :style="menuChoose == 2 ? 'color:#38A2F7;' : 'color:#2C5677;'"
              >门禁记录</span
            >
          </div>
        </div>
        <div class="newList" v-show="menuChoose == 1">
          <div class="topMess">
            <div class="top_line_box">
              <div class="top_line_left">
                <!-- 处置记录列表 -->
                <div
                  class="l_left_item"
                  v-for="(item, index) in historyTableData"
                  :key="index"
                  :style="{
                    color: item.show ? '#333' : '#000',
                  }"
                >
                  <span>{{ item.状态 }}：</span>
                  <span>{{ item.处置时间 }}</span>
                </div>
              </div>
              <div class="top_line_right">
                <!-- <img :src="personInfo.处置图片" alt="" /> -->
                <!-- <img src="../../assets/twopage/zp1.jpg" alt="" />
                <img src="../../assets/twopage/zp3.png" alt="" />
                <img src="../../assets/twopage/zp4.png" alt="" /> -->
              </div>
            </div>
            <div>
              <!-- 通知：已将该人员进行劝说处理，该重点人员已回到香槟国际小区 -->
            </div>
          </div>
          <div class="historyList">
            <div class="hist_top">
              <span>历史处置</span>
              <span>查看更多</span>
            </div>
            <div class="hisTableBox">
              <table class="mtable">
              <thead>
                <tr>
                  <th>序号</th>
                  <th>姓名</th>
                  <th>身份证号</th>
                  <th>联系电话</th>
                  <th>地点</th>
                  <th>时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in historyTableData" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ item['姓名'] }}</td>
                  <td>{{ item['身份证号'] }}</td>
                  <td>{{ item['联系电话'] }}</td>
                  <td>{{ item.通道 }}</td>
                  <td>{{ item.处置时间 }}</td>
                  <td>{{ item.状态 }}</td>
                  <td
                    style="color: #38a2f7; cursor: pointer"
                    @click.self="lookImg(item)"
                  >
                    查看
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <div class="itemBox list" v-show="menuChoose == 2">
          <table class="mtable">
            <thead>
              <tr>
                <th>开门方式</th>
                <th>时间</th>
                <th>通道</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in showTableData" :key="index">
                <td>{{ item.开门方式 }}</td>
                <td>{{ item.时间 }}</td>
                <td>{{ item.通道 }}</td>
                <td
                  style="color: #38a2f7; cursor: pointer"
                  @click.self="lookImg2(item)"
                >
                  查看图片
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- 底部图形区 -->
    <div class="mapBox">
      <div class="title" style="margin-top: 20px">
        <img src="../../assets/images/icon@2x.png" alt="" />
        <span>出入记录轨迹图</span>
      </div>
      <div class="mapComBox">
        <div
          class="showB"
          v-for="item in addressList"
          :key="item.id"
          :style="{ top: item.top, left: item.left }"
        >
          <div class="floatB">
            <span v-for="(option, index) in item.text" :key="index">{{
              option
            }}</span>
          </div>
          <img src="../../assets/images/address.png" alt="" />
        </div>
        <img class="luxian" src="../../assets/images/luxian.png" alt="" />
      </div>
    </div>
    <!-- 中间悬浮框 -->
    <div class="centetFloatBox" v-if="centerShow">
      <img
        @click="centerShow = false"
        src="../../assets/images/close.png"
        alt=""
        class="close"
      />
      <img class="show" :src="lookDeail.图片|| lookDeail.照片" alt="" />
      <div class="bomShow">
        <!-- <div class="left">类型：{{lookDeail}}</div> -->
        <div class="right">
          <div>抓拍时间：{{ lookDeail.抓拍时间||lookDeail.时间 }}</div>
          <div>抓拍地点：{{ lookDeail.通道 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../../api/bus.js";
export default {
  data() {
    return {
      // 中间弹框图片
      cenShowImg: "",
      // 重点人员信息
      cnInfo: {
        name: "张小虎",
        age: 25,
        url: "",
        address: "2栋2单元1503号",
        idCard: 513977844512355447,
        huji: "四川省大邑县新场镇文昌21组",
        cnType: "非法上访（重点监管）",
      },
      // 网格员
      gridInfo: {
        name: "张晓",
        age: 45,
        phone: 1898012478,
        url: "",
      },
      // 菜单选择
      menuChoose: 1, //右侧菜单选择
      centerShow: false,
      // 门禁列表数据
      showTableData: [],
      // 地图标记列表
      addressList: [
        {
          id: 0,
          top: "44%",
          left: "30%",
          text: ["09:34进大门", "12:33出大门"],
        },
        {
          id: 1,
          top: "42%",
          left: "80%",
          text: ["11:00经过广场", "11:33经过广场"],
        },
        {
          id: 2,
          top: "15%",
          left: "45%",
          text: ["9:50进1栋2单元门", "12:10出1栋2单元门"],
        },
      ],
      mapShow: [],
      dialogVisible: false,
      sanpList: [],
      showSanpInfo: {
        src: "",
        snapTime: "",
        snapPren: "",
        typeCn: "",
        sanpAddress: "",
      },
      // 处置记录
      chuzhiList: [],
      // 历史记录
      historyTableData: [],
      // 查看详情
      lookDeail: {},
      // 人员信息
      personInfo: {},
      // 网格员头像
      groudIndex: 0,// 网格员索引
      groupAvatar:['',require('../../assets/images/police/police3.png'),require('../../assets/images/police/police4.png')],
      groundNames: ['','张晓','刘宇昆']
    };
  },
  methods: {
    // 获取门禁列表数据
    getMjData() {
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/person-io-list`, {
          params: {
            personnel_id: this.personnelId,
            current: 1,
            size: 6,
          },
        })
        .then((res) => {
          console.log("获取门禁列表数据", res);
          if (res.status == 200) {
            this.showTableData = res.data.records;
          }
        });
    },
    // 获取数据
    getData() {
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/other-weapp-personnel_disposal`, {
          params: {
            personnel_id: this.personnelId,
          },
        })
        .then((res) => {
          console.log("详细数据Ment", res);
          if (res.status == 200) {
            let resData = res.data.records[0];
            this.personInfo = resData;
            let status = "";
            if (resData.状态 == "1") status = "未处置";
            if (resData.状态 == "2") status = "已处置";
            if (resData.状态 == "0") status = "已通知";
            console.log("this.personInfo", this.personInfo);
            // 历史处置
            // let obj = {
            //   index: 1,
            //   address: resData.通道,
            //   date: resData.时间,
            //   status: resData.status,
            //   img: resData.处置图片,
            // };
          }
        });
    },
    // 历史处置
    getHistoryList(){
      const _this = this
      //
      this.$http.get(`${process.env.VUE_APP_1_URL}/other-weapp-personnel_disposal-record`,{
        params:{
          personnel_id: this.personnelId,
          id: ''
        }
      }).then(res =>{
        console.log('历史处置',res.data);
        this.historyTableData = res.data
        })
    },
    checkCMenu(index) {
      this.menuChoose = index;
    },
    lookImg(item) {
      console.log("查看图片", item);
      this.lookDeail = item;
      this.centerShow = true;
    },
    lookImg2(item) {
      console.log("item", item);
      this.lookDeail = item;
      this.centerShow = true;
    },
    closexxx() {
      this.$emit("closeMent");
    },
    // 控制弹出层
    floatClick(data) {
      this.sanpList = data;
      this.showSanpInfo = this.getSanpData(data, this.nowFloatId);
      this.dialogVisible = true;
    },
  },
  mounted() {
    console.log('xxxxxxxx我进来了')
    let communityId = localStorage.getItem('communityId')
    this.groudIndex = communityId
    console.log("查看人员idMent", this.personnelId);
    this.getData();
    this.getMjData();
    this.getHistoryList()
  },
  props: {
    popData: Object,
    personnelId: String, // 人员id
  },
};
</script>
<style lang="less" scoped>
.popBox {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: #333333;
  line-height: 16px;
  letter-spacing: 1px;
  z-index: 2000;
  .centetFloatBox {
    width: 552px;
    height: 469px;
    background: #ffffff;
    box-shadow: 0px 0px 4px 2px #dddddd;
    border-radius: 5px;
    position: absolute;
    top: calc(50% - 234px);
    left: calc(50% - 226px);
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 30px;
    .bomShow {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 30px;
      // font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #333333;
      line-height: 19px;
      letter-spacing: 1px;
    }
    .close {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      z-index: 99999;
    }
    .show {
      width: 517px;
      height: 336px;
    }
  }
  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 99999;
  }
  .topInfoBox {
    width: 100%;
    height: 400px;
    box-sizing: border-box;
    display: flex;
    position: relative;
    font-size: 12px;
    .leftInfo {
      width: 40%;
      border-bottom: 1px solid #dddddd;
      box-sizing: border-box;
      font-size: 12px;
      .boxItem {
        width: 100%;
        height: 50%;
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 10px;
        font-size: 12px;
        .title {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #38a2f7;
          line-height: 21px;
          letter-spacing: 1px;
          margin-bottom: 20px;
          img {
            width: 11px;
            height: 11px;
            margin-right: 10px;
          }
        }
      }
      .info {
        display: flex;
        img {
          width: 104px;
          height: 142px;
          margin-right: 20px;
        }
      }
    }
    .leftInfo,
    .rightList {
      box-sizing: border-box;
      padding: 10px;
      .itemBox {
        width: 100%;
        min-width: 250px;
        display: flex;
        align-items: center;
        .box {
          display: flex;
          flex-direction: column;
          font-size: 0.9rem;
          div {
            margin-bottom: 2px;
          }
        }
      }
      .itemBox.list {
        justify-content: center;
      }
    }
    .rightList {
      width: 60%;
      border-bottom: 1px solid #dddddd;
      border-left: 1px solid #dddddd;
      .checkMenu {
        display: flex;
        cursor: pointer;
      }
      .newList {
        width: 100%;
        height: 100%;
        .topMess {
          width: 100%;
          height: 50%;
          // background-color: pink;
          font-size: 13px;
          font-family: MicrosoftYaHei;
          color: #333333;
          line-height: 16px;
          letter-spacing: 1px;
          .top_line_box {
            width: 100%;
            display: flex;
            .top_line_left {
              width: 50%;
              height: 150px;
              overflow-y: scroll;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .l_left_item {
                width: 100%;
                margin-bottom: 10px;
                color: #333;
              }
            }
            .top_line_left::-webkit-scrollbar {/*滚动条整体样式*/
                width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 1px;
            }
            .top_line_left::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #535353;
            }
            .top_line_left::-webkit-scrollbar-track {/*滚动条里面轨道*/
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                border-radius: 10px;
                background: #EDEDED;
            }

            .top_line_right {
              width: 50%;
              height: 100px;
              // background-color: blueviolet;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              img {
                width: 70px;
                height: 80px;
                margin-right: 10px;
              }
            }
          }
        }
        .historyList {
          width: 100%;
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          .hisTableBox{
            width: 100%;
            height: 120px;
            overflow-y: scroll;
          }
          .hisTableBox::-webkit-scrollbar {/*滚动条整体样式*/
              width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
              height: 1px;
          }
          .hisTableBox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
              border-radius: 10px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background: #535353;
          }
          .hisTableBox::-webkit-scrollbar-track {/*滚动条里面轨道*/
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              border-radius: 10px;
              background: #EDEDED;
          }
          .hist_top {
            width: 100%;
            height: 25px;
            // background-color: cadetblue;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  .mapBox {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    .mapComBox {
      width: 100%;
      height: 400px;
      background-color: cornsilk;
      background-image: url("../..//assets/images/componcty.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      position: relative;
      .luxian {
        width: 50%;
        height: 50%;
        position: absolute;
        top: 40%;
        left: 35%;
      }
      .showB {
        position: absolute;
        img {
          width: 20px;
          height: 24px;
          position: absolute;
          bottom: -30%;
          left: 40%;
        }
        .floatB {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 128px;
          height: 78px;
          font-size: 0.7rem;
          font-family: MicrosoftYaHei;
          color: #ffffff;
          line-height: 19px;
          letter-spacing: 1px;
          background: rgba(17, 25, 64, 0.69);
          box-shadow: 0px 0px 4px 2px #999999, 0px 0px 4px 2px #739bff;
          border-radius: 5px;
          border: 2px solid;
          border-image: linear-gradient(
              138deg,
              rgba(98, 191, 255, 1),
              rgba(0, 61, 255, 1),
              rgba(136, 188, 255, 1),
              rgba(33, 99, 255, 1)
            )
            2 2;
        }
      }
    }
  }
}
.mtable {
  width: 100%;
  color: #333333;
  font-size: 0.6rem;
  border: 1px #111940 solid;
  border-spacing: 0px; //单元格间距为0px
  border-collapse: collapse; //=改为合并
  overflow-y: scroll;
  th {
    font-weight: 100;
    height: 30px;
    margin: 0;
    background-color: #dff1ff;
    border: 1px #fff solid;
    min-width: 20%;
  }
  td {
    font-weight: 100;
    height: 30px;
    border: 1px #fafafa solid;
    min-width: 20%;
    text-align: center;
  }
}

.title {
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #38a2f7;
  line-height: 21px;
  letter-spacing: 1px;
  margin-bottom: 20px;
  img {
    width: 11px;
    height: 11px;
    margin-right: 10px;
  }
}
</style>