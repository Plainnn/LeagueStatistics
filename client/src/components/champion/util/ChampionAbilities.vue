<template>
  <div v-if="this.data" class="flex1">
    <v-tooltip bottom max-width="500px">
      <template v-slot:activator="{ on }">
        <div class="img-hold" style="margin: 1em">
          <v-img
            dark
            v-on="on"
            :src="`https://cdn.communitydragon.org/latest/champion/${champKey}/ability-icon/passive`"
            lazy-src="./img/question.png"
            class="passive-img"
            max-width="64px"
            max-height="64px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div class="text-center">
            <p>P</p>
          </div>
        </div>
      </template>
      <div class="pa-2">
        <h3 class="py-2">{{passive.name}}</h3>
        <span v-html="passive.description"></span>
      </div>
    </v-tooltip>

    <div v-for="(spells, index) in this.abilities" :key="index" style="flex1">
      <ChampionSingleAbilities :spells="spells" />
    </div>
  </div>
</template>
<script>
/*eslint-disable */
import ChampionSingleAbilities from './ChampionSingleAbilities';

export default {
  name: 'ChampionAbilities',
  props: ['passive', 'abilities', 'data'],
  components: {
    ChampionSingleAbilities
  },
  computed: {
    champKey() {
      return this.data ? this.data.key : '';
    }
  }
};
</script>

<style scoped>
.flex1 {
  display: flex;
  justify-content: center;
  align-content: space-between;
  width: 100%;
  padding: 2em;
}

.img-hold {
  min-width: 64px;
  min-height: 64px;
}

.passive-img {
  border-radius: 5px 5px 0px 0px;

  min-width: 64px;
  min-height: 64px;
}

.text-center {
  background: #0b0625;
  border-radius: 0px 0px 5px 5px;
}
</style>