<template>
    <div class="article-container">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item,index) in acticleslist" :key="index" :title="item.title" />
        </van-list>
    </div>
</template>

<script>
import { getArticles } from '@/api/homeAPI.js';
export default {
    name: 'ArtIcle',
    props: {
        channels: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            acticleslist: [],
            loading: false, //当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true数据更新完毕后，将 loading 设置成 false
            finished: false, //数据已全部加载完毕，则直接将 finished 设置成 true
            timestamp: null
        };
    },
    methods: {
        async onLoad() {
            // 1.请求获取数据
            const { data } = await getArticles({
                channel_id: this.channels.id, //频道id
                timestamp: this.timestamp || Date.now() //时间戳，请求新的推荐传当前时间戳，请求历史推荐传指定时间戳
            });
            console.log(data);
            //2.数据存入list
            this.acticleslist.push(...data.data.results);
            //3.设置加载状态结束
            this.loading = false;
            //4.数据全部加载完毕
            if (data.data.results.length) {
                this.timestamp = data.data.pre_timestamp;
            } else {
                this.finished = true;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.article-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 90px;
    bottom: 50px;
    overflow-y: auto;
}
</style>