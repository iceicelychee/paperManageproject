<script setup>
import { ref, onMounted, reactive } from 'vue'
import request from '../api/request'

const form = reactive({
    title: '',
    content: ''
})


const articles = ref([])
const showForm = ref(false)     
const isEdit = ref(false)
const editId = ref(null)

// 打开编辑模态框
const openEditModal = (article) => {
  isEdit.value = true
  editId.value = article.id
  form.title = article.title
  form.content = article.content
  showForm.value = true
}


// 获取文章列表
const getArticles = async () => {
    const res = await request.get('/articles')
    articles.value = res.data.data
    }

// 提交(新增文章/编辑文章)
const submitArticle = async () => {
   try{
      let res
      if(isEdit.value){
        // 编辑文章
        res = await request.put(`/articles/${editId.value}`, {
          title: form.title,
          content: form.content
        })
      }else{
        res = await request.post('/articles', {
          // 新增文章
          title: form.title,
          content: form.content
        })
      }

       if( res.data.code === 200) {
        alert(isEdit.value ? '更新成功' : '添加成功')
        showForm.value = false
        getArticles()
        resetForm()
    }

   }catch(error) {
    alert('操作失败，请检查网络')
    console.error(error)
   }
   
}

// 重置表单
const resetForm = () => {
  form.title = ''
  form.content = ''
  isEdit.value = false
  editId.value = null
}

// 删除文章
const deleteArticle = async (id) => {
  if(!confirm('确定要删除这篇文章吗？')) {
    return 
  }
  try {
    const res = await request.delete(`/articles/${id}`)
    if(res.data.code === 200) {
      alert('删除成功')
      getArticles()
    }else{
      alert(res.data.msg || '删除失败')
    }
  }catch(error) {
    alert('删除失败，请检查网络')
    console.error(error)
  }
}

// 编辑文章
const updateArticle = async (id) => {
  const res = await request.put(`/articles/${id}`, {
    title: form.title,
    content: form.content
  })
  if(res.data.code === 200) {
    alert('更新成功')
    getArticles()
  }
}
 
// 页面加载时获取文章列表
onMounted(() => {
    getArticles()
})
</script>

<template>
  <div class="articles-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="logo">文章管理系统</div>
      <div class="user-info">
        <span>欢迎，用户</span>
        <button class="logout-btn">退出登录</button>
      </div>
    </header>

    <div class="main-content">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <nav>
          <router-link to="/dashboard" class="nav-item">首页</router-link>
          <router-link to="/articles" class="nav-item active">文章管理</router-link>
        </nav>
      </aside>

      <!-- 主内容区 -->
      <main class="content">
        <div class="page-header">
          <h1>文章管理</h1>
          <button class="add-btn" @click="showForm = true">+ 新增文章</button>
        </div>
        <!-- 新增文章模态框 -->
        <div class="modal-overlay" v-if="showForm" @click="showForm = false">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h3>{{ isEdit ? '编辑文章' : '新增文章' }}</h3>
              <button class="close-btn" @click="showForm = false">×</button>
            </div>
            <form @submit.prevent="addArticle">
              <div class="form-group">
                <label for="title">标题：</label>
                <input type="text" id="title" v-model="form.title" required placeholder="请输入文章标题">
              </div>
              <div class="form-group">
                <label for="content">内容：</label>
                <textarea id="content" v-model="form.content" required placeholder="请输入文章内容" rows="6"></textarea>
              </div>
              <div class="form-actions">
                <button type="button" class="cancel-btn" @click="showForm = false">取消</button>
                <button type="submit" class="submit-btn" @click="submitArticle">提交</button>
              </div>
            </form>
          </div>
        </div>

        <!-- 文章列表 -->
        <div class="article-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>标题</th>
                <th>内容摘要</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
             <!-- 数据行你来渲染 -->
            <tbody>
                <tr v-if="articles.length > 0" v-for="article in articles" :key="article.id">
                    <td>{{ article.id }}</td>
                    <td>{{ article.title }}</td>
                    <td>{{ article.content }}</td>
                    <td>{{ article.created_at }}</td>
                    <td>
                      <button class="edit-btn" @click="openEditModal(article)">编辑</button>
                      <button class="delete-btn" @click="deleteArticle(article.id)">删除</button>
                    </td>
                </tr>
             
              <tr v-if="articles.length === 0">
                <td colspan="5" class="empty-text">暂无数据</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.articles-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: 60px;
  background-color: #409eff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  padding: 6px 12px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 200px;
  background-color: #304156;
  padding: 20px 0;
}

.nav-item {
  display: block;
  padding: 15px 20px;
  color: #bfcbd9;
  text-decoration: none;
  transition: all 0.3s;
}

.nav-item:hover,
.nav-item.active {
  background-color: #263445;
  color: #409eff;
}

.content {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h1 {
  color: #333;
}

.add-btn {
  padding: 10px 20px;
  background-color: #67c23a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

.modal-header h3 {
  margin: 0;
  color: #303133;
  font-size: 18px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #909399;
  cursor: pointer;
  line-height: 1;
}

.close-btn:hover {
  color: #606266;
}

.modal-content form {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #606266;
  font-size: 14px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #409eff;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.cancel-btn:hover {
  background-color: #f5f7fa;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn:hover {
  background-color: #66b1ff;
}

.add-btn:hover {
  background-color: #85ce61;
}

.article-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

th {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: 600;
}

td {
  color: #606266;
}

.empty-text {
  text-align: center;
  color: #909399;
  padding: 40px;
}
</style>
