<template>
    <div class="bg_attend" style="overflow-x: hidden;">
        <div class="header_top" style="background: none;">
            <p style="position: absolute;right:1rem;">
                <el-button type="primary" ><span style="font-size: 1.4rem;color:#fff">同步数据</span></el-button>
            </p>
            <a class="iconfont icon-xiajiantou date_back"></a>
            <p class="dateHeader">锁管理</p>
        </div>
        <div class="listBox_user">
            <ul>
                <li style="position: relative">
                    <a>
                        锁1
                    </a>
                    <div class="iconfont arrow_iconS"></div>
                </li>
                <li style="position: relative">
                    <a>
                        锁2
                    </a>
                    <div class="iconfont arrow_iconS"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				userData: {}
			}
		},
		methods: {}
	}
</script>

<style scoped>
    .arrow_iconS:after {
        position: absolute;
        content: "\e6c9";
        right: 0.5rem;
        margin-top: -1.4rem;
        top: 50%;
        font-size: 1.6rem;
        color: #ccc;
        transform: rotate(270deg);
    }

    .listBox_user li:last-child {
        border-bottom: none;
    }
</style>
