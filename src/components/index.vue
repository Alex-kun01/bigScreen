<template>
  <div class="index">
      <!-- 头部区域 -->
      <div class="h-box"><HeaderBox /></div>
      <div class="c-box"><router-view /></div>
  </div>
</template>
<script>
import HeaderBox from '../views/HeaderBox'
export default {
  data(){
    return{

    }
  },
  components:{
    HeaderBox
  }
}
</script>
<style lang="less" scoped>
.index{
  width: 100%;
  height: 100%;
  min-width: 1200px;
  .h-box{
    width: 100%;
    min-width: 1200px;
    height: 80px;
    box-sizing: border-box;
  }
  .c-box{
    width: 100%;
    min-width: 1200px;
    height: calc(100% - 80px);
  }
}
</style>