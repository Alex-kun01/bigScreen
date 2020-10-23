<template>
<!-- 地图组件 -->
    <div class="mapCom">
        <div id="mapGL" style="height:100%;width:100%;"></div>
    </div>
</template>
<script>
import webgl from './index.js'
export default {
    data(){
        return{

        }
    },
    mounted(){
        webgl("mapGL")
        console.log(document.getElementById('mapGL').style.height )
    }
}
</script>
<style lang="less" scoped>
.mapCom{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: wheat;
    #mapGL{
        width: 100%;
        height: 100%;
        border: 2px solid black;
    }
}
</style>