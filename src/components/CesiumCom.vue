<template>
<!-- 香槟国际小区3D模型 -->
    <div class="cesium">
        <div id="cesiumContainer"></div>
    </div>
</template>
<script>
import bus from '../api/bus.js'
export default {
    data(){
        return{
            viewer: null, //3D模型实例
            robot: null, // 机器人模型
            camera1: null, //摄像机1实this.: null, //摄像机2实例
            camera3: null, //摄像机3实例
            camera4: null, //摄像机4实例
            camera5: null, //摄像机5实例
            camera6: null, //摄像机6实例
            camera7: null, //摄像机7实例
            camera8: null, //摄像机8实例
            camera9: null, //摄像机9实例
            camera10: null, //摄像机10实例
            camera11: null, //摄像机11实例
            camera12: null, //摄像机12实例
            people1: null, //人头像点位1
            people2: null, //人头像点位2
            people3: null, //人头像点位3
            people4: null, //人头像点位4
            people5: null, //人头像点位5
            people6: null, //人头像点位6
            peopleList1: ['','','',''], //人头像点位列表1
            peopleList2: ['','','',''], //人头像点位列表2
            peopleList3: ['','','',''], //人头像点位列表3
            peopleList4: ['','','',''], //人头像点位列表4
            peopleList5: ['','','',''], //人头像点位列表5
            peopleList6: ['','','',''], //人头像点位列表6
            show1: true, //摄像头一显示
            show2: true, // 摄像头二显示
            show3: true, // 摄像头三显示
            show4: true, // 摄像头四显示
            show5: true, // 摄像头五显示
            show6: true, // 摄像头六显示
            houseids:{
                house1: null,
                house2: null,
                house3: null,
                house4: null,
                house5: null,
                house6: null,
                house7: null,
            }, //房子模型id
            // 消防点位
            fierDirIdList: {
                dir1: null,
                dir2: null,
                dir3: null,
                dir4: null,
            },
            fierTimer: null
        }
    },
    props:{
        cesiumData: Object
    },
    destroyed(){
        clearInterval(this.fierTimer)
        this.fierTimer = null
    },
    mounted(){
    this.init()
    clearInterval(this.fierTimer)
    this.fierTimer = null
    // 消防点位闪烁
    const inx = Math.floor( Math.random()*(3-1+1) ) + 1
    this.fierTimer = setInterval(()=>{
        this.changeFierDImg('dir' + inx)
    },5000)


    // 接收父组件传递的值
    bus.$on('testSend', res =>{
        // 处理传递过来的数据
        console.log('bus传递过来的值', res)
        // res.id 确定摄像头点位
        // res.imgList 摄像头点位上经过的人员列表
        // let camera = null // 摄像机点位
        let pelope = null // 头像点位列表
        let imgList = null // 头像列表
        switch(res.id){
            case 'qwe1':
                // camera = this.camera1; // 将摄像机点位赋值给camera string
                pelope = this.peopleList1; // 将头像点位列表赋值给pelope Array
                imgList = res.imgList // 将头像列表赋值给peopleAvatar Array
            break;
            case 'qwe2':
                pelope = this.peopleList2;
                imgList = res.imgList
            break;
            case 'qwe3':
                pelope = this.peopleList3;
                imgList = res.imgList
            break;
            case 'qwe4':
                pelope = this.peopleList4;
                imgList = res.imgList
            break;
            case 'qwe5':
                pelope = this.peopleList5;
                imgList = res.imgList
            break;
            case 'qwe6':
                pelope = this.peopleList6;
                imgList = res.imgList
            break;
        }
        // console.log('查看以下摄像机', imgList,pelope)
        if(!imgList || !pelope){
            return
        }
        
        this.changeCamarePerson(pelope,imgList)
    })
    // 机器人变化事件
    bus.$on('robotRun', () =>{
        this.importantRobot()
    })
    },
    methods:{
        init(){
            
            let _this = this
            _this.viewer = new Cesium.Viewer('cesiumContainer');
            this.importAvatarList()
            this.importHouseId()
            this.importFierD()
            //摄像机定位
            _this.viewer.camera.position = Cesium.Cartesian3.fromDegrees(103.529379,30.572628, 300)
            // //飞入   
            //     // viewer.camera.flyTo({
            //     //     duration: 3,
            //     //     destination : Cesium.Cartesian3.fromDegrees(103.529379,30.572628, 300)
            //     // });
            // } 
            // });
            // 加载天地图
            // const tianditu = new Cesium.TiandituImageryProvider({
            //     mapStyle: Cesium.TiandituMapsStyle.IMG_C,
            //     token: '74e0703e74097458277edaee26c77342',
            // })
            // viewer.imageryLayers.addImageryProvider(tianditu);
            
            const position = Cesium.Cartesian3.fromDegrees(103.529379,30.572628,-481)
            const heading = Cesium.Math.toRadians(180.0);//绕垂直于地心的轴旋转
            const pitch = Cesium.Math.toRadians(90.0);// 绕维度线旋转
            const roll = Cesium.Math.toRadians(.0);// 绕经度线旋转
            const orientation = Cesium.Transforms.headingPitchRollQuaternion(position,new Cesium.HeadingPitchRoll(heading, pitch, roll))
             // 小区3维模型导入
            const entity = _this.viewer.entities.add({
                position,
                orientation, 
                model : {
                    // uri : 'community.glb'
                    uri: 'http://124.71.140.59:8082/static/community.glb',
                }
            })
        

        // 摄像头一模型导入
         _this.camera1 = _this.viewer.entities.add({ 
                name: "摄像头1",
                position: Cesium.Cartesian3.fromDegrees(103.52937,30.572095,10),
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
        _this.camera1.show = _this.show1 // 摄像头1显示
            
       //摄像头一点击事件
        const handlerVideo1 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo1.setInputAction(function (click) {
            const pick1 = _this.viewer.scene.pick(click.position);
            if (pick1 && pick1.id._name == "摄像头1") {
             //_this.camera1._billboard._image._value = '../images/marker02.png'; // 替换图片
             //_this.camera1._label._text._value = "label";
            console.log('摄像头一点击事件触发！')
            _this.$emit('cameraCLick', 1)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        // 摄像头二模型导入
            _this.camera2 = _this.viewer.entities.add({
                name: "摄像头2",
                position: Cesium.Cartesian3.fromDegrees(103.529145,30.57250,15),
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
            _this.camera2.show = _this.show2 // 摄像头2显示
       //摄像头二点击事件
        const handlerVideo2 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo2.setInputAction(function (click) {
            const pick2 = _this.viewer.scene.pick(click.position);
            if (pick2 && pick2.id._name == "摄像头2") {
            console.log('摄像头二点击事件触发！')
            _this.$emit('cameraCLick', 2)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK); 

        // 摄像头三模型导入
        _this.camera3 = _this.viewer.entities.add({
                name: "摄像头3",
                position: Cesium.Cartesian3.fromDegrees(103.529280,30.572650,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头3",
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
            _this.camera3.show = _this.show3 // 摄像头1显示
           
       //摄像头三点击事件
        const handlerVideo3 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo3.setInputAction(function (click) {
            const pick3 = _this.viewer.scene.pick(click.position);
            if (pick3 && pick3.id._name == "摄像头3") {
            console.log('摄像头二点击事件触发！')
            _this.$emit('cameraCLick', 3)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头四模型导入
        _this.camera4 = _this.viewer.entities.add({
                name: "摄像头4",
                position: Cesium.Cartesian3.fromDegrees(103.529700,30.573086,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头4",
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
            _this.camera4.show = _this.show4 // 摄像头4显示
       //摄像头四点击事件
        const handlerVideo4 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo4.setInputAction(function (click) {
            const pick4 = _this.viewer.scene.pick(click.position);
            if (pick4 && pick4.id._name == "摄像头4") {
            console.log('摄像头四点击事件触发！')
            _this.$emit('cameraCLick', 4)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头五模型导入
        _this.camera5 = _this.viewer.entities.add({
                name: "摄像头5",
                position: Cesium.Cartesian3.fromDegrees(103.529070,30.573050,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头5",
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
            _this.camera5.show = _this.show5 // 摄像头5显示
       //摄像头五点击事件
        const handlerVideo5 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo5.setInputAction(function (click) {
            const pick5 = _this.viewer.scene.pick(click.position);
            if (pick5 && pick5.id._name == "摄像头5") {
            console.log('摄像头五点击事件触发！')
            _this.$emit('cameraCLick', 5)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头六模型导入
        _this.camera6 = _this.viewer.entities.add({
                name: "摄像头6",
                position: Cesium.Cartesian3.fromDegrees(103.52879,30.573246,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头6",
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
            _this.camera6.show = _this.show6 // 摄像头6显示
       //摄像头六点击事件
        const handlerVideo6 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo6.setInputAction(function (click) {
            const pick6 = _this.viewer.scene.pick(click.position);
            if (pick6 && pick6.id._name == "摄像头6") {
            console.log('摄像头六点击事件触发！')
            _this.$emit('cameraCLick', 6)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头七模型导入
        _this.camera7 = _this.viewer.entities.add({
                name: "摄像头7",
                position: Cesium.Cartesian3.fromDegrees(103.530088,30.57208,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头7",
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
       //摄像头七点击事件
        const handlerVideo7 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo7.setInputAction(function (click) {
            const pick7 = _this.viewer.scene.pick(click.position);
            if (pick7 && pick7.id._name == "摄像头7") {
            console.log('摄像头七点击事件触发！')
            _this.$emit('cameraCLick', 7)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头八模型导入
        _this.camera8 = _this.viewer.entities.add({
                name: "摄像头8",
                position: Cesium.Cartesian3.fromDegrees(103.528916,30.57304,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头8",
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
       //摄像头八点击事件
        const handlerVideo8 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo8.setInputAction(function (click) {
            const pick8 = _this.viewer.scene.pick(click.position);
            if (pick8 && pick8.id._name == "摄像头8") {
            console.log('摄像头八点击事件触发！')
            _this.$emit('cameraCLick', 8)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头九模型导入
        _this.camera9 = _this.viewer.entities.add({
                name: "摄像头9",
                position: Cesium.Cartesian3.fromDegrees(103.528979,30.572511,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头9",
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
       //摄像头九点击事件
        const handlerVideo9 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo9.setInputAction(function (click) {
            const pick9 = _this.viewer.scene.pick(click.position);
            if (pick9 && pick9.id._name == "摄像头9") {
            console.log('摄像头九点击事件触发！')
            _this.$emit('cameraCLick', 9)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头十模型导入
        _this.camera10 = _this.viewer.entities.add({
                name: "摄像头10",
                position: Cesium.Cartesian3.fromDegrees(103.528548,30.572070,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头10",
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
       //摄像头十点击事件
        const handlerVideo10 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo10.setInputAction(function (click) {
            const pick10 = _this.viewer.scene.pick(click.position);
            if (pick10 && pick10.id._name == "摄像头10") {
            console.log('摄像头十点击事件触发！')
            _this.$emit('cameraCLick', 10)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头十一模型导入
        _this.camera11 = _this.viewer.entities.add({
                name: "摄像头11",
                position: Cesium.Cartesian3.fromDegrees(103.529949,30.572305,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头11",
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
       //摄像头十一点击事件
        const handlerVideo11 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo11.setInputAction(function (click) {
            const pick11 = _this.viewer.scene.pick(click.position);
            if (pick11 && pick11.id._name == "摄像头11") {
            console.log('摄像头十一点击事件触发！')
            _this.$emit('cameraCLick', 11)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 摄像头十二模型导入
        _this.camera12 = _this.viewer.entities.add({
                name: "摄像头12",
                position: Cesium.Cartesian3.fromDegrees(103.530400,30.572643,15),
                point: { //点
                    pixelSize: 0,
                    HeightReference: 1000
                },
                label: { //文字标签
                    text: "摄像头12",
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
            
       //摄像头十二点击事件
        const handlerVideo12 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
        handlerVideo12.setInputAction(function (click) {
            const pick12 = _this.viewer.scene.pick(click.position);
            if (pick12 && pick12.id._name == "摄像头12") {
            console.log('摄像头十二点击事件触发！')
            _this.$emit('cameraCLick', 12)
            } else {
                return;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        },
        // 导入人头像
        importAvatarList(){
            // 循环添加像点位4个
            for(let i = 0;i <= 4; i++){
                // 摄像头1
                this.peopleList1[i] = this.viewer.entities.add({
                    name: "",
                    position: Cesium.Cartesian3.fromDegrees(103.52937,30.572095,10 + i*10),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 20px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1462674447,2356595031&fm=26&gp=0.jpg',
                        width: 25,
                        height: 25
                    },
                })
                this.peopleList1[i].show = false
                // 摄像头2
                this.peopleList2[i] = this.viewer.entities.add({
                    name: "",
                    position: Cesium.Cartesian3.fromDegrees(103.529145,30.57250,10 + i*10),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 20px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1462674447,2356595031&fm=26&gp=0.jpg',
                        width: 25,
                        height: 25
                    },
                })
                 this.peopleList2[i].show = false
                // 摄像头3
                this.peopleList3[i] = this.viewer.entities.add({
                    name: "",
                    position: Cesium.Cartesian3.fromDegrees(103.529379,30.572628,10 + i*10),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 20px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1462674447,2356595031&fm=26&gp=0.jpg',
                        width: 25,
                        height: 25
                    },
                })
                 this.peopleList3[i].show = false
                // 摄像头4
                this.peopleList4[i] = this.viewer.entities.add({
                    name: "",
                    position: Cesium.Cartesian3.fromDegrees(103.529796,30.573086,10 + i*10),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 20px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1462674447,2356595031&fm=26&gp=0.jpg',
                        width: 25,
                        height: 25
                    },
                })
                 this.peopleList4[i].show = false
                // 摄像头5
                this.peopleList5[i] = this.viewer.entities.add({
                    name: "",
                    position: Cesium.Cartesian3.fromDegrees(103.529070,30.573050,10 + i*10),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 20px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1462674447,2356595031&fm=26&gp=0.jpg',
                        width: 25,
                        height: 25
                    },
                })
                 this.peopleList5[i].show = false
                // 摄像头6
                this.peopleList6[i] = this.viewer.entities.add({
                    name: "",
                    position: Cesium.Cartesian3.fromDegrees(103.52879,30.573246,10 + i*10),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 20px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1462674447,2356595031&fm=26&gp=0.jpg',
                        width: 25,
                        height: 25
                    },
                })
                 this.peopleList6[i].show = false
            }

            // 网格机器人
                this.robot = this.viewer.entities.add({
                    name: "",
                    position: Cesium.Cartesian3.fromDegrees(103.530400,30.572100,15),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 50px Helvetica',// 15pt  
                        scale: 0.5, 
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(1, 0.2, 0, 1)
                    },
                    billboard: { //图标
                        image: 'robot.png',
                        width: 25,
                        height: 30
                    },
                })

        },
        // 导入楼栋号
        importHouseId(){
            let _this = this
            let housePerson = {
                house1: 0,
                house2: 0,
                house3: 0,
                house5: 0,
            }

            this.$http.get(`${process.env.VUE_APP_1_URL}/house-ridgepole-list`,{
                params:{
                    plot_id: 2
                }
            }).then(res =>{
                console.log('楼栋人口信息', res)
                if(res.status == 200){
                    res.data.forEach(item => {
                        if(item.楼栋 == 1) housePerson.house1 = item.人数
                        if(item.楼栋 == 2) housePerson.house2 = item.人数
                        if(item.楼栋 == 3) housePerson.house3 = item.人数
                        if(item.楼栋 == 5) housePerson.house5 = item.人数
                    });

                     // 楼栋 - 1栋
            _this.houseids.house1 = _this.viewer.entities.add({
                    name: "1栋",
                    position: Cesium.Cartesian3.fromDegrees(103.530000,30.573050,75),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: "1栋:" + housePerson.house1 + '人',
                        font: '50 30px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'camera.png',
                        width: 5,
                        height: 5
                    },
                });
        //楼栋1事件
            const house1 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            house1.setInputAction(function (click) {
                const pick1 = _this.viewer.scene.pick(click.position);
                if (pick1 && pick1.id._name == "1栋") {
                console.log('楼栋事件触发-1栋')
                _this.$emit('houseClick', 1)
                } else {
                    return;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            // 楼栋 - 2栋
            _this.houseids.house2 = _this.viewer.entities.add({
                    name: "2栋",
                    position: Cesium.Cartesian3.fromDegrees(103.530000,30.572620,63),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: "2栋" + housePerson.house2 + '人',
                        font: '50 30px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'camera.png',
                        width: 5,
                        height: 5
                    },
                });
        //楼栋2事件
            const house2 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            house2.setInputAction(function (click) {
                const pick1 = _this.viewer.scene.pick(click.position);
                if (pick1 && pick1.id._name == "2栋") {
                console.log('楼栋事件触发-2栋')
                _this.$emit('houseClick', 2)
                } else {
                    return; 
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            // 楼栋 - 3栋
            _this.houseids.house3 = _this.viewer.entities.add({
                    name: "3栋",
                    position: Cesium.Cartesian3.fromDegrees(103.528650,30.572560,80),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: "3栋" + housePerson.house3 + '人',
                        font: '50 30px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'camera.png',
                        width: 5,
                        height: 5
                    },
                });
        //楼栋2事件
            const house3 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            house3.setInputAction(function (click) {
                const pick1 = _this.viewer.scene.pick(click.position);
                if (pick1 && pick1.id._name == "3栋") {
                console.log('楼栋事件触发-3栋')
                _this.$emit('houseClick', 3)
                } else {
                    return;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            // 楼栋 - 5栋
            _this.houseids.house5 = _this.viewer.entities.add({
                    name: "5栋",
                    position: Cesium.Cartesian3.fromDegrees(103.529300,30.573050,74),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: "5栋" + housePerson.house5 + '人',
                        font: '50 30px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                       backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: 'camera.png',
                        width: 5,
                        height: 5
                    },
                });
        //楼栋5事件
            const house5 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            house5.setInputAction(function (click) {
                const pick1 = _this.viewer.scene.pick(click.position);
                if (pick1 && pick1.id._name == "5栋") {
                console.log('楼栋事件触发-5栋')
                _this.$emit('houseClick', 5)
                } else {
                    return;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);



                }
            })
        },
        // 切换摄像机与人头像
        changeCamarePerson(pelope,imgList){
            // console.log('开始切换',pelope, imgList)
            // pelope 头像点位列表
            // imgList 头像图片列表
            // 该方法被执行后 根据头像列表的长度去让头像点位显示相应的个数
            for(let i = 0;i <= imgList.length; i++){
                // 更改图片
                pelope[i]._billboard._image._value = imgList[i]
                // 显示
                pelope[i].show = true
            }
            setTimeout(()=>{
                for(let i = 0;i <= imgList.length; i++){
                // 隐藏
                pelope[i].show = false
            }
            },2000)

        },
        // 处理机器人发现重点人员反应
        importantRobot(){
            // 发现重点人员 改变机器人头顶字样 2秒后消失
           this.robot._label._text._value = "发现重点人员";
           setTimeout(()=>{
               this.robot._label._text._value = ""
           },2000)
        },
        // 导入消防点位
        importFierD(){
            const _this = this
            // 消防点位1
            _this.fierDirIdList.dir1 = _this.viewer.entities.add({
                    name: "fierD1",                             // 529950
                    position: Cesium.Cartesian3.fromDegrees(103.529800,30.572850,55),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 30px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: require('../assets/newver/device.png'),
                        width: 30,
                        height: 30
                    },
                });
        //消防点位1事件
            const fier1 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            fier1.setInputAction(function (click) {
                const pick1 = _this.viewer.scene.pick(click.position);
                if (pick1 && pick1.id._name == "fierD1") {
                console.log('消防点位1事件')
                _this.$emit('openCommandplan', 1)
                //
                } else {
                    return;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            
             // 消防点位2
            _this.fierDirIdList.dir2 = _this.viewer.entities.add({
                    name: "fierD2",
                    position: Cesium.Cartesian3.fromDegrees(103.528730,30.572600,55),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 30px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: require('../assets/newver/device.png'),
                        width: 30,
                        height: 30
                    },
                });
        //消防点位2事件
            const fier2 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            fier2.setInputAction(function (click) {
                const pick2 = _this.viewer.scene.pick(click.position);
                if (pick2 && pick2.id._name == "fierD2") {
                console.log('消防点位2事件')
                 _this.$emit('openCommandplan', 2)
                //
                } else {
                    return;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

             // 消防点位3
            _this.fierDirIdList.dir3 = _this.viewer.entities.add({
                    name: "fierD3",
                    position: Cesium.Cartesian3.fromDegrees(103.529300,30.572970,55),
                    point: { //点
                        pixelSize: 0,
                        HeightReference: 1000
                    },
                    label: { //文字标签
                        text: '',
                        font: '50 30px Helvetica',// 15pt monospace
                        scale: 0.5,
                        style: Cesium.LabelStyle.FILL,
                        fillColor: Cesium.Color.WHITE,
                        pixelOffset: new Cesium.Cartesian2(-8, -35),   //偏移量
                        showBackground: true,
                        backgroundColor: new Cesium.Color(0.5, 0.6, 1, 1.0)
                    },
                    billboard: { //图标
                        image: require('../assets/newver/device.png'),
                        width: 30,
                        height: 30
                    },
                });
        //消防点位3事件
            const fier3 = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas);
            fier3.setInputAction(function (click) {
                const pick3 = _this.viewer.scene.pick(click.position);
                if (pick3 && pick3.id._name == "fierD3") {
                console.log('消防点位3事件')
                 _this.$emit('openCommandplan', 3)
                //
                } else {
                    return;
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        },
        // 切换消防点位图片-闪烁
        changeFierDImg(fierId){
            const img1 = require('../assets/newver/dev-blu.png');
            const img2 = require('../assets/newver/dev-red.png');
            if(!this.fierDirIdList[fierId]) return
            this.fierDirIdList[fierId]._billboard._image._value = img2
            setTimeout(()=>{
                this.fierDirIdList[fierId]._billboard._image._value = img1
            },1000)
            setTimeout(()=>{
                this.fierDirIdList[fierId]._billboard._image._value = img2
            },2000)
            setTimeout(()=>{
                this.fierDirIdList[fierId]._billboard._image._value = img1
            },3000)
        },

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