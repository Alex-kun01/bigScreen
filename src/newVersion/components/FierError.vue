<template>
<!-- 火警误报 -->
    <div class="fierError">
        <div class="confirm">
            <div class="con_title">维保确认</div>
            <img src="../../assets/images/close.png" alt="" @click="closethis" class="close">
            <div class="content">
                <!-- <div class="item">
                    <span>处理人：</span>
                    <el-select v-model="value" placeholder="请选择处理人">
                        <el-option
                        v-for="item in clPeloe"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div> -->
                <div class="item">
                    <label for="">误报原因：</label>
                    <el-input
                        type="text"
                        v-model="info">
                    </el-input>
                </div>
                <div class="item" style="margin-top: 20px;padding-left: 30%;">
                <el-button style="margin-right:50px;" size="small"  @click="closethis" type="info">取消</el-button>
                <el-button size="small" type="success" @click="submit">确定</el-button>
            </div>
            </div>
            

        </div>
    </div>
</template>
<script>
export default {
    props:{
        id:Number
    },
    data(){
        return{
            name: '',
            phone: '',
            info:'',
            clPeloe:[]
        }
    },
    mounted(){
        this.getPeopleData()
    },
    methods:{
        getPeopleData(){
            let json = {

            }
            this.$http.post(`${process.env.VUE_APP_4_URL}/user/simple-list`,json,{
                headers:{
                    'shomes-user': 5
                }
            }).then(res =>{
                
            })
        },
        closethis(){
            this.$emit('closethis')
        },
        submit(){
            const _this = this
            console.log('提交')
            let json = {
                deal_remark: this.info,
                deal_status: 2,
                id: this.id
            }
            this.$http.post(`${process.env.VUE_APP_4_URL}/device-alarm/deal`,json,{
                headers:{
                    'shomes-user': 5
                }
            }).then(res =>{
                _this.$message.success('操作成功！')
                _this.$emit('closethis')
            })
        }
    }
}
</script>
<style lang="less" scoped>
.fierError{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2300;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content{
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .item{
            span{
                display: inline-block;
                min-width: 100px;
            }
                        
            .element.style{
                z-index: 999999999999!important;
            }
        }
    }
    .confirm{
    width: 400px;
    height: 200px;
    background: #fff;
    box-shadow: 0px 0px 12px 2px rgba(0, 0, 0, 0.21);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 3000;
    .con_title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align:center;
        font-weight: bold;
        color: #333333;
        letter-spacing: 1px;
    }
    .close{
        width: 20px;
        height: 20px;
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .item{
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: #333333;
        line-height: 24px;
        letter-spacing: 1px;

        label{
            min-width: 100px;
        }
    }
}
}

</style>