<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-scale-transition>
          <p
            v-show="showMessage"
            elevation="2"
            class="text-h6 text-primary pa-5"
          >
            {{ message }}
          </p>
        </v-scale-transition>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "WarningMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data: () => {
    return {
      showMessage: false,
    };
  },
  created() {
    setTimeout(() => {
      this.showMessage = true;
    }, 500);
  },
};
</script>
<style scoped></style>
