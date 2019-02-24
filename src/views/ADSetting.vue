<template>
    <div style="width: 980px">
        <p style="width: 100%;border-bottom: 1px solid #e5e5e5;font-size: 12px;line-height: 40px">您当前的位置>展位设置>
            <span style="color: rgb(65,187,238);">广告位设置</span>
        </p>
        <div class="main" style="margin-top: 15px;padding-bottom: 50px">
            <p style="padding-top: 30px">顶部广告位</p>
            <div style="position: relative;margin-top: 20px">
                <input type="file" style="position: absolute;left: 50px;width: 245px;height: 80px;opacity: 0"/>
                <img src="../assets/jia1.png" style="margin-left: 50px">
                <input type="text" class="urlst" placeholder="请输入URL地址" style="position: absolute;top: 15px;margin-left: 20px"/>
            </div>
            <p style="margin-top: 30px">banner</p>
            <div class="banner">
                <div class="ban" v-for="(tmp,index) in banner">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160" :src="tmp.photo">
                    <input type="file" @change="bannerPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0"/><br>
                    <input v-model="tmp.url" @blur="handleblur(index)" class="urlst" style="margin-top: 20px" type="text" placeholder="请输入URL地址"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="margin-top: 30px">精选广告</p>
            <div class="select">
                <div class="selectson" v-for="(tmp,index) in select">
                    <img v-if="!tmp.photo" width="180" height="200" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="180" height="200" :src="tmp.photo">
                    <input @change="SelectPhoto($event,index)" style="position: absolute;left: 0;width: 180px;height: 200px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="SubmitSelect(index)" class="urlst" style="width: 180px;margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="margin-top: 30px">固定广告位</p>
            <p style="font-size: 12px;margin-top: 50px">楼层中固定广告</p>
            <div class="gd">
                <div class="gdd" v-for="(tmp,index) in fixed1">
                    <img v-if="!tmp.photo" width="250" height="80" :src="'http://api.eawsp.com'+tmp.image"/>
                    <img v-if="tmp.photo" width="250" height="80" :src="tmp.photo"/>
                    <input @change="fix1Photo($event,index)" type="file" style="position: absolute;left: 0;width: 250px;height: 80px;opacity: 0"/><br>
                    <input v-model="tmp.url" @blur="fix1SelectPhoto(index)" class="urlst" placeholder="请输入URL地址" style="margin-top: 10px;" type="text"/>
                </div>
                <div class="clear"></div>
                <p style="font-size: 12px;margin-top: 50px">热门店铺旁广告位</p>
                <div class="hot" v-for="(tmp,index) in fixed2">
                    <img v-if="!tmp.photo" width="180" height="200" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="180" height="200" :src="tmp.photo">
                    <input @change="fix2Photo($event,index)" style="position: absolute;left: 0;width: 180px;height: 200px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="fix2SelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="margin-top: 70px">楼层固定广告位</p>
            <p style="font-size: 14px;margin-top: 20px">食品生鲜</p>
            <div class="floor1">
                <div v-for="(tmp,index) in food" style="margin-left: 50px;position: relative;float: left">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160" :src="tmp.photo">
                    <input @change="foodPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="foodSelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="font-size: 14px;margin-top: 20px">服装服饰</p>
            <div class="floor1">
                <div v-for="(tmp,index) in clothing" style="margin-left: 50px;position: relative;float: left">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160" :src="tmp.photo">
                    <input @change="clPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="clSelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="font-size: 14px;margin-top: 20px">个护化妆</p>
            <div class="floor1">
                <div v-for="(tmp,index) in protect" style="margin-left: 50px;position: relative;float: left">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160"  :src="tmp.photo">
                    <input @change="prPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="prSelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="font-size: 14px;margin-top: 20px">手机数码</p>
            <div class="floor1">
                <div v-for="(tmp,index) in phone" style="margin-left: 50px;position: relative;float: left">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160" :src="tmp.photo">
                    <input @change="phPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="phSelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="font-size: 14px;margin-top: 20px">家用电器</p>
            <div class="floor1">
                <div v-for="(tmp,index) in home" style="margin-left: 50px;position: relative;float: left">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160" :src="tmp.photo">
                    <input @change="hoPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="hoSelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="font-size: 14px;margin-top: 20px">家纺家居</p>
            <div class="floor1">
                <div v-for="(tmp,index) in HomeTextiles" style="margin-left: 50px;position: relative;float: left">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160" :src="tmp.photo">
                    <input @change="HoPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="HoSelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="font-size: 14px;margin-top: 20px">酒类饮料</p>
            <div class="floor1">
                <div v-for="(tmp,index) in Alcohol" style="margin-left: 50px;position: relative;float: left">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160" :src="tmp.photo">
                    <input @change="alPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="alSelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
            <p style="font-size: 14px;margin-top: 20px">母婴用具</p>
            <div class="floor1">
                <div v-for="(tmp,index) in baby" style="margin-left: 50px;position: relative;float: left">
                    <img v-if="!tmp.photo" width="251" height="160" :src="'http://api.eawsp.com'+tmp.image">
                    <img v-if="tmp.photo" width="251" height="160" :src="tmp.photo">
                    <input @change="baPhoto($event,index)" style="position: absolute;left: 0;width: 251px;height: 160px;opacity: 0" type="file"/><br>
                    <input v-model="tmp.url" @blur="baSelectPhoto(index)" class="urlst" style="margin-top: 10px" placeholder="请输入URL地址" type="text"/>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ADSetting",
        data(){
            return {
                alldata: [],
                phone: [],
                baby: [],
                clothing: [],
                protect: [],
                Alcohol: [],
                fixed: [],
                home: [],
                food: [],
                select: [],
                banner: [],
                HomeTextiles: [],
                fixed1: [],
                fixed2: [],
            }
        },
        mounted(){
            this.$axios.get("http://api.eawsp.com/api/index/getBillboards").then((res) => {
                this.alldata = res.data.data;
                console.log(this.alldata);
                for (var i = 0; i < this.alldata.length; i ++) {
                    if (this.alldata[i].type == "手机数码") {
                        this.phone.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "母婴用具") {
                        this.baby.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "服装服饰") {
                        this.clothing.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "个护化妆") {
                        this.protect.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "酒类饮料") {
                        this.Alcohol.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "固定广告位") {
                        this.alldata[i].photo = null;
                        this.alldata[i].file = null;
                        this.fixed.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "家用电器") {
                        this.home.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "食品生鲜") {
                        this.food.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "精选广告") {
                        this.select.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "banner") {
                        this.alldata[i].photo = null;
                        this.alldata[i].file = null;
                        this.banner.push(this.alldata[i]);
                    }
                    else if (this.alldata[i].type == "家纺家居") {
                        this.HomeTextiles.push(this.alldata[i]);
                    }
                }
                console.log(this.fixed);
                for (var i = 0; i < this.fixed.length; i ++) {
                    if (this.fixed[i].sort <= 3 || this.fixed[i].sort > 5) {
                        this.fixed1.push(this.fixed[i]);
                    }
                    else {
                        this.fixed2.push(this.fixed[i]);
                    }
                }
                // this.fixed1[4] = {
                //     created_at: "2018-11-08 18:45:29",
                //     end: null,
                //     file: null,
                //     id: null,
                //     image: "/storage/image/advertisement/eOpH9XMIBOGYfmM05895pTFnhI7TJYuWjeDHFI2k.png",
                //     photo: null,
                //     sort: "7",
                //     start: null,
                //     type: "固定广告位",
                //     updated_at: "2018-11-15 18:03:06",
                //     url: "#"
                // };
                // this.fixed1[5] = {
                //     created_at: "2018-11-08 18:45:29",
                //     end: null,
                //     file: null,
                //     id: null,
                //     image: "/storage/image/advertisement/eOpH9XMIBOGYfmM05895pTFnhI7TJYuWjeDHFI2k.png",
                //     photo: null,
                //     sort: "4",
                //     start: null,
                //     type: "固定广告位",
                //     updated_at: "2018-11-15 18:03:06",
                //     url: "#"
                // };
                console.log(this.fixed1);
            });
        },
        methods: {
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
            },
            baPhoto(e,index) {
                this.ShowPhoto(e,index,this.baby);
            },
            baSelectPhoto(index) {
                this.SubmitPhoto(index,this.baby);
            },
            alPhoto(e,index) {
                this.ShowPhoto(e,index,this.Alcohol);
            },
            alSelectPhoto(index) {
                this.SubmitPhoto(index,this.Alcohol);
            },
            HoPhoto(e,index) {
                this.ShowPhoto(e,index,this.HomeTextiles);
            },
            HoSelectPhoto(index) {
                this.SubmitPhoto(index,this.HomeTextiles);
            },
            hoPhoto(e,index) {
                this.ShowPhoto(e,index,this.home);
            },
            hoSelectPhoto(index) {
                this.SubmitPhoto(index,this.home);
            },
            phPhoto(e,index) {
                this.ShowPhoto(e,index,this.phone);
            },
            phSelectPhoto(index) {
                this.SubmitPhoto(index,this.phone);
            },
            prPhoto(e,index) {
                this.ShowPhoto(e,index,this.protect);
            },
            prSelectPhoto(index) {
                this.SubmitPhoto(index,this.protect);
            },
            clPhoto(e,index) {
                this.ShowPhoto(e,index,this.clothing);
            },
            clSelectPhoto(index) {
                this.SubmitPhoto(index,this.clothing);
            },
            foodPhoto(e,index) {
                this.ShowPhoto(e,index,this.food);
            },
            foodSelectPhoto(index) {
                this.SubmitPhoto(index,this.food);
            },
            fix2Photo(e,index) {
                this.ShowPhoto(e,index,this.fixed2);
            },
            fix2SelectPhoto(index) {
                this.SubmitPhoto(index,this.fixed2);
            },
            fix1SelectPhoto(index) {
                this.SubmitPhoto(index,this.fixed1);
            },
            fix1Photo(e,index) {
                this.ShowPhoto(e,index,this.fixed1);
            },
            bannerPhoto(e,index) {
                this.ShowPhoto(e,index,this.banner);
            },
            handleblur(key) {
                this.SubmitPhoto(key,this.banner);
            },
            SelectPhoto(e,index) {
                this.ShowPhoto(e,index,this.select);
            },
            SubmitSelect(index) {
                this.SubmitPhoto(index,this.select);
            },


            ShowPhoto(e,index,arr){
                var photo = e.target.files[0];
                console.log(photo);
                arr[index].file = photo;
                var reader = new FileReader();
                reader.readAsDataURL(photo);
                reader.onloadend = () => {
                    console.log(reader);
                    var url = reader.result;
                    arr[index].photo = url;
                    this.$forceUpdate();
                    // this.banner[index].file = this.dataURItoBlob(url);
                }
            },
            SubmitPhoto(key,arr){
                if (arr[key].file != null) {
                    console.log(arr[key].file);
                    console.log(arr[key].url);
                    var formdata = new window.FormData();
                    formdata.append("url",arr[key].url);
                    formdata.append("image",arr[key].file);
                    formdata.append("type",arr[key].type);
                    formdata.append("sort",arr[key].sort);
                    console.log(formdata);
                    this.$axios({
                        url: "http://api.eawsp.com/api/index/addBillboards?token="+sessionStorage.getItem("token"),
                        data: formdata,
                        method: "post",
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        console.log(res);
                    })
                }
                else {
                    this.$alert('请选择要上传的图片', '提示', {
                        confirmButtonText: '确定',
                    });
                }
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
    }
    .main p{
        text-indent: 50px;
    }
    .urlst{
        width: 248px;
        height: 40px;
        border: 0;
        outline: 2px solid #e5e5e5;
        text-indent: 1em;
    }
    .ban{
        position: relative;
        float: left;
        margin-top: 20px;
        margin-left: 60px;
    }
    .clear{
        clear: both;
    }
    .select{
        margin-top: 20px;
    }
    .selectson{
        position: relative;
        margin-left: 13px;
        float: left;
    }
    .gdd{
        position: relative;
        margin-left: 55px;
        margin-top: 20px;
        float: left;
    }
    .hot{
        float: left;
        margin-left: 55px;
        margin-top: 20px;
        position: relative;
    }
    .floor1{
        margin-top: 15px;
    }
</style>