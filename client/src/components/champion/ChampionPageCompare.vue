<template>
  <div>
    <v-row class="mt-12">
      <v-col cols="11"></v-col>
      <v-col cols="1">
        <v-btn class="orange" @click="$router.go(-1)">back</v-btn>
      </v-col>
    </v-row>
    <div class="d-flex">
      <div style="width: 50%;">
        <ChampionPageOne></ChampionPageOne>
      </div>

      <div style="width: 50%;">
        <ChampionPageTwo></ChampionPageTwo>
      </div>
    </div>
  </div>
</template>

<script>
import ChampionPage from '././ChampionPage';
import ChampionPageOne from '././ChampionPageOne';
import ChampionPageTwo from '././ChampionPageTwo';

/*eslint-disable */
//raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/102.json

export default {
  name: 'ChampionPage',
  components: {
    ChampionPage,
    ChampionPageOne,
    ChampionPageTwo
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
  async created() {}
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

h3 {
  width: 20%;
}
</style>

