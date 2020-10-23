<template>
<!-- 人口信息 -->
    <div class="demo">
        <div class="goBack" @click="goBack"></div>
        <iframe style="width:100%;height:100%;" src="http://106.75.154.221:8083/code/file/wisdom.html" frameborder="0"></iframe>
    </div>
</template>
<script>
export default {
    methods:{
        goBack(){
            console.log('执行了')
            this.$router.push({name: 'index'})
        }
    }
}
</script>
<style lang="less" scoped>
.demo{
    width: 100%;
    height: 100%;
    position: relative;
    .goBack{
        height: 20px;
        width: 20px;
        background-color: #111940;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>