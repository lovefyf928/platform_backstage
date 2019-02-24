<template>
    <div style="width: 980px">
        <p style="width: 100%;border-bottom: 1px solid #e5e5e5;font-size: 12px;line-height: 40px">您当前的位置>展位设置>
            <span style="color: rgb(65,187,238);">精选店铺</span>
        </p>
        <div class="main" style="margin-top: 15px">
            <p style="padding-top: 30px;text-indent: 20px;font-size: 18px">精选店铺</p>
            <div style="margin-top: 30px">
                <p style="width: 80px;float: left;margin-left: 160px;margin-top: 8px;font-size: 16px">楼层分类</p>
                <select @change="f2()" v-model="selectval" style="float: left;width: 250px;height: 40px">
                    <option>食品生鲜</option>
                    <option>服装服饰</option>
                    <option>个护化妆</option>
                    <option>手机数码</option>
                    <option>家用电器</option>
                    <option>家纺家居</option>
                    <option>酒类饮料</option>
                    <option>母婴用品</option>
                </select>
            </div>
            <div class="clear"></div>
            <img v-if="tmp.store_url" width="80" height="81" v-for="(tmp,index) in arr" @click="f1(index)" style="margin-left: 20px;margin-top: 30px" :src="'http://api.eawsp.com'+tmp.store_url">
            <img v-else width="80" height="81" @click="f1(index)" style="margin-left: 20px;margin-top: 30px" src="../assets/jia4.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: "SelectShop",
        data(){
            return {
                selectval: "食品生鲜",
                arr: []
            }
        },
        mounted(){
            if (this.$root.selectval) {
                this.selectval = this.$root.selectval;
            }
            this.$axios(`http://api.eawsp.com/api/index/getShopProduct?floor=${this.selectval}&token=${sessionStorage.getItem("token")}`).then((res) => {
                console.log(res.data.data[this.selectval]);
                this.arr = this.arrsort(res.data.data[this.selectval],10);
                console.log(this.arr);
            })
        },
        methods: {
            f2(){
                this.$axios("http://api.eawsp.com/api/index/getShopProduct?floor="+this.selectval).then((res) => {
                    console.log(res);
                    if (res.data.data.constructor != Array) {
                        this.arr = this.arrsort(res.data.data[this.selectval], 10);
                    }
                    else {
                        var arr = []
                        this.arr = this.arrsort(arr, 10);
                    }
                    console.log(this.arr);
                })
            },
            f1(index){
                this.$root.selectval = this.selectval;
                this.$root.selectindex = index + 1;
                this.$router.push("/main/SelectShopJump");
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
    .clear{
        clear: both;
    }
    .main{
        background: #ffffff;
        padding-bottom: 50px;
    }
</style>