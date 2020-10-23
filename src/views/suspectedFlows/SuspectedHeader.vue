<template>
<!-- 疑似流动人口管理-header -->
    <div class="suspectedHeader">
        <div 
        v-for="item in showDatas"
        :key="item.id"
        :class="{item: 1}"
        :style="{color: item.color}"
        >
            <div class="number">{{item.number}}</div>
            <div class="name">{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            showDatas: [
                {
                    id: 0,
                    name: '至今疑似流动人口',
                    number: '1521人',
                    color: '#FF3E4A'
                },
                {
                    id: 1,
                    name: '近7日疑似流动人口',
                    number: '54人',
                    color: '#FF8200'
                },
                {
                    id: 2,
                    name: '近15日疑似流动人口',
                    number: '122人',
                    color: '#FFE408'
                },
                {
                    id: 3,
                    name: '近30日疑似流动人口',
                    number: '544人',
                    color: '#09F97C'
                },
                {
                    id: 4,
                    name: '至今陌生人人口',
                    number: '149人',
                    color: '#0057FF'
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.suspectedHeader{
    width: 100%;
    height: 100%;
    font-size: 0.7rem;
    font-weight: 100;
    box-sizing: border-box;
    display: flex;
    color: #ffffff;
    justify-content: center;
    align-items: center;
    .item{
        min-width: 150px;
        box-sizing: border-box;
        padding: 5px 0;
        text-align: center;
        margin: 0 10px;
        border-radius: 5px;
        .name{
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: #ABC0DA;
            line-height: 19px;
            letter-spacing: 1px;
        }
        .number{     
            font-size: 18px;
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            line-height: 24px;
            letter-spacing: 1px;
        }
    }
}
</style>