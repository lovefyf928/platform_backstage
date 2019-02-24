<template>
    <div class="add_integral" style="width: 980px">
        <p class="daohang">您当前的位置>商品管理><span style="color: rgb(65, 187, 238)">商品列表</span></p>
        <div class="hed">
            <p>商品信息</p>
        </div>

        <div class="mian">
            <table style="margin-top: 25px;"><p><span >*</span>商品名称
            </p><input style="width: 300px;" v-model="spname"></table>
            <table ><p><span >*</span>商品描述</p><input style="width: 300px;" v-model="spms">
            </table>
            <table><p><span >*</span>积分</p><input type="text" v-model="IN">
            </table>
            <div class="table">
                <p ><span >*</span>商品图片</p>
                <i>商品主图不能超过1M图片支持JPG，PNG，JPEG格式</i><br >
                <div class="add" id="one1"><img v-if="!file1show" src="../assets/spzt.png" alt=""><img v-if="file1show" :src="file1show" alt=""> <input type="file" @change="uploading1($event)"></div>
                <div class="add"><img v-if="!file2show" src="../assets/spzt.png" alt=""><img v-if="file2show" :src="file2show" alt=""> <input type="file" @change="uploading2($event)"></div>
                <div class="add"><img v-if="!file3show" src="../assets/spzt.png" alt=""><img v-if="file3show" :src="file3show" alt=""> <input type="file" @change="uploading3($event)"></div>
                <div class="add"><img v-if="!file4show" src="../assets/spzt.png" alt=""><img v-if="file4show" :src="file4show" alt=""> <input type="file" @change="uploading4($event)"></div>
                <div class="add"><img v-if="!file5show" src="../assets/spzt.png" alt=""><img v-if="file5show" :src="file5show" alt=""> <input type="file" @change="uploading5($event)"></div>
            </div>
            <div class="table" style="height: 510px;">
                <p><span>*</span>详情页面描述</p>
                <i>商品主图不能超过1M图片支持JPG，PNG，JPEG格式</i>
                <textarea class="quill" v-model="xqms"></textarea>
            </div>
            <table><p>商品重量</p><input v-model="kg" oninput="value=value.replace(/[^\d]/g,'')"><i>KG</i></table >
            <table><p>商品库存</p><input v-model="kc" oninput="value=value.replace(/[^\d]/g,'')"></table >
            <table><p>库存警告数量</p><input v-model="jgsl" oninput="value=value.replace(/[^\d]/g,'')">
            </table >
            <table ><p>商品口味</p><input v-model="kw"><i>如有多种请用中文逗号分割</i>
            </table>
            <table ><p>商品规格</p><input v-model="gg"><i>如有多种请用中文逗号分割</i>
            </table>
            <table ><p>商品颜色</p><input v-model="ys"><i>如有多种请用中文逗号分割</i>
            </table>
            <button @click="save()">保存</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "add_integral",
        data(){
            return {
                spname: "",
                spms: "",
                IN: "",
                file1: null,
                file1show: null,
                file2: null,
                file2show: null,
                file3: null,
                file3show: null,
                file4: null,
                file4show: null,
                file5: null,
                file5show: null,
                xqms: "",
                kg: "",
                kc: "",
                jgsl: "",
                kw: "",
                gg: "",
                ys: ""
            }
        },
        methods: {
            uploading1(e){
                this.file1 = e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                    this.file1show = reader.result;
                    this.$forceUpdate();
                }
            },
            uploading2(e){
                this.file2 = e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                    this.file2show = reader.result;
                    this.$forceUpdate();
                }
            },
            uploading3(e){
                this.file3 = e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                    this.file3show = reader.result;
                    this.$forceUpdate();
                }
            },
            uploading4(e){
                this.file4 = e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                    this.file4show = reader.result;
                    this.$forceUpdate();
                }
            },
            uploading5(e){
                this.file5 = e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = () => {
                    this.file5show = reader.result;
                    this.$forceUpdate();
                }
            },
            save(){
                var formdata = new window.FormData();
                formdata.append('name', this.spname);
                formdata.append('integral', this.IN);
                formdata.append('details_page_description', this.xqms);
                formdata.append('goods_taste', this.kw);
                formdata.append('goods_specifications', this.gg);
                formdata.append('goods_color', this.ys);
                formdata.append('weight', this.kg);
                formdata.append('stock', this.kc);
                formdata.append('stock_warning', this.jgsl);
                formdata.append('goods_describe',this.spms);
                formdata.append('goods_img1',this.file1);
                if (this.file2 != null) {
                    formdata.append('goods_img2', this.file2);
                }
                if (this.file3 != null) {
                    formdata.append('goods_img3', this.file3);
                }
                if (this.file4 != null) {
                    formdata.append('goods_img4', this.file4);
                }
                if (this.file5 != null) {
                    formdata.append('goods_img5', this.file5);
                }
                formdata.append('token',sessionStorage.getItem("token"));
                this.$axios.post("http://api.eawsp.com/api/integralGoods/add_integral_goods",formdata).then((res) => {
                    console.log(res);
                    if (res.data.code == 0) {
                        this.$alert('上传成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$router.push("/main/in");
                            }
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .daohang {
        text-align: left;
        font-size: 12px;
        width: 100%;
        line-height: 40px;
        border-bottom: 1px solid #e5e5e5;
    }

    .hed {
        width: 100%;
        height: 40px;
        outline: 1px solid #e5e5e5;
        font-size: 14px;
    }
    #one1{
        margin-left: 260px;
    }
    .hed p {
        width: 100px;
        display: block;
        height: 20px;
        border-left: 5px solid #000;
        text-indent: 10px;
        float: left;
        margin-top: 10px;
        margin-left: 20px;
    }
    .mian{
        width: 100%;
        height: 1300px;
        background: #fff;
        border-bottom: 100px solid #fff;
    }
    table{
        width: 100%;
        height: 30px;
        float: left;
        line-height: 30px;
        margin-top: 7px;
    }
    .FL>p,.table p,table p{
        width: 250px;
        display: block;
        float: left;
        text-align: right;
        font-size: 14px;
    }
    table p{
        float: left;
        height: 25px;
        margin-left: 10px;
        border: none;
    }
    table select{
        width: 100px;
    }
    table input,table select{
        float: left;
        height: 25px;
        margin-left: 10px;
        /*border: none;*/
        border: 1px solid #bfbfbf;
    }
    .table{
        height: 160px;
    }
    .table,table{
        width: 100%;
        float: left;
        line-height: 30px;
        margin-top: 7px;
    }
    .FL>p,.table p{
        width: 250px;
        display: block;
        float: left;
        text-align: right;
        font-size: 14px;
    }
    .table p span,table p span{
        color: red;
    }
    .table i,table i{
        font-style: normal;
        width: 300px;
        /*float: left;*/
        height: 25px;
        margin-left: 10px;
        color: #b8b8b8;
        font-size: 12px;
    }
    .add{
        width: 100px;
        height: 100px;
        float: left;
        position: relative;
        margin-top: 10px;
        margin-left: 30px;
    }
    .table img,.table input{
        position: absolute;
        width: 100px;
        height: 100px;
        top: 0;
        left: 0;
    }
    .table input{
        opacity: 0;
    }
    .FL{
        width: 100%;
        height: 160px;
        float: left;
        line-height: 30px;
        margin-top: 7px;
    }
    .fl{
        width: 200px;
        height: 150px;
        background: #ebf1f6;
        float: left;
        margin-left: 10px;
        overflow: scroll;
    }
    .mian button{
        display: block;
        width: 100px;
        height: 40px;
        background: #41bbee;
        border: none;
        border-radius: 5px;
        float: left;
        margin-top: 20px;
        margin-left: 440px;
        color: #fff;
    }
    .quill{
        float: left;
        width: 70%;
        height: 400px;
        margin-left: 150px;
        resize:none;
    }
</style>