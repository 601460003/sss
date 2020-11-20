<template>

</template>

<script>
	Page({
		data: {
			list: [],
			index: 0,
			arrList: [],
			map: null,
		},
		onLoad() {
			let that = this
			this.data.arrList = [
				{id: '601460003', name: '金皮卡'},
				{id: '601460004', name: '皮皮虾'},
				{id: '601460005', name: '小明同学'},
				{id: '601460006', name: '黄小白'},
			]
			this.setData({
				arrList: this.data.arrList
			})
			setInterval(() => {
				that.addModel()
				that.showModel()
			}, 2000)
		},
		addModel() {
			let that = this
			let i = this.data.index + 1
			var map = new Map();
			map.set('601460003', {id: '601460003', data: i + 5, bel: `${5 + i}%`})
			map.set('601460004', {id: '601460004', data: i + 6, bel: `${6 + i}%`})
			map.set('601460005', {id: '601460005', data: i + 7, bel: `${7 + i}%`})
			map.set('601460006', {id: '601460006', data: i + 8, bel: `${8 + i}%`})
			that.setData({
				index: i,
				map
			})
		},
		showModel() {
			let that = this
			let a = this.data.index + 1
			let map = this.data.map;
			let tempArr = []
			this.data.arrList.forEach(search => {
				var obj = map.get(search.id)
				obj.name = search.name
				tempArr.push(obj)
			})
			that.setData({
				index: a,
				arrList: tempArr
			})
		},
	})
</script>

