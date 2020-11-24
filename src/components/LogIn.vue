<template>
    <div class="login">
        <div class="showBox">
            <div class="itemBox left">
                <img class="logo" src="../assets/newver/logo@2x.png" alt="">
            </div>
            <div class="itemBox right">
                <div class="floatBox-login">
                    <div class="title">
                        欢迎使用
                    </div>
                    <el-input
                        class="item"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-user-solid"
                        v-model="account">
                    </el-input>
                    <el-input
                     class="item"
                        placeholder="请输入内容"
                        prefix-icon="el-icon-s-finance"
                        type="password"
                        v-model="password">
                    </el-input>
                    <el-select  class="item" v-model="terType" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="foregetpassword">
                        <span>忘记密码</span>
                    </div>
                    <el-button class="btn" @click="loginClick" type="primary">登录</el-button>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            account: 'admin', // 账号
            password: '123456', // 密码
            terType: '',
            options:[
                {
                    value: 'districtcounty',
                    label: '区县端'
                },
                {
                    value: 'street',
                    label: '街道端'
                },
                {
                    value: 'interval',
                    label: '社区端'
                },
                {
                    value: 'community',
                    label: '小区端'
                }
            ]
        }
    },
    methods:{
        loginClick(){
            if(!this.account) return this.$message.warning('请输入账号!')
            if(!this.password) return this.$message.warning('请输入密码!')
            if(!this.terType) return this.$message.warning('请选择终端!')
            localStorage.setItem('terminal', this.terType)
            if(this.terType == 'community'){
                this.$router.push({name: 'pelopePageX'}) // 版本2 小区端
            }else if(this.terType == 'interval'){
                this.$router.push({name: 'pelopePageS'}) // 版本2 社区端
            }else if(this.terType == 'street'){
                this.$router.push({name: 'streePageJ'}) // 版本2 街道端
            }else if(this.terType == 'districtcounty'){
                this.$router.push({name: 'districtCounty'}) // 版本2 区县端
            }
            localStorage.setItem('user', this.account)
        }
    }
}
</script>
<style lang="less">
.login{
    width: 100%;
    height: 100%;
    background-image: url("../assets/newver/beijing@2x.webp");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .showBox{
        width: 960px;
        height: 498px;
        display: flex;
        // background-color: pink;
        .itemBox{
            width: 50%;
            height: 100%;
            .logo{
                width: 105px;
                height: 152px;
            }
        }
        .itemBox.left{
            background: rgba(255, 255, 255, 0.43);
            backdrop-filter: blur(10px);
            border-radius: 10px 0px 0px 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .itemBox.right{
            background: #FFFFFF;
            border-radius: 0px 10px 10px 0px;
            .floatBox-login{
                width: 100%;
                height: 100%;
                // background-color: pink;
                // background: rgba(255, 255, 255, 0.54);
                border-radius: 10px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 70px;
                .item{
                    margin-bottom: 20px;
                }
                .title{
                    width: 100%;
                    text-align: center;
                    font-size: 26px;
                    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                    font-weight: bold;
                    color: #0075FF;
                    margin-bottom: 30px;
                }
                .foregetpassword{
                    text-align: right;
                    font-size: 12px;
                    font-family: MicrosoftYaHei;
                    color: #FFFFFF;
                    line-height: 16px;
                }
                .btn{
                    margin-top: 10px;
                }
                .el-input__inner{
                    background-color: #f7f7f7!important;
                    color: #666666!important;
                }
            }   
        }
    }




    
}
</style>