// 异步加载高德地图
export default {
    loadMap (v = '1.4.15',
             key = '27e1b48a08541a39d622e25140792301') {
        return new Promise(function (resolve, reject) {
            let hasLoaded = document.getElementById("amap");
            if(hasLoaded) { // 只加载一次
                //如果版本一致则直接返回，避免重复请求
                if(hasLoaded._version === v && hasLoaded._key === key){
                    resolve(window.AMap);
                    return;
                }
                document.head.removeChild(hasLoaded);
            }
            let script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = "amap";
            script.src = `https://webapi.amap.com/maps?v=1.4.15&key=27e1b48a08541a39d622e25140792301&callback=initAMap`;
            //此处若缺失callback，则页面在刷新后地图会变为空白不显示
            script.onerror = reject;
            script._version = v;
            script._key = key;
            document.head.appendChild(script)
            window.initAMap = () => {
                resolve(window.AMap)
            }
        });
    },
}