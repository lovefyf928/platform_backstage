<template>
    <div>
        <span>username</span><input v-model="uname" type="text">
        <span>password</span><input v-model="pwd" type="password">
        <button @click="handleClick()">login</button>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                uname: "",
                pwd: ""
            }
        },
        methods:{
            handleClick(){
                console.log(this.uname);
                console.log(this.pwd);
                this.$axios.post("http://127.0.0.1:8080/login/startlogin",{
                    uname: this.uname,
                    pwd: this.pwd
                }).then((res) => {
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>