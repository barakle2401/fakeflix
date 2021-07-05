<template>
  <div>
    <a :href="href" @click.prevent="scroll"></a>
  </div>
</template>
<script>
  export default {
    name: "ScrollLink",
    props: ["href"],
    methods: {
      scroll() {
        document
          .querySelector(this.href)
          .scrollIntoView({ behavior: "smooth" });
      },
    },
  };
</script>
<style></style>
