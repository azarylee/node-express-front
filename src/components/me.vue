<template>
    <div>
        {{list}}
    </div>
</template>

<script>
export default {
    name: 'me',
    data:()=>({
        list: []
    }),
    mounted(){
        this.$store.dispatch('getMe').then(res=>{
            console.log(res)
            this.list = res
        }).catch(err=>{
            console.log(err)
        })
    },
}
</script>