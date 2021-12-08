<template>
    <div class="home-container">
        <!-- 头部navbar区域 -->
        <van-nav-bar class="head" left-text="黑马头条">
            <van-search
                class="search"
                background="unset"
                placeholder="搜索"
                shape="round"
                slot="right"
                @click="search"
            />
        </van-nav-bar>
        <!-- tab导航 -->
        <van-tabs v-model="active" class="channels-tab">
            <van-tab
                :key="item.id"
                :title="item.name"
                v-for="item in channels"
                class="channel-tab-wrap"
            >
                <!-- 文章列表组件 -->
                <ArtIcle :channels="item" ref="article"></ArtIcle>
            </van-tab>
            <!-- 按钮挡住最后一个频道了，声明一个占位符 -->
            <div slot="nav-right" class="nav-placeholder"></div>
            <!-- 汉堡按钮 -->
            <div
                slot="nav-right"
                class="channel-btn"
                @click="isChannelEidtShow=true"
            >
                <van-icon name="wap-nav" />
            </div>
        </van-tabs>
        <!-- 文章频道列表 -->
        <van-popup
            v-model="isChannelEidtShow"
            closeable
            position="bottom"
            close-icon-position="top-left"
            :style="{ height: '100%' }"
            get-container="body"
        >
            <!-- 频道 编辑组件 -->
            <channel-edit
                :channels="channels"
                @close="isChannelEidtShow=false"
                @update-active="active=$event"
                :active="active"
            ></channel-edit>
        </van-popup>
    </div>
</template>

<script>
import { getUserchannels } from '@/api/homeAPI.js';
import ArtIcle from '@/views/home/components/Article.vue';
import ChannelEdit from '@/views/home/components/channel-edit.vue';
import { mapState } from 'vuex';
export default {
    name: 'Home',
    components: {
        ArtIcle,
        ChannelEdit
    },
    computed: {
        ...mapState(['usertoken'])
    },
    data() {
        return {
            active: 0,
            channels: [], //频道列表
            isChannelEidtShow: false //控制频道编辑入口显示状态
        };
    },
    created() {
        this.loadChannels();
    },
    methods: {
        //获取用户频道tab数据
        async loadChannels() {
            //如果已经登录，获取接口的tab信息
            let userChannels = [];
            if (this.usertoken) {
                const { data } = await getUserchannels();
                userChannels = data.data.channels;
            } else {
                //没有登录,判断本地是否有数据
                const localChannels = JSON.parse(
                    localStorage.getItem('user-channels')
                );
                //本地有数据，使用本地
                if (localChannels) {
                    userChannels = localChannels;
                } else {
                    const { data } = await getUserchannels();
                    userChannels = data.data.channels;
                }
            }
            this.channels = userChannels;
        },
        search() {
            this.$router.push('search');
        }
    }
};
</script>

<style lang="less" scoped>
.home-container {
    .head {
        /deep/.van-nav-bar__text {
            color: #fff;
        }
        .search {
            height: 30px;
            width: 180px;
            .van-search__content {
                background-color: #5babfb;
            }

            .van-search .van-cell {
                padding: 0;
            }
            .van-cell {
                padding: 0;
            }
            /deep/.van-field__control {
                font-size: 12px;
                color: #fff;
            }
            /deep/ .van-icon {
                color: #fff;
            }
            /deep/ input::-webkit-input-placeholder {
                /* WebKit browsers 适配谷歌 */
                color: #fff;
            }
        }
    }
    .channels-tab {
        /deep/.van-tab {
            border-right: 1px solid #edeff3;
            border-bottom: 1px solid #edeff3;
        }
        /deep/ .van-tabs__line {
            width: 15px;
            height: 3px;
            background-color: #3296fa;
            bottom: 20px;
        }
        .nav-placeholder {
            width: 24px;
            flex-shrink: 0;
            border-bottom: 1px solid #edeff3;
        }
        .channel-btn {
            position: fixed;
            right: 0;
            height: 43px;
            line-height: 43px;
            font-size: 24px;
            text-align: center;
            width: 33px;
            background-color: #fff;
            opacity: 0.8;
            &::before {
                content: '';
                height: 30px;
                position: absolute;
                top: 6px;
                left: 0;
                display: block;
                border-left: 2px solid #ccc;
            }
        }
    }
}
</style>
