<template>
  <header class="site-header">
    <div class="container">
      <h1 class="logo">Renotive Catalog</h1>
      <nav class="nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/products/create">Create Product</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background-color: #252525;
  padding: 10px 0;
  border-bottom: 1px solid #2f2f2f;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #00ff00;
  text-shadow:
    0 0 5px #00ff00,
    0 0 10px #00ff00;
}
.nav {
  display: flex;
  gap: 1rem;
}
.nav a {
  color: #00ff0072;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 4px;
}
.nav a:hover {
  background-color: #00ff0076;
;
}
@media (max-width: 600px) {
  .container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
