<template>
    <div style="width: 200px">
        <ul style="background: #ffffff;cursor: pointer">
            <li @click="f1()" style="font-size: 14px;color: #666">
                <img src="../assets/sp.png">商品管理<img v-if="jjdis" class="jt" src="../assets/jty.png"><img v-if="jtdis" class="jt" src="../assets/jtx.png">
                <ul v-show="isdis">
                    <li @click.stop="f3()" class="sonli">商品审批</li>
                    <li @click.stop="f4()" class="sonli">积分商品</li>
                </ul>
            </li>
            <li @click="f2()" style="font-size: 14px;color: #666">
                <img src="../assets/zw.png">展位设置<img v-if="jj1dis" class="jt" src="../assets/jty.png"><img v-if="jt1dis" class="jt" src="../assets/jtx.png">
                <ul v-show="isdis1">
                    <li @click.stop="f5()" class="sonli">广告位设置</li>
                    <li @click.stop="f6()" class="sonli">热门店铺</li>
                    <li @click.stop="f7()" class="sonli">楼层广告</li>
                    <li @click.stop="f8()" class="sonli">精选店铺</li>
                    <li @click.stop="f9()" class="sonli">热销广告</li>
                </ul>
            </li>
            <li @click="f12()" style="font-size: 14px;color: #666">
                <img src="../assets/wzgl.png">文章管理<img v-if="jj2dis" class="jt" src="../assets/jty.png"><img v-if="jt2dis" class="jt" src="../assets/jtx.png">
                <ul v-show="isdis2">
                    <li @click.stop="f13()" class="sonli">文章列表</li>
                </ul>
            </li>
            <li @click.stop="f10()" style="font-size: 14px;color: #666">
                <img src="../assets/xyk.png">信用卡审批<img class="jt" src="../assets/jty.png">
            </li>
            <li @click.stop="f11()" style="font-size: 14px;color: #666">
                <img src="../assets/rzs.png">入驻商审批<img class="jt" src="../assets/jty.png">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "side",
        data(){
            return {
                isdis: false,
                isdis1: false,
                jtdis: false,
                jt1dis: false,
                jjdis: true,
                jj1dis: true,
                isdis2: false,
                jj2dis: true,
                jt2dis: false,
            }
        },
        methods: {
            f12(){
                this.isdis2 = !this.isdis2;
                this.jt2dis = !this.jt2dis;
                this.jj2dis = !this.jj2dis
            },
            f1(){
                this.isdis = !this.isdis;
                this.jtdis = !this.jtdis;
                this.jjdis = !this.jjdis
            },
            f2(){
                this.isdis1 = !this.isdis1;
                this.jt1dis = !this.jt1dis;
                this.jj1dis = !this.jj1dis
            },
            f3(){
                this.$router.push("/main/comm");
            },
            f4(){
                this.$router.push("/main/in");
            },
            f5(){
                this.$router.push("/main/ADSetting");
            },
            f6(){
                this.$router.push("/main/HotShop");
            },
            f7(){
                this.$router.push("/main/FloorAD");
            },
            f8(){
                this.$router.push("/main/SelectShop");
            },
            f9(){
                this.$router.push("/main/HotAD");
            },
            f10(){
                window.location.href = "http://www.eawsp.com/kpht/all_msg.html"
            },
            f11(){
                window.location.href = "http://www.eawsp.com/shht/all_msg.html"
            },
            f13(){
                this.$router.push("/main/AL");
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        text-decoration: none;
    }
    .jt{
        float: right;
        margin-top: 14px;
        margin-right: 10px;
    }
    ul li{
        line-height: 40px;
        color: #666;
    }
    ul li img{
        display: block;
        float: left;
    }
    .sonli{
        background: #edeaea;
        font-size: 12px;
        text-indent: 45px;
    }
</style>