<template>
<!-- 头部-导航区域 -->
  <div class="navigationBox">
    <div class="nav-con-box">
      <div 
      v-for="(item,index) in datas"
      :key="index"
      :class="{item: 1, active: activeIndex == index}"
      @click="changeActiveIndex(item)"
      >{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      activeIndex: 0, // 按钮选中index
      datas: [
        {
          id: 0,
          name: '全部',
          url: 'allPage'
        },
        {
          id: 1,
          name: '非法上访',
          url: 'illegalpetition'
        },
        {
          id: 2,
          name: '涉恐人员',
          url: 'terrorist'
        },
        {
          id: 3,
          name: '涉毒人员',
          url: 'drugRelated'
        }
      ]
    }
  },
  methods:{
    changeActiveIndex(item){
      console.log('item', item)
      this.activeIndex = item.id
      this.$router.push({name: item.url})
    }
  }
}
</script>
<style lang="less" scoped>
.navigationBox{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  .nav-con-box{
    font-size: 1.1rem;
      display: flex;
      .item{
        width: 110px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #ffffff;
        background-color: #0b1632;
        border-radius: 30px;
        margin: 0 20px;
        position: relative;
        cursor: pointer;
      }
      .item:hover{
        background-color: #0f214e;
      }
      .item.active{
        // background-color: #172153;
        background-image: url('../assets/images/itemContent.png');
        background-repeat:no-repeat;
        background-size:100% 100%;
        -moz-background-size:100% 100%;
      }
      .item.active::after{
        content: '';
        display: block;
        height: 1px;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-image: linear-gradient(to right, #030b21,#0669b3,#030b21);
      }
  }
}
</style>