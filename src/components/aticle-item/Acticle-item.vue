<template>
    <van-cell>
        <template #title>
            <div class="article-item">
                <p class="van-multi-ellipsis--l2">{{article.title}}</p>
                <van-image
                    fit="cover"
                    v-if="article.cover.type===1"
                    :src="article.cover.images[0]"
                    lazy-load
                />
            </div>
            <div v-if="article.cover.type===3" class="acticleimg-box">
                <van-image
                    fit="cover"
                    v-for="(img,index) in article.cover.images"
                    :key="index"
                    :src="img"
                    lazy-load
                />
            </div>
        </template>

        <div slot="label" class="article-label">
            <span>
                作者&nbsp;{{article.aut_name}}&nbsp;&nbsp;
                评论数&nbsp;{{article.comm_count}}&nbsp;&nbsp;
                发布日期&nbsp;{{ article.pubdate | relativeTime }}
            </span>
            <van-icon name="cross"></van-icon>
        </div>
    </van-cell>
</template>

<script>
export default {
    name: 'ActicleItem',
    props: {
        article: {
            type: Object,
            require: true
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="less" scoped>
.acticleimg-box {
    display: flex;
    justify-content: space-between;

    .van-image {
        &:not(:last-child) {
            margin-right: 4px;
        }
        /deep/ img {
            width: 115px;
            height: 73px;
            object-fit: cover;
        }
    }
}
.article-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-image {
        margin-left: 12px;
        /deep/ img {
            width: 115px;
            height: 73px;
            object-fit: cover;
        }
    }
}
.article-label {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>