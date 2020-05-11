<template>
  <div v-if="data" class="container">
    <v-dialog v-model="show" max-width="95%">
      <template v-slot:activator="{ on }">
        <v-row class="mt-6">
          <v-col cols="8"></v-col>
          <v-col cols="4">
            <v-btn class="text-right" justify="right" color="green" dark v-on="on">
              <v-icon class="mr-2">mdi-file-compare</v-icon>
              Compare {{ data.name }} With Another Champion
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <v-card class="card">
        <v-row class="pt-12">
          <v-col cols="11"></v-col>
          <v-col cols="1">
            <v-btn color="red" @click="show = !show">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <h1 class="text-center my-6">Select a champion to compare with {{ data.name }}</h1>
        <AllChampionsCompare></AllChampionsCompare>
      </v-card>
    </v-dialog>
    <section class="championPage container">
      <ChampionName :data="data" />
      <h2 class="text-center">{{ data.name }}'s Abilities</h2>
      <ChampionAbilities :abilities="dataAbilities" :passive="dataPassive" :data="data" />
      <hr />

      <h2 class="text-center mt-12 mb-12">{{ data.name }}'s Playstyle Information</h2>
      <ChampionInfo :data="data.info" :name="data.name" />

      <hr class="mt-12 mb-12" />
      <div class="infoChamp text-center">
        <ChampionStats :data="data.stats" :name="data.name" />
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
      'http://ddragon.leagueoflegends.com/api/versions.json'
    );

    const champion = await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US/champion.json`
    );

    const key = this.$route.params.key;
    const data = champion.data.data[key];

    const championDetailed = await axios.get(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${this.$route.params.id}.json`
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
  height: 1px;
  border: 0;
  margin: 1em auto;
  width: 75%;
}

.theme--light.v-card {
  background: #150f34f2;
}

.v-dialog.v-dialog--active {
  overflow-x: hidden;
}
</style>
