<template>
  <!-- 未实人员-查看详情 -->
  <div class="box">
    <div class="view_details">
      <img
        src="../../assets/images/close.png"
        @click="closeme"
        alt=""
        class="close"
      />
      <!-- 未实人员展示 -->
      <div class="mjShowContent">
        <div class="title">
          <img src="../../assets/images/icon@2x.png" alt="" />
          <div class="text">人员信息</div>
        </div>
        <!-- <img src="../../assets/images/close.png" alt="" @click="mjPersonShow = 1" class="close"> -->
        <div class="personInfo">
          <div class="title">香槟国际</div>
          <div class="info">
            <img class="avatar" :src="wsPersonInfo.照片" alt="" />
            <div class="boxs">
              <div>首次发现时间：{{ wsPersonInfo.首次发现时间 }}</div>
              <div>15天出入小区：{{ wsPersonInfo.出入次数15天 }}</div>
              <div>30天出入小区{{ wsPersonInfo.出入次数30天 }}</div>
              <div>出入单元：{{ wsPersonInfo.出入单元 }}</div>
            </div>
          </div>
          <div class="chooseDates">
            <el-date-picker
              v-model="choseWSValue"
              type="date"
              @change="changeWSDate"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
          <!-- 地图图片 -->
          <div class="perMap">
            <div class="mapBox">
              <img
                src="../../assets/newver/lianluguiji@2x.png"
                alt=""
                class="line"
              />
              <div
                class="coordinate"
                v-for="(guiji, guix) in guijiLsit"
                :key="guix + 'gui'"
                :style="{ left: guiji.left, top: guiji.top }"
              >
                <img src="../../assets/images/address.png" alt="" />
                <div class="showInfo">
                  <div v-for="(text, tex) in guiji.textInfo" :key="tex + 'tex'">
                    {{ text }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧展示框 -->
      <div class="detail_right">
        
        <!-- 门禁记录 -->
        <div class="showItem" >
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <div class="text">门禁记录</div>
          </div>
          <div class="contentnr">
            <table class="mtable">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>地址</th>
                  <th>开门方式</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in mjList" :key="index">
                  <td>{{ item.时间 }}</td>
                  <td>{{ item.通道 }}</td>
                  <td>{{ item.开门方式 }}</td>

                  <td
                    @click="lookDetail(item)"
                    style="color: #38a2f7; cursor: pointer"
                  >
                    查看
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="fenye">
              <el-pagination
                background
                @current-change="mjCurrChange"
                layout="prev, pager, next"
                :total="mjtotal"
              >
              </el-pagination>
            </div>
          </div>
        </div>

      </div> 
      <!-- 查看详情-车辆详情 -->
      <div class="lookDetail" v-show="isShowLookDetail">
        <div class="title">
          <div></div>
          <div class="con">抓取图片</div>
          <img
            @click="isShowLookDetail = false"
            src="../../assets/images/close.png"
            alt=""
          />
        </div>
        <div class="conImg">
          <img :src="lookPersonInfo.照片" alt="" />
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 人员详情数据
      personInfo: {},
      // 中间圆形列表
      centerYuanList: [
        {
          id: 5,
          content: "5次",
          text: "巡查信息",
          color: "#4346D3",
          top: "20%",
          left: "10%",
        },
        {
          id: 1,
          content: "2人",
          text: "同住人员",
          color: "#16CEB9",
          top: "75%",
          left: "10%",
        },
        {
          id: 2,
          content: "2辆",
          text: "车辆信息",
          color: "#4346D3",
          top: "75%",
          left: "75%",
        },
      ],
      rightShowIndex: 1, // 右侧显示的索引
      // 同住人员总数
      tztotal: 0,
      tzPage: 1, // 同住人员列表页数
      // 同住人员列表
      tzPersonList: [],
      // 查看门禁-未实人员展示
      mjPersonShow: 1, // 1不查看门禁正常显示 2查看未实人员
      // 选择未实人员时间
      choseWSValue: "",
      // 未实人员数据
      wsPersonInfo: {},
      // 门禁列表总数
      mjtotal: 0,
      mjPage: 1, // 门禁列表页数
      // 门禁列表
      mjList: [],
      // 车辆列表总数
      carTotal: 0,
      carPage: 1,
      // 选中的车辆索引
      activeCarIndex: 1,
      // 车辆id
      personnel_car_id: "",
      // 车辆列表信息
      carList: [],
      // 车辆信息列表 拥有的车辆
      carInfoList: [],
      // 巡查列表总数
      xcTotal: 10,
      xcPage: 1,
      // 巡查列表数据
      xcList: [],
      // 巡查轨迹选择日期数据
      choseDaeValue: "",
      // 轨迹图列表
      guijiLsit: [
        {
          top: "25%",
          left: "20%",
          textInfo: ["09:34进1栋1单元门", "12:33出1栋2单元门"],
        },
        {
          top: "68%",
          left: "5%",
          textInfo: ["09:34进1栋1单元门", "12:33出1栋2单元门"],
        },
        {
          top: "58%",
          left: "65%",
          textInfo: ["09:34进1栋1单元门", "12:33出1栋2单元门"],
        },
      ],
      // 查看详情是否展示
      isShowLookDetail: false,
      // 查看详情弹框信息
      lookPersonInfo: {},
      community: "",
      personnelIdx: "", // 人员id
    };
  },
  methods: {
    // 获取数据
    getData() { 
      let _this = this;
      let datas = {
        personnel_id: this.personnelIdx, // 人员id
      };
      // 人员详情数据
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/person-view`, {
          params: datas,
        })
        .then((res) => {
          console.log("人员详情数据XX", res);
          if (res.status == 200) {
            this.personInfo = res.data;
            
          } else {
            this.$message.error("服务器请求出错");
          }
        });
      
    },
    closeme() {
      this.$emit("closeDetail");
    },
    changeShowIndex(id) {
      // 同住人员1 车辆信息2 门禁记录3 出入轨迹4 巡查信息5
      console.log("id", id);
      switch (id) {
        case 1:
          this.tzPage = 1;
          this.getTZDetailData(); // 同住人员
          break;
        case 2:
          this.carPage = 1;
          this.getCarDetailData(); // 车辆信息
          break;
        case 3:
          this.mjPage = 1;
          this.getMJDetailData(); // 门禁记录
          break;
        case 4:
          this.getGJDetailData(); // 出入轨迹
          break;
        case 5:
          this.xcPage = 1;
          this.getXCDetailData(); // 巡查信息
          break;
      }
      this.rightShowIndex = id;
    },
    // 获取门禁详情数据
    getMJDetailData() {
      console.log("门禁记录");
      let datas = {
        personnel_id: this.personnelIdx, // 人员id
        current: this.mjPage,
        size: 15,
      };
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/person-io-list`, {
          params: datas,
        })
        .then((res) => {
          // console.log('获取门禁详情数据',res)
          if (res.status == 200) {
            this.mjtotal = res.data.total;
            this.mjList = res.data.records;
          } else {
            this.$message.error("服务器请求出错");
          }
        });
    },
    // 获取出入轨迹详情数据
    getGJDetailData() {
      console.log("获取出入轨迹详情数据");
    },
    // 同住人员列表变化
    tzCurrChange(newPage) {
      this.tzPage = newPage;
      this.getTZDetailData();
    },
    // 门禁列表页数变化
    mjCurrChange(newPage) {
      this.mjPage = newPage;
      this.getMJDetailData();
    },
    // 巡查列表页数变化
    xcCurrChange(newPage) {
      this.xcPage = newPage;
      this.getXCDetailData();
    },
    // 车辆列表页数变化
    carCurrChange(newPage) {
      this.carPage = newPage;
      this.getCarDetailList(this.personnel_car_id);
    },
    // 查看详情弹框
    lookDetail(item) {
      console.log("item", item);
      this.lookPersonInfo = item;
      this.isShowLookDetail = true;
    },
    // 门禁查看未实人员
    mjLook() {
      this.mjPersonShow = 2;
    },
    // 未实人员时间选择
    changeWSDate() {
      console.log("时间改变了", this.choseWSValue);
    },
    // 获取未实人员详情
    getWSPersonDetail() {
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/person-uncheckd-view`, {
          params: {
            personnel_id: this.personnelIdx, // 人员id
          },
        })
        .then((res) => {
          console.log("获取未实人员详情", res);
          if (res.status == 200) {
            this.wsPersonInfo = res.data;
          } else {
            this.$message.error("服务器请求出错");
          }
        });
    },
    // 同住人员-查看事件
    alignPage(item) {
      console.log("itemxx", item);
      this.personnelIdx = item.personnel_id;
      this.getData();
    },
  },
  mounted() {
    this.personnelIdx = this.personnelId;
    console.log("flag", this.flag);
    this.getData();
    this.getMJDetailData()
    this.getWSPersonDetail()
  },
  props: {
    isWsPerson: Boolean, // 是否是未实人员
    personnelId: Number, // 人员id
    flag: Boolean, // 是否是未实车辆
    type: String, // person人员 car车辆 house房
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding-top: 48px;
  top: 0;
  left: 0;
  z-index: 9999999;

  .view_details {
    width: 80%;
    height: 90%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    display: flex;
    align-items: center;
    font-family: MicrosoftYaHei;
    letter-spacing: 1px;
    // 查看详情弹框
    .lookDetail {
      width: 520px;
      height: 468px;
      background-color: #ffffff;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 99999999;
      box-sizing: border-box;
      padding: 10px;
      box-shadow: 0 0 10px 5px #999999;

      .title {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .con {
          font-size: 16px;
          font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
          font-weight: bold;
          color: #333333;
          line-height: 21px;
          letter-spacing: 1px;
        }
      }
      .conImg {
        margin-top: 40px;
        width: 100%;
        height: 304px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bomTex {
        width: 100%;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        // margin-top: 10px;
        .texItem {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #333333;
          line-height: 24px;
          letter-spacing: 1px;
          width: 50%;
          text-align: left;
          margin-left: 100px;
        }
      }
    }
    // 未实人员展示框
    .mjShowContent {
      width: 55%;
      height: 100%;
      border-right: 1px solid #eaeaea;
      // background-color: pink;
      position: relative;
      .title {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        img {
          width: 15px;
          height: 15px;
          margin-right: 10px;
        }
        .text {
          color: #38a2f7;
        }
      }
      .personInfo {
        width: 100%;
        font-size: 16px;
        font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
        font-weight: bold;
        color: #333333;
        line-height: 19px;
        letter-spacing: 1px;
        .title {
          margin-top: 10px;
        }
        .info {
          width: 100%;
          display: flex;
          align-items: center;
          .avatar {
            width: 83px;
            height: 113px;
            margin-right: 10px;
          }
          .boxs {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #666666;
            line-height: 30px;
            letter-spacing: 1px;
          }
        }
        .chooseDates {
          width: 100%;
          height: 40px;
          text-align: right;
        }
        .perMap {
          width: 100%;
          height: 500px;
          box-sizing: border-box;
          padding: 10px 10px 0 0;
          .mapBox {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            background-image: url("../../assets/newver/contentMap.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            position: relative;
            .line {
              width: 330px;
              height: 170px;
              position: absolute;
              left: 20%;
              top: 48%;
            }
            .coordinate {
              position: absolute;
              top: 22%;
              left: 22%;
              img {
                width: 28px;
                height: 28px;
                position: absolute;
                bottom: -50%;
                left: calc(50% - 14px);
              }
              .showInfo {
                width: 178px;
                height: 69px;
                background: rgba(17, 25, 64, 0.6);
                border-radius: 5px;
                font-size: 14px;
                color: #ffffff;
                line-height: 19px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
      }
      .close {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
    // 左侧展示框
    .detail_left {
      width: 20%;
      height: 100%;
      border-right: 1px solid #eaeaea;
      // background-color: turquoise;
    }
    // 中间展示框
    .detail_content {
      width: 35%;
      height: 100%;
      border-right: 1px solid #eaeaea;
      position: relative;
      .community {
        font-size: 18px;
        color: #38a2f7;
        line-height: 24px;
        text-align: center;
      }
      .contentCenter {
        width: 450px;
        height: 450px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-image: url("../../assets/newver/wang@2x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        .yuan_box {
          width: 70px;
          height: 100px;
          position: absolute;
          top: -20px;
          left: 42%;
          z-index: 99999;
          color: #333;
          cursor: pointer;
          .yuan {
            width: 70px;
            height: 70px;
            line-height: 70px;
            text-align: center;
            border-radius: 50%;
            background-color: #4346d3;
            color: #ffffff;
          }
        }
        .sixcen {
          width: 200px;
          height: 180px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          background-image: url("../../assets/newver/six@2x.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          .text {
            margin-bottom: 10px;
          }
        }
      }
    }
    // 右侧展示框
    .detail_right {
      width: 45%;
      height: 100%;
      box-sizing: border-box;
      padding: 0 0 10px 10px;
      .showItem {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2111;
        .chooseDate {
          width: 200px;
          height: 30px;
          position: absolute;
          top: 0;
          right: 50px;
          background-color: pink;
        }
        .mapBox {
          width: 100%;
          height: calc(100% - 40px);
          box-sizing: border-box;
          margin-top: 30px;
          background-image: url("../../assets/newver/contentMap.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          position: relative;
          .line {
            width: 400px;
            height: 300px;
            position: absolute;
            left: 20%;
            top: 38%;
          }
          .coordinate {
            position: absolute;
            top: 22%;
            left: 22%;
            img {
              width: 28px;
              height: 28px;
              position: absolute;
              bottom: -50%;
              left: calc(50% - 14px);
            }
            .showInfo {
              width: 178px;
              height: 69px;
              background: rgba(17, 25, 64, 0.6);
              border-radius: 5px;
              font-size: 14px;
              color: #ffffff;
              line-height: 19px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          }
        }
        .contentnr {
          width: 100%;
          height: 100%;
          position: relative;
          // background-color: pink;
          .carInfo {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
            box-sizing: border-box;
            .carItem {
              width: 48%;
              height: 70px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              box-sizing: border-box;
              padding: 5px;
              cursor: pointer;
              img {
                width: 100px;
                height: 100%;
                margin-right: 10px;
              }
              .info {
                font-size: 14px;
                color: #666666;
                line-height: 19px;
              }
            }
          }
          .carItem.active {
            // border: 1px solid #38A2F7;
            box-shadow: 0 0 2px 2px #38a2f7;
          }
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
          .fenye {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: absolute;
            bottom: 20px;
          }
        }
      }
    }
    .detail_left,
    .detail_right {
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        img {
          width: 15px;
          height: 15px;
          margin-right: 10px;
        }
        .text {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #38a2f7;
          line-height: 21px;
          letter-spacing: 1px;
        }
        .updata {
          font-size: 12px;
          font-family: MicrosoftYaHei;
          color: #666666;
          line-height: 16px;
          margin-left: 20px;
        }
      }
      .avatar {
        width: 141px;
        height: 192px;
      }
      .personInfo {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #333333;
        line-height: 23px;
        letter-spacing: 1px;
        .person {
          span {
            color: #666666;
            margin-right: 10px;
          }
        }
      }
    }

    .close {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }
}
</style>