<template>
    <div>
        <div id="myBtn" style="width: 200px;height:200px;background: wheat"></div>
        <p @click="dddd">dddd</p>
    </div>
</template>

<script>
	export default {
        data(){
			return{

            }
        },
        mounted(){
	        document.getElementById("myBtn").addEventListener("dblclick", this.displayDate);
	        //ruhe kuai su zuan dao shi wan ne  if(so esay?kenyan ziay ajiu sm da xaingmu le hao ekngdie a yome yici $name)
        },
		methods: {
			displayDate(){
				alert(1143)
			},
			dddd() {
				console.log(11);
			},
		}
	}
</script>
