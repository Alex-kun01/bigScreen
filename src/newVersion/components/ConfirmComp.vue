<template>
<!-- 确认查看密码组件 -->
    <div class="confirm">
        <div class="con_title">调用授权</div>
        <img src="../../assets/images/close.png" alt="" @click="closethis" class="close">
        <div class="content">
            <div class="inputBox"><input @keydown="keyClick" name="input1" v-model="passwordObj.inputVal1" ref="input1" maxlength='1' @input="inputChange" type="password"></div>
            <div class="inputBox"><input @keydown="keyClick" name="input2" v-model="passwordObj.inputVal2" ref="input2" maxlength='1' @input="inputChange" type="password"></div>
            <div class="inputBox"><input @keydown="keyClick" name="input3" v-model="passwordObj.inputVal3" ref="input3" maxlength='1' @input="inputChange" type="password"></div>
            <div class="inputBox"><input @keydown="keyClick" name="input4" v-model="passwordObj.inputVal4" ref="input4" maxlength='1' @input="inputChange" type="password"></div>
            <div class="inputBox"><input @keydown="keyClick" name="input5" v-model="passwordObj.inputVal5" ref="input5" maxlength='1' @input="inputChange" type="password"></div>
            <div class="inputBox"><input @keydown="keyClick" name="input6" v-model="passwordObj.inputVal6" ref="input6" maxlength='1' @input="inputChange" type="password"></div>
        </div>

    </div>
</template>
<script>
export default {
    props:{
        
    },
    data(){
        return{
            inputObj: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: '',
            },
            passwordObj:{
                inputVal1: '',
                inputVal2: '',
                inputVal3: '',
                inputVal4: '',
                inputVal5: '',
                inputVal6: '',
            },
            password: '666666', // 默认密码
        }
    },
    mounted(){
        this.inputObj.input1 = this.$refs.input1
        this.inputObj.input2 = this.$refs.input2
        this.inputObj.input3 = this.$refs.input3
        this.inputObj.input4 = this.$refs.input4
        this.inputObj.input5 = this.$refs.input5
        this.inputObj.input6 = this.$refs.input6
        this.inputObj.input1.focus()
    },
    methods:{
        keyClick(e){
            console.log('键盘事件', e);
            const key = e.key;
            const name = e.target.name;
            console.log('key', key);
            if(key == 'Backspace'){
                setTimeout(() =>{
                    this.inputObj[name].focus()
                },1)
            }
        },
        inputChange(e){
            const name = e.target.name;
            const values = Object.values(this.passwordObj).join('');
            const firstName = name.slice(0,5) + (+name.slice(5,6)+1);
            console.log('eeee',firstName);
            if(firstName != 'input7'){
                this.inputObj[firstName].focus()
            }else{
                console.log(values);
                if(values == this.password){
                    this.$emit('isConfrim', true)
                    this.$emit('closethis')
                }else{
                    this.$message.warning('密码错误，请重新输入！')
                    this.passwordObj.inputVal1 = ''
                    this.passwordObj.inputVal2 = ''
                    this.passwordObj.inputVal3 = ''
                    this.passwordObj.inputVal4 = ''
                    this.passwordObj.inputVal5 = ''
                    this.passwordObj.inputVal6 = ''
                    this.inputObj.input1.focus();
                }
            }
        },
        closethis(){
            this.$emit('closethis')
        },
    }
}
</script>
<style lang="less" scoped>
.confirm{
    width: 520px;
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
    .content{
        width: 100%;
        height: 50px;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        margin-top: 100px;
        .inputBox{
            width: 50px;
            height: 50px;
            background: yellowgreen;
            input{
                width: 100%;
                height: 100%;
                text-indent: 20px;
            }
        }
    }
}
</style>