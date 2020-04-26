<template>
  <section class="container">
    <div v-if="error">
      <ErrorHandle :errorMsg="error" />
    </div>
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-if="this.data">
      <userName></userName>
      <userMostWins :data="data"></userMostWins>
      <userMostLoss :data="data"></userMostLoss>
      <PlayedChampions :data="data.data.winRate"></PlayedChampions>
    </div>
  </section>
</template>

<script>
const axios = require('axios');

import userMostWins from '../components/userMostWins';
import userMostLoss from '../components/userMostLoss';
import userName from '../components/userName';
import PlayedChampions from '../components/PlayedChampions';
import ErrorHandle from '../components/util/ErrorHandle';

export default {
  components: {
    userMostWins,
    userMostLoss,
    userName,
    PlayedChampions,
    ErrorHandle
  },
  name: 'userProfile',
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
