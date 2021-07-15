<template>
  <div class=" d-flex justify-center flex-wrap">
    <a class="nav-item" v-for="item in navItems" :key="item.id">{{ item }}</a>
  </div>
</template>
<script>
  export default {
    name: "NavBar",
    data: function() {
      return {
        navItems: ["Popular", "Now Playing", "Upcoming", "Top Rated"],
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

    border-bottom: 1px solid;
  }
  .nav-item:hover {
    background-color: rgba(255, 255, 255, 0.048);
  }
</style>
