<template>
  <div class="text-left ps-4 d-flex align-center pb-5">
    <span class="font-weight-bolder">{{ formatedRating }}</span>
    <img src="../assets/images/icons/star.png" width="20" class="ms-5" alt="" />
  </div>
</template>
<script>
export default {
  props: ["rating"],
  name: "Rating",
  computed: {
    formatedRating() {
      return `${this.rating} / 10`;
    },
  },
};
</script>
<style></style>
