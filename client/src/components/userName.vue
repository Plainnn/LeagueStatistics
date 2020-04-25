<template>
  <section class="userNameContainer">
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>

    <div v-if="this.data">
      <div
        class="rank text-center"
        v-if="this.summmonerTier"
        data-aos="fade-down"
        data-aos-delay="1000"
      >
        <v-img
          :src="require(`./img/${this.summmonerTier.toLowerCase()}_${this.summmonerRank.toLowerCase()}.png`)"
          lazy-src="./img/default.png"
          class="summoner-rank-img text-center"
        />
      </div>
      <div class="userName">
        <div class="row">
          <div class="col-sm-12 sum-name text-center">
            <h1 data-aos="fade-down" data-aos-delay="1300">{{ summonerName }}</h1>
            <h2 data-aos="fade-down" data-aos-delay="1500">{{ summonerLeagueName }}</h2>
          </div>
          <div class="col-sm-12 sum-rank text-center">
            <h2>{{ `${summmonerTier} ${summmonerRank}` }}</h2>
            <h2>{{ `${summonerLp} LP` }}</h2>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="sol-sm-6 sumWinPercent">
            <div class="iCountUp">
              <ICountUp :delay="delay" :endVal="endVal" :options="options" @ready="onReady" />
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
      data: null,
      imgUrl: null,
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
  computed: {
    userImage() {
      return this.summmonerTier
        ? require(`./img/${this.summmonerTier.toLowerCase()}_${this.summmonerRank.toLowerCase()}.png`)
        : '';
    }
  },
  async mounted() {
    /*eslint-disable */

    try {
      this.loading = true;
      const res = await axios.get(
        `/api/v1/getrank/${this.$route.params.platform}/${this.$route.params.name}`
      );
      console.log(res);
      this.data = res;

      if (res.data.data.summmonerRank) {
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

        this.imgUrl = `.../img/${this.summmonerTier.toLowerCase()}_${this.summmonerRank.toLowerCase()}.png`;
      } else {
        this.summonerName = res.data.data.summonerName;
        this.summmonerTier = ' ';
        this.summmonerRank = res.data.data.summmonerRank;

        this.summonerLp = 0;
        this.summonerLeagueName = '';
        this.loading = false;
        this.endVal = null;

        this.imgUrl = '';
      }
    } catch (error) {
      console.log(error);
      this.loading = false;
      this.error = true;
    }
  }
};
</script>

<style scoped>
.summoner-rank-img {
  margin: 0 auto;
  display: inline-block;
  width: 22%;
}

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

.rank img {
  width: 20%;
}
</style>
