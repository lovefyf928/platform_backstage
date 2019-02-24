<template>
    <div style="width: 980px">
        <p style="width: 100%;border-bottom: 1px solid #e5e5e5;font-size: 12px;line-height: 40px">您当前的位置>展位设置>
            <span style="color: rgb(65,187,238);">楼层广告</span>
        </p>
        <div style="margin-top: 15px;background: #ffffff;padding-top: 49px;padding-bottom: 45px">
            <div class="son">
                <div class="box">
                    <p>商品货号</p>
                    <input v-model="pnum" type="text" placeholder="请输入"/>
                    <button @click="f2()">搜索</button>
                </div>
            </div>
            <table class="tb">
                <tr style="font-weight: bold;font-size: 14px" align="center">
                    <td width="503" height="40">商品列表</td>
                    <td width="295" height="40">商品货号</td>
                    <td width="60" height="40">价格</td>
                    <td width="60" height="40">库存</td>
                    <td width="60" height="40">操作</td>
                </tr>
                <tr v-for="(tmp,index) in alldata" align="center" class="dd">
                    <td>
                        <img width="40" height="40" :src="'http://api.eawsp.com'+tmp.image_thumbnail" style="float: left">
                        <p style="width: 200px;height: 40px;float: left;text-align: left;line-height: 40px;text-indent: 5px">{{tmp.name}}</p>
                    </td>
                    <td>
                        {{tmp.num}}
                    </td>
                    <td>
                        {{tmp.shop_price}}
                    </td>
                    <td>
                        {{tmp.stock}}
                    </td>
                    <td>
                        <span @click="update(index)" href="#" style="color: #41bbee">上传</span>
                    </td>
                </tr>
            </table>
            <div class="footer" v-if="alldata1">
                <img @click="pageadd()" width="30" height="30" src="../assets/jt.png">
                <p><span style="color: #41bbee;text-indent: 10px">{{alldata1.current_page}}</span><span style="color: #000000">/{{alldata1.last_page}}</span></p>
                <img @click="pagereduce()" width="30" height="30" src="../assets/jt2.png"/>
                <p>跳至</p>
                <input v-model="pno" type="text"/>
                <p>页</p>
                <button @click="f1()">GO</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddFloor",
        data(){
            return {
                alldata1: null,
                alldata: null,
                pno: 1,
                pnum: ""
            }
        },
        mounted(){
            this.$axios.get("http://api.eawsp.com/api/index/getComlList?page=1&token="+sessionStorage.getItem("token")).then((res) => {
                this.alldata = res.data.data.data;
                // console.log(this.alldata);
                this.alldata1 = res.data.data;
                console.log(this.alldata1);
                this.pno = this.alldata1.current_page
            });
        },
        methods: {
            update(index){
                if (this.$root.ishotad != true) {
                    var sort = this.$root.JumpIndex + 1;
                    console.log(sort);
                    console.log(this.alldata[index].id);
                    this.$axios.post("http://api.eawsp.com/api/index/addAdverStore?token=" + sessionStorage.getItem("token"), {
                        goods_id: this.alldata[index].id,
                        sort: JSON.stringify(sort),
                        floor: this.$root.select1 + this.$root.select2
                    }).then((res) => {
                        if (res.data.code == 0) {
                            this.$alert('上传成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push("/main/FloorAD");
                                }
                            });
                        }
                    })
                }
                else {
                    var sort = this.$root.hotadindex;
                    console.log(sort);
                    console.log(this.alldata[index].id);
                    this.$axios.post("http://api.eawsp.com/api/index/addAdverStore?token=" + sessionStorage.getItem("token"), {
                        goods_id: this.alldata[index].id,
                        sort: JSON.stringify(sort),
                        floor: this.$root.hotadval
                    }).then((res) => {
                        if (res.data.code == 0) {
                            this.$alert('上传成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push("/main/HotAD");
                                }
                            });
                        }
                    })
                }
            },
            pageadd(){
                if (this.pno > 1) {
                    this.pno -= 1;
                    this.$axios.get(`http://api.eawsp.com/api/index/getComlList?page=${this.pno}&token=${sessionStorage.getItem("token")}`).then((res) => {
                        this.alldata = res.data.data.data;
                        // console.log(this.alldata);
                        this.alldata1 = res.data.data;
                        console.log(this.alldata1);
                        this.pno = this.alldata1.current_page
                    })
                }
            },
            pagereduce(){
                if (this.pno < this.alldata1.last_page) {
                    this.pno += 1
                    this.$axios.get(`http://api.eawsp.com/api/index/getComlList?page=${this.pno}&token=${sessionStorage.getItem("token")}`).then((res) => {
                        this.alldata = res.data.data.data;
                        // console.log(this.alldata);
                        this.alldata1 = res.data.data;
                        console.log(this.alldata1);
                        this.pno = this.alldata1.current_page
                    })
                }
            },
            f1(){
                this.$axios.get(`http://api.eawsp.com/api/index/getComlList?page=${this.pno}&token=${sessionStorage.getItem("token")}`).then((res) => {
                    this.alldata = res.data.data.data;
                    // console.log(this.alldata);
                    this.alldata1 = res.data.data;
                    console.log(this.alldata1);
                    this.pno = this.alldata1.current_page
                })
            },
            f2(){
                this.$axios.get(`http://api.eawsp.com/api/index/getComlList?num=${this.pnum}&token=${sessionStorage.getItem("token")}`).then((res) => {
                    this.alldata = res.data.data.data;
                    // console.log(this.alldata);
                    this.alldata1 = res.data.data;
                    console.log(this.alldata1);
                    this.pno = this.alldata1.current_page
                })
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
    .son{
        background: #ffffff;
    }
    .box p{
        display: inline-block;
        font-size: 16px;
        margin-left: 180px;
        width: 200px;
        height: 35px;
        text-align: right;
    }
    .box{
    }
    .box input,button{
        margin-left: 20px;
    }
    .box input{
        width: 200px;
        height: 28px;
        border: 1px solid #999;
    }
    .box button{
        width: 50px;
        height: 30px;
        background: #fff;
        border: 1px solid #999;
    }
    .footer{
        width: 300px;
        height: 30px;
        margin-top: 50px;
        margin-left: 350px;
        line-height: 30px;
        alignment-baseline: baseline;
    }
    .footer *{
        display: inline-block;
        float: left;
    }
    .footer input{
        width: 26px;
        height: 26px;
    }
    .footer button{
        width: 40px;
        height: 24px;
        background: #ffffff;
        border: 1px solid #a9a9a9;
    }
    .footer p{
        width: 50px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        text-align: center;
    }
    .footer button{
        margin-left: 0;
        margin-top: 3px;
    }
    .dd td{
        border-top: 1px solid #e5e5e5;
    }
    .tb{
        border-top: 1px solid #e5e5e5;
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
    }
</style>