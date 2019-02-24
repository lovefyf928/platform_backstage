<template>
    <div style="width: 980px">
        <p style="width: 100%;border-bottom: 1px solid #e5e5e5;font-size: 12px;line-height: 40px">您当前的位置>展位设置>
            <span style="color: rgb(65,187,238);">热门店铺</span>
        </p>
        <div v-if="alldata" style="height: 1250px;background: #ffffff">
            <table style="padding-top: 25px">
                <p class="titl">商品名称:</p>
                <p class="val">{{alldata.name}}</p>
            </table>
            <table class="box">
                <p class="titl">商品描述:</p>
                <p class="val">{{alldata.goods_describe}}</p>
            </table>
            <table class="box">
                <p class="titl">类目:</p>
                <p class="val">{{alldata.goods_sorts_name1}}<{{alldata.goods_sorts_name2}}<{{alldata.goods_sorts_name3}}</p>
            </table>
            <table class="box">
                <p class="titl">品牌:</p>
                <p class="val">{{alldata.goods_brand.brand_name}}</p>
            </table>
            <table class="box">
                <p class="titl">价格:</p>
                <p class="val">{{alldata.shop_price}}</p>
            </table>
            <div class="box">
                <p class="titl">商品图片</p><br>
                <div style="margin-left: 260px;margin-top: 10px">
                    <img width="100" height="100" :src="'http://api.eawsp.com'+alldata.alum[0].image_url">
                </div>
            </div>
            <div class="box" style="width: 980px;height: 510px">
                <p class="titl">详情页面描述</p>
                <textarea readonly="readonly" class="texta">{{alldata.details_page_description}}</textarea>
            </div>
            <table class="box">
                <p class="titl">商品重量:</p>
                <p class="val">{{alldata.weight}}KG</p>
            </table>
            <table class="box">
                <p class="titl">商品库存:</p>
                <p class="val">{{alldata.stock}}</p>
            </table>
            <table class="box">
                <p class="titl">库存警告数量:</p>
                <p class="val">{{alldata.stock_warning}}</p>
            </table>
            <table class="box">
                <p class="titl">商品口味:</p>
                <p class="val">{{alldata.attribute.goods_specifications}}</p>
            </table>
            <table class="box">
                <p class="titl">商品规格:</p>
                <p class="val">{{alldata.attribute.goods_taste}}</p>
            </table>
            <table class="box">
                <p class="titl">商品颜色:</p>
                <p class="val">{{alldata.attribute.goods_color}}</p>
            </table>
            <table class="box">
                <p class="titl">店铺中的分类:</p>
                <p class="val">{{alldata.store_goods_type_name1}}<{{alldata.store_goods_type_name2}}</p>
            </table>
            <table class="box">
                <p class="titl">商家备注:</p>
                <p class="val">{{alldata.note}}</p>
            </table>
                <button @click="f2(1)" class="btn1">同意申请</button>
                <button @click="f2(2)" class="btn2">拒绝申请</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data(){
            return {
                alldata: null
            }
        },
        mounted(){
            this.$axios.post("http://api.eawsp.com/api/commoditys/audit_show_detail?token="+sessionStorage.getItem("token"),{
                commoditys_id: this.$root.indexx
            }).then((res) => {
                this.alldata = res.data.data[0];
                console.log(this.alldata);
            })
        },
        methods: {
            f2(num) {
                this.$axios.post("http://api.eawsp.com/api/commoditys/audit?token="+sessionStorage.getItem("token"),{
                    commoditys_id: this.$root.indexx,
                    audit_state: num
                }).then((res) => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$alert('审核成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push("/main/comm");
                            }
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .titl{
        width: 250px;
        font-size: 14px;
        float: left;
        text-align: right;
    }
    .val{
        float: left;
        width: 200px;
        height: 25px;
        text-align: left;
        text-indent: 10px;
        font-size: 14px;
    }
    .box{
        margin-top: 7px;
    }
    .texta{
        float: left;
        width: 70%;
        height: 400px;
        margin-left: 150px;
        margin-top: 6px;
    }
    .btn1,.btn2{
        width: 100px;
        height: 40px;
        border: none;
        background: #41bbee;
        border-radius: 5px;
        color: #ffffff;
        margin-left: 420px;
        margin-top: 15px;
        float: left;
    }
    .btn2{
        background: rgb(229, 229, 229);
        color: #000000;
        margin-left: 20px;
    }
</style>