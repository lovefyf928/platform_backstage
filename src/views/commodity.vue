<template>
    <div class="router">
        <p style="height: 41px;line-height: 41px">
            <a style="font-size: 12px" href="" class="a-link textcolor2">您当前的位置〉</a>
            <a style="font-size: 12px" href="" class="a-link textcolor2">商品管理〉</a>
            <a style="font-size: 12px" href="" class="a-link textcolor1">商品审核</a>
        </p>
        <!--<hr>-->
        <div class="center">
            <table style="border-top: 1px solid #cccccc;border-left: 1px solid #cccccc;border-right: 1px solid #cccccc;" cellpadding="0" cellspacing="0">
                <tr>
                    <th style="font-size: 14px;text-align: left" width="242px">商品列表</th>
                    <th style="font-size: 14px;text-align: center" width="343px">商品货号</th>
                    <th style="font-size: 14px;text-align: center" width="183px">分类</th>
                    <th style="font-size: 14px;text-align: center" width="70px">价格</th>
                    <th style="font-size: 14px;text-align: center" width="70px">库存</th>
                    <th style="font-size: 14px;text-align: center" width="70px">操作</th>
                </tr>
                <tr v-for="(tmp,index) in alldata">
                    <td style="text-indent:5px;background: #ffffff;font-size: 12px;border-top: 1px solid #cccccc"><img style="float: left" width="40" height="40" :src="'http://api.eawsp.com'+tmp.image_thumbnail">
                        <p style="float: left;margin-top: 10px">{{tmp.name}}</p>
                    </td>
                    <td style="text-indent:5px;font-size: 12px;text-align: center; background: #ffffff; border-top: 1px solid #cccccc">{{tmp.num}}</td>
                    <td style="text-indent:5px;font-size: 12px;text-align: center; background: #ffffff; border-top: 1px solid #cccccc">{{tmp.goods_ptype_name}}>{{tmp.goods_type_name}}</td>
                    <td style="text-indent:5px;font-size: 12px;text-align: center; background: #ffffff; border-top: 1px solid #cccccc">{{tmp.shop_price}}</td>
                    <td style="text-indent:5px;font-size: 12px;text-align: center; background: #ffffff; border-top: 1px solid #cccccc">{{tmp.stock}}</td>
                    <td style="text-indent:5px;font-size: 12px;text-align: center; background: #ffffff; border-top: 1px solid #cccccc;color: #41bbee;cursor: pointer" @click="Jump(index)">查看</td>
                </tr>
            </table>
        </div>
        <!--
            分页按钮
        -->
        <div class="paging">

            <img @click="f1()" src="../assets/left.png" />

            <p style="color: #41BBEE;">{{pno}}<span style="color: #333333;">/{{last_page}}</span></p>
            <img @click="f2()" src="../assets/right.png" />
            <p>跳至</p>
            <input v-model="pno" type="text" />
            <p>页</p>
            <button>GO</button>

        </div>
    </div>
</template>

<script>
    export default {
        name: "commodity",
        data(){
            return {
                pno: 1,
                last_page: null,
                alldata: null
            }
        },
        mounted(){
            this.$axios.get("http://api.eawsp.com/api/commoditys/audit_show?token="+sessionStorage.getItem("token")+"&page=1").then((res) => {
                console.log(res);
                this.last_page = res.data.data.last_page;
                this.alldata = res.data.data.data;
                console.log(this.alldata);
            })
        },
        methods: {
            Jump(index){
                this.$root.indexx = this.alldata[index].id;
                this.$router.push("/main/detail");
            },
            f1() {
                if (this.pno > 1) {
                    this.pno --;
                }
            },
            f2() {
                if (this.pno < this.last_page) {
                    this.pno ++;
                }
            }
        },
        watch: {
            pno: function () {
                this.$axios.get("http://api.eawsp.com/api/commoditys/audit_show?token="+sessionStorage.getItem("token")+"&page="+this.pno).then((res) => {
                    console.log(res);
                    this.last_page = res.data.data.last_page;
                    this.alldata = res.data.data.data;
                })
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
    .center {
        width: 980px;
        height: 100%;
    }

    .center th {
        font-weight: bold;
        background-color: #f2f2f2;
        height: 40px;
        text-align: center;
        font-size: 16px;
    }

    table {
    }
</style>