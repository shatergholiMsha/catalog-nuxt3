<template>
  <div class="layout-default">
    <LayoutHeader />
    <main class="site-main">
      <NuxtPage />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: auto;
  background-color: #1e1e1e;
  color: #f5f5f5;
  width: 100%;
  max-width: 1880px;
  min-width: 375px;
  margin: 0 auto;
}
.site-main {
  flex: 1;
  padding: 1rem;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 80px;
  height: auto;
}
</style>
