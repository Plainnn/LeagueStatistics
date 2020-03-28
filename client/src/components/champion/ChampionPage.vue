<template>
  <div v-if="data" class="container">
    <ChampionName :data="data" />
    <ChampionInfo :data="data.info" />
  </div>
</template>

<script>
const axios = require('axios');
import ChampionName from './util/ChampionName';
import ChampionInfo from './util/ChampionInfo';
/*eslint-disable */

export default {
  name: 'ChampionPage',
  components: {
    ChampionName,
    ChampionInfo
  },
  data() {
    return {
      loading: false,
      error: false,
      data: null
    };
  },
  async created() {
    const ver = await axios.get(
      'http://ddragon.leagueoflegends.com/api/versions.json'
    );

    const champion = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json`
    );

    const key = this.$route.params.key;

    const data = champion.data.data[key];
    this.data = data;
  }
};
</script>

<style>
</style>

