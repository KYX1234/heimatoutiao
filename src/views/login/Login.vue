<template>
    <div class="login-container">
        <van-nav-bar
            title="注册 / 登录"
            class=".van-nav-bar"
        />
        <!-- 登录表单,使用toast定制，需要关闭本身的红色提示 -->
        <van-form
            @submit="onLogin"
            @failed="onFailed"
            ref="login-from"
            :show-error="false"
            :show-error-message="false"
            :validate-first="true"
        >
            <van-field
                v-model="form.mobile"
                label="手机号"
                name="mobile"
                placeholder="请输入手机号"
                left-icon="phone-circle-o"
                maxlength=11
                :rules="formRules.mobile"
            />
            <van-field
                v-model="form.code"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
                left-icon="comment-circle-o"
                maxlength=6
                type="number"
                :rules="formRules.code"
            >
                <template #button>
                    <van-count-down
                        :time="1000*5"
                        format=" ss s"
                        v-if="isCountShow"
                        @finish="isCountShow=false"
                    />
                    <van-button
                        v-else
                        :disabled="isSendSmsButton"
                        size="small"
                        type="primary"
                        @click.prevent="onSendSms"
                    >发送验证码</van-button>
                </template>
            </van-field>
            <div style="margin: 16px">
                <van-button
                    block
                    type="info"
                    class="login-btn"
                >登录
                </van-button>
            </div>
        </van-form>
        <p class="info">万能验证码246810</p>
    </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from "@/api/userAPI"

export default {
    name: 'Login',
    data() {
        return {
            form: {
                mobile: '17702858513',
                code: '246810'
            },
            formRules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'onBlur' },
                    { pattern: /^1\d{10}$/, message: '手机号格式错误' }
                ],
                code: [{ required: true, message: '请填写您的验证码', trigger: 'onBlur' }]
            },
            isCountShow: false,//倒计时的状态
            isSendSmsButton: false//发生验证码按钮的状态
        };
    },
    methods: {
        async onLogin() {
            this.$toast.loading({
                message: '登录中...',
                forbidClick: true,//禁止其他背景区域点击
                duration: 0//展示时长(ms)，值为 0 时，toast 不会消失
            });
            try {
                const { data: res } = await loginAPI(this.form)
                console.log(res)
                if (res.message === "OK") {
                    this.$toast.success("登录成功")
                    this.$store.commit("setToken", res.data)
                    this.$router.push("/")
                }

            } catch (err) {
                this.$toast({
                    message: '登录失败',
                    icon: 'close',
                });
            }

        },
        //定制的toast提示
        onFailed(err) {
            if (err.errors[0]) {
                this.$toast({
                    message: err.errors[0].message,
                    position: "top"
                })
            }
        },
        //验证码
        async onSendSms() {
            try {
                //验证手机号格式
                await this.$refs["login-from"].validate("mobile")
                //按钮禁灰，防止多次点击
                this.isSendSmsButton = true
                //发送验证码请求
                const { data: res } = await sendSmsAPI(this.form.mobile)
                //倒计时
                this.isCountShow = true
            } catch (err) {
                let message = ""
                if (err && err.response && err.response.status === 429) {
                    message = "发生太频繁，请稍后"
                } else if (err.name === "mobile") {
                    message = err.message
                } else {
                    message = "未知错误"
                }

                this.$toast({
                    message,
                    position: "top"
                })
            }
            //无论成功还是失败，还原按钮状态
            this.isSendSmsButton = false

        }
    }
};
</script>

<style lang="less" scoped>
.login-container {
    .login-btn {
        background-color: #6db4fb;
        border: none;
        .van-button__text {
            font-size: 15px;
        }
    }
    .info {
        text-align: center;
        color: #ccc;
        font-size: 12px;
    }
}
</style>
