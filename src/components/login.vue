<template>
    <div class="login main">
        <!--主内容-->
        <div class="article">
            <div class="login_box">
                <p>优智优品商城</p>
                <div id="form">
                    <form action="#" method="get">
                        <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                            <tr>
                                <td><label for=""><img src="../assets/user.png"/></label></td>
                                <td><input type="text" style="width: 90%" name="" id="card" v-model="num" placeholder="请输入工号"/></td>
                            </tr>
                        </table>
                        <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                            <tr>
                                <td><label for=""><img src="../assets/pwd.png"/></label></td>
                                <td><input type="password" style="width: 90%" name="" id="password" v-model="password" placeholder="请输入登录密码"/></td>
                            </tr>
                        </table>

                        <table border="0" cellspacing="0" cellpadding="0" id="tab">
                            <tr>
                                <td><input type="text" id="t1" v-model="yzm" placeholder="请输入验证码" style="text-indent: 0.5em;"/></td>
                                <img @click="f1()" id="discode" :src="tp"  alt="">
                            </tr>
                        </table>
                        <table border="0" cellspacing="0" cellpadding="0" style="border: 0;">
                            <tr style="height: 20px;">
                                <!--<td style="float: left;"><input type="checkbox" name="" id="" value="" />自动登录</td>-->

                                <!--<td style="text-align: center;"><a class="for_card" href="http://www.eawsp.com/jihuo/jihuo.html">激活信用卡</a></td>-->

                                <td style="float: right;"><a class="for_card" href="#">忘记密码</a></td>
                            </tr>
                        </table>
                        <button @click.prevent="login">立即登录</button>
                        <!--<dd><router-link to="/whole" tag="a">欢迎页</router-link></dd>-->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                num: "",
                yzm: "",
                password: "",
                tp: null
            }
        },
        mounted(){
            this.$axios("http://api.eawsp.com/api/code/captcha/create/1321564").then((res) => {
                console.log(res);
                this.tp = res.data.data.captcha;
                this.token = res.data.data.captcha_token;
            })
        },
        methods: {
            f1(){
                this.$axios("http://api.eawsp.com/api/code/captcha/create/1321564").then((res) => {
                    console.log(res);
                    this.tp = res.data.data.captcha;
                    this.token = res.data.data.captcha_token;
                })
            },
            login(){
                if (this.num != "" && this.yzm != "" && this.password != "") {
                    this.$axios.post("http://api.eawsp.com/api/login",{username: this.num,password: this.password,captcha: this.yzm,captcha_token: this.token}).then((res) => {
                        console.log(res);
                        if (res.data.code == 0) {
                            sessionStorage.setItem("token",res.data.data.token);
                            sessionStorage.setItem("uid",res.data.data.data.id);
                            this.$router.push("/main/ADSetting");
                        }
                        else if (res.data.code == 20003) {
                            this.$alert("该用户不存在或密码错误", '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                        else if (res.data.code == 20002) {
                            this.$alert("验证码过期", '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                        else {
                            this.$alert(res.data.massage, '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                    })
                }
                else {
                    this.$alert('请检查工号或密码或验证码', '提示', {
                        confirmButtonText: '确定',
                    });
                }
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        list-style: none;
        font-family: "Microsoft YaHei";
        color: #333333;
    }
    a{
        text-decoration: none;  
    }
    .login{
        width: 100%;
        height: 100%;
        overflow: hidden;
        /*float: left;*/
    }
    .main{
        width: 100%;
        height: 100%;
        background:url("../assets/pingtaidenglubanner.555455e.jpg") no-repeat 0px 0px!important;
        background-size: 100% 100%;
        /*overflow: hidden;*/
    }
    .son{
        width: 400px;
        height: 454px;
        background-color: #ffffff;
        float: right;
        margin-top: 8%;
        margin-right: 14%;
    }
    .sonHeader{
        width: 100%;
        margin: 36px 0;
        text-align: center;
        font-size: 20px;
        color: #41bbee;
    }
    .nav{
        width: 100%;
        height: 90px;
        overflow: hidden;
    }
    .nav h3{
        width: 80%;
        height: 30px;
        margin: 25px auto;

    }
    .nav h3>img{
        width: 154px;
        height: 30px;
    }
    #login{
        background-color: rgb(246,246,246);
    }
    /*中部*/
    .article{
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0 auto;
        position: relative;
    }
    .article>img{
        top: 150px;
        position: absolute;
    }
    .article>p{
        width: 40%;
        height: 25%;
        float: left;
        margin-left:14%;
        margin-top: 6%;
    }
    .login_box{
        width: 400px;
        height: 454px;
        position: absolute;
        top: 16%;
        right: 14%;
        background-color: #ffffff;
    }

    .login_box p{
        width: 100%;
        margin: 36px 0;
        text-align: center;
        font-family: "微软雅黑";
        font-size: 20px;
        color: #41bbee;
    }

    table{
        width: 355px;
        margin: 0 auto;
        border: 2px solid #c8e3fa;
    }
    #tab{
        margin: 23px;
        width: 216px;
        border: none;
    }
    #tab tr>td>input{
        width: 216px;
        height: 50px;
        border: 2px solid #c8e3fa;
        float: left;
    }
    #discode{
        width: 120px;
        height: 54px;
        float: right;
        /*margin-top: 2px;*/
        margin-right: 24px;
        line-height: 50px;
        display: inline-block;
        text-align: center;
    }
    tr{
        width: 355px;
        height: 50px;
        text-indent:1em;
    }

    input{
        font-size: 14px;
        font-family: "微软雅黑";
        color: #999999;
        border: 0px;
        outline:none;
        cursor: pointer
    }
    button{
        display: block;
        width: 355px;
        height: 50px;
        margin: 40px auto 0;
        border: 0;
        color: #ffffff;
        font-size: 20px;
        background-color: #41BBEE;
    }

    .for_card{
        text-decoration: none;
        color: #41BBEE;
    }
    .for_card:hover{
        text-decoration: underline;
    }


    /*底部*/
    .footer{
        width: 100%;
        margin:86px auto 0;
    }

    .footer #ftConw{
        font-size: 14px;
        font-family: 微软雅黑;
        color: #666666;
    }
    .footer #ftConw #lh{
        margin-top: 10px;
        text-align: center;
    }
    .footer #ftConw .cp{
        margin: 5px 0 10px;
        text-align: center;
    }
    .footer #ftConw .color a{
        color: #0000ff;
    }
    .footer #ftConw a{
        margin: 0 7px;
        display: inline-block;
        text-decoration: none;
        color: #666666;
    }
    .footer #ftConw a:hover{
        text-decoration:underline;
    }

    .footer #ftConw{
        width: 80%;
        margin: 0 auto;
        font-size: 14px;
        font-family: 微软雅黑;
        color: #666666;
    }
    .footer #ftConw #lh{
        margin-top: 10px;
        text-align: center;
    }
    .footer #ftConw .cp{
        margin:10px 0 10px;
        text-align: center;
    }
    .footer #ftConw a{
        margin: 0 7px;
        display: inline-block;
        text-decoration: none;
        color: #666666;
    }
    .footer #ftConw a:hover{
        text-decoration:underline;
    }
</style>