<template>
  <!-- 统计分析 -->
  <div class="box_stais">
    <div class="statisanly">
      <div class="cen_title">
        <div></div>
        <div class="title">人口详情</div>
        <img
          src="../../assets/images/close.png"
          @click="closew"
          alt=""
          class="close"
        />
      </div>
      <!-- 切换列表/图表 -->
      <div class="changeMenu">
        <div
          :class="{ menu: 1, active: menuActive == menu.id }"
          @click="changeClcik(menu.id)"
          v-for="(menu, index) in menuList"
          :key="index + 'p'"
        >
          {{ menu.menu }}
        </div>
      </div>
      <!-- 展示-列表 -->
      <div class="show_list" v-show="menuActive == 1">
        <div class="show_top_input">
          <div class="show_top_input_item">
            <div class="label">小区:</div>
            <el-select
              v-model="selectCommuityValue"
              size="small"
              @change="changeCommuity"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectCommuityx"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="show_top_input_item">
            <div class="label">分类划分:</div>
            <el-select
              v-model="selectPeopleValue"
              size="small"
              @change="changePerson"
              placeholder="请选择"
            >
              <el-option
                v-for="item in selectPeople"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="show_top_input_item">
            <el-input
              size="small"
              v-model="inputValue"
              placeholder="请输入内容"
            ></el-input>
            <el-button
              size="small"
              type="success"
              style="margin-left: 10px"
              @click="seachCLick"
              >搜索</el-button
            >
          </div>
        </div>
        <!-- 列表 -->
        <div class="tu_list">
          <table class="mtable">
            <thead>
              <tr>
                <th>人像</th>
                <th>姓名</th>
                <th>性别</th>
                <th>年龄</th>
                <th>小区</th>
                <th>门牌号</th>
                <th>身份证号</th>
                <th>电话</th>
                <th>人员分类</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in peopleList" :key="index">
                <td>
                  <img
                    style="width: 50px; height: 65px"
                    :src="item.人像"
                    alt=""
                  />
                </td>
                <td>{{ item.姓名 }}</td>
                <td>{{ item.性别 }}</td>
                <td>{{ item.年龄 }}</td>
                <td>{{ item.小区 }}</td>
                <td>{{ item.门牌号 }}</td>
                <td>{{ item.身份证号 }}</td>
                <td>{{ item.电话 }}</td>
                <td>{{ item.人员分类 }}</td>

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
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="total"
              :page-size="size"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 展示-图表 -->
      <div class="show_tu" v-show="menuActive == 2">
        <div class="echarts_box">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <div>性别比例</div>
          </div>
          <div class="echarts">
            <div id="echartsSex" style="width: 100%; height: 100%"></div>
          </div>
        </div>
        <div class="echarts_box">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <div>年龄统计</div>
          </div>
          <div class="echarts">
            <div style="width: 100%; height: 100%" id="echartsAge"></div>
          </div>
        </div>
        <div class="echarts_box">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <div>婚姻状况</div>
          </div>
          <div class="echarts">
            <div style="width: 100%; height: 100%" id="echartsMarriage"></div>
          </div>
        </div>
        <div class="echarts_box">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <div>文化程度</div>
          </div>
          <div class="echarts">
            <div style="width: 100%; height: 100%" id="echartsCculture"></div>
          </div>
        </div>
        <div class="echarts_box">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <div>户籍统计</div>
          </div>
          <div class="echarts">
            <div class="mychart">
              <div class="my_topBox">
                <div class="hjtabr" style="color: #e4b728">
                  <div class="number">{{ hjInfo.local.number }}</div>
                  <div class="text">{{ hjInfo.local.text }}</div>
                </div>
                <div class="hjtabr" style="color: #1aa7a2">
                  <div class="number">{{ hjInfo.ontlocal.number }}</div>
                  <div class="text">{{ hjInfo.ontlocal.text }}</div>
                </div>
              </div>
              <!-- 柱图 -->
              <div class="lineBox">
                <div class="line">
                  <div
                    :style="{ width: hjInfo.local.percentage }"
                    class="line_left"
                  >
                    {{ hjInfo.local.percentage }}
                  </div>
                  <div
                    :style="{ width: hjInfo.ontlocal.percentage }"
                    class="line_right"
                  >
                    {{ hjInfo.ontlocal.percentage }}
                  </div>
                </div>
                <div class="textin">
                  <div>
                    <div class="number">{{ hjInfo.local.number }}</div>
                    <div class="text">{{ hjInfo.local.text }}</div>
                  </div>
                  <div>
                    <div class="number">{{ hjInfo.ontlocal.number }}</div>
                    <div class="text">{{ hjInfo.ontlocal.text }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="echarts_box">
          <div class="title">
            <img src="../../assets/images/icon@2x.png" alt="" />
            <div>流动人口籍贯分布</div>
          </div>
          <div class="echarts">
            <div style="width: 100%; height: 100%" id="echartsFloating"></div>
          </div>
        </div>
      </div>
      <!-- 详情弹框- -->
      <template v-if="detailShow">
        <ViewDetails
          @closeDetail="closeDetails"
          :isWsPerson="isWsPerson"
          :personnelId="personnelId"
          :flag="false"
        />
      </template>
      <!-- 未实人员 -->
      <template v-if="undetailShow">
        <UnViewDetails :personnelId="personnelId"  @closeDetail="closeUnDetails" />
      </template>
    </div>
    <!-- 密码确认 -->
        <template v-if="confrimShow">
            <ConfirmComp @isConfrim='isConfrim' @closethis='closethis' />
        </template>
  </div>
</template>
<script>
import ViewDetails from "./ViewDetails"; // 查看详情
import UnViewDetails from './UnViewDetails' // 未实人员
import "../../assets/echartsData/customed.js"; // echarts主题
import ConfirmComp from '../components/ConfirmComp' //确认弹框
// 性别比例 年龄统计 婚姻状况 文化程度 户籍统计 流动人口籍贯分布
import {
  sex,
  age,
  marriage,
  cculture,
  register,
  floating,
} from "../echartsData/statisAnaly.js"; // echarts数据
export default {
  components: {
    ViewDetails,
    UnViewDetails,
    ConfirmComp
  },
  props: {
    personType: String, // 人员类型
  },
  data() {
    return {
      confrimShow: false, 
      undetailShow: false, // 未实人员
      options:[
        {
          value: '12312312',
          label: '12312312'
        },
        {
          value: '312312',
          label: '312312'
        }
      ],
      total: 1,
      page: 1,
      size: 8,
      communityId: '',
      // 列表与图表切换 1列表 2图表
      menuActive: 1,
      menuList: [
        {
          id: 1,
          menu: "人员列表",
        },
        {
          id: 2,
          menu: "统计分析",
        },
      ],
      // 下拉-小区选中数据
      selectCommuityValue: "",
      // 下拉-小区数据
      selectCommuityx: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "香槟国际",
          label: "香槟国际",
        },
        {
          value: "锦屏佳苑",
          label: "锦屏佳苑",
        },
      ],
      // 下拉-人员分类选中数据
      selectPeopleValue: "",
      // 人员类型id
      personId: "",
      // 下拉-人员分类数据
      // 类型：1核实人数、2流动人口、3重点人群、4关怀人群、5租住人群、6涉疆涉藏
      selectPeople: [
        {
          value: "",
          label: "总人数",
        },
        {
          value: '1',
          label: "实有人数",
        },
        {
          value: '2',
          label: "未实人数",
        },
        {
          value: '3',
          label: "流动人口",
        },
        {
          value: '4',
          label: "重点人群",
        },
        {
          value: '5',
          label: "关怀人群",
        },
        {
          value: '6',
          label: "租住人群",
        },
        {
          value: '7',
          label: "涉疆涉藏",
        },
      ],
      // 搜索数据
      inputValue: "",
      // 人员列表数据
      peopleList: [],
      // 详情弹框显示
      detailShow: false,
      // 户籍统计数据
      hjInfo: {
        local: {
          number: 567,
          text: "本地籍",
          percentage: "74%",
        },
        ontlocal: {
          number: 124,
          text: "非本地籍",
          percentage: "26%",
        },
      },
      // 是否为未实人员
      isWsPerson: false,
      personnelId: "", //人员id
      // 临时存放跳转item数据
      item: {}
    };
  },
  mounted() {
    console.log('this.personTypellllllllllllllll',this.personType);
    this.communityId = localStorage.getItem('communityId')
    if (this.community == "香槟国际") this.communityId = 2;
    if (this.community == "锦屏佳苑") this.communityId = 1;
    if(this.communityId == 1) this.selectCommuityValue = '锦屏佳苑'
    if(this.communityId == 2) this.selectCommuityValue = '香槟国际'
    
    this.selectPeopleValue = this.personType;
    this.personId = this.personType;
    this.getListData();
  },
  methods: {
    closeUnDetails(){
      this.undetailShow = false
    },
    // 获取统计分析数据
    getStatisticsData() {
      const _this = this;
      // 年龄分析
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/chart-age`, {
          params: {
            plot_id: this.communityId,
          },
        })
        .then((res) => {
          // console.log('年龄分析数据', res)
          if (res.status == 200) {
            let resData = res.data;
            let datas = [];
            resData.forEach((item) => {
              let obj = {
                value: item.数量,
                name: item.分类,
              };
              datas.push(obj);
            });
            age.series[0].data = datas;
            this.drChart();
          }
        });
      // 文化程度
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/chart-education`, {
          params: {
            plot_id: this.communityId,
          },
        })
        .then((res) => {
          // console.log('文化程度', res)
          if (res.status == 200) {
            let names = []; // 分类
            let datas = []; // 数量
            res.data.forEach((item) => {
              names.push(item.分类);
              datas.push(item.数量);
            });
            cculture.xAxis[0].data = names;
            cculture.series[0].data = datas;
            this.drChart();
          }
        });
      // 婚姻状况
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/chart-marriage`, {
          params: {
            plot_id: this.communityId,
          },
        })
        .then((res) => {
          // console.log('婚姻状况', res)
          if (res.status == 200) {
            let names = []; // 分类
            let datas = []; // 数量
            res.data.forEach((item) => {
              names.push(item.分类);
              let obj = {
                value: item.数量,
                name: item.分类,
              };
              datas.push(obj);
            });
            marriage.series[0].data = datas;
            marriage.legend.data = names;
            this.drChart();
          }
        });

      // 性别比例
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/chart-sex`, {
          params: {
            plot_id: this.communityId,
          },
        })
        .then((res) => {
          // console.log('性别比例', res)
          if (res.status == 200) {
            let names = []; // 分类
            let datas = []; // 数量
            res.data.forEach((item) => {
              names.push(item.分类);
              let obj = {
                value: item.数量,
                name: item.分类,
              };
              datas.push(obj);
            });
            sex.series[0].data = datas;
            sex.legend.data = names;
            this.drChart();
          }
        });
      // 户籍统计
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/chart-register`, {
          params: {
            plot_id: this.communityId,
          },
        })
        .then((res) => {
          // console.log('户籍统计', res)
          if (res.status == 200) {
            let resData = res.data;
            let allnum = 0; // 总数量

            resData.forEach((item) => {
              allnum = allnum + item.数量;
              if (item.分类 == "本地籍") {
                this.hjInfo.local.number = item.数量;
              } else if (item.分类 == "非本地籍") {
                this.hjInfo.ontlocal.number = item.数量;
              }
            });
            this.hjInfo.local.percentage =
              ((this.hjInfo.local.number / allnum) * 100).toFixed(2) + "%";
            this.hjInfo.ontlocal.percentage =
              ((this.hjInfo.ontlocal.number / allnum) * 100).toFixed(2) + "%";
          }
        });
      // 流动人口籍贯分布
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/chart-population-distribution`, {
          params: {
            plot_id: this.communityId,
          },
        })
        .then((res) => {
          // console.log('流动人口籍贯分布', res)
          if (res.status == 200) {
            const resData = res.data;
            let indicator = [];
            let names = [];
            let datas = [];
            let max = 0;
            resData.forEach((item) => {
              console.log("查看最大值", max);
              if (item.数量 > max) {
                max = item.数量;
              }
              names.push(item.分类);
              datas.push(item.数量);
              let obj = {
                name: item.分类,
                max: 100,
              };
              indicator.push(obj);
            });
            let newindicator = indicator.map((item) => {
              return {
                name: item.name,
                max: max,
              };
            });
            floating.radar.indicator = newindicator;
            floating.series[0].data[0].value = datas;
            this.drChart();
          }
        });
    },
    // 获取列表数据
    getListData() {
      const _this = this;
      let datas = {
        plot_id: this.communityId, // 小区id 2香槟国际 1锦屏佳苑
        house_id: "", // 房屋id
        text: this.inputValue, // 搜索Value
        person_type: this.personId, // 人员类型
        current: this.page, // 分页
        size: this.size,
      };
      console.log("查看参数", datas);
      this.$http
        .get(`${process.env.VUE_APP_1_URL}/person-list`, {
          params: datas,
        })
        .then((res) => {
          console.log("列表数据", res);
          if (res.status == 200) {
            let { records } = res.data;
            let newData = records.map(item =>{
              return {
                ...item,
                性别: item.人员分类 == "未实人口"? '--':item.性别,
                姓名: item.人员分类 == "未实人口"? '--': item.姓名,
                年龄: item.人员分类 == "未实人口"? '--': item.年龄,
                门牌号: item.人员分类 == "未实人口"? '--': item.门牌号,
                身份证号: item.人员分类 == "未实人口"? '--': item.身份证号,
                电话: item.人员分类 == "未实人口"? '--': item.电话,
                人员分类: item.人员分类 ?item.人员分类: '普通群众'
              }
            })
            this.total = res.data.total; // 总条数
            this.peopleList = newData;
          }
        });
    },
    // 搜索按钮
    seachCLick() {
      this.page = 1;
      this.getListData();
    },
    // 切换人员类型id
    changePerson(item) {
      switch (item) {
        case "":
          this.personId = "";
          break;
        case "1":
          this.personId = '1';
          break;
        case "2":
          this.personId = '2';
          break;
        case "3":
          this.personId = '3';
          break;
        case "4":
          this.personId = '4';
          break;
        case "5":
          this.personId = '5';
          break;
        case "6":
          this.personId = '6';
          break;
        case "7":
          this.personId = '7';
          break;
      }
      console.log("查看personType", this.personId);
    },
    // 切换菜单
    changeClcik(id) {
      this.menuActive = id;
      this.getStatisticsData();
      //    this.drChart()
    },
    // 分页变化
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getListData();
    },
    // 关闭按钮
    closew() {
      console.log("close点击了");
      this.$emit("closew");
    },
    // 关闭 查看详情弹框
    closeDetails() {
      this.detailShow = false;
    },
    closethis(){
      this.confrimShow = false
    },
    //  是否确认成功
    isConfrim(res){
      console.log("是否确认成功", res)
      if(res){
        this.gotoDetail()
        this.closethis()
      }
    },
    // 弹出确认框
    lookDetail(item) {
      this.confrimShow = true
      this.item = item
    },
    // 跳转查看详情
    gotoDetail(){
      console.log("item", this.item);
      this.personnelId = this.item.personnel_id; // 人员id
      if (this.item.人员分类 == "未实人口") {
        this.undetailShow = true
      } else {
        this.isWsPerson = false;
        this.detailShow = true; // 开启
      }
    },
    // 小区选择器变化
    changeCommuity() {
      console.log("小区选择变化", this.selectCommuityValue);
      if (this.selectCommuityValue == "香槟国际") this.communityId = 2;
      if (this.selectCommuityValue == "锦屏佳苑") this.communityId = 1;
      if (this.selectCommuityValue == "全部") this.communityId = "";
    },
    // echarts图表渲染
    drChart() {
      this.$nextTick(() => {
        console.log("我执行了");
        let echartsSex = this.$echarts.init(document.getElementById("echartsSex"),"customedb");
        const echartsAge = this.$echarts.init(
          document.getElementById("echartsAge"),
          "customedb"
        );
        const echartsMarriage = this.$echarts.init(
          document.getElementById("echartsMarriage"),
          "customedb"
        );
        const echartsCculture = this.$echarts.init(
          document.getElementById("echartsCculture"),
          "customedb"
        );
        const echartsFloating = this.$echarts.init(
          document.getElementById("echartsFloating"),
          "customedb"
        );
        echartsSex.setOption(sex, "customedb");
        echartsAge.setOption(age, "customedb");
        echartsMarriage.setOption(marriage, "customedb");
        echartsCculture.setOption(cculture, "customedb");
        echartsFloating.setOption(floating, "customedb");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.box_stais {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;

  .statisanly {
    width: 80%;
    height: 90%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 10px;
    color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    // 详情弹框
    .detail_box {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
    }
    // 展示列表
    .show_list {
      width: 100%;
      height: calc(100% - 80px);
      box-sizing: border-box;
      .element.style{
         z-index: 999999999999;
      }
      .show_top_input {
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        margin-top: 10px;
        display: flex;
        align-items: center;
        color: #333333;

        .show_top_input_item {
          width: 24%;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          .label {
            margin-right: 5px;
          }
          .search {
            margin-left: 5px;
          }
        }
      }
      .tu_list {
        width: 100%;
        height: calc(100% - 100px);
        box-sizing: border-box;
        padding: 10px;
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
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 20px;
        }
      }
    }
    .show_tu {
      width: 100%;
      height: calc(100% - 70px);
      // background-color:yellowgreen;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      .echarts_box {
        width: 32.7%;
        height: 49%;
        background: #ffffff;
        border-radius: 10px;
        border: 1px solid #acdaff;
        box-sizing: border-box;
        padding: 5px;
        .title {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: #38a2f7;
          line-height: 21px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          img {
            width: 15px;
            height: 15px;
            margin: 0 10px;
          }
        }
        .echarts {
          width: 100%;
          height: calc(100% - 30px);
          .mychart {
            width: 100%;
            height: 100%;
            // background-color: pink
            .my_topBox {
              width: 100%;
              height: 100px;
              // background-color: #38A2F7;
              display: flex;
              align-items: center;
              align-items: center;
              justify-content: center;
              .hjtabr {
                margin-right: 20px;
                .number {
                  font-size: 18px;
                  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                  font-weight: bold;
                  line-height: 24px;
                  letter-spacing: 1px;
                }
                .text {
                  font-size: 12px;
                  font-family: MicrosoftYaHei;
                  line-height: 16px;
                  letter-spacing: 1px;
                }
              }
            }
            .lineBox {
              width: 100%;
              height: 150px;
              // background-color: #38A2F7;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .line {
                width: 80%;
                height: 30px;
                // background-color: #ACDAFF;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                font-size: 12px;
                .line_left,
                .line_right {
                  width: 50%;
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                }
                .line_left {
                  background-color: #e4b728;
                  border-radius: 14px 0 0 14px;
                }
                .line_right {
                  background-color: #1aa7a2;
                  border-radius: 0 14px 14px 0;
                }
              }
              .textin {
                width: 80%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: #333333;
                line-height: 19px;
                letter-spacing: 1px;
              }
            }
          }
        }
      }
    }
    // 展示图表
    .changeMenu {
      width: 200px;
      height: 30px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      .menu {
        width: 50%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        color: #333;
        background-color: #dfdfdf;
      }
      .menu.active {
        color: #ffffff;
        background-color: #38a2f7;
      }
    }
    .cen_title {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      padding: 10px;
      // background-color: pink;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 25px;
      }
      .close {
        width: 20px;
        height: 20px;
        cursor: pointer;
        z-index: 9;
      }
    }
  }
}
</style>