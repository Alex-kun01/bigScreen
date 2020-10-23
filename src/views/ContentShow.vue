<template>
<!-- 重点人员管理 -->
  <div class="contentShow">
    <div class="navBox"><NavigationBox /></div>
    <div class="conBox">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavigationBox from '../views/NavigationBox'
export default {
  data(){
    return{
      
    }
  },
  components:{
    NavigationBox
  }
}
</script>
<style lang="less" scoped>
.contentShow{
  width: 100%;
  height: 100%;
  position: relative;
  .navBox{
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    // padding-top: 5px;
  }
  // 内容区
  .conBox{
    width: 100%;
    height: 90%;
    position: relative;
    box-sizing: border-box;
    .left-box,.right-box{
      width: 25%;
      height: 100%;
      background-color: lemonchiffon;
      position: absolute;
    }
    .left-box{
      left: 0;
    }
    .right-box{
      right: 0;
    }
    .con-box{
      width: 50%;
      height: 100%;
      background-color: lightcoral;
      position: absolute;
      left: 25%;
    }
  }
}
</style>