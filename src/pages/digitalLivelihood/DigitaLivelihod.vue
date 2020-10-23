<template>
<!-- 数字民生 -->
    <div class="digitaLivelihod">
        <!-- 头部 -->
        <div class="header"><DigHeader /></div>
        <!-- 内容 -->
        <div class="contentBox">
            <router-view />
        </div>
    </div>
</template>
<script>
import DigHeader from './subset/DigHeader.vue'

export default {
    components:{
        DigHeader
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
.digitaLivelihod{
    width: 100%;
    height: 100%;
    .header{
        width: 100%;
        height: 70px;
    }
    .contentBox{
        width: 100%;
        height: calc(100% - 70px);
        // background-color: orange;
    }
}
</style>