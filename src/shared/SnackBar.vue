<template>
  <v-snackbar :value="show" :multi-line="multiLine">
    {{ message }}
  </v-snackbar>
</template>
<script>
export default {
  props: ["message", "show"],
  name: "SnackBar",
  data: () => {
    return { multiLine: true };
  },
};
</script>
<style></style>
