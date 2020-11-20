<template>
    <component :is="tagName" :class="classes" :disabled="loading" @click="handleClickLink">
        <Icon class="ivu-load-loop" type="ios-loading" v-if="loading"></Icon>
        <Icon :type="icon"  v-if="icon&& !loading"></Icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </component>
</template>
<script>
	const prefixCls = 'ivu-btn';
	import { oneOf } from '../../components/button/oneof'
	import Icon from '../icon';
	export default {
		name: 'Button',
        components:{Icon},
		props: {
			type: {
				// validator bljintian  这个值 必须匹配la bdt chu bajiu yue buganjie yue zhang baijiu wo jued youren jie de shih jiukais 下列 字符串 中的一个 ? //怪你过分美丽 怪我过分着迷 wxqstkl s yyz zydegj sbskk cc ryrxdgj hnbssjbl wxbyy

				type: String,
				validator(value) {
					return oneOf(value, ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error']);
				},
				default: 'default'
			},
			shape: {
				validator(value) {
					return oneOf(value, ['circle', 'circle-outline']);
				}
			},
			size: {
				validator(value) {
					return oneOf(value, ['small', 'large', 'default']);
				},
				default() {
					return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
				}
			},
			disabled: Boolean,
			loading: Boolean,
			icon: {
				type: String,
				default: ''
			},
			long: {
				type: Boolean,
				default: false
			},
			ghost: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				showSlot: false,
			}
		},
		methods: {
			handleClickLink(event) {
				this.$emit('click', event);
			}
		},
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					`${prefixCls}-${this.type}`,
					{
						[`${prefixCls}-long`]: this.long,
						[`${prefixCls}-${this.shape}`]: !!this.shape,
						[`${prefixCls}-${this.size}`]: this.size !== 'default',
						[`${prefixCls}-loading`]: this.loading != null && this.loading,//短路写法
						[`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon ||this.loading),
						[`${prefixCls}-ghost`]: this.ghost
					}
				];
			},
			NAME: {
				get() {
					return 'a'
				},
				set() {
					return 'b'
				}
			},
			tagName() {
				const {isHrefPattern} = this;
				return isHrefPattern ? 'a' : 'button';
			},
		},
		mounted() {
			this.showSlot = this.$slots.default !== undefined;
		}
	};
</script>
