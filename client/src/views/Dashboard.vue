<script setup>
// 仪表盘页面逻辑你来写
</script>

<template>
  <div class="dashboard-container">
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
          <router-link to="/dashboard" class="nav-item active">首页</router-link>
          <router-link to="/articles" class="nav-item">文章管理</router-link>
        </nav>
      </aside>

      <!-- 主内容区 -->
      <main class="content">
        <h1>仪表盘</h1>
        <div class="stats-cards">
          <div class="stat-card">
            <h3>文章总数</h3>
            <p class="number">0</p>
          </div>
          <div class="stat-card">
            <h3>今日新增</h3>
            <p class="number">0</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
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

.content h1 {
  margin-bottom: 20px;
  color: #333;
}

.stats-cards {
  display: flex;
  gap: 20px;
}

.stat-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}

.stat-card h3 {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.stat-card .number {
  font-size: 32px;
  color: #409eff;
  font-weight: bold;
}
</style>
