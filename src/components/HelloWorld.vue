<template>
  <div class="hello">
     <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="用户名">
           <el-input v-model="form.name"></el-input>
         </el-form-item>
         <el-form-item label="密码">
           <el-input v-model="form.password"></el-input>
         </el-form-item>
       <!-- 进行登录的选项 --->
       <el-form-item>
         <el-button type="primary" @click="login">登录</el-button>
         <el-button>取消</el-button>
       </el-form-item>
       <!-- 进行登录的选型 -->
     </el-form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      form:{
        name:'',
        password:''
      }

    }
  },
  methods:{
    login(){
      //进行登录的操作
      this.$axios.post('/api/login/createAccount',{
        "account": this.form.name,
        "password": this.form.password
      })
        .then((res) => {
          //进行登录后的操作
           let param = {
             account: this.form.name,
             password: this.form.password
           };
          //创建一个用户
         return this.$axios.post('/api/login/createAccount',param);

      })
      .then((res) =>{
           //创建成功后返回的结果
            console.log("创建成功后返回的结果"+res);
      })
      .catch((reject) => {
         console.log("创建失败返回的结果:"+reject);
     })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    position:absolute;
    left:25%;
    top:25%;
    width:50%;
    height:50%;
  }
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
