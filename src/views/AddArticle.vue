<template>
  <div id="add_article">
      <p class="point">您当前的位置>展位设置>
          <span style="color: rgb(65,187,238);">添加文章</span>
      </p>
      <div class="msgBox">
          <p class="msgTitle">基本信息</p>
          <div class="msgBottom">
              <p class="rows"><span class="star">*</span><span class="rows_title">文章标题</span><input  v-model="ArtTitle" type="text"></p>
              <p class="rows">
                  <span class="star">*</span>
                  <span class="rows_title">文章类型</span>
                  <select v-model="ArtType" class="type">
                      <option>请选择</option>
                      <option>公告</option>
                      <option>政策</option>
                      <option>规则</option>
                      <option>社区</option>
                  </select>
              </p>
          </div>

      </div>
      <div class="msgBox">
          <p class="msgTitle">文章内容</p>
         
              <p class="rows">
                  <!--<span class="star">*</span>-->
                  <!--<span class="rows_title">文章标题</span>-->
                  <quill-editor  v-model="content"></quill-editor>
              </p>
          <div>
              <p class="btns">
                  <a @click="submit()" class="first_btn">发布</a><a @click="reset()">重置</a>

              </p>
          </div>

      </div>

  </div>

</template>

<script>
    export default {
        name: "add_article",
        data(){
            return {
                ArtTitle: "",
                ArtType: "请选择",
                content: "",
                alldata: null
            }
        },
        mounted(){
            if (this.$root.id) {
                this.$axios.get("http://api.eawsp.com/api/index/get/"+this.$root.id).then((res) => {
                    console.log(res);
                    this.alldata = res.data.data;
                    this.content = this.alldata.contents
                    this.ArtTitle = this.alldata.title;
                    if (this.alldata.type == "1") {
                        this.ArtType = "公告";
                    }
                    else if (this.alldata.type == "2") {
                        this.ArtType = "政策";
                    }
                    else if (this.alldata.type == "3") {
                        this.ArtType = "规则";
                    }
                    else if (this.alldata.type == "4") {
                        this.ArtType = "社区";
                    }
                })
            }
            // this.content = this.alldata.contents;
        },
        methods: {
            reset() {
                this.ArtType = "请选择";
                this.ArtTitle = "";
                this.content = "";
            },
            submit() {
                if (this.$root.id) {
                    console.log(this.content);
                    if (this.ArtType == "公告") {
                        this.ArtType = "1";
                    }
                    else if (this.ArtType == "政策") {
                        this.ArtType = "2";
                    }
                    else if (this.ArtType == "规则") {
                        this.ArtType = "3";
                    }
                    else if (this.ArtType == "社区") {
                        this.ArtType = "4";
                    }
                    this.$axios.post("http://api.eawsp.com/api/index/modify?token="+sessionStorage.getItem("token"),{
                        id: this.$root.id,
                        type: this.ArtType,
                        title: this.ArtTitle,
                        contents: this.content
                    }).then((res) => {
                        console.log(res);
                        if (res.data.code == 0) {
                            this.$alert('修改成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push("/main/AL");
                                }
                            });
                        }
                    })
                }
                else {
                    console.log(this.ArtType);
                    if (this.ArtType == "公告") {
                        this.ArtType = "1";
                    }
                    else if (this.ArtType == "政策") {
                        this.ArtType = "2";
                    }
                    else if (this.ArtType == "规则") {
                        this.ArtType = "3";
                    }
                    else if (this.ArtType == "社区") {
                        this.ArtType = "4";
                    }
                    if (this.ArtType != "请选择" && this.ArtTitle != "" && this.content != "") {
                        this.$axios.post("http://api.eawsp.com//api/index/add?token=" + sessionStorage.getItem("token"), {
                            user_id: sessionStorage.getItem("uid"),
                            type: this.ArtType,
                            title: this.ArtTitle,
                            contents: this.content
                        }).then((res) => {
                            console.log(res);
                            if (res.data.code == 0) {
                                this.$alert('添加成功', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$router.push("/main/AL");
                                    }
                                });
                            }
                        });
                    }
                    else {
                        this.$alert('请检查必填字段', '提示', {
                            confirmButtonText: '确定',
                        });
                    }
                }
            }
        },
        beforeDestroy(){
            this.$root.id = null;
        }
    }
</script>

<style scoped>
    *{
        margin: 0px;
        padding: 0px;
        font-family: "Microsoft YaHei";
        color: #333333;
        font-size: 12px;
    }
    ul,ol{
        list-style: none;
    }
    a{
        text-decoration: none;
    }
    #add_article{
        width: 980px;

    }
    #add_article .point{
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
        font-size: 12px;
        line-height: 40px
    }
    #add_article .msgBox{
        margin: 10px 0px 20px 0px;
        width: 978px;
        border: 1px solid #E5E5E5;
    }
    #add_article .msgBox .msgTitle{
        height: 39px;
        line-height: 39px;
        border-bottom: 1px solid #e5e5e5;
        background-color: #f9f9f9;
        color: #666666;
        padding-left: 20px;


    }
    #add_article .msgBox .msgBottom{
        background-color: #ffffff;
        padding: 30px 0px 30px 100px;
    }
    #add_article .msgBox .msgBottom .rows{
        height: 24px;
        line-height: 24px;
        margin-bottom: 10px;
    }
    #add_article .msgBox .msgBottom .rows .star{
        color: #ff3300;
        margin-right: 3px;
    }
    #add_article .msgBox .msgBottom .rows .rows_title{
        margin-right: 10px;
    }
    #add_article .msgBox .msgBottom .rows input{
        width: 200px;
        height: 20px;
    }
    #add_article .msgBox .msgBottom .rows .type{
        width: 80px;
        height: 24px;
        padding-right: 20px;
    }
    #add_article .btns{
        width: 170px;
        height: 30px;
        margin: 0 auto;
        overflow: hidden;
    }
    #add_article .btns a{
        float: left;
        width: 70px;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        text-align: center;
        border: 1px solid #cccccc;
        font-size: 14px;
        border-radius: 3px;
    }

    #add_article .btns .first_btn{
        background-color: #41bbee;
        margin-right: 30px;
        color: #fff;
        border: none;
    }
</style>