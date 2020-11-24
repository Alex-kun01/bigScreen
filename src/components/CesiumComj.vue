<template>
<!-- 锦屏佳苑小区3D模型 -->
    <div class="cesium">
        <div id="cesiumContainer"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
        }
    },
    mounted(){
    this.init()
    },
    methods:{
        init(){
            let _this = this
            const viewer = new Cesium.Viewer('cesiumContainer');
            setTimeout(()=>{
                //飞入
                viewer.camera.flyTo({
                    duration: 3,
                    destination : Cesium.Cartesian3.fromDegrees(103.547000,30.598000,300)
                });
            },5000)

            
            //定点
            // viewer.camera.position = Cesium.Cartesian3.fromDegrees(103.529399, 30.58647, 80)
           

            const position = Cesium.Cartesian3.fromDegrees(103.548717,30.597199,200)
            const heading = Cesium.Math.toRadians(170.0);//绕垂直于地心的轴旋转
            const pitch = Cesium.Math.toRadians(90.0);// 绕维度线旋转
            const roll = Cesium.Math.toRadians(180.0);// 绕经度线旋转
            const orientation = Cesium.Transforms.headingPitchRollQuaternion(position,new Cesium.HeadingPitchRoll(heading, pitch, roll))
            
        // 小区3维模型导入
            const entity = viewer.entities.add({
                position,
                orientation, 
                model : {
                    // uri : 'box2.gltf'
                },
                
            })
            viewer.trackedEntity = entity

        // 摄像头一模型导入
            const camera1 = viewer.entities.add({
                name: "video1",
                position: Cesium.Cartesian3.fromDegrees(103.547886,30.596393,45),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头1",
                    font: '50 20px Helvetica',// 15pt monospace
                    scale: 0.5,
                    style: Cesium.LabelStyle.FILL,
                    fillColor: Cesium.Color.WHITE,
                    pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                },
                billboard: { //图标
                    image: 'camera.png',
                    width: 15,
                    height: 15
                },
            });
       //摄像头一点击事件
        const handlerVideo1 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handlerVideo1.setInputAction(function (click) {
            const pick1 = viewer.scene.pick(click.position);
            if (pick1 && pick1.id._name == "video1") {
            //    camera1._billboard._image._value = '../images/marker02.png'; // 替换图片
            //    camera1._label._text._value = "label";
            console.log('摄像头一点击事件触发！')
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头二模型导入
            const camera2 = viewer.entities.add({
                name: "video2",
                position: Cesium.Cartesian3.fromDegrees(103.548515,30.59689,45),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头2",
                    font: '50 20px Helvetica',// 15pt monospace
                    scale: 0.5,
                    style: Cesium.LabelStyle.FILL,
                    fillColor: Cesium.Color.WHITE,
                    pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                    showBackground: true,
                    backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                },
                billboard: { //图标
                    image: 'camera.png',
                    width: 15,
                    height: 15
                },
            });
       //摄像头二点击事件
        const handlerVideo2 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handlerVideo2.setInputAction(function (click) {
            const pick2 = viewer.scene.pick(click.position);
            if (pick2 && pick2.id._name == "video2") {
            console.log('摄像头二点击事件触发！')
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK); 
       

            
        }
    }
}
</script>
<style lang="less" scoped>
.cesium{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    #cesiumContainer{
            width: 100%;
            height: 100%;
        }
}
</style>