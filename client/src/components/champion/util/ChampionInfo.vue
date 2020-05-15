<template>
  <div>
    <v-row justify="center">
      <div class="info-flex-container d-flex justify-center text-center">
        <div class="mb-12">
          <h2>Attack</h2>
          <v-progress-circular
            v-model="attack"
            :rotate="0"
            :size="100"
            :width="10"
            value="attack"
            color="red"
          >{{ attack / 10 }}</v-progress-circular>
        </div>
        <div>
          <h2>Defence</h2>
          <v-progress-circular
            v-model="defense"
            :rotate="0"
            :size="100"
            :width="10"
            value="defense"
            color="green accent-4"
          >{{ defense / 10 }}</v-progress-circular>
        </div>
        <div>
          <h2>Magic</h2>
          <v-progress-circular
            :rotate="0"
            v-model="magic"
            :size="100"
            :width="10"
            value="magic"
            color="blue accent-4"
          >{{ magic / 10 }}</v-progress-circular>
        </div>
        <div>
          <h2>Difficulty</h2>
          <v-progress-circular
            v-model="difficulty"
            :rotate="0"
            :size="100"
            :width="10"
            value="difficulty"
            color="amber accent-4"
          >{{ difficulty / 10 }}</v-progress-circular>
        </div>
      </div>
    </v-row>
    <v-row justify="center" v-if="this.data">
      <v-tooltip bottom class="pa-6">
        <template v-slot:activator="{ on }">
          <v-btn @click="onClick()" class="button" color="green" v-on="on">
            <v-icon>mdi-download</v-icon>
            Download {{ names }}'s Info
          </v-btn>
        </template>
        <v-row class="my-2 pa-2">
          <span>This will download a CSV file</span>
        </v-row>
        <v-row class="pa-2 my-1">
          <span class="font-weight-bold">
            Learn more
            <a href="https://en.wikipedia.org/wiki/Comma-separated_values">here</a>
          </span>
        </v-row>
      </v-tooltip>
    </v-row>
  </div>
</template>

<script>
import jsonexport from 'jsonexport';

export default {
  name: 'ChampionInfo',
  props: ['data', 'name'],
  data() {
    return {
      interval: {},
      value: 0
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  /*eslint-disable */
  methods: {
    onClick() {
      jsonexport(this.data, function(err, csv) {
        if (err) return console.log(err);
        var fileURL = window.URL.createObjectURL(new Blob([csv]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'csv.csv');
        document.body.appendChild(fileLink);

        fileLink.click();

        console.log(csv);
      });
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 360) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 50);
    /*eslint-disable */
  },
  computed: {
    attack() {
      return parseInt(this.data ? this.data.attack : '') * 10;
    },
    defense() {
      return parseInt(this.data ? this.data.defense : '') * 10;
    },
    magic() {
      return parseInt(this.data ? this.data.magic : '') * 10;
    },
    difficulty() {
      return parseInt(this.data ? this.data.difficulty : '') * 10;
    },
    names() {
      return this.name ? this.name : '';
    }
  }
};
</script>

<style scoped>
.info-flex-container div {
  margin: 0em 2em;
}

.v-progress-circular {
  margin: 1em;
}

h2 {
  margin: 0.5em 0em 1em 0;
}

svg {
  opacity: 1 !important;
}

@media screen and (max-width: 39.9375em) {
  .info-flex-container div {
  margin: 0em;
}

.v-progress-circular {
  margin: 0em;
}

h2 {
  margin: 0;
}
}

</style>
