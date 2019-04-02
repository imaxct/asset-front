<template>
    <div id="app">
        <loading v-model="isLoading"></loading>
        <router-view></router-view>
        <tabbar style="position: fixed">
            <tabbar-item selected>
                <img slot="icon" src="./assets/home.png">
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item>
                <img slot="icon" src="./assets/user.png">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
import { Loading, Tabbar, TabbarItem } from 'vux'
import { mapState } from 'vuex'
export default {
    name: 'app',
    components: {
        Loading,
        mapState,
        Tabbar,
        TabbarItem
    },
    computed: {
        ...mapState({
            isLoading: state => state.loading.isLoading
        })
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
body {
    background-color: #fbf9fe;
}
</style>
