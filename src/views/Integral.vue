<template>
    <div class="router">
        <p>
            <a href="" class="a-link textcolor2">您当前的位置〉</a>
            <a href="" class="a-link textcolor2">商品管理〉</a>
            <a href="" class="a-link textcolor1">积分商品列表</a>
        </p>

        <!--
            添加积分商品按钮和搜索
        -->
        <div class="head" style="padding-top: 10px;height: 40px">
            <button @click="Jump()">添加商品</button>
            <img @click="drop()" src="../assets/shan.png">

            <div class="right">
                <p>
                    商品名称
                </p>
                <input type="text">
                <img src="../assets/soushuo.png" />
            </div>
        </div>

        <!--
　　　　　　　　商品列表
　　　　　　　　　　　　　-->

        <table cellpadding="0" cellspacing="0">
            <tr>
                <th width="60px"></th>
                <th style="font-size: 14px" width="420px" class="tableshopping">商品列表</th>
                <th style="font-size: 14px" width="200px">商品货号</th>
                <th style="font-size: 14px" width="100px">价格</th>
                <th style="font-size: 14px" width="100px">库存</th>
                <th style="font-size: 14px" width="100px">销量</th>
            </tr>
            <tr v-for="(tmp,index) in alldata">
                <td><input @click="f1(index)" type="checkbox" v-model="tmp.select"/></td>
                <td class="tableshopping"><img :src="'http://api.eawsp.com'+tmp.image_thumbnail">
                    <p style="margin-top: 15px">{{tmp.name}}</p>
                </td>
                <td>{{tmp.num}}</td>
                <td>{{tmp.integral}}</td>
                <td>{{tmp.stock}}</td>
                <td>{{tmp.sales}}</td>
            </tr>
        </table>
        <div class="fot">
            <input @click="f2()" v-model="allselect" type="checkbox"/>
            <span>全选</span>
        </div>
        <!--
            分页按钮
        -->
        <div class="paging">

            <img src="../assets/left.png" />

            <p style="color: #41BBEE;">1<span style="color: #333333;">/1</span></p>
            <img src="../assets/right.png" />
            <p>跳至</p>
            <input type="text"/>
            <p>页</p>
            <button>GO</button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Integral",
        data(){
            return {
                alldata: null,
                allselect: false,
                delid: []
            }
        },
        mounted(){
            this.$axios.get(`http://api.eawsp.com/api/integralGoods/list_integral_goods?token=${sessionStorage.getItem("token")}`).then((res) => {
                console.log(res);
                this.alldata = res.data.data.data;
                for (var i = 0; i < this.alldata.length; i ++) {
                    this.alldata[i].select = false;
                }
            })
        },
        methods: {
            drop(){
                this.delid = [];
                for (var i = 0; i < this.alldata.length; i ++) {
                    if (this.alldata[i].select == true) {
                        this.delid.push(this.alldata[i].id);
                    }
                }
                console.log(this.delid);
                this.$axios.post("http://api.eawsp.com/api/integralGoods/trashed_integral_goods?token="+sessionStorage.getItem("token"),{modify: this.delid}).then((res) => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$axios.get(`http://api.eawsp.com/api/integralGoods/list_integral_goods?token=${sessionStorage.getItem("token")}`).then((res) => {
                            console.log(res);
                            this.alldata = res.data.data.data;
                            for (var i = 0; i < this.alldata.length; i ++) {
                                this.alldata[i].select = false;
                            }
                        })
                    }
                })
            },
            Jump(){
                this.$router.push("/main/AI");
            },
            f2(){
                for (var i = 0; i < this.alldata.length; i ++) {
                    this.alldata[i].select = false;
                }
            },
            f1(index){
                if (this.alldata[index].select == true) {
                    this.alldata[index].select = false
                }
                else {
                    this.alldata[index].select = true;
                }
                var selected = 0;
                for (var i = 0; i < this.alldata.length; i ++) {
                    if (this.alldata[i].select == true) {
                        selected += 1;
                    }
                }
                if (selected == this.alldata.length) {
                    this.allselect = true
                }
                else {
                    this.allselect = false;
                }
                console.log(this.allselect);
            }
        },
        watch: {
            allselect: function () {
                if (this.allselect == true) {
                    for (var i = 0; i < this.alldata.length; i ++) {
                        this.alldata[i].select = true;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    body {
        margin: 0px auto;
        padding: 0px;
        font-family: "微软雅黑";
    }
    div {
        margin: 0px;
        padding: 0px;
    }

    .router {
        width: 980px;
        float: right;
    }




    /*面包导航样式*/
    .textcolor1 {
        color: #41bbee;
    }
    .textcolor2 {
        color: #333333;
    }
    .a-link {
        text-decoration: none;
    }


    /*表格样式*/
    .tableshopping {
        text-align: left;
    }


    /*分页信息样式*/

    .paging {
        margin: auto;
        width: 300px;
        height: 30px;
        padding-top: 20px;
        float: left;
        margin-left: 380px;
    }

    .paging input {
        margin: 0px auto;
        padding: 0px;
        width: 26px;
        height: 26px;
        text-align: center;
        float: left;
    }

    .paging p {
        padding: 0px;
        margin: 0px;
        width: 50px;
        height: 30px;
        float: left;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
    }

    .paging img {
        width: 30px;
        height: 30px;
        float: left;
    }

    .paging button {
        width: 40px;
        height: 24px;
        border: 1px solid #a9a9a9;
        background: #fff;
        text-align: center;
        line-height: 24px;
        padding: 0;
        float: left;
        margin-top: 3px
    }
    .router>P {
        font-size: 12px;
        width: 100%;
        line-height: 40px;
        border-bottom: 1px solid #e5e5e5;
    }



    button {
        width: 100px;
        height: 30px;
        float: left;
        border: 1px solid #bfbfbf;
        background: #f5f7f8;
        cursor: pointer;
    }
    /*添加、删除商品样式*/
    .head {
        width: 100%;
        height: 50px;
    }

    .head>img {
        float: left;
        margin-left: 10px;
    }


    /*搜索框样式*/
    .right {
        width: 265px;
        height: 30px;
        float: right;
    }

    .right>p {
        margin: 0PX auto;
        width: 80px;
        height: 28px;
        float: left;
        display: block;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #bfbfbf;
    }

    .right input {
        width: 150px;
        height: 28px;
        float: left;
        border: 1px solid #bfbfbf;
        padding: 0;
        border-left: none;
        border-right: none;
    }

    table {
        width: 100%;
        border: 1px solid #e5e5e5;
        border-collapse: collapse;
        border-bottom: none;
        text-align: center;
    }

    table th {
        height: 40px;
        font-size: 16px;
        font-weight: bold;
        background-color: #F5F7F8;
        border-bottom: 1px solid #F2F2F2;
        color: #333333;
    }

    table td {
        margin: 0px auto;
        padding: 0px;
        height: 69px;
        text-align: center;
        font-size: 14px;
        color: #333333;
    }

    table td img {
        display: block;
        height: 50px;
        width: 50px;
        float: left;
    }

    table tr td p {
        display: block;
        float: left;
        text-align: left;
        text-indent: 10px;
        width: 200px;
        /*background-color: yellow;*/
    }

    table input {
        display: block;
        width: 14px;
        height: 14px;
        float: left;
        margin-left: 23px;
    }

    /*全选按钮样式*/
    .fot {
        width: 978px;
        height: 40px;
        border: 1px solid #e5e5e5;
    }

    .fot input {
        padding: 0px;
        width: 14px;
        height: 14px;
        float: left;
        margin-top: 15px;
        margin-left: 23px;
    }

    .fot>span {
        display: block;
        width: 50px;
        float: left;
        font-size: 16px;
        line-height: 40px;
        margin-left: 23px;}
    .paging {
        margin: auto;
        width: 300px;
        height: 30px;
        padding-top: 20px;
        float: left;
        margin-left: 380px;
    }

</style>