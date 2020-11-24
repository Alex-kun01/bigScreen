<template>
    <div class="mapComp">
        <div id="container"></div>
    </div>
</template>
<script>
import mapUtil from '../../publicFun/mapUtil.js'
// 社区数据
const markerList = [
        {name: '晋原街道',position: [103.535672,30.588188]},
        {name: '南街社区',position: [103.522139,30.583576]},
        {name: '西街社区',position: [103.518619,30.585677]},
        {name: '北街社区',position: [103.518171,30.587995]},
        {name: '南苑社区',position: [103.52039,30.569077]},
        {name: '官渡社区',position: [103.518418,30.566106]},
        {name: '斜江社区',position: [103.520223,30.562416]},
        {name: '建华社区',position: [103.522215,30.578668]},
        {name: '桃源社区',position: [103.517405,30.57324]},
        {name: '岳江社区',position: [103.514753,30.584879]},
        {name: '莲兴社区',position: [103.50251,30.573534]},
        {name: '坪域村',position: [103.508521,30.582338]},
        {name: '华三村',position: [103.516785,30.53666]},
        {name: '马王村',position: [103.518203,30.549094]},
        {name: '金龙村',position: [103.485745,30.585158]},
        {name: '梁坪村',position: [103.50142,30.584417]},
        {name: '清江村',position: [103.518496,30.590701]},
        {name: '凤凰村',position: [103.508394,30.607387]},
        {name: '友谊村',position: [103.502333,30.617991]},
        {name: '新乐村',position: [103.482961,30.598262]},
        {name: '五童村',position: [103.482677,30.566376]},
        {name: '黄土村',position: [103.499327,30.560843]},
        {name: '义兴村',position: [103.496193,30.566723]},
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
                    zoom: 17,//级别
                    center: [103.520223,30.562416],
                    pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
                    viewMode: '3D',
                    // showLabel: false, //不显示地图文字标记
                    // mapStyle: "amap://styles/blue"
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
                    icon: markerList[i].name == '斜江社区'? require('../../assets/twopage/robot.png'):require('../../assets/images/address2.png'),
                    size: new AMap.Size(40, 50),//图片大小
                    position: markerList[i].position
                });
                markers[i].setMap(_this.map);
                
                markers[i].setLabel({ 
                offset: new AMap.Pixel(-18,45),
                content: `<div style="padding: 5px 10px;background: rgba(4, 142, 255, 0.21);color:#0058FF;font-size:14px;">${markerList[i].name}</div>`
            });
            
            }
            markers[6].on('click', res =>{
                // console.log('高德地图-斜江社区点击事件', res);
                this.$router.push({name: 'pelopePageS'})
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
        //     const info = `<div style="padding:5px;background:#fff;">
        //         <div>晋元街道</div>
        //         <div>香槟国际</div>
        //         <div>锦屏佳苑</div>
        //     </div>`;
        //     const infoWindow = new AMap.InfoWindow({
        //         isCustom: true,  //使用自定义窗体
        //         content: info,  //使用默认信息窗体框样式，显示信息内容
        //         offset: new AMap.Pixel(5, -50)
        //     });
        //     //打开信息窗口
        //     infoWindow.open(_this.map, [103.520223,30.562416]); //后面的参数指的是经纬度，在此显示窗口
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