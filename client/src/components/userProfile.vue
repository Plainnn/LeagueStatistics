<template>
  <section class="container">
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="error">
      <h1>{{ error }}</h1>
      <router-link to="/">Try Again</router-link>
    </div>
    <div class="userRank container">
      <div class="row">
        <div class="col-sm-3 sum-name">
          <h1>{{ summonerName }}</h1>
          <h2>{{ summonerLeagueName }}</h2>
        </div>
        <div class="col-sm-9 sum-rank">
          <h2>{{ `${summmonerTier} ${summmonerRank}` }}</h2>
          <h2>{{ `${summonerLp} LP` }}</h2>
        </div>
      </div>
      <hr />
      <userMostWins> </userMostWins>
      <userMostLoss></userMostLoss>
    </div>
  </section>
</template>

<script>
const axios = require('axios');
import userMostWins from '../components/userMostWins';
import userMostLoss from '../components/userMostLoss';

export default {
  components: {
    userMostWins,
    userMostLoss
  },
  name: 'userRank',
  data() {
    return {
      loading: false,
      error: false,
      data: null,
      name: null,
      platform: null,
      summonerName: null,
      summmonerTier: null,
      summmonerRank: null,
      summonerWins: null,
      summonerLosses: null,
      summonerWinLoss: null,
      summonerLp: null,
      summonerLeagueName: null
    };
  },
  beforeCreate() {
    document.body.className = 'background-image';
    this.loading = true;
  },
  async created() {
    try {
      this.loading = true;
      const res = await axios.get(
        `/api/v1/getrank/${this.$route.params.platform}/${this.$route.params.name}`
      );

      this.data = res.data;
      this.summonerName = res.data.data.summonerName;
      this.summmonerTier = res.data.data.summmonerTier;
      this.summmonerRank = res.data.data.summmonerRank;
      this.summonerWins = res.data.data.summonerWins;
      this.summonerLosses = res.data.data.summonerLosses;
      this.summonerWinLoss = res.data.data.summonerWinLoss;
      this.summonerLp = res.data.data.summonerLp;
      this.summonerLeagueName = res.data.data.summonerLeagueName;
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

.userRank {
  padding: 50px;
}

.userRank h2 {
  color: #c4b998;
}

.sum-rank {
  text-align: right;
}
</style>
