<template>
  <div v-if="this.data" class="champ-card">
    <div class="champImg">
      <img :src="championImage" class="championImage" @click="sendUrl(getId)" />
    </div>
    <div class="championStat">
      <p>Win Rate: {{ championWinRate }}</p>

      <p>
        <span class="green-color">W{{ championWins }}</span>
        <span class="red-color">L{{ championLosses }}</span>
      </p>
    </div>
  </div>
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
      return this.data ? this.data.rate.toFixed(2) : '';
    },
    championWins() {
      return this.data ? this.data.won : '';
    },
    championLosses() {
      return this.data ? this.data.lost : '';
    },
    sendUrl(data) {
      console.log(data);
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
.champ-card {
  display: flex;
  text-align: center;
  flex: 1 0 calc(20% - 20px);
  max-width: calc(20% - 20px);
  color: #c4b998;
  justify-content: center;
  margin: 2em auto;
}

.champ-card .v-application p {
  margin-bottom: 10px;
}

.champ-card .championImage {
  border-radius: 100%;
  width: 85px;
  transition: 0.2s cubic-bezier(0.76, 0, 0.24, 1);
}

.championImage:hover {
  border-radius: 5px;
  transition: 0.2s cubic-bezier(0.76, 0, 0.24, 1);
}
</style>
