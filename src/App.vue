<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

	export default {
		name: 'App',
	}
</script>
<style>
    /*增加滑动丝质顺滑*/
    html, body {
        -webkit-overflow-scrolling: touch;
    }
</style>
