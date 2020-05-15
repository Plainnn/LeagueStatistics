<template>
  <section class="container">
    <div v-if="error">
      <ErrorHandle :errorMsg="error" />
    </div>
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-if="this.data" class="my-12">
      <userName class="my-12"></userName>
      <userMostWins :data="data" class="my-12"></userMostWins>
      <userMostLoss :data="data" class="my-12"></userMostLoss>
      <PlayedChampions :data="data.data.winRate" class="my-12"></PlayedChampions>
      <UserMastery :data="this.$route.params" class="my-12"></UserMastery>
      <v-row class="text-center my-12" justify="center">
        <hr />
        <h1 class="text-center my-6">Creep Score Comparison</h1>
        <hr />
      </v-row>
      <UserCreepScore class="my-12"></UserCreepScore>
      <v-row class="text-center my-12" justify="center">
        <hr />
        <h1 class="text-center my-6">{{ this.$route.params.name }}'s Latest Match Timeline</h1>
        <hr />
      </v-row>
      <UserMatchTimeline class="mt-12" />
    </div>
  </section>
</template>

<script>
const axios = require("axios");

import UserMatchTimeline from "../components/UserMatchTimeline";
import userMostWins from "../components/userMostWins";
import UserCreepScore from "../components/UserCreepScore";
import userMostLoss from "../components/userMostLoss";
import userName from "../components/userName";
import PlayedChampions from "../components/PlayedChampions";
import UserMastery from "../components/UserMastery";
import ErrorHandle from "../components/util/ErrorHandle";

export default {
  components: {
    userMostWins,
    userMostLoss,
    userName,
    PlayedChampions,
    ErrorHandle,
    UserMastery,
    UserCreepScore,
    UserMatchTimeline
  },
  name: "userProfile",
  data() {
    return {
      loading: false,
      error: false,
      data: null
    };
  },
  beforeCreate() {},
  async created() {
    /*eslint-disable */

    try {
      this.loading = true;
      const res = await axios.get(
        `/api/v1/${this.$route.params.platform}/${this.$route.params.name}`
      );
      this.data = res;
      console.log(res.data);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = error;
      console.log(error);
    }
  }
};
</script>

<style>
.loading-search {
  margin-top: 50px;
}

.container {
  padding: 50px;
}

.summoner-champion-bw-img {
  max-width: 100%;
  height: auto;
  width: auto; /* for ie9 */
}
</style>
