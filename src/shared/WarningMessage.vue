<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-scale-transition>
          <p
            elevation="2"
            v-show="showMessage"
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
    props: ["message"],
    name: "WarningMessage",
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
