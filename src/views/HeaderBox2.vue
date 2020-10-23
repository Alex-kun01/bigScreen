<template>
<!-- 头部区域 -->
  <div class="headerBox">
    <div class="title">
      智慧社区综合治理平台
    </div>
    <!-- 天气 -->
    <div class="weather">
      <img src="../assets/images/yu.png" alt="">
      <div class="text">
        {{dateStr}}
        <br>
        多云AQI 36
      </div>
    </div>
    <!-- 左边菜单 -->
    <div  v-for="item in menuLeft" :key="item.id"
    :class="{item:1, active: index == item.id}"
    :style="{left: item.left}"
    @click="changeLeftIndex(item)"
    >
      {{item.name}}
    </div>
    <!-- 右边菜单 -->
    <div  v-for="item in menuRight" :key="item.id"
    :class="{item:1, active: index == item.id}"
    :style="{right: item.right}"
    @click="changeRightIndex(item)"
    >
      {{item.name}}
    </div>
    <!-- 切换系统 -->
    <div class="item"
      style="right: 5%;"
      @click="changes"
    >
      <span>Admin</span>
      <span v-if="!showChecked"><img src="../assets/images/toRight2.png" alt=""></span>
      <span v-else><img src="../assets/images/toBottom2.png" alt=""></span>
      <div class="checkBox" v-show="showChecked">
        <div @click="checkedChange('后台管理')" class="dian">后台管理</div>
        <div @click="checkedChange('智能消防平台')" class="dian">智能消防平台</div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../assets/eventBus.js'
import getDateStr from '../publicFun/getNowDate.js'
export default {
  data(){
    return{
      index: 2,
      // 控制系统切换框显示
      showChecked: false,
      dateStr: '',
      menuLeft: [
        {
          id:1,
          name: '监控管理',
          url: 'monitoringManagement',
          left: '12%' 
        },
        {
          id:2,
          name: '重点人员管理',
          url: 'allPage',
          left: '21%' 
        },
        {
          id:3,
          name: '疑似流动人口管理',
          url: 'suspectedFlows',
          left: '30%' 
        }
      ],
      menuRight: [
        {
          id:4,
          name: '人口信息',
          url: 'demographicInformation',
          right: '34%' 
        },
        {
          id:5,
          name: '房屋信息',
          url: 'housingInformation',
          right: '28%' 
        },
        {
          id:6,
          name: '数据民生',
          url: 'datalivelihood',
          right: '21%' 
        },
        {
          id:7,
          name: '智慧党建',
          url: 'partyBuilding',
          right: '14%' 
        }
      ]
    }
  },
  mounted(){
     this.initDate()
      bus.$on('changeHeaderIndex', index =>{
        this.index = index
      })
  },
  methods:{
    // 初始化时间
    initDate(){
      setInterval(()=>{
        this.dateStr = getDateStr()
        },1000)
    },
    // 切换左边菜单
    changeLeftIndex(item){
      console.log(item.id)
      this.index = item.id
      this.$router.push({name: item.url})
    },
    // 切换右边菜单
    changeRightIndex(item){
      console.log(item.id)
      this.index = item.id
      this.$router.push({name: item.url})
    },
    // 切换系统
    checkedChange(text){
      console.log(text)
      this.showChecked = false
      if(text == '智能消防平台'){
        this.$router.push({name: 'testIfarm'})
      }else if(text == '后台管理'){
        this.$router.push({name: 'backstageManagement'})
      }
    },
    changes(){
      console.log(1)
      this.showChecked = !this.showChecked
    }
  }
}
</script>
<style lang="less" scoped>
.headerBox{
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/headerx.png');
  background-repeat:no-repeat;
  background-size:100% 100%;
  -moz-background-size:100% 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .title{
    width: 300px;
    height: 50px;
    text-align: center;
    font-size: 22px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    color: #FFFFFF;
    line-height: 50px;
    letter-spacing: 2px;
    position: absolute;
    top: 0;
    left: calc(50% - 150px);
  }
  .weather{
    width: 200PX;
    height: 45px;
    // background-color: yellow;
    position: absolute;
    left: 1%;
    top: 40%;
    display: flex;
    align-items: center;
    img{
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .text{
      color: #FFFFFF;
      font-size: 12px;
    }
  }
  .item{
    font-size: 16px;
    text-align: center;
    height: 45px;
    line-height: 45px;
    position: absolute;
    font-family: MicrosoftYaHei;
    color: #E6E6E6;
    letter-spacing: 1px;
    top: 40%;
    display: flex;
    align-items: center;
    img{
      margin-left: 5px;
      width: 12px;
      height: 12px;
    }
    cursor: pointer;
    .checkBox{
      width: 120px;
      background-color: #111940;
      position: absolute;
      bottom: -140%;
      left: -40%;
      z-index: 2;
      .dian{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: #111940;
      }
      .dian:hover{
        background-color: #172153;
      }
    }
  }
  .item.active{
    background-image: url('../assets/images/itemContent.png');
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    
  }
  
}
</style>