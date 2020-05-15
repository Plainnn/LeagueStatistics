<template>
  <div>
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-row v-if="topRankPlayers" class="my-2 mt-12">
      <v-row>
        <v-col cols="8">
          <h1>Compare Your CS</h1>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
      <form v-on:submit.prevent="getData" class="d-flex">
        <select
          name
          id="region-dropdown"
          v-model="region"
          class="dropdown-region px-4 ml-3"
          @change="getData()"
        >
          <option selected value="euw">EUW</option>
          <option value="na">NA</option>
          <option value="kr">KR</option>
        </select>
        <select class="league-dropdown px-4 ml-12" v-model="league" @change="getData()">
          <option selected value="challenger">Challenger</option>
          <option value="Grandmaster">Grandmaster</option>
          <option value="Master">Master</option>
          <option value="Diamond">Diamond</option>
          <option value="Platinum">Platinum</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
          <option value="Iron">Iron</option>
        </select>

        <select class="rank-dropdown px-4 ml-12" v-model="rank" @change="getData()">
          <option selected value="I">I</option>
          <option value="II" :disabled="rankDisabled">II</option>
          <option value="III" :disabled="rankDisabled">III</option>
          <option value="IV" :disabled="rankDisabled">IV</option>
        </select>
      </form>
    </v-row>
    <v-row class="mt-12">
      <v-col cols="10" class="py-12 mt-4">
        <div v-if="(data) < topRankPlayers">
          <h1>{{ (data )}} CS</h1>
          <h1>Is Your Latest CS Score</h1>
          <h1>This is <span class="lower">Lower</span> Than The {{this.league}} {{this.rank}} Average of {{ topRankPlayers }}</h1>
        </div>
        <div v-if="(data) > topRankPlayers">
          <h1>{{ (data )}} CS</h1>
          <h1>Is Your Latest CS Score</h1>
          <h2>This is <span class="higher">Higher</span> Than The {{this.league}} {{this.rank}} Average of {{ topRankPlayers }}</h2>
        </div>
      </v-col>
      <v-col cols="2">
        <v-img src="./img/blue_minion.png" max-width="400px"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
/*eslint-disable */

export default {
  name: 'UserCreepScore',
  data() {
    return {
      data: null,
      region: this.$route.params.platform,
      loading: true,
      region: 'euw',
      league: 'Platinum',
      rank: 'I',
      topRankPlayers: '0'
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      this.topRankPlayers = null;
      /*eslint-disable */
      const champion = await axios.get(
        `/api/v1/leagues/getTopNames/${this.region}/${this.league}/${this.rank}/1`
      );
      const topRankCs = await Promise.all(
        champion.data.map(async summonerName => {
          const apiCall = await axios.get(
            `/api/v1/getcs/${this.region}/${summonerName}`
          );
          return apiCall.data.cs.creepScore;
        })
      ).then(response => {
        this.topRankPlayers = +parseInt(response);
        return this.topRankPlayers;
      });
      this.loading = false;
    }
  },
  computed: {
    rankDisabled() {
      return ['challenger', 'grandmaster', 'master'].includes(this.league);
    }
  },
  async mounted() {
    this.loading = true;
    this.data = null;
    const url = await axios.get(
      `/api/v1/getcs/${this.$route.params.platform}/${this.$route.params.name}`
    );

    this.data = url.data.cs.creepScore;

    const champion = await axios.get(
      `/api/v1/leagues/getTopNames/${this.region}/${this.league}/${this.rank}/1`
    );

    let total = 0;

    const topRankCs = await Promise.all(
      champion.data.map(async summonerName => {
        const apiCall = await axios.get(
          `/api/v1/getcs/${this.region}/${summonerName}`
        );

        return apiCall.data.cs.creepScore;
      })
    ).then(response => {
      this.topRankPlayers = +parseInt(response);
      this.loading = false;
      return this.topRankPlayers;
    });
  }
};
</script>

<style scoped>
h2 {
  color: #c4b998;
}

.lower {
  color: red;
}

.higher {
  color: green;
}

@media screen and (max-width: 39.9375em) {
  h1,h3,h3,h4,h5 {
    text-align:center;
    padding: 0 !important;
    margin: 0 !important;
  }
}

</style>
