<template>
  <div>
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>
    <v-row class="text-center my-12" justify="center">
      <hr />
      <h1 class="text-center my-6">{{this.$route.params.name}}'s Champion Mastery</h1>
      <hr />
    </v-row>
    <v-row>
      <MasteryIndividual
        :champId="champions.championId"
        :masteryData="champions"
        v-for="(champions, index) in resData"
        :key="index"
        :value="index"
        :dataChamp="champions"
        data-aos="fade-up"
        data-aos-easing="ease-in-back"
        data-aos-delay="500"
        data-aos-offset="0"
      />
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import MasteryIndividual from './MasteryIndividual';
export default {
  name: 'UserMastery',
  props: ['data'],
  components: { MasteryIndividual },
  data() {
    return {
      loading: false,
      resData: null,
      champData: null
    };
  },
  async mounted() {
    /*eslint-disable */
    this.loading = true;
    const res = await axios.get(
      `/api/v1/getmastery/${this.$route.params.platform}/${this.$route.params.name}`
    );

    this.resData = res.data.data;
    this.loading = false;
  },
  computed: {
    championId() {
      return this.data && this.data.championId ? this.data.championId : '';
    },
    sendUrl(data) {
      this.$router.push(`/champ/${data.data.key}/${data.data.id}`);
    }
  }
};
</script>

<style scoped>
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

.championImageMastery:hover + .mastery-border {
  margin: 50px;
  border: red 1px solid;
}
</style>
