<template>
    <div class="text-center well container">
        <h3>{{userInfoObj.name}},您好,您的年龄是: {{userInfoObj.age}},您当前的牌号号码是:{{$route.params.id}}</h3> 
        <p>
            <router-link to="/user/list" class="btn btn-link">返回列表</router-link>
        </p>
    </div>
</template>
<script>
    export default {
        name: "UserInfo",
        props: {  
        //对外获取的数据
        },
        data: function() {
        //组件内数据部分
        return {  
            userInfoObj:{
                name:"",
                age:0
            }
        }
        },
        mounted: function() {  
        //组件生成时调用
        let userListObj={
            1:{
                "name":"周杰伦",
                "age":"45"
            },
            2:{
                "name":"蔡依林",
                "age":"30"
            },3:{
                "name":"刘德华",
                "age":"55"
            },4:{
                "name":"倪妮",
                "age":"18"
            },5:{
                "name":"苏阳",
                "age":"43"
            },
            155:{
                "name":"满汉全席",
                "age":"200"
            }
        }
        const userid=this.$route.params.id;
        this.userInfoObj=userListObj[userid];
        // alert(id)
        },
        methods:{
        }
        ,beforeRouteEnter (to, from, next) {
            next(vm => {
                // 无法访问this,只能通过 `vm` 访问组件实例
                console.log(vm);
                console.log(this);
            });
        },
        beforeRouteLeave: (to, from, next) => {
            //TODO 2017年12月10日17:28:50这个地方和 https://router.vuejs.org/zh-cn/advanced/navigation-guards.html 描述的不一致
            // 输出的this根本不是当前组件的实例,需要仔细查看下,找到原因
            // 当前网上的资料都在关心beforeRouteEnter的this,但是这个的this大家难道都没发现吗
            // 先给皇上做饭去,明天整
            console.log( this);
            let result = confirm(",您确认离开此页面吗?");
            next(result);
          }
    }
</script>
<style scoped> 

</style> 