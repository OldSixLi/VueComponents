<template>
    <div id="" class="container">
         
        <div class="row">
            <div class="col-md-12 form-inline">
            <label for="searchWord">搜索:</label>
            <input type="text" id="searchWord" name="searchWord" value="" class="form-control" placeholder="请输入搜索值">
            <button type="button" class="btn btn-success">搜索</button>
            </div>
        </div>
        <br>
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>第一列</th>
                    <th>第二列</th>
                    <th>第三列</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>数据1</td>
                    <td>数据2</td>
                    <td>
                        <router-link to="/user/info/1" class="btn btn-link">用户1</router-link>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>数据1</td>
                    <td>数据2</td>
                    <td>
                        <router-link to="/user/info/2" class="btn btn-link">用户2</router-link>
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>数据1</td>
                    <td>数据2</td>
                    <td>
                        <router-link to="/user/info/3" class="btn btn-link">用户3</router-link>
                    </td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>数据4</td>
                    <td>数据4</td>
                    <td>
                        <router-link to="/user/info/4" class="btn btn-link">用户4</router-link>
                    </td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>数据5</td>
                    <td>数据5</td>
                    <td>
                        <router-link to="/user/info/5" class="btn btn-link">用户5</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: "UserList",
        props: {
            //对外获取的数据
        },
        data: function() {
            //组件内数据部分
            return {}
        },
        mounted: function() {
            //组件生成时调用
        },
        methods: {}
    }
</script>
<style scoped>
     
</style>