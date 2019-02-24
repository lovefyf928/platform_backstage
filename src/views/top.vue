<template>
    <div class="header">
        <div class="son">
            <img src="../assets/ptht.png" style="margin-top: 5px">
            <div style="width: 400px;height: 65px;float: right;">
                <div @click="exit()" style=" width: 100px;height: 65px;float: right;position: relative">
                    <img style="position: absolute;margin-left: 10px;left: 29px;top: 13px" width="18" height="18" src="../assets/kg.png">
                    <span style="position: absolute;bottom: 11px;left: 36px;font-size: 12px;color: #ffffff">退出</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "top",
        methods: {
            exit(){
                sessionStorage.clear();
                this.$router.push("/");
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
    .header{
        width: 100%;
        height: 65px;
        background: url("../assets/TOP.png") 50%;
    }
    .son{
        width: 1200px;
        height: 65px;
        margin: 0 auto;
    }
</style>