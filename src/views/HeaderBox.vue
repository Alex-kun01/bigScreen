<template>
  <!-- 头部区域 -->
  <div class="headerBox">
    <div class="title">智慧社区综合治理平台</div>
    <!--  -->
    <div class="item" style="left: 0;">
      <el-cascader
        :options="options"
        :props="{ checkStrictly: true }"
        clearable></el-cascader>
    </div>
    <!-- <div class="weather">
      <img src="../assets/images/yu.png" alt="" />
      <div class="text">
        {{dateStr}}
        <br />
        多云AQI 36
      </div>
    </div> -->
    <!-- 左边菜单 -->
    <div class="leftMenu menuBox">
      <div
        :class="{ option: 1, active: activeIndex == 1 }"
        @click="chooseMenu(1)"
      >
        综合治理
      </div>
      <div
        :class="{ option: 1, active: activeIndex == 2 }"
        @click="chooseMenu(2)"
      >
        智慧党建
      </div>
    </div>
    <!-- 右边菜单 -->
    <div class="rightMenu menuBox">
      <div
        :class="{ option: 1, active: activeIndex == 3 }"
        @click="chooseMenu(3)"
      >
        数字民生
      </div>
      <div
        :class="{ option: 1, active: activeIndex == 4 }"
        @click="chooseMenu(4)"
      >
        智慧政务
      </div>
    </div>
    <!-- 切换系统 -->
    <div class="item" style="right: 5%" @click="changes">
      <span>Admin</span>
      <span v-if="!showChecked"
        ><img src="../assets/images/toRight2.png" alt=""
      /></span>
      <span v-else><img src="../assets/images/toBottom2.png" alt="" /></span>
      <div class="checkBox" v-show="showChecked">
        <div @click="checkedChange('后台管理')" class="dian">后台管理</div>
        <div @click="checkedChange('智能消防平台')" class="dian">
          智能消防平台
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "../assets/eventBus.js";
import getDateStr from '../publicFun/getNowDate.js'
export default {
  data() {
    return {
      dateStr: '',
      activeIndex: 1, //控制选中菜单
      index: 2,
      // 控制系统切换框显示
      showChecked: false,
      options: [
        {
          value: '晋原街道',
          label: '晋原街道',
          children: [
            {
              value: '斜江社区',
              label: '斜江社区',
              children: [
                {
                  value: '香槟国际',
                  label: '香槟国际',
                }
              ]
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.initDate()
    bus.$on("changeHeaderIndex", (index) => {
      this.index = index;
    });
  },
  methods: {
    // 初始化时间
    initDate(){
      setInterval(()=>{
        this.dateStr = getDateStr()
        },1000)
    },
    // 切换菜单
    chooseMenu(index) {
      this.activeIndex = index;
      let url = "";
      switch (index) {
        case 1:
          url = "";
          break;
        case 2:
          url = "mapCom";
          break;
        case 3:
          url = "digPenson";
          break;
        case 4:
          url = "";
          break;
      }
      if (url) this.$router.push({name: url})
    },
    // 切换系统
    checkedChange(text) {
      console.log(text);
      this.showChecked = false;
      if (text == "智能消防平台") {
        this.$router.push({ name: "testIfarm" });
      } else if (text == "后台管理") {
        this.$router.push({ name: "backstageManagement" });
      }
    },
    changes() {
      console.log(1);
      this.showChecked = !this.showChecked;
    },
  },
};
</script>
<style lang="less">
.el-input__inner{
  background-color: #111940!important;
  color: #ffffff!important;
  border: none!important;
}

  // 级联选择器选项 hover
  .el-cascader-node:not(.is-disabled):focus, .el-cascader-node:not(.is-disabled):hover{
    background-color: #2337A6!important;
  }
.el-cascader__dropdown{
  border: solid 1px #4396FB!important;
}
.el-cascader-menu{
  border-right: solid 1px #4396FB!important;
}
.el-cascader-menu:last-child{
  border-right: none!important;
}
.in-active-path{
  color: #ffffff;
  background-color: pink;
}
.is-selectable{
  color: #ffffff;
  background-color: #030B22;
}
.el-cascader-node__label{
  // background-color: #111940;
  color: #ffffff;
}
// 级联选择器 下拉框
.el-cascader-menu__wrap{
 background-color: #111940;
 border: none!important;
}
.headerBox {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/headerx.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .title {
    width: 300px;
    height: 50px;
    text-align: center;
    font-size: 22px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    color: #ffffff;
    line-height: 50px;
    letter-spacing: 2px;
    position: absolute;
    top: 0;
    left: calc(50% - 150px);
  }
  .menuBox {
    width: 28%;
    height: 45px;
    // background-color: pink;
    position: absolute;
    top: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .option {
      height: 45px;
      line-height: 45px;
      box-sizing: border-box;
      padding: 0 15px;
      font-size: 16px;
      color: #e6e6e6;
      cursor: pointer;
    }
    .option.active {
      background-image: url("../assets/images/itemContent.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
    }
  }
  .leftMenu {
    left: 10%;
  }
  .rightMenu {
    right: 10%;
  }
  .weather {
    width: 200px;
    height: 45px;
    // background-color: yellow;
    position: absolute;
    left: 1%;
    top: 40%;
    display: flex;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    .text {
      color: #ffffff;
      font-size: 12px;
    }
  }
  .item {
    font-size: 16px;
    text-align: center;
    height: 45px;
    line-height: 45px;
    position: absolute;
    font-family: MicrosoftYaHei;
    color: #e6e6e6;
    letter-spacing: 1px;
    top: 40%;
    display: flex;
    align-items: center;
    img {
      margin-left: 5px;
      width: 12px;
      height: 12px;
    }
    cursor: pointer;
    .checkBox {
      width: 120px;
      background-color: #111940;
      position: absolute;
      bottom: -140%;
      left: -40%;
      z-index: 2;
      .dian {
        width: 100%;
        height: 30px;
        line-height: 30px;
        background-color: #111940;
      }
      .dian:hover {
        background-color: #172153;
      }
    }
  }
  .item.active {
    background-image: url("../assets/images/itemContent.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
}
</style>