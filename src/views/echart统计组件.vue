<template>
    <div style="width: 1000px;margin: 0 auto">
        <div style="float: left; width: 700px; height: 305px; margin: auto;" id="zhangzhiwei"></div>
    </div>
</template>

<script>
	import echarts from 'echarts';

	export default {
		data() {
			return {}
		},
		methods: {
			fn(){
			return
            },
			my(){
				let dataSourcePie = echarts.init(document.getElementById('zhangzhiwei'));
				let va = 'neng'
                for(var i = 0;i<7;i++){
					let arr = []
                }
				const option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效   222225.yyyiiimmdd tai nanale
							type: 'line'         //|| 默认为直线，可选为：'line' | 'shadow12 mubiao wozhendebugankan du nameda
						}
					},
					legend: {
						orient: 'vertical',
						left: 'right',
                        data: ['门禁', '校车', '小车'],
						textStyle: {
							color: '#333'          // 图例文字颜色
						}
					},
					grid: {
						x: 80,
						y: 60,
						x2: 80,
						y2: 60,
						// width: {totalWidth} - x - x2,
						// height:{totalHeight} - y - y2,[]
						backgroundColor: 'rgba(0,0,0,0)',
						borderWidth: 1,
					},
					xAxis: {
						data: ['1年级', '2年级', '3年级', '4年级', '5年级', '6年级']
					},
					yAxis: {
						type: ''
                    },
					color:['rgb(255, 0, 0)','rgb(255, 255, 0)','rgb(0, 176, 80)','rgb(0, 112, 192)'],
					label: {
						show: true,
						position: 'insideBottom',
						color: '#333',
					},
					series: [
						{
							name: '门禁',
							type: 'bar',
							stack: '总量',
							label: {
								show: true,
								position: 'insideRight'
							},
							data: [320, 302, 301, 334, 390, 330, 320]
						},
						{
							name: '校车',
							type: 'bar',
							stack: '总量',
							label: {
								show: true,
								position: 'insideRight'
							},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '小车',
							type: 'bar',
							stack: '总量',
							label: {
								show: true,
								position: 'insideRight'
							},
							data: [220, 182, 191, 234, 290, 330, 310]
						},
					]
				};
				dataSourcePie.setOption(option);
				window.addEventListener('resize', function () {
					dataSourcePie.resize();
				});
			}
		},
		mounted() {
			this.my()
		},
	}
</script>
