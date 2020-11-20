<template>
    <div>
        <button>子组件</button>
    </div>
</template>

<script>
	export default {
		props:['current'],
        data(){
			return{
				currentDate:'',
				year: '',
				month:'',
				date: '',
				allMothList:[],
            }
        },
        created(){
			this.year=this.current.slice(0,4)
			this.month=this.current.slice(6,7)
			this.date=this.current.slice(9,10)
		},
        methods:{
			happy(){
				alert(11)
            }
        }
	}
</script>

