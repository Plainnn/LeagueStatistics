<template>
  <section class="userMostWinContainer">
    <div v-if="loading" class="loading-search text-center">
      <v-progress-circular :size="100" color="primary" indeterminate></v-progress-circular>
    </div>
    <div v-if="error">
      <h1>An error has occoured</h1>
      {{ error }}
      <router-link to="/">Try Again</router-link>
    </div>
    <div v-else>
      <div class="userMostWins">
        <div class="row">
          <div class="col-sm-3 sum-name" data-aos="fade-right" data-aos-delay="750">
            <div class="imgchamp">
              <img
                :src="
                  require(`./champion/util/img/champs/nobkg/${wonChampion}.png`)
                "
              />
            </div>
          </div>
          <div v-if="data" class="col-sm-9 sum-rank" data-aos="fade-left" data-aos-delay="650">
            <div class="align">
              <h1>{{ data.data.mostWins.champ }}</h1>
            </div>
            <h2 class="champStats">Is Your Best Champion</h2>
            <hr class="alt" />
            <h5 class="champStats">
              {{
              `You have won ${data.data.mostWins.wins} of your last 10 Games`
              }}
            </h5>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'userMostWins',
  props: ['data'],
  data() {
    return {
      loading: false,
      error: false,
      profileData: null
    };
  },
  computed: {
    wonChampion() {
      return this.data ? this.data.data.mostWins.champ.replace(/ /g, '_') : '';
    }
  },
  beforeCreate() {},
  async created() {
    this.loading = true;
    try {
      this.loading = false;
    } catch (error) {
      this.error = error;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.userMostWins h1,
.userMostWins h2,
.userMostWins p {
  text-align: right;
}

.sumRank {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sumRank .align {
  flex-grow: 0;
}

hr.alt {
  flex-grow: 1;
}

.userMostWinContainer {
  margin-top: 50px;
}

.champStats {
  font-family: BeaufortforLOL;
  font-weight: bold;
  font-size: 30px;
  line-height: 49px;
  text-align: right;
  color: #c4b998;
}

.imgchamp {
  height: 20px;
  width: 250px;
  margin-top: -50px;
}

.imgchamp {
  height: 440px;
  width: 250px;
  margin-top: -100px;
  display: block;
}

.imgchamp img {
  object-fit: contain;
  height: 500px;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  display: block;
  margin-top: -50px;
}
</style>
