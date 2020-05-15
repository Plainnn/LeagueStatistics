<template>
  <v-col lg="3" sm="12">
    <div class="card mx-6 pa-6 pt-12" elevation="12">
      <v-row justify-center class="text-center">
        <div class="champImgContainer">
          <div class="pa-2 mt-1">
            <v-img
              :src="championImage"
              class="championImageMastery"
              @click="sendUrl()"
              max-width="105px"
              style="position: relative;"
              lazy-src="./champion/util/img/question.png"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-img
              :src="
                `https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-champion-details/global/default/cdp-prog-mastery-${
                  this.masteryData.championLevel
                }.png`
              "
              class="mastery-border"
            />
          </div>
        </div>
      </v-row>
      <div class="text-center mt-12">
        <div class="mt-12 ">
          <div class="mt-8">
            <h1>{{ masteryData.championLevel }}</h1>
            <h1>Level</h1>
            <v-divider light></v-divider>
          </div>
          <h1>{{ masteryData.championPoints }}</h1>
          <h2>Champion Points</h2>
          <v-divider light></v-divider>
          <h2>{{ masteryData.tokensEarned }}</h2>
          <h2>Tokens Earned</h2>
          <v-divider light></v-divider>
        </div>
      </div>
    </div>
  </v-col>
</template>

<script>
import axios from 'axios';
/*eslint-disable */

export default {
  name: 'MasteryIndividual',
  props: ['champId', 'masteryData', 'value', 'dataChamp'],
  data() {
    return {
      data: null,
      masteryLevels: {
        '1': '0',
        '2': '1800',
        '3': '4200',
        '4': '6600',
        '5': '9000'
      },
      champPoints: null
    };
  },
  computed: {
    championImage() {
      return this.champId
        ? `https://cdn.communitydragon.org/latest/champion/${
            this.champId
          }/square`
        : '';
    }
  },
  methods: {
    sendUrl() {
      this.$router.push(`/champ/${this.data.data.name}/${this.data.data.id}`);
    }
  },
  async mounted() {
    const url = `https://cdn.communitydragon.org/latest/champion/${
      this.champId
    }/data`;
    const result = await axios.get(url);
    this.data = result;
    this.champPoints = result.championPointsUntilNextLevel;
  }
};
</script>
<style>
.mastery-border {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}

.championImageMastery:hover + .mastery-border {
  margin-top: -25px;
  transition: 0.4s ease-in-out;
}

hr {
  background-image: linear-gradient(to left, #ffd14600, #ffd146, #ffd14600);
  height: 1px;
  border: 0;
  margin: 1em auto;
  width: 75%;
}

.champImgContainer {
  position: relative;
  z-index: 999;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  margin: 0 auto;
  min-height: 125px;
  width: 35%;
}

.championImageMastery {
  border-radius: 100%;
  position: relative;
  transition: 0.3s ease-in-out;
}

.championImageMastery:hover {
  margin-top: -25px;
}
</style>
