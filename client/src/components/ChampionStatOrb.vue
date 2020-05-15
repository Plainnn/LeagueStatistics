c<template>
  <v-col sm="12" lg="3">
    <div v-if="this.data" class="card pa-2">
      <div class="champImg text-center pt-6">
        <img :src="championImage" class="championImage" @click="sendUrl(getId)" />
      </div>
      <div class="championStat text-center ">
        <h1>{{ this.data.championName }}</h1>
        <h3>Win Rate: {{ championWinRate }}</h3>
        <p>
          <span class="green-color">W{{ championWins }}</span>
          <span class="red-color ml-2">L{{ championLosses }}</span>
        </p>
      </div>
    </div>
  </v-col>
</template>

<script>
/*eslint-disable */

export default {
  name: 'ChampionStatOrb',
  props: ['data'],
  computed: {
    championImage() {
      return this.data.championName
        ? `https://cdn.communitydragon.org/latest/champion/${this.data.id.replace(
            /\s/g,
            ''
          )}/square`
        : '';
    },
    championWinRate() {
      return this.data
        ? (
            this.championWins /
            (this.championWins + this.championLosses)
          ).toFixed(2)
        : '';
    },
    championWins() {
      return this.data ? this.data.won : '';
    },
    championLosses() {
      return this.data ? this.data.lost : '';
    },
    sendUrl(data) {
      this.$router.push(`/champ/${data.data.key}/${data.data.id}`);
    },
    getId() {
      return this.data ? this.data.id : '';
    }
  },
  mounted() {}
};
</script>

<style>
.green-color {
  color: green;
  font-weight: bold;
}

.red-color {
  color: red;
  font-weight: bold;
}

.championImage {
  border-radius: 100%;
  transition: 0.2s cubic-bezier(0.76, 0, 0.24, 1);
}
</style>
