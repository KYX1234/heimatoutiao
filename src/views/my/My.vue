<template>
    <div class="my-container">
        <van-cell-group v-if="usertoken">
            <van-cell :border="false" center class="head">
                <van-image
                    :src="user.photo"
                    class="avatar"
                    fit="cover"
                    height="66"
                    round
                    slot="icon"
                    width="66"
                />
                <template v-slot:error>加载失败</template>
                <div slot="title">{{ user.name }}</div>
                <van-button round size="small" type="default">编辑资料</van-button>
            </van-cell>
            <!-- 计数面板 -->
            <van-grid :border="false" class="count-panel">
                <van-grid-item>
                    <div class="span">{{ user.art_count }}</div>
                    <div class="text">头条</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="span">{{ user.follow_count }}</div>
                    <div class="text">关注</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="span">{{ user.fans_count }}</div>
                    <div class="text">粉丝</div>
                </van-grid-item>
                <van-grid-item>
                    <div class="span">{{ user.like_count }}</div>
                    <div class="text">获赞</div>
                </van-grid-item>
            </van-grid>
        </van-cell-group>
        <!-- 未登录 -->
        <div class="not-login" v-else>
            <div @click="onLogin" class="not-login-border">
                <van-icon class-prefix="iconfont" name="shouji" size="45" />
                <div class="text">点我登录</div>
            </div>
        </div>
        <van-grid :column-num="2" class="nav mb-4">
            <van-grid-item icon="star-o" text="收藏" />

            <van-grid-item icon="clock-o" text="历史" />
        </van-grid>
        <van-cell-group>
            <van-cell icon="edit" is-link title="编辑资料" to />
            <van-cell class="mb-4" icon="more-o" is-link title="小思同学" to />
            <van-cell @click="onLoginout" class="login-exit" title="退出登录" v-if="usertoken" />
        </van-cell-group>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getUserinfoAPI } from '@/api/userAPI.js';
export default {
    name: 'My',
    data() {
        return {
            user: {} //登录用户的个人信息
        };
    },
    computed: {
        //引入vuex容器内的token用来判断是否登录，temple显示响应的内容
        ...mapState(['usertoken'])
    },
    created() {
        this.loadUserinfo();
    },

    methods: {
        //提示用户退出
        onLoginout() {
            this.$dialog
                .confirm({
                    title: '退出登录',
                    message: '是否确认退出?'
                })
                .then(() => {
                    //确认执行这里
                    //清除token信息
                    this.$store.commit('setToken', null);
                })
                .catch(() => {
                    //取消执行这里
                    // on cancel
                });
        },
        //未登录状态点击登录
        onLogin() {
            this.$router.push('login');
        },
        async loadUserinfo() {
            const { data } = await getUserinfoAPI();
            // console.log(data);
            this.user = data.data;
        }
    }
};
</script>

<style lang="less" scoped>
.my-container {
    .head {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #007bff;
        .van-cell__title {
            margin-left: 15px;
            color: #fff;
        }
        .avatar {
            border: 2px solid #fff;
        }
    }
    .not-login {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #007bff;
        height: 216px;
        .not-login-border {
            flex-direction: column;
            justify-content: center;
            display: flex;
            width: 100px;
            height: 100px;
            border-radius: 50px;
            border: 2px solid #fff;
            align-items: center;
            .text {
                color: #fff;
                font-size: 12px;
            }
        }
    }
    .count-panel {
        /deep/ .van-grid-item__content {
            background-color: #007bff;
            .span {
                color: #fff;
            }
            .text {
                color: #fff;
                font-size: 12px;
            }
        }
    }
    .nav {
        /deep/.van-icon-star-o {
            color: #eb5253;
        }
        /deep/ .van-icon-clock-o {
            color: #ff9d1d;
        }
    }
    .van-cell-group {
        background-color: unset;
    }
    .mb-4 {
        margin-bottom: 4px;
    }
    .login-exit {
        text-align: center;
        color: #d86262;
    }
}
</style>