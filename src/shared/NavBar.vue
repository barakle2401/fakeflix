<template>
  <div class="d-flex justify-start justify-md-center flex-wrap">
    <router-link
      v-for="item in navItems"
      :key="item.id"
      :to="item.path"
      class="nav-item"
      v-text="item.name"
    ></router-link>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data: function () {
    return {
      navItems: [
        { name: "Search", path: "/" },
        { name: "Popular", path: "/popular" },
        { name: "Now Playing", path: "/now-playing" },
        { name: "Upcoming", path: "/upcoming" },
        { name: "Favorites", path: "/favorites" },
      ],
    };
  },
};
</script>
<style>
.nav-item {
  padding: 0.25rem 1rem;
  margin: 1rem;
  font-size: 1.3rem;
  letter-spacing: 0.5px;
  border: 1px silver;
  text-decoration: none;
  border-bottom: 1px solid;
}

.nav-item.router-link-exact-active,
.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.048);
}
</style>
