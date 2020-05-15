<template>
  <div class="container">
    <section class="championPage container">
      <ChampionName :data="data" />
      <h2 class="text-center">{{data.name}}'s Abilities</h2>
      <ChampionAbilities :abilities="dataAbilities" :passive="dataPassive" :data="data" />
      <hr />

      <h2 class="text-center mt-12 mb-12">{{data.name}}'s Playstyle Information</h2>
      <ChampionInfo :data="data.info" />

      <hr class="mt-12 mb-12" />
      <div class="infoChamp text-center">
        <ChampionStats :data="data.stats" />
      </div>
    </section>
  </div>
</template>

<script>
const axios = require('axios');
import ChampionName from './util/ChampionName';
import ChampionInfo from './util/ChampionInfo';
import ChampionStats from './util/ChampionStats';
import ChampionAbilities from './util/ChampionAbilities';
import AllChampionsCompare from '././AllChampionsCompare';
/*eslint-disable */
//raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/102.json

export default {
  name: 'ChampionPage',
  components: {
    ChampionName,
    ChampionInfo,
    ChampionStats,
    ChampionAbilities,
    AllChampionsCompare
  },
  data() {
    return {
      loading: false,
      error: false,
      data: null,
      dataAbilities: null,
      dataPassive: null,
      show: false
    };
  },
  methods: {
    showChampsToCompare() {}
  },
  async created() {
    const ver = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    );

    const champion = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json`
    );

    const key = this.$route.params.key2;
    const data = champion.data.data[key];

    const championDetailed = await axios.get(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${this.$route.params.id2}.json`
    );

    this.dataPassive = championDetailed.data.passive;
    this.dataAbilities = championDetailed.data.spells;

    this.data = data;
  }
};
</script>

<style scoped>
* {
  color: #fff;
}

.championPage {
  padding: 50px;
}

.infoChamp {
  display: flex;
  flex: 1;
}

.infoChamp ChampionStats {
  flex: 3 !important;
}

hr {
  background-image: linear-gradient(to left, #ffd14600, #ffd146, #ffd14600);
  height: 2px;
  border: 0;
  margin: 1em auto;
  width: 75%;
}

.theme--light.v-card {
  background: #150f34f2;
}
</style>

