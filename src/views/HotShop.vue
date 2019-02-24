<template>
    <div style="width: 980px">
        <p style="margin-bottom: 15px;width: 100%;border-bottom: 1px solid #e5e5e5;font-size: 12px;line-height: 40px">您当前的位置>展位设置>
            <span style="color: rgb(65,187,238);">热门店铺</span>
        </p>
        <div class="main">
            <p style="padding-top: 30px;text-indent: 20px;font-size: 18px">热门店铺</p>
            <img v-if="tmp.store_url" width="80" height="81" v-for="(tmp,index) in arr" @click="f1(index)" :src="'http://api.eawsp.com'+tmp.store_url" style="margin-top: 30px;margin-left: 20px">
            <img v-else width="80" height="81" @click="f1(index)" src="../assets/jia4.png" style="margin-top: 30px;margin-left: 20px">
        </div>
    </div>
</template>

<script>
    export default {
        name: "HotShop",
        data(){
            return {
                arr: null
            }
        },
        mounted(){
            this.$axios(`http://api.eawsp.com/api/index/getShopProduct?floor=热门店铺&token=${sessionStorage.getItem("token")}`).then((res) => {
                console.log(res.data.data["热门店铺"]);
                this.arr = this.arrsort(res.data.data["热门店铺"],24);
                console.log(this.arr);
            })
        },
        methods: {
            f1(index){
                this.$root.hotshopindex = index + 1;
                this.$router.push("/main/HotShopJump");
            },
            arrsort(arr,count) {
                var arr3 = [];
                var obj = {};
                for (let i = 0; i < count; i ++) {
                    arr3.push(obj);
                }
                for (let i = 0; i < arr.length; i ++) {
                    arr3[arr[i].sort - 1] = arr[i];
                }
                return arr3;
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
    .main{
        background: #ffffff;
        padding-bottom: 60px;
    }
</style>