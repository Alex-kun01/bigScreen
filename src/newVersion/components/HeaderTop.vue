<template>
  <div class="newHeader">
    <div class="contetn">{{title}}守望者</div>
    <div class="leftMenu">
      <div class="selet">
        <!-- <div class="btn">守望者</div> -->
        <el-select
          v-model="value"
          size="small"
          @change="changeCommunity"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
      </div>
      <div class="new_item">{{dateStr}}</div>
    </div>
    <div class="rightMenu">
      <div class="inputBox">
        <el-input size="small" placeholder="请输入内容"></el-input>
        <el-button style="margin-left: 10px" plain size="small">搜索</el-button>
      </div>
      <!-- <div class="admin" @click="changes">
                <span>Admin</span>
                <span v-if="!showChecked"><img src="../../assets/images/toRight2.png" alt="" /></span>
                <span v-else><img src="../../assets/images/toBottom2.png" alt="" /></span>
                <div class="checkBox" v-show="showChecked">
                    <div class="dian"><a href="http://124.71.140.59:8081" target="_blank">后台管理</a></div>
                </div>
            </div> -->
      <div class="admin">
        <el-dropdown>
            <span class="el-dropdown-link">
                {{adminVlaue}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>{{adminVlaue}}</el-dropdown-item>
                <el-dropdown-item><a href="http://124.71.140.59:8081" target="_blank">后台管理</a></el-dropdown-item>
                <el-dropdown-item><div  @click="rZclick">日志</div></el-dropdown-item>
                <!-- <el-dropdown-item  disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
            </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="loginOut" @click="loginOut">退出</div>
    </div>
    <!-- 日志 -->
        <template v-if="journalCompShow">
            <JournalComp @closethis="journalCompClose" />
        </template>
  </div>
</template>
<script>
import JournalComp from './JournalComp' // 日志
import getDateStr from '../../publicFun/getNowDate.js'
export default {
  components:{
    JournalComp
  },
  props: ['title'],
  data() {
    return {
      // title: '斜江社区',
      dateStr: '',
      // 日志是否显示
      journalCompShow: false,
      adminVlaue: 'admin',
      admins: [
          {
              value: 'admin',
              label: 'admin'
          },
        {
          value: "后台管理",
          label: "后台管理",
        },
        {
          value: "日志",
          label: "日志",
        },
      ],
      // 控制系统切换框显示
      showChecked: false,
      value: "2",
      options: [
        {
          value: "2",
          label: "香槟国际",
        },
        {
          value: "1",
          label: "锦屏佳苑",
        },
      ],
    };
  },
  mounted(){
    setInterval(()=>{
        this.dateStr = getDateStr()
        },1000)
  },
  methods: {
    journalCompClose(){
      this.journalCompShow = false
      console.log('日志关闭了', this.journalCompShow)
    },
    rZclick(){
      
      this.journalCompShow = true
      console.log('日志点击了', this.journalCompShow)
    },
    loginOut() {
      this.$router.push("/");
    },
    changes() {
      console.log(1);
      this.showChecked = !this.showChecked;
    },
    changeCommunity() {
      console.log("改变了小区", this.value);
      window.localStorage.setItem("communityId", this.value);
      this.$emit("changeCummuity", this.value);
    },
  },
};
</script>
<style scoped lang="less">
.newHeader {
  width: 100%;
  height: 100%;
  background-color: #111940;
  box-sizing: border-box;
  padding: 0 1%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #f6f6f6;
  position: relative;
  box-sizing: border-box;
  .leftMenu,
  .rightMenu {
    width: 30%;
    height: 100%;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .admin {
      cursor: pointer;
      margin-left: 50px;
      display: flex;
      align-items: center;
      position: relative;
      img {
        margin-left: 5px;
      }
      .checkBox {
        width: 120px;
        background-color: #111940;
        position: absolute;
        bottom: -200%;
        left: -40%;
        z-index: 99999999;
        .dian {
          text-align: center;
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
    .inputBox {
      display: flex;
      align-items: center;
    }
    .selet {
      width: 50%;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        margin-right: 10px;
      }
    }
    .new_item {
      width: 50%;
      height: 100%;
      // background-color: pink;
      text-align: center;
      line-height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      .inputBox {
        width: 80%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          width: 80%;
          height: 100%;
          background-color: #f6f6f6;
        }
        .btn {
          width: 20%;
          cursor: pointer;
        }
      }
    }
  }
  .leftMenu {
    // background-color: pink;
    // padding-left: 2%;
    left: 0;
  }
  .rightMenu {
    // background-color: pink;
    padding-right: 2%;
    right: 0;
    .loginOut {
      font-size: 13px;
      margin-left: 20px;
      color: #999;
      cursor: pointer;
    }
  }

  .contetn {
    width: 80%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-image: url("../../assets/newver/headers.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    text-align: center;
    font-size: 28px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 50px;
    letter-spacing: 2px;
  }

  .new_item.center {
    text-align: center;
    line-height: 70px;
    font-size: 23px;
  }
}
.el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
   
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
   a {
    color: #606266;
    text-decoration: none;
    }
</style>