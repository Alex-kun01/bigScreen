<template>
<!-- 疑似流动人口管理 -->
  <div class="suspectedFlow">
    <div class="navBox"><SuspectedHeader /></div>
    <div class="conBox"><SuspectedfTu /></div>
  </div>
</template>
<script>
import SuspectedHeader from './SuspectedHeader.vue'
import SuspectedfTu from './SuspectedfTu.vue'
export default {
  data(){
    return{
      
    }
  },
  components:{
    SuspectedHeader,
    SuspectedfTu
  }
}
</script>
<style lang="less" scoped>
.suspectedFlow{
  width: 100%;
  height: 99%;
  box-sizing: border-box;
  position: relative;
  .navBox{
    width: 100%;
    height: 10%;
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