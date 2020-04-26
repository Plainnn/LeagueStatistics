<template>
  <div v-if="this.spells" style="margin: 1em">
    <v-tooltip bottom max-width="350px">
      <template v-slot:activator="{ on }">
        <div class="img-hold">
          <v-img
            dark
            v-on="on"
            :src="`https://raw.communitydragon.org/latest/game/assets/characters/${url}`"
            lazy-src="./img/question.png"
            class="ability-img"
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
            <p>{{spells.spellKey.toUpperCase()}}</p>
          </div>
        </div>
      </template>
      <div class="pa-2">
        <h3 class="py-2">{{spells.name}}</h3>
        <span v-html="spells.description"></span>
      </div>
    </v-tooltip>
  </div>
</template>


<script>
/*eslint-disable */

export default {
  name: 'ChampionSingleAbilities',
  props: ['spells'],
  computed: {
    abilityIconPath() {
      return this.spells ? this.spells.abilityIconPath : '';
    }
  },
  created() {
    this.url = this.abilityIconPath
      .replace('/lol-game-data/assets/ASSETS/Characters', '')
      .toLowerCase();
  }
};
</script>

<style scoped>
.champ-spells div {
  display: flex;
  flex: 1;
  margin: 1em;
}

.ability-img {
  border-radius: 5px;
  border-radius: 5px 5px 0px 0px;
  min-width: 64px;
  min-height: 64px;
}

.img-hold {
  min-width: 64px;
  min-height: 64px;
  border-radius: 0px 0px 5px 5px;
}

.text-center {
  background: #0b0625;
  border-radius: 0px 0px 5px 5px;
}
</style>