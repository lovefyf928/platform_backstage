<template>
    <div style="width: 980px">
        <p style="width: 100%;border-bottom: 1px solid #e5e5e5;font-size: 12px;line-height: 40px">您当前的位置>展位设置>
            <span style="color: rgb(65,187,238);">精选店铺</span>
        </p>
        <div style="margin-top: 15px;background: #ffffff;padding-top: 49px;padding-bottom: 40px">
            <div class="son">
                <div class="box">
                    <p>商家名称</p>
                    <input type="text" placeholder="请输入"/>
                    <button>搜索</button>
                </div>
            </div>
            <table class="tb">
                <tr style="font-weight: bold;font-size: 14px" align="center">
                    <td width="282" height="40">商家列表</td>
                    <td width="277" height="40">店铺分类</td>
                    <td width="278" height="40">店铺等级</td>
                    <td width="142" height="40">操作</td>
                </tr>
                <tr v-for="(tmp,index) in alldata" align="center" class="dd">
                    <td>
                        <img width="40" height="40" :src="'http://api.eawsp.com'+tmp.store_url" style="float: left">
                        <p style="width: 200px;height: 40px;float: left;text-align: left;line-height: 40px;text-indent: 5px">{{tmp.store_name}}</p>
                    </td>
                    <td>
                        {{tmp.street_categories.str_name}}
                    </td>
                    <td>
                        {{tmp.supplier_ranks.rank_name}}
                    </td>
                    <td>
                        <span @click="f1(index)" href="#" style="color: #41bbee">上传</span>
                    </td>
                </tr>
            </table>
            <div class="footer">
                <img width="30" height="30" src="../assets/jt.png">
                <p><span style="color: #41bbee;text-indent: 10px">1</span><span style="color: #000000">/1</span></p>
                <img width="30" height="30" src="../assets/jt2.png"/>
                <p>跳至</p>
                <input type="text"/>
                <p>页</p>
                <button>GO</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddFloor",
        data(){
            return {
                alldata: null
            }
        },
        mounted(){
            this.$axios.get("http://api.eawsp.com/api/index/getShopList?token="+sessionStorage.getItem("token")).then((res) => {
                console.log(res);
                console.log(res.data.data.data);
                this.alldata = res.data.data.data;
            })
        },
        methods: {
            f1(index){
                this.$axios.post("http://api.eawsp.com/api/index/addShopProduct?token="+sessionStorage.getItem("token"),{
                    store_id: this.alldata[index].id,
                    name: this.alldata[index].store_name,
                    store_url: this.alldata[index].store_url,
                    sort: JSON.stringify(this.$root.selectindex),
                    floor: this.$root.selectval
                }).then((res) => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$alert('上传成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push("/main/SelectShop");
                            }
                        });
                    }
                });
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
        height: 36px;
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