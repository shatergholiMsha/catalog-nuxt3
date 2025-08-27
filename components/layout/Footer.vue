<template>
  <footer class="site-footer">
    <div class="container">
      <p>© {{ new Date().getFullYear() }}Renotive Catalog—with Nuxt3</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #252525;
  padding: 1rem 0;
  border-top: 1px solid #2f2f2f;
  font-size: 0.9rem;
  text-align: center;
  color: #00ff00;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
