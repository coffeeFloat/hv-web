<template>
  <el-container class="hv-container">
    <el-header height="50px" class="top-bar">
      <div class="btns">
        <el-button type="text" plain @click="openLoginDialog">登录</el-button>
        <el-button type="text" plain @click="openRegisterDialog">注册</el-button>
      </div>
    </el-header>
    <el-main>
      <AppMain />
    </el-main>
    <el-dialog
      custom-class="user-dialog"
      title="注册"
      :visible.sync="registerDialog"
      width="400px"
      :append-to-body="true" 
      :close-on-click-modal="false"
      :before-close="handleClose"
      :open="dialogOpen">
     <el-form :model="registerForm" :rules="registerRules" ref="registerRef" label-position="top">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="comfirmPsd">
          <el-input type="password" v-model="registerForm.comfirmPsd"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="registerDialog = false">取 消</el-button>
        <el-button style="margin-left: 20px" type="primary" @click="registerSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 登录 -->
    <el-dialog
      custom-class="user-dialog"
      title="登录"
      :visible.sync="loginDialog"
      width="400px"
      :append-to-body="true" 
      :close-on-click-modal="false"
      :before-close="loginHandleClose"
      :open="loginDialogOpen">
     <el-form :model="loginForm" :rules="loginRules" ref="loginRef" label-position="top">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialog = false">取 消</el-button>
        <el-button style="margin-left: 20px" type="primary" @click="loginSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import AppMain from './components/AppMain';
import { registerUser, logInUser } from '@/api/user';
import { Message } from 'element-ui';
export default {
  name: 'layout',
  components: {
    AppMain,
  },
  data() {
    return {
      loading: false,
      registerDialog: false,
      registerForm: {
        email: '',
        password: '',
        comfirmPsd: '',
      },
      registerRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        comfirmPsd: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
        ],
      },

      loginDialog: false,
      loginForm: {
        email: '',
        password: '',
      },
      loginRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    openRegisterDialog() {
      
      this.registerDialog = true;
    },
    loginDialogOpen() {
      this.$refs['registerRef'].resetFields();
    },
    registerSubmit() {
      this.$refs['registerRef'].validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          const { email, password, comfirmPsd } = this.registerForm;
          if (password !== comfirmPsd) {
            Message({
              message: '密码不一致',
              type: 'error',
            })
            this.loading = false
          } else {
            registerUser({ email, password }).then(res => {
              console.log(res);
               Message({
                message: '注册成功',
                type: 'success',
              })
              this.handleClose()
              this.loading = false
              window.location.reload();
            }).catch(err => {
              this.loading = false
            });
          }
          
        } else {
          this.loading = false;
        }
      });
    },
    handleClose() {
      this.registerDialog = false;
      this.$refs['registerRef'].resetFields();
    },

    /**
     * 登录相关方法
     * */
    openLoginDialog() {
      this.loginDialog = true;
    },
    dialogOpen() {
      this.$refs['loginRef'].resetFields();
    },
    loginHandleClose() {
      this.loginDialog = false;
      this.$refs['loginRef'].resetFields();
    },
    loginSubmit() {
      this.$refs['loginRef'].validate((valid) => {
        if (valid && !this.loading) {
          this.loading = true;
          const { email, password } = this.loginForm;
          logInUser({ email, password }).then(res => {
            console.log(res);
              Message({
              message: '登录成功',
              type: 'success',
            })
            this.loginHandleClose()
            this.loading = false
            window.location.reload();
          }).catch(err => {
            this.loading = false
          });
          
        } else {
          this.loading = false;
        }
      });
    },
  },
  
}
</script>
<style  lang="scss" scoped>
  .top-bar {
    background: #000;
    line-height: 50px;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    border-bottom: 1px solid #1c447a;
    &:hover {
      box-shadow: 0 3px 5px #1c447a ;
    }
  }
  .btns {
    text-align: right;
    .el-button {
      margin-left: 20px;
      &:hover {
        background: #000;
        border-color: #000;
        padding: 0;
        margin-left: 20px;
      }
      &:active {
         background: #000;
      }
    }
  }
  .user-dialog {
    text-align: left;
  }
</style>
<style lang="scss">
.user-dialog {
  .el-form-item__label {
    line-height: 30px;
    padding-bottom: 0;
  }
}

</style>