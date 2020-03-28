<template>
  <section class="container">
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-if="data">
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

export default {
  components: {
    userMostWins,
    userMostLoss,
    userName,
    PlayedChampions
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
    try {
      
      this.loading = true;
      const res = await axios.get(
        `/api/v1/${this.$route.params.platform}/${this.$route.params.name}`
      );
      this.data = res;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = true;
    }
  }
};
</script>

<style scoped>
.loading-search {
  margin-top: 50px;
}

.container {
  padding: 50px;
}
</style>
