<template>
    <div>
        <divider></divider>
        <div style="text-align: center;">
            <img src="../assets/vux_logo.png" style="width: 100px; height: 100px;">
        </div>
        <group title="登陆">
            <x-input v-model="username" title="用户名" placeholder="用户名" :show-clear="true" />
            <x-input v-model="password" title="密码" type="password" placeholder="密码" :show-clear="true" />
        </group>
        <divider></divider>
        <flexbox>
            <flexbox-item>
                <x-button type="warn" @click.native="handleRest">重置</x-button>
            </flexbox-item>
            <flexbox-item>
                <x-button type="primary" @click.native="handleSubmit">登录</x-button>
            </flexbox-item>
        </flexbox>
    </div>
</template>

<script>
import { Group, XInput, XButton, Flexbox, FlexboxItem, Divider } from 'vux'
import { mapActions } from 'vuex'

export default {
    components: {
        Group,
        XInput,
        XButton,
        Flexbox,
        FlexboxItem,
        Divider
    },
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions([
            'handleLogin'
        ]),
        handleRest() {
            this.username = ''
            this.password = ''
        },
        handleSubmit() {
            this.handleLogin({
                username: this.username,
                password: this.password
            }).then(res => {
                this.$router.push({
                    name: 'home'
                })
            })
        }
    }
}
</script>
