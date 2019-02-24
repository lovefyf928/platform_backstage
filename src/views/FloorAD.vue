<template>
    <div style="width: 980px">
        <p style="margin-bottom: 15px;width: 100%;border-bottom: 1px solid #e5e5e5;font-size: 12px;line-height: 40px">您当前的位置>展位设置>
        <span style="color: rgb(65,187,238);">楼层广告</span>
        </p>
        <div style="padding-top: 1px;padding-bottom: 30px; background: #ffffff; width: 100%">
            <p class="floorHeader">楼层广告</p>
            <div class="box">
                <p style="margin-left: 160px;width: 80px">楼层分类</p>
                <select class="s1" @change="floor()" v-model="select">
                    <option>食品生鲜</option>
                    <option>服装服饰</option>
                    <option>个护化妆</option>
                    <option>手机数码</option>
                    <option>家用电器</option>
                    <option>家纺家居</option>
                    <option>酒类饮料</option>
                    <option>母婴用具</option>
                </select>
                <p style="margin-left: 8px;width: 80px">楼层二级</p>
                <select @change="f1()" class="s1" value="" v-model="selectSon">
                    <option v-for="(tmp,index) in obj[key]">{{tmp}}</option>
                </select>
            </div>
            <img v-if="tmp.image_thumbnail" width="160" height="160" @click="Jump(index)" v-for="(tmp,index) in arr" class="add" :src="'http://api.eawsp.com'+tmp.image_thumbnail">
            <img v-else width="160" height="160" @click="Jump(index)" class="add" src="../assets/jia.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: "FloorAD",
        data(){
            return {
                obj: {
                    0:["精品挑选","进口水果","糖果巧克力","牛奶乳品"],
                    1:["精品挑选","女装馆","内衣馆","男装馆"],
                    2:["精品挑选","香水彩妆","面部护肤","洗发护发"],
                    3:["精品挑选","热卖手机","手机配件","数码影音"],
                    4:["精品挑选","大家电","生活电器","厨房电气"],
                    5:["精品挑选","家纺","家居","厨具"],
                    6:["精品挑选","酒水","冲调饮品","饮料饮品"],
                    7:["精品挑选","孕婴奶粉","营养/辅食","孕婴洗护"]
                },
                select: "食品生鲜",
                selectSon: "精品挑选",
                key: 0,
                arr: []
            }
        },
        mounted(){
            if (this.$root.select1) {
                this.select = this.$root.select1;
                console.log(this.$root.select2);
                this.floor();
                this.selectSon = this.$root.select2;
            }
            var str = this.select+this.selectSon;
            this.$axios.get("http://api.eawsp.com/api/index/getAdverStore?floor="+str).then((res) => {
                console.log(res.data.data);
                this.arr = this.arrsort(res.data.data[str],8);
                console.log(this.arr);
            })
            this.arr = this.arrsort(this.arr,8);
        },
        methods: {
            f1(){
                var str = this.select+this.selectSon;
                this.$axios.get("http://api.eawsp.com/api/index/getAdverStore?floor="+str).then((res) => {
                    console.log(res.data.data);
                    if (res.data.data.length == 0) {
                        var arr = [];
                        this.arr = this.arrsort(arr,8);
                    }
                    else {
                        this.arr = this.arrsort(res.data.data[str], 8);
                        console.log(this.arr);
                    }
                })
            },
            Jump(index){
                this.$root.JumpIndex = index;
                this.$root.select1 = this.select;
                this.$root.select2 = this.selectSon;
                this.$router.push("/main/AddFloor");
            },
            floor(){
                if (this.select == "食品生鲜") {
                    this.key = 0;
                }
                else if (this.select == "服装服饰") {
                    this.key = 1;
                }
                else if (this.select == "个护化妆") {
                    this.key = 2;
                }
                else if (this.select == "手机数码") {
                    this.key = 3;
                }
                else if (this.select == "家用电器") {
                    this.key = 4;
                }
                else if (this.select == "家纺家居") {
                    this.key = 5;
                }
                else if (this.select == "酒类饮料") {
                    this.key = 6;
                }
                else if (this.select == "母婴用具") {
                    this.key = 7;
                }
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
    }
    .floorHeader{
        font-size: 18px;
        text-indent: 20px;
        margin-top: 30px;
    }
    .box{
        width: 100%;
        height: 50px;
        margin-top: 30px;
    }
    .box p{
        margin-top: 8px;
    }
    .box *{
        float: left;
    }
    .s1{
        width: 250px;
        height: 40px;
    }
    .add{
        margin-top: 30px;
        margin-left: 60px;
    }
</style>