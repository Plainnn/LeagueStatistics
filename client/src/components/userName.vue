<template>
  <section class="userNameContainer">
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
    <div v-else>
      <div class="userName">
        <div class="row">
          <div class="col-sm-3 sum-name">
            <h1 style="width:110%;">{{ summonerName }}</h1>
            <h2>{{ summonerLeagueName }}</h2>
          </div>
          <div class="col-sm-9 sum-rank">
            <h2>{{ `${summmonerTier} ${summmonerRank}` }}</h2>
            <h2>{{ `${summonerLp} LP` }}</h2>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="sol-sm-6 sumWinPercent">
            <div class="iCountUp">
              <ICountUp
                :delay="delay"
                :endVal="endVal"
                :options="options"
                @ready="onReady"
              />
            </div>
            <h1 id="winPercent"></h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const axios = require('axios');
import ICountUp from 'vue-countup-v2';

export default {
  components: {
    ICountUp
  },
  methods: {
    onReady: function(instance) {
      const that = this;
      instance.update(that.endVal);
    }
  },
  name: 'userName',
  data() {
    return {
      loading: false,
      error: false,
      summonerName: null,
      summmonerTier: null,
      summmonerRank: null,
      summonerWins: null,
      summonerLosses: null,
      summonerLp: null,
      summonerLeagueName: null,
      delay: 1000,
      endVal: 0,
      options: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: '%'
      }
    };
  },
  async created() {
    try {
      this.loading = true;
      const res = await axios.get(
        `/api/v1/getrank/${this.$route.params.platform}/${this.$route.params.name}`
      );

      this.summonerName = res.data.data.summonerName;
      this.summmonerTier = res.data.data.summmonerTier;
      this.summmonerRank = res.data.data.summmonerRank;

      this.summonerLp = res.data.data.summonerLp;
      this.summonerLeagueName = res.data.data.summonerLeagueName;
      this.loading = false;
      this.endVal =
        (parseFloat(res.data.data.summonerWins) /
          (parseFloat(res.data.data.summonerLosses) +
            parseFloat(res.data.data.summonerWins))) *
        100;
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

.userName h2,
.winLoss h2 {
  color: #c4b998;
}

.sum-rank {
  text-align: right;
}

.iCountUp {
  font-size: 20em;
  font-weight: 400;
  color: #ffd046;
  margin: 0em 0em 0em 0em;

  filter: drop-shadow(0px 3px 1px #000);
}
</style>
