<template>

</template>

<script>
	export default {
		name: "ss"
	}
	Page({
		data: {
			list: [],
			index: 0,
			arrList: [],
			searchList: [
				{id: '601460003', name: '金皮卡'},
				{id: '601460004', name: '皮皮虾'},
				{id: '601460005', name: '小明同学'},
				{id: '601460006', name: '黄小白'},
			]
		},
		onLoad() {
			let that = this
			that.clearS = setInterval(() => {
				that.addModel()
				that.showModel()
			}, 2000)
		},
		seeDate() {
			console.table(this.data.arrList);
			this.clear()
			this.setData({
				arrList: []
			})
		},
		clear() {
			clearInterval(this.clearS)
		},
		addModel() {
			let that = this
			let i = this.data.index + 1
			let arr = that.data.list
			arr.push({id: '601460003', data: i + 5, bel: `${5 + i}%`})
			arr.push({id: '601460004', data: i + 6, bel: `${4 + i}%`})
			arr.push({id: '601460005', data: i + 7, bel: `${5 + i}%`})
			arr.push({id: '601460006', data: i + 8, bel: `${2 + i}%`})
			that.setData({
				list: arr,
				index: i
			})
		},
		showModel() {
			let that = this
			let a = this.data.index + 1
			let {list, searchList} = that.data
			let map = new Map()
			searchList.forEach(search => {
				list.forEach(list => {
					if (list.id === search.id) {
						map.set(list.id, {name: search.name, data: list.data, bel: list.bel, id: search.id})
					}
				})
			})
			let keys = map.values();
			that.setData({
				index: a,
				arrList: [...keys]
			})
			console.log(list);
			if (list.length > 100) {
				that.setData({
					list: [],
				})
			}
		},
	})

</script>

<style scoped>

</style>
