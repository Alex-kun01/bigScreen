<template>
    <div class="mapComp">
        <div id="container"></div>
    </div>
</template>
<script>
import mapUtil from '../../publicFun/mapUtil.js';
// 社区数据
const markerList = [
        {name: '晋原街道',position: [103.520223,30.562416]},
        {name: '青霞街道',position: [103.535898,30.587755]},
        {name: '沙渠街道',position: [103.741065,30.52954]},
        {name: '安仁镇',position: [103.616057,30.514155]},
        {name: '王泗镇',position: [103.487479,30.521214]},
        {name: '新场镇',position: [103.43496,30.531461]},
        {name: '悦来镇',position: [103.448712,30.618952]},
        {name: '西岭镇',position: [103.223043,30.621274]},
        {name: '花水湾镇',position: [103.257508,30.558707]},
        {name: '悦来镇',position: [103.448712,30.618952]},
        {name: '䢺江镇',position: [103.299913,30.583041]},
        {name: '鹤鸣镇',position: [103.426921,30.617689]},
    ];
export default {
    data(){
        return{
            map: null,
            infoWindow: null
        }
    },
    mounted(){
        let _this = this;
        setTimeout(() =>{
            _this.mapInit()
        }, 800)
    },
    destroyed(){
        this.map.destroy();
        console.log('地图已销毁', this.map);
    },
    methods:{
        /**
         * 初始化高德地图
         */
        mapInit(){
            const _this = this
            mapUtil.loadMap('2.0').then(AMap =>{
                _this.map =  new AMap.Map('container',{
                    zoom: 13,//级别
                    center: [103.520223,30.562416],
                    pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
                    viewMode: '3D'
                })
                // 添加罗盘控制
                AMap.plugin([
                    'AMap.ControlBar',
                    ], function(){
                    // 添加 3D 罗盘控制
                _this.map .addControl(new AMap.ControlBar());
                });
                _this.map.on('complete', function(){
                    // 地图图块加载完成后触发
                    _this.createMarker(AMap)
                    _this.createInfoWindow(AMap)
                });
            })
        },
        /**
         * 创建标记点
         */
        createMarker(AMap){
            const _this = this;
            const markers = new Array(markerList.length);
            // 循环创建Marker实例
            for(let i = 0;i < markerList.length; i++){
                markers[i] = new AMap.Marker({
                    icon: require('../../assets/images/address3.png'),
                    size: new AMap.Size(40, 50),//图片大小
                    position: markerList[i].position
                });
                markers[i].setMap(_this.map);
                markers[i].setLabel({ 
                offset: new AMap.Pixel(-10,55),
                content: `<div style="padding: 5px 10px;background: rgba(4, 142, 255, 0.21);color:#0058FF;font-size:14px;">${markerList[i].name}</div>`
            });
            }
            markers[0].on('click', res =>{
                // console.log('高德地图-晋原街道点击事件', res);
                this.$router.push({name: 'streePageJ'})
            })
        },
        /**
         * 添加信息窗体
         */
        createInfoWindow(AMap){
            const _this = this;
            this.$http.get(`${process.env.VUE_APP_5_URL}/home-top`).then(res =>{
                console.log('添加信息窗体数据', res);
                const datas = res.data
                this.$http.get(`${process.env.VUE_APP_5_URL}/home-center-click`).then(reg =>{
                    const datas2 = reg.data
                    const info = `<div style="padding:5px;">
                        <div style="
                            padding: 5px;
                            margin-bottom: 5px;
                            border-left: 1px solid black;
                            background: rgba(4, 142, 255, 0.31);color:#0058FF;
                        ">
                            <div>小区：${datas['小区数']}</div>
                            <div>实有人：${datas['实有人数']}</div>
                            <div>实有房：${datas['实有房数']}</div>
                            <div>实有车：${datas['实有车']}</div>
                            <div>实有事件：${datas['实有事件']}</div>
                        </div>
                        <div style="
                            padding: 5px;
                            border-left: 1px solid black;
                            background: rgba(4, 142, 255, 0.31);color:#0058FF;
                        ">
                            <div>实有设备：${datas2['实有设备']}</div>
                            <div>核实人数：${datas2['核实人数']}</div>
                            <div>核实车辆：${datas2['核实车辆']}</div>
                            <div>排查空房：${datas2['排查空房']}</div>
                            <div>处置事件：${datas2['处置事件']}</div>
                        </div>
                    </div>`;
                    const infoWindow = new AMap.InfoWindow({
                        isCustom: true,  //使用自定义窗体
                        content: info,  //使用默认信息窗体框样式，显示信息内容
                        offset: new AMap.Pixel(-100, 150)
                    });
                    //打开信息窗口
                    infoWindow.open(_this.map, [103.520223,30.562416]); //后面的参数指的是经纬度，在此显示窗口
                })
            })
        }
    }
}
</script>
<style lang="less">
.mapComp{
    width: 100%;
    height: 100%;
    #container {
        width: 100%;
        height: 100%;
    } 
}
.amap-marker-label{
    margin: 0;
    padding: 0;
    border: 0!important;
}
</style>