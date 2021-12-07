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
            />
        </van-nav-bar>
        <!-- tab导航 -->
        <van-tabs v-model="active" class="channels-tab">
            <van-tab :key="item.id" :title="item.name" v-for="item in channels">
                <!-- 文章列表组件 -->
                <ArtIcle :channels="item"></ArtIcle>
            </van-tab>
        </van-tabs>
        <!-- 文章内容 -->
    </div>
</template>

<script>
import { getUserchannels } from '@/api/homeAPI.js';
import ArtIcle from '@/views/home/components/Article.vue';
export default {
    name: 'Home',
    components: {
        ArtIcle
    },
    data() {
        return {
            active: 0,
            channels: [] //频道列表
        };
    },
    created() {
        this.loadChannels();
    },
    methods: {
        //获取频道tab数据
        async loadChannels() {
            const { data } = await getUserchannels();
            // console.log(data.data);
            this.channels = data.data.channels;
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
    }
}
</style>
