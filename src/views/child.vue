<template>
    <div>{{title}}</div>
</template>

<script>
	export default {
		name: "child",
        props:{
			title:String
        },
		methods: {
			changeTitle(e){

				this.$emit('update:title',e)
				console.log(e,'ch');
			}
		},
	}
</script>

<style scoped>

</style>
