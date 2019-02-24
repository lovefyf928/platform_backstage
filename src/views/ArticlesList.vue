<template>
    <div class="router">
        <p>
            <a href="" class="a-link textcolor2">您当前的位置〉</a>
            <a href="" class="a-link textcolor2">文章管理〉</a>
            <a href="" class="a-link textcolor1">文章列表</a>
        </p>

        <!--
            添加积分商品按钮和搜索
        -->
        <div class="head" style="padding-top: 10px;height: 40px">
            <div style="display: inline-block;margin-left: 24px">
                <input  @click="allselect()" v-model="allselected" style="float: left;margin-top: 10px" type="checkbox"/>
                <span style="float: left;margin-left: 10px;margin-right: 10px;margin-top: 5px">全选</span>
                <button @click="drop()" class="btn1" style="margin: 0;margin-right: 10px">删除</button>
                <img @click="Jump()" src="../assets/tjwz.png">
            </div>

            <div class="right" style="width: 414px">
                <select v-model="type" style="float: left;height: 30px;margin-right: 20px">
                    <option>全部分类</option>
                    <option>公告</option>
                    <option>政策</option>
                    <option>规则</option>
                    <option>社区</option>
                </select>
                <p>
                    文章名称
                </p>
                <input v-model="name" type="text">
                <img @click="f4()" src="../assets/soushuo.png" />
            </div>
        </div>

        <!--
　　　　　　　　商品列表
　　　　　　　　　　　　　-->

        <table cellpadding="0" cellspacing="0">
            <tr>
                <th width="60px"></th>
                <th style="font-size: 14px" width="140px" class="tableshopping">编号</th>
                <th style="font-size: 14px" width="340px">文章标题</th>
                <th style="font-size: 14px" width="100px">文章类型</th>
                <th style="font-size: 14px" width="300px">添加日期</th>
                <th style="font-size: 14px" width="100px">操作</th>
            </tr>
            <tr v-for="(tmp,index) in alldata" style="height: 42px">
                <td><input @click="fx(index)" v-model="tmp.isselected" type="checkbox"/></td>
                <td class="tableshopping">
                    <p>{{tmp.num}}</p>
                </td>
                <td>{{tmp.title}}</td>
                <td>{{tmp.type}}</td>
                <td>{{tmp.created_at}}</td>
                <td @click="enter(index)" style="color: #41bbee;cursor: pointer">编辑文章</td>
            </tr>
        </table>
        <div class="fot">
            <input @click="allselect()" v-model="allselected" type="checkbox"/>
            <span>全选</span>
            <button class="btn1" @click="drop()">删除</button>
        </div>
        <!--
            分页按钮
        -->
        <div class="paging" v-if="adata">

            <img @click="f1()" src="../assets/left.png" />

            <p style="color: #41BBEE;">{{adata.current_page}}<span style="color: #333333;">/{{adata.last_page}}</span></p>
            <img @click="f2()" src="../assets/right.png" />
            <p>跳至</p>
            <input v-model="page" type="text" />
            <p>页</p>
            <button>GO</button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticlesList",
        data(){
            return {
                arr: [],
                alldata: null,
                page: 1,
                adata: null,
                type: "全部分类",
                name: "",
                allselected: false
            }
        },
        mounted(){
            this.$axios.post("http://api.eawsp.com/api/index/get_all?token="+sessionStorage.getItem("token"),{
                page: this.page
            }).then((res) => {
                console.log(res);
                this.adata = res.data.data;
                var x = this.page * 10;
                for (var i = x - 9; i <= x; i ++) {
                    this.arr.push(i);
                }
                for (var i = 0; i < res.data.data.data.length; i ++) {
                    res.data.data.data[i].num = this.arr[i];
                }
                this.alldata = res.data.data.data;
                console.log(this.alldata);
            });
        },
        methods: {
            enter(index){
                this.$root.id = this.alldata[index].id;
                this.$router.push("/main/AA");
            },
            drop(){
                var arr = [];
                for (var i = 0; i < this.alldata.length; i ++) {
                    if (this.alldata[i].isselected == true) {
                        arr.push(this.alldata[i].id);
                    }
                }
                if (arr.length == 0) {
                    this.$alert('请选择要删除的文章', '提示', {
                        confirmButtonText: '确定',
                    });
                }
                else {
                    console.log(arr);
                    this.$axios.post("http://api.eawsp.com/api/index/del?token="+sessionStorage.getItem("token"),{id: arr}).then((res) => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.$alert('删除成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.allselected = false;
                                    this.$axios.post("http://api.eawsp.com/api/index/get_all?token="+sessionStorage.getItem("token"),{
                                        page: this.page
                                    }).then((res) => {
                                        console.log(res);
                                        this.adata = res.data.data;
                                        var x = this.page * 10;
                                        for (var i = x - 9; i <= x; i ++) {
                                            this.arr.push(i);
                                        }
                                        for (var i = 0; i < res.data.data.data.length; i ++) {
                                            res.data.data.data[i].num = this.arr[i];
                                        }
                                        this.alldata = res.data.data.data;
                                        console.log(this.alldata);
                                    });
                                }
                            });
                        }
                    })
                }
            },
            fx(index){
                if (this.alldata[index].isselected == true) {
                    this.alldata[index].isselected = false;
                }
                else {
                    this.alldata[index].isselected = true;
                }
                console.log(this.alldata);
                var x = 0;
                for (var i = 0; i < this.alldata.length; i ++) {
                    if (this.alldata[i].isselected === true) {
                        x = x + 1;
                        // console.log(this.alldata[i].isselected);
                    }
                    // if (this.alldata[i].isselected == false) {
                    //     console.log(1);
                    // }
                }
                console.log(x);
                if (x == this.alldata.length) {
                    this.allselected = true;
                }
                else {
                    this.allselected = false;
                }
            },
            allselect(){
                if (this.allselected == false) {
                    this.allselected = true
                }
                else {
                    this.allselected = false;
                }
                if (this.allselected == false) {
                    for (var i = 0; i < this.alldata.length; i++) {
                        this.alldata[i].isselected = false;
                    }
                }
                else {
                    for (var i = 0; i < this.alldata.length; i++) {
                        this.alldata[i].isselected = true;
                    }
                }
            },
            Jump(){
                this.$router.push("/main/AA");
            },
            f1(){
                if (this.page > 1) {
                    this.page--;
                }
            },
            f2(){
                if (this.page < this.adata.last_page) {
                    this.page ++;
                }
            },
            f4(){
                if (this.type == "公告") {
                    this.type = "1";
                }
                else if (this.type == "政策") {
                    this.type = "2";
                }
                else if (this.type == "规则") {
                    this.type = "3";
                }
                else if (this.type == "社区") {
                    this.type = "4";
                }
                this.$axios.post("http://api.eawsp.com/api/index/get_all?token="+sessionStorage.getItem("token"),{
                    page: this.page,
                    type: this.type,
                    title: this.name
                }).then((res) => {
                    console.log(res);
                    this.adata = res.data.data;
                    var x = this.page * 10;
                    for (var i = x - 9; i <= x; i ++) {
                        this.arr.push(i);
                    }
                    for (var i = 0; i < res.data.data.data.length; i ++) {
                        res.data.data.data[i].num = this.arr[i];
                        res.data.data.data[i].isselected = false;
                    }
                    this.alldata = res.data.data.data;
                    console.log(this.alldata);
                });
                if (this.type == "1") {
                    this.type = "公告";
                }
                else if (this.type == "2") {
                    this.type = "政策";
                }
                else if (this.type == "3") {
                    this.type = "规则";
                }
                else if (this.type == "4") {
                    this.type = "社区";
                }
            }
        },
        watch: {
            page: function () {
                this.$axios.post("http://api.eawsp.com/api/index/get_all?token="+sessionStorage.getItem("token"),{
                    page: this.page,
                }).then((res) => {
                    this.arr = [];
                    console.log(res);
                    this.adata = res.data.data;
                    var x = res.data.data.current_page * 10;
                    for (var i = x - 9; i <= x; i ++) {
                        this.arr.push(i);
                    }
                    for (var i = 0; i < res.data.data.data.length; i ++) {
                        res.data.data.data[i].num = this.arr[i];
                        res.data.data.data[i].isselected = false;
                    }
                    this.alldata = res.data.data.data;
                    console.log(this.alldata);
                });
            }
        }
    }
</script>

<style scoped>
    .btn5{
        width: 24px;
        height: 24px;
        margin-top: 8px;
        margin-right: 10px;
    }
    .btn4{
        float: right;
        width: 50px;
        height: 24px;
        margin-top: 8px;
        margin-right: 10px;
    }
    .btn3{
        float: right;
        width: 40px;
        height: 24px;
        margin-top: 8px;
        margin-right: 10px;
    }
    .btn2{
        width: 30px;
        height: 24px;
        margin-top: 8px;
        margin-right: 8px;
        margin-left: 10px;
    }
    .btn2,.jumpto,.num{
        float: right!important;
    }
    .num{
        width: 24px!important;
        height: 24px!important;
        margin: 0!important;
        margin-top: 5px!important;
        margin-left: 10px!important;
        margin-right: 5px!important;
    }
    .btn1{
        width: 50px;
        height: 30px;
        border: 1px solid #cccdcd;
        background: #f5f7f8;
        margin-top: 5px;
    }
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