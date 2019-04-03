<template>
    <div>
        <group title="旧密码">
            <x-input title="输入旧密码" placeholder="输入旧密码" :show-clear="true" v-model="oldPassword" required></x-input>
        </group>
        <group title="新密码">
            <x-input title="输入新密码" placeholder="输入新密码" :show-clear="true" v-model="newPassword" required></x-input>
        </group>
        <group title="重复新密码">
            <x-input title="重复新密码" placeholder="重复新密码" :show-clear="true" v-model="newPassword2" :equal-with="newPassword" @on-blur="onBlur" required></x-input>
        </group>
        <group>
            <x-button @click.native="onClick">提交</x-button>
        </group>
    </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import { changePassword } from '@/api/user'
export default {
    components: {
        Group,
        XInput,
        XButton
    },
    data() {
        return {
            iconType: '',
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
        }
    },
    methods: {
        onClick() {
            console.log(this.newPassword)
            changePassword({ password: this.newPassword }).then(res => {
                console.log(res.data)
            })
        },
        onBlur(e) {
            console.log(this.newPassword)
            console.log(this.newPassword2)
            if (this.newPassword !== this.newPassword2) {
                this.iconType = 'error'
            } else {
                this.iconType = 'success'
            }
        }
    },
}
</script>