<template>
       <div>
           <template>
               <check-in :checkIns="checkIns" />
           </template>
       </div>
</template>

<script>

	export default {
		props:['current'],
        data(){
			return{
				checkIns: ['2019-12-15', '2019.12.18', 1576250061182]
            }
        },
        methods:{

        }
	}
</script>

