<template>
    <div class="search-container">
        <!-- 搜索框 -->
        <form action="/">
            <van-search
                v-model="value"
                show-action
                background="#4fc08d"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="$router.back()"
            />
        </form>
        <!-- 联想建议 -->
        <search-suggestion></search-suggestion>
        <!-- 历史记录 -->
        <!-- 搜索结果 -->
    </div>
</template>

<script>
import SearchSuggestion from './components/SearchSuggestion.vue';
export default {
    name: 'search',
    components: {
        SearchSuggestion
    },
    data() {
        return {
            value: ''
        };
    },
    methods: {
        onSearch() {}
    }
};
</script>

<style lang="less" scoped>
</style>