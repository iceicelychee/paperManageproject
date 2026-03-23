<script setup>

import { ref } from 'vue'
import request from '../api/request'
import router from '../router/index'

const username = ref('')
const password = ref('')

const login = async () => {
    const res = await request.post('/login', {
        username: username.value,
        password: password.value
    })

    try{
        if(res.data.code === 200) {
            localStorage.setItem('token', res.data.token)
            router.push('/dashboard')
        }else{
            alert(res.data.msg || '登录失败')
        }
    }catch(error){
        alert('登录请求失败，请检查网络')
        console.error(error)
    }
}

</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>用户登录</h2>
      <form @submit.prevent>
        <div class="form-item">
          <label>用户名</label>
          <input type="text" placeholder="请输入用户名" v-model="username" />
        </div>
        <div class="form-item">
          <label>密码</label>
          <input type="password" placeholder="请输入密码" v-model="password"/>
        </div>
        <button type="submit" class="login-btn" @click="login">登录</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 360px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.form-item input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-item input:focus {
  outline: none;
  border-color: #409eff;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.login-btn:hover {
  background-color: #66b1ff;
}
</style>
