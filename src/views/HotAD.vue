<template>
    <div style="width: 980px">
        <p style="margin-bottom: 15px;width: 100%;border-bottom: 1px solid #e5e5e5;font-size: 12px;line-height: 40px">您当前的位置>展位设置>
            <span style="color: rgb(65,187,238);">热销广告</span>
        </p>
        <div class="main">
            <p style="margin-top: 30px;text-indent: 20px;font-size: 18px">热销广告</p>
            <div style="margin-top: 30px">
                <p style="width: 80px;float: left;margin-left: 160px;margin-top: 8px;font-size: 16px">热销分类</p>
                <select @change="f2()" v-model="select" style="float: left;width: 250px;height: 40px">
                    <option>疯狂抢购</option>
                    <option>热销排行</option>
                    <option>商城热卖</option>
                    <option>商城推荐</option>
                    <option>新品上市</option>
                </select>
            </div>
            <div class="clear"></div>
            <div v-if="alldata">
                <img v-for="(tmp,index) in alldata" v-if="tmp.image_thumbnail" width="160" height="160" @click="f1(index)" style="margin-left: 60px;margin-top: 30px" :src="'http://api.eawsp.com'+tmp.image_thumbnail">
                <img v-else width="160" height="160" @click="f1(index)" style="margin-left: 60px;margin-top: 30px" src="../assets/jia.png">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HotAD",
        data(){
            return {
                select: "疯狂抢购",
                alldata: null
            }
        },
        mounted(){
            if (this.$root.hotadval) {
                this.select = this.$root.hotadval;
            }
            console.log(this.select);
            this.$axios.get('http://api.eawsp.com/api/index/getAdverStore?token='+sessionStorage.getItem("token")+"&floor="+this.select).then((res) => {
                console.log(res);
                if (res.data.data.constructor != Array) {
                    console.log(res.data.data[this.select]);
                    this.alldata = res.data.data[this.select];
                    this.alldata = this.arrsort(res.data.data[this.select],5)
                }
                else {
                    var arr = [];
                    this.alldata = this.arrsort(arr,5);
                }
            })
        },
        methods: {
            f2(){
                this.$axios.get('http://api.eawsp.com/api/index/getAdverStore?token='+sessionStorage.getItem("token")+"&floor="+this.select).then((res) => {
                    if (res.data.data.constructor != Array) {
                        console.log(res.data.data[this.select]);
                        this.alldata = this.arrsort(res.data.data[this.select],5);
                    }
                    else {
                        var arr = [];
                        this.alldata = this.arrsort(arr,5);
                    }
                })
            },
            f1(index){
                this.$root.hotadindex = index + 1;
                this.$root.ishotad = true;
                this.$root.hotadval = this.select;
                this.$router.push("/main/AddFloor");
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
        padding-top: 1px;
    }
</style>