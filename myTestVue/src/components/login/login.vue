<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="12">
      <el-card>
        <el-tabs type="card">
          <el-tab-pane label="账号登录">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="账户" prop="name">
                <el-input v-model="ruleForm.name" style="width: 50%" placeholder="输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" style="width: 50%" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="" prop="encode">
                <el-col :span="12">
                  <el-input v-model="ruleForm.encode" :maxlength='4' placeholder="请输入图形验证码">
                  </el-input>
                </el-col>
                <el-col :span="11">
                  <p @click="getEnCode" id="enCode" class="yzm2" style="overflow: hidden;"></p>
                </el-col>
              </el-form-item>
              <el-form-item label="" prop="code">
                <el-col :span="6">
                  <el-input v-model="ruleForm.code" :maxlength='4' placeholder="请输入短信验证码">
                  </el-input>
                </el-col>
               <el-col :span="11">
                 <el-button style="margin-left: 4%" type="primary" plain>获取短信验证码</el-button>
               </el-col>
              </el-form-item>
              <el-form-item style="margin-bottom: 0">
                <el-button type="primary" id="login" >登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="账户注册">账户注册</el-tab-pane>
        </el-tabs>

      </el-card>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        ruleForm: {
          name: '',
          password: '',
          encode:'',
          code:'',

        },
        rules: {
          name: [
            {required: true, message: '请输入账户名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入账户密码', trigger: 'blur'},
            {min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur'}
          ],
        }
      };
    },
    mounted(){
      this.getEnCode();
    },

    methods: {
      getEnCode() {
        this.$http.get('/login/enCode').then((response)=>{
          console.log(response);
          document.getElementById("enCode").innerHTML = response.data.data.data.img
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .yzm2 {
    margin: 0 0 0 10px;
    height: 40px;
    color: #fff;
    border: none;
    background: #cdd5d9;
    text-align: center;
  }
</style>
