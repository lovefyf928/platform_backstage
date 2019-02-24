<template>
    <div style="width: 100%">
        <top></top>
        <div class="aaa">
            <side style="float: left"></side>
            <router-view style="float: left;margin-left: 20px"></router-view>
        </div>
    </div>
</template>

<script>
    import top from '../views/top'
    import side from '../views/side'
    export default {
        components:{top,side}
    }
</script>

<style scoped>
    .aaa{
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;
    }
</style>