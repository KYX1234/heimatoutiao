<template>
    <div class="article-container" ref="article">
        <van-empty description="没有数据~" v-if="showActive" />
        <van-pull-refresh
            v-model="isRefreshLoading"
            @refresh="onRefresh"
            :disabled="finished"
            :success-text="successtext"
            success-duration="1000"
        >
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :immediate-check="false"
                @load="onLoad"
                ref="articles"
            >
                <ActicleItem v-for="(item,index) in acticleslist" :key="index" :article="item"></ActicleItem>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/homeAPI.js';
import ActicleItem from '@/components/aticle-item/Acticle-item.vue';
export default {
    components: { ActicleItem },
    name: 'ArtIcle',
    props: {
        channels: {
            type: Object,
            required: true
        }
    },
    created() {
        this.onLoad();
    },
    data() {
        return {
            acticleslist: [],
            loading: false, //当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true数据更新完毕后，将 loading 设置成 false
            finished: false, //数据已全部加载完毕，则直接将 finished 设置成 true
            timestamp: Date.now(), //请求数据的时间戳
            showActive: false, //空占位符
            isRefreshLoading: false, //下拉刷新为true，关闭为false
            successtext: '',
            scrollTop: 0
        };
    },
    methods: {
        //获取更多数据
        async onLoad() {
            // 1.请求获取数据
            const { data } = await getArticles({
                channel_id: this.channels.id, //频道id
                timestamp: this.timestamp //时间戳，请求新的推荐传当前时间戳，请求历史推荐传指定时间戳
            });
            // console.log(data);
            if (data.message === 'OK') {
                //2.数据存入list
                this.acticleslist.push(...data.data.results);
                //3.设置加载状态结束
                this.loading = false;
                //将这次的时间戳记录下，用于下次传参
                this.timestamp = data.data.pre_timestamp;
                //如果请求数据为空，展示空占位符
                if (data.data.results.length === '0') {
                    this.showActive = true;
                }
            }
            //4.数据全部加载完毕
            if (data.data.pre_timestamp === null) {
                this.finished = true;
            }
        },
        //下拉刷新
        async onRefresh() {
            // 1.请求获取文章数据
            const { data } = await getArticles({
                channel_id: this.channels.id, //频道id
                timestamp: this.timestamp
            });
            // 2.头部追加数据
            if (data.message === 'OK') {
                this.timestamp = data.data.pre_timestamp;
                this.acticleslist.unshift(...data.data.results);
                this.successtext = `更新了${data.data.results.length}条数据`;
                // 2.将下拉刷新状态重置
                this.isRefreshLoading = false;
                if (data.data.pre_timestamp === null) {
                    this.finished = true;
                }
            }
        },
        handleScroll() {
            this.scrollTop = this.$refs.article.scrollTop;
        }
    },
    mounted() {
        this.$refs.article.addEventListener('scroll', this.handleScroll);
    },
    activated() {
        this.$refs.article.scrollTop = this.scrollTop;
    },
    deactivated() {
        this.$refs.article.removeEventListener('scroll', this.handleScroll);
    }
};
</script>

<style lang="less" scoped>
.item {
    position: fixed;
    top: 220px;
    z-index: 22;
}
.article-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
}
</style>