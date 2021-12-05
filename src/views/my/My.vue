<template>
    <div class="my-container">
        <van-cell
            center
            class="head"
            :border="false"
        >
            <van-image
                class="avatar"
                slot="icon"
                width="66"
                height="66"
                round
                fit="cover"
                src="https://img02.sogoucdn.com/app/a/100520093/ca86e620b9e623ff-f4709b64c5c0ee80-c9561a7270a11ea4610f1a7fa33e083d.jpg"
            />
            <template v-slot:error>加载失败</template>
            <div slot="title">哈哈哈</div>
            <van-button
                round
                type="default"
                size="small"
            >编辑资料</van-button>
        </van-cell>
        <!-- 计数面板 -->
        <van-grid
            class="count-panel"
            :border="false"
        >
            <van-grid-item>
                <div class="span">0</div>
                <div class="text">头条</div>
            </van-grid-item>
            <van-grid-item>
                <div class="span">0</div>
                <div class="text">关注</div>

            </van-grid-item>
            <van-grid-item>

                <div class="span">0</div>
                <div class="text">粉丝</div>
            </van-grid-item>
            <van-grid-item>
                <div class="span">0</div>
                <div class="text">获赞</div>
            </van-grid-item>
        </van-grid>
        <van-grid
            :column-num="2"
            class="nav mb-4"
        >
            <van-grid-item
                icon="star-o"
                text="收藏"
            />

            <van-grid-item
                icon="clock-o"
                text="历史"
            />
        </van-grid>
        <van-cell-group>
            <van-cell
                title="编辑资料"
                is-link
                icon="edit"
                to=""
            />
            <van-cell
                class="mb-4"
                title="小思同学"
                is-link
                icon="more-o"
                to=""
            />
            <van-cell
                title="退出登录"
                class="login-exit"
            />
        </van-cell-group>
    </div>
</template>

<script>
export default {
    name: "My"
}
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