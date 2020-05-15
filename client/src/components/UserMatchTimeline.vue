<template>
  <div class="mb-12">
    <v-row justify="center" class="text-center">
      <v-col sm="12" lg="12">
        <UserTimelineStats :stats="userStatsReturn" :champ="dataAbilities"/>
      </v-col>

      <v-col sm="12" lg="12" justify="center">
        <v-btn type="submit" value="Submit" class="button" color="primary" @click="hideEvents">
          <v-icon class="mr-2">mdi-account-search</v-icon>View Gold Timeline
        </v-btn>
      </v-col>
    </v-row>
      <div v-if="data">
      <apexchart
        class="mt-12 apex-select"
        width="100%"
        type="line"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <div></div>
      {{stackItems}}
      <div
        v-if="showEvents"
        class="data-contain"
        style="position: absolute;
                top: 0px;"
      >
        <div class="vl" :style="`height: ${stackedPurchasedItems.length * 15}em`"></div>
        <div
          v-for="(event, index) in stackedPurchasedItems"
          :key="index"
          class="card timeline-card"
          :style="{ 'left': (index % 2 === 0 ? 'auto' : '100px'), 'right': (index % 2 === 1 ? 'auto' : '100px') }"
        >
          <p class="event-index">{{index + 1}}</p>
          <h3>At {{ getTime(event[0].timestamp) }}</h3>
          <div v-if="event[0].victimId == participantIdReturn">
            <h2>You Died</h2>
          </div>
          <div v-else>
            <h2>You {{eventMatch[event[0].type]}}</h2>
          </div>
          <div v-for="(events, jndex) in event" :key="jndex * 10" class="d-inline-flex my-4">
            <div>
              <v-tooltip bottom v-if="events.itemId" max-width="350px">
                <template v-slot:activator="{ on }">
                  <v-img
                    v-if="events.type == 'ITEM_PURCHASED'"
                    max-width="64px"
                    max-height="64px"
                    class="item-image mr-4"
                    dark
                    v-on="on"
                    :src="
                `https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${
                  events.itemId
                }.png`
              "
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </template>
                <span>
                  <template>
                    <p class="mt-2">{{itemNameReturn.data[events.itemId].name}}</p>
                    <p v-html="itemNameReturn.data[events.itemId].plaintext"></p>
                    <p v-html="itemNameReturn.data[events.itemId].description"></p>
                  </template>
                </span>
              </v-tooltip>
            </div>
            <div>
              <v-tooltip bottom v-if="events.skillSlot" max-width="350px">
                <template v-slot:activator="{ on }">
                  <v-img
                    v-if="events.type == 'SKILL_LEVEL_UP'"
                    :src="
                      `https://cdn.communitydragon.org/latest/champion/${championIdReturn}/ability-icon/${
                        skillsMatch[events.skillSlot]
                      }`
                    "
                    max-width="64px"
                    max-height="64px"
                    class="item-image mr-4"
                    v-on="on"
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </template>
                <span>
                  <template>{{events.skillSlot}}</template>
                </span>
              </v-tooltip>
            </div>

            <div v-if="events.type == 'CHAMPION_KILL'">
              <div v-if="events.victimId == participantIdReturn">
                <v-img
                  :src="
                  ` https://cdn.communitydragon.org/${versionNumber}/champion/${getEnemy(
                    events.killerId
                  )}/square`
                "
                  max-width="64px"
                  max-height="64px"
                  class="item-image participant-death mr-4"
                ></v-img>
              </div>
              <div v-if="events.killerId == participantIdReturn">
                <v-img
                  :src="
                  ` https://cdn.communitydragon.org/${versionNumber}/champion/${getEnemy(
                    events.victimId
                  )}/square`
                "
                  max-width="64px"
                  max-height="64px"
                  class="item-image participant-kill mr-4"
                ></v-img>
              </div>
            </div>
            <div v-if="events.type == 'BUILDING_KILL'">
              <h2>{{events.laneType}}</h2>
              <h2>{{events.towerType}}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserTimelineStats from './UserTimelineStats';

export default {
  name: 'UserMatchTimeline',
  components: {
    UserTimelineStats
  },
  data() {
    return {
      showEvents: true,
      data: null,
      championId: null,
      itemJson: null,
      dataTotalGold: null,
      dataAbilities: null,
      skillsMatch: {
        '0': 'q',
        '1': 'w',
        '2': 'e',
        '3': 'r'
      },
      eventMatch: {
        SKILL_LEVEL_UP: 'Levelled Up',
        ITEM_PURCHASED: 'Purchased',
        CHAMPION_KILL: 'Killed',
        BUILDING_KILL: 'Destroyed a '
      },
      events: null,
      items: null,
      version: null,
      enemyData: null,
      userStats: null,
      participantId: null,
      chartOptions: {
        show: true,
        legend: {
          show: false
        },
        chart: {
          type: 'line',
          height: 350,
          zoom: {
            enabled: true
          },
          yaxis: {
            show: true,
            showAlways: true,
            showForNullSeries: true,
            seriesName: undefined,
            opposite: false,
            reversed: false,
            logarithmic: false,
            tickAmount: 100
          },
          toolbar: {
            show: false
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          },
          xaxis: {
            lines: {
              show: false
            }
          }
        }
      },
      series: [
        {
          name: 'Gold Earnt',
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }
      ]
    };
  },
  async mounted() {
    const res = await axios.get(
      `/api/v1/match/${this.$route.params.platform}/${this.$route.params.name}`
    );
    /*eslint-disable */

    const ver = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    );
    const items = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${ver.data[0]}/data/en_US/item.json`
    );

    const championDetailed = await axios.get(
      `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${res.data.results[0].participantChampion}.json`
    );

    this.dataAbilities = championDetailed;

    this.itemJson = items;

    this.version = ver.data;
    this.events = res.data.sortedEvents;
    this.data = res.data.resultCurrent;
    this.userStats = res.data;
    this.dataTotalGold = res.data.resultTotal;

    this.participantId = res.data.results;

    this.enemyData = res.data.results[0].enemy;
    this.championId = res.data;

    //Track the last timestamp
    //Reduce the array into an array of arrays

    this.series = [
      {
        name: 'Current Gold',
        data: this.data
      },
      {
        name: 'Total Gold',
        data: this.dataTotalGold
      }
    ];
    this.chartOptions = {
      colors: ['#FEB019'],

      chart: {
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          autoSelected: 'zoom'
        },
        zoom: {
          enabled: false,
          type: 'x',
          autoScaleYaxis: false
        }
      }
    };
  },

  methods: {
    hideEvents() {
      this.showEvents = !this.showEvents;
    },
    getEnemy(participantId) {
      const participant = this.enemyData.find(
        p => p.participantId === participantId
      );
      return participant.championId;
    },
    getTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      if (hours && minutes == '00') {
        return seconds + ' Seconds';
      } else if (hours == '00') {
        return minutes + ':' + seconds;
      } else {
        return hours + ':' + minutes + ':' + seconds;
      }
    }
  },
  computed: {
    championIdReturn() {
      return this.championId
        ? this.championId.results[0].participantChampion
        : '';
    },
    participantIdReturn() {
      return this.participantId ? this.participantId[0].participantId : '';
    },
    userStatsReturn() {
      return this.userStats ? this.participantId[0].participantStats : '';
    },
    versionNumber() {
      return this.version ? this.version[0] : '';
    },
    itemNameReturn() {
      return this.itemJson ? this.itemJson.data : '';
    },
    championAbilitiesReturn() {
      return this.dataAbilities ? this.dataAbilities.data : '';
    },
    stackedPurchasedItems() {
      var last = 0;
      var lastType;
      var filterEvents = this.events.filter(function(el) {
        return (
          el.type == 'ITEM_PURCHASED' ||
          el.type == 'SKILL_LEVEL_UP' ||
          el.type == 'CHAMPION_KILL' ||
          el.type == 'BUILDING_KILL'
        );
      });

      const groups = filterEvents.reduce((acc, item) => {
        //Get item timestamp
        var { timestamp, type } = item;
        //If new item is within 5 sec of old item,
        //add to last group in accumulator,
        //otherwise add new group to accumulator
        if (timestamp - last < 5000 && type == lastType)
          acc[acc.length - 1].push(item);
        else acc.push([item]);

        //Track this timestamp for next time
        lastType = type;
        last = timestamp;
        //Return the accumulator
        return acc;
      }, []);
      return groups;
    }
  }
};
</script>

<style>
.apexcharts-gridlines-horizontal line {
  display: none;
}

.data-contain {
  width: 70%;
               left: 15%;
                overflow: auto;
                height: 70vh;
}


@media screen and (max-width: 39.9375em) {
  .data-contain {
  width: 100%;
                left: 0%;
                overflow: auto;
                height: 200vh;
                position: relative !important;
}
.timeline-card {
  padding: 5px;
  width: 100% !important;
  left: 0 !important;
  right: 0 !important;


}





}

svg {
  opacity: 0.1 !important;
  transition: 0.25s ease-in-out;
}

svg:hover {
  opacity: 0.9 !important;
}

.item-image {
  min-width: 64px;
  min-height: 64px;
  border-radius: 10px;
}

.item-count {
  top: 0;
  right: 0;
  color: #fff;
  z-index: 999;
  background: red;
  border-radius: 10px;
}

.item-container {
  min-width: 64px;
  min-height: 64px;
}

.timeline-card {
  color: #fff !important;
  padding: 20px;
  width: 25%;
  position: relative;
  /* background: transparent !important;
  box-shadow: none; */

  transition: 0.25s ease-in-out;
  
}

.event-index {
    background: rgb(0, 9, 19);
    border:1px solid rgb(208, 168, 92);
    position: absolute;
    top: -1vw;
    left: -1vw;
    padding: -15px;
    border-radius: 90px;
    height: 2vw;
    width: 2vw;
    /* line-height: 500px; */
    line-height: 2vw;
    text-align: center;
}
.theme--light.v-divider {
  border-color: #ffd046 !important;
  height: 100%;
}
.vl {
  position: absolute;
  left: 50%;
  border: 0;
  margin: 1em auto;
  border-color: #ffd046 !important;
  height: calc(100vh - 110px);
  border-left: 4px solid;
}

.timeline-card:nth-child(odd):hover,
.timeline-card:nth-child(even):hover {
  transition: 0.25s ease-in-out;
  margin-top: 50px;
  margin-bottom: 50px;
}

.apex-select:hover {
  z-index: 999;
  opacity: 1;
}

.participant-kill {
  outline: 33px solid rgba(63, 255, 56, 0.3) !important;
  outline-offset: -33px;
  overflow: hidden;
  position: relative;
  height: 64px;
  width: 64px;
}

.participant-death {
  outline: 33px solid rgba(255, 56, 56, 0.3) !important;
  outline-offset: -33px;
  overflow: hidden;
  position: relative;
  height: 64px;
  width: 64px;
}
</style>
