<template>
<!-- 监控管理 -->
  <div class="monitoring">
    <!-- 头部区域 -->
    <div class="header">
      <div class="h-box">
        <div class="left">
          <div @click="changePageIndex(1)" :class="{btn:1,active: showPageIndex == 1}">视频监控</div>
          <div @click="changePageIndex(2)" :class="{btn:1,active: showPageIndex == 2}">全景监控</div>
        </div>
        <div class="right">
          <div class="seachBox">
            <div class="name">地点</div>
            <div class="box"  @click="addressShow = !addressShow">
              <span class="textt">{{text}}</span>
              <div class="itemBox" v-if="addressShow">
                <div class="item" @click="chanClick('学校')">学校</div>
                <div class="item" @click="chanClick('政府')">政府</div>
                <div class="item" @click="chanClick('重点区域')">重点区域</div>
              </div>
            </div>
          </div>
          <div class="seachBox">
            <div class="name">时间</div>
            <div class="box">
              <img src="../assets/images/toRight.png" alt="">
              <!-- <div class="itemBox" v-if="addressShow">
                <div class="item">学校</div>
                <div class="item">政府</div>
                <div class="item">重点区域</div>
              </div> -->
              </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容区 -->
    <div class="routerContent">
        <MonPage1 v-show="showPageIndex == 1" />
        <MonPage2 v-show="showPageIndex == 2" />
    </div>

  </div>
</template>
<script>
import MonPage1 from './monitoring/MonPage1.vue'
import MonPage2 from './monitoring/MonPage2.vue'
export default {
  data(){
    return{
        showPageIndex: 1,
        addressShow: false, // 地点显示
        text: '请选择'
    }
  },
  methods:{
    chanClick(txt){
      this.text = txt
    },
    changePageIndex(index){
      this.showPageIndex = index
    }
  },
  components:{
    MonPage1,
    MonPage2
  }
}
</script>
<style lang="less" scoped>
.monitoring{
  width: 100%;
  height: 100%;
  // background-color: pink;
  color: #ffffff;
  .routerContent{
    width: 100%;
    height: calc(100% - 60px);
    // background-color: pink;
  }
  .header{
    width: 100%;
    height: 60px;
    // background-color: pink;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    .h-box{
      display: flex;
      .left{
        display: flex;
        align-items: center;
        margin-right: 100px;
        .btn{
            width: 115px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: #111940;
            border-radius: 5px;
            margin-right: 50px;
            cursor: pointer;
        }
        .btn.active{
          background-image: url('../assets/images/anniubeijing@2x.png');
          background-repeat:no-repeat;
          background-size:100% 100%;
          -moz-background-size:100% 100%;
        }
    }
    .right{
      display: flex;
      align-items: center;
      .seachBox{
        display: flex;
        align-items: center;
        margin-right: 50px;
        .name{
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #e6e6e6;
          line-height: 22px;
          margin-right: 10px;
        }
        .box{
            width: 300px;
            height: 35px;
            background: rgba(17, 25, 64, 0.69);
            box-shadow: 0px 0px 6px 2px rgba(115, 155, 255, 0.62);
            border-radius: 5px;
            border: 1px solid;
            border-image: linear-gradient(137deg, rgba(98, 191, 255, 1), rgba(0, 61, 255, 1), rgba(136, 188, 255, 1), rgba(33, 99, 255, 1)) 1 1;
            position: relative;
            cursor: pointer;
            .textt{
              position: absolute;
              top: 8px;
              left: 10px;
              font-size: 14px;
            }
              img{
                width: 20px;
                height: 20px;
                position: absolute;
                top: 8px;
                right: 10px;
              }
              .itemBox{
                width: 100%;
                padding-bottom: 10px;
                box-sizing: border-box;
                background-color: #111940;
                position: absolute;
                bottom: -250%;
                z-index: 5;
                .item{
                  width: 100%;
                  height: 25px;
                  line-height: 25px;
                  cursor: pointer;
                  font-size: 14px;
                  padding: 5px 10px;
                  box-sizing: border-box;
                  padding: 5px 10px;
                }
                .item:hover{
                  background-color: #1c2864;
                }
              }
          }
        }
      }
    }
    
  }
  
}
</style>