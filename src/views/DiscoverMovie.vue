<template>
  <v-container
    class="d-flex flex-column justify-center"
    style="min-height:80vh;"
  >
    <div>
      <v-row class="justify-center align-center row-wrapper">
        <v-col cols="12" md="3">
          <v-card>
            <v-img contain :src="movie.Poster" class="rounded">
              <v-card-title
                class="align-end justify-center fill-height"
                primary-title
              >
                <v-btn class="py-1 px-5" color="netflix">
                  Book Now
                </v-btn>
              </v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="5">
          <v-card color="dark" dark class="rounded-1">
            <div
              class="d-flex flex-no-wrap justify-space-between text-left pa-3"
            >
              <div>
                <v-card-title
                  class="text-h5 netflix--text"
                  v-text="movie.Title"
                ></v-card-title>

                <div class="d-flex pl-4">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <div class="grey--text ms-4">
                    4.5 (413)
                  </div>
                </div>

                <v-card-text class="grey--text ">
                  <div class="d-flex my-2">
                    <span class="me-3"
                      ><span class="white--text">Genre: </span>
                      {{ movie.Genre }}</span
                    >
                    <span
                      ><span class="white--text">Awards: </span>
                      {{ movie.Awards }}</span
                    >
                  </div>

                  <p>
                    {{ movie.Plot }}
                  </p>
                  <p>{{ movie.Production }}</p>
                </v-card-text>

                <v-card-actions>
                  <div class="d-flex flex-wrap">
                    <div v-for="actor in actors" :key="actor.id" class="actor">
                      {{ actor }}
                    </div>
                  </div>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
  export default {
    name: "DiscoverMovie",
    data: () => ({}),
    created() {
      if (!this.$route.params.id) this.$router.push("/");
      this.$store.dispatch("discoverMovie", this.$route.params.id);

      this.id = this.$route.params.id;
    },
    computed: {
      movie() {
        return this.$store.state.discoverMovieData;
      },
      actors() {
        if (this.movie.Actors) return this.movie.Actors.split(",");
        return [];
      },
    },
  };
</script>
<style scoped>
  .actor {
    margin: 0 1rem;
    color: white;
    border-bottom: 1px solid #ff2a1fb9;
  }
  .row-wrapper {
    box-shadow: 2px 4px 10px 4px rgba(255, 44, 31, 0.59);
  }
</style>
