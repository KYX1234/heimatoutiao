<template>
    <div class="channel-eidt">
        <van-cell center :border="false">
            <div slot="title" class="channe-title">我的频道</div>
            <van-button
                plain
                type="danger"
                round
                size="mini"
                @click="isEdit=!isEdit"
            >{{isEdit?"完 成" :"编 辑"}}</van-button>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item
                class="grid-item"
                :class="{active:index===active}"
                v-for="(value,index) in channels"
                :key="index"
                :text="value.name"
                :icon="(isEdit&&index!==0)?'clear':''"
                @click="myChannelClick(index)"
            />
        </van-grid>
        <van-cell center :border="false">
            <div slot="title" class="channe-title">频道推荐</div>
        </van-cell>
        <van-grid :gutter="10">
            <van-grid-item
                class="grid-item"
                v-for="(value,index) in recommendChannels"
                :key="index"
                :text="value.name"
                @click="addChannel(value)"
            />
        </van-grid>
        <van-empty description="描述文字" v-show="recommendChannels.length===0" />
    </div>
</template>

<script>
import { getAllChannels, addUserChannels } from '@/api/homeAPI.js';
import { mapState } from 'vuex';
export default {
    name: 'ChannelEdit',
    props: {
        channels: {
            type: Array,
            require: true
        },
        active: {
            type: Number,
            require: true
        }
    },
    computed: {
        ...mapState(['usertoken']),
        //推荐的频道列表
        recommendChannels() {
            //使用所有频道-我的频道
            return this.allChannels.filter(item => {
                return !this.channels.find(channels => {
                    return channels.id === item.id;
                });
            });
        }
    },
    data() {
        return {
            allChannels: [], //所有频道的数据
            isEdit: false //控制编辑的关闭
        };
    },
    created() {
        this.loadAllChannels();
    },
    methods: {
        //获取所有频道数据
        async loadAllChannels() {
            const { data } = await getAllChannels();
            this.allChannels = data.data.channels;
        },
        //点击按钮添加频道
        async addChannel(channel) {
            this.channels.push(channel);
            //持久化
            if (this.usertoken) {
                //登录状态下调用接口updatechannel保存编辑的信息
                this.updateChannel();
            } else {
                //未登录状态下,存储本地
                localStorage.setItem(
                    'user-channels',
                    JSON.stringify(this.channels)
                );
            }
        },
        //封装更新我的频道数据
        async updateChannel() {
            // data 是一个数组，格式： [ {id, seq} ]
            const data = this.channels
                .filter(item => {
                    return item.name !== '推荐';
                })
                .map((item, index) => {
                    return {
                        id: item.id,
                        seq: index + 1
                    };
                });
            // console.log(data);
            const { data: res } = await addUserChannels(data);
            if (res.message === '更新用户频道成功') {
                // 3. 通过 notify 弹框提示用户更新成功
                this.$notify({
                    type: 'success',
                    message: '更新成功',
                    duration: 1000
                });
            }
        },
        //所有频道中的删除操作
        myChannelClick(index) {
            //编辑状态点击删除，完成状态跳转页面
            if (this.isEdit && index !== 0) {
                //删除高亮前的频道，需要更新父组件的active
                if (index <= this.active) {
                    this.$emit('update-active', this.active - 1);
                }
                this.channels.splice(index, 1);
                if (this.usertoken) {
                    this.updateChannel();
                } else {
                    //未登录状态下,存储本地
                    localStorage.setItem(
                        'user-channels',
                        JSON.stringify(this.channels)
                    );
                }
            } else {
                this.$emit('close');
                this.$emit('update-active', index);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.channel-eidt {
    padding-top: 54px;
    .channel-title {
        font-size: 16px;
        color: #333;
    }
    .grid-item {
        width: 80px;
        height: 43px;
        /deep/.van-grid-item__content {
            background-color: #f4f5f6;
            position: relative;
            .van-grid-item__text {
                color: #222;
                font-size: 14px;
                margin-top: 0;
            }
            .van-icon {
                position: absolute;
                right: -5px;
                top: -5px;
                font-size: 14px;
                color: #ccc;
                z-index: 22;
            }
        }
    }
    .active {
        /deep/.van-grid-item__text {
            color: red !important;
        }
    }
}
</style>