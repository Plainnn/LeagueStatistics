<template>
  <div v-if="data">
    <apexchart
      width="100%"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div v-if="data">
      <div
        v-for="(event, index) in stackedPurchasedItems"
        :key="index"
        class="card"
      >
        <div
          v-for="(events, index) in event"
          :key="index * 10"
          class="item-purchased"
        >
          <div v-if="events.type == 'ITEM_PURCHASED'">
            <div v-if="index == 0">
              At {{ getTime(events.timestamp) }} You Purchased
            </div>
            <v-row>
              <v-img
                max-width="64px"
                max-height="64px"
                class="item-image"
                :src="
                  `https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${
                    events.itemId
                  }.png`
                "
              ></v-img
            ></v-row>
          </div>

          <!-- <div v-if="events.type == 'BUILDING_KILL'">
              {{ events }}
            </div> -->

          <div v-if="events.type == 'SKILL_LEVEL_UP'">
            <v-img
              :src="
                `https://cdn.communitydragon.org/latest/champion/${championIdReturn}/ability-icon/${
                  skillsMatch[events.skillSlot]
                }`
              "
              max-width="64px"
              max-height="64px"
              class="item-image"
            ></v-img>
          </div>

          <div v-if="events.type == 'CHAMPION_KILL'">
            <div v-if="events.victimId === participantIdReturn">
              <v-img
                :src="
                  ` https://cdn.communitydragon.org/${versionNumber}/champion/${getEnemy(
                    events.victimId
                  )}/square`
                "
                max-width="64px"
                max-height="64px"
                class="item-image"
              ></v-img>
            </div>
            <div v-else>
              <v-img
                :src="
                  ` https://cdn.communitydragon.org/${versionNumber}/champion/${getEnemy(
                    events.victimId
                  )}/square`
                "
                max-width="64px"
                max-height="64px"
                class="item-image"
              ></v-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserMatchTimeline',
  data() {
    return {
      data: null,
      championId: null,
      skillsMatch: {
        '1': 'q',
        '2': 'w',
        '3': 'e',
        '4': 'r'
      },
      events: null,
      items: null,
      version: null,
      enemyData: null,
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
          },
          yaxis: {
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
      'http://ddragon.leagueoflegends.com/api/versions.json'
    );
    this.version = ver.data;
    this.events = res.data.sortedEvents;
    this.data = res.data.result;

    this.participantId = res.data.results;
    console.log(this.participantId);

    this.enemyData = res.data.results[0].enemy;
    this.championId = res.data;

    //Track the last timestamp
    //Reduce the array into an array of arrays

    this.series = [
      {
        name: 'Gold Earnt',
        data: this.data
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
    versionNumber() {
      return this.version ? this.version[0] : '';
    },
    stackedPurchasedItems() {
      var last = 0;

      const groups = this.events.reduce((acc, item) => {
        //Get item timestamp
        var { timestamp } = item;
        //If new item is within 10 sec of old item,
        //add to last group in accumulator,
        //otherwise add new group to accumulator
        if (timestamp - last < 5000) acc[acc.length - 1].push(item);
        else acc.push([item]);

        //Track this timestamp for next time
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
.card {
  padding: 50px;
}

.apexcharts-gridlines-horizontal line {
  display: none;
}

svg {
  opacity: 0.3 !important;
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

.item-purchased {
  display: inline-flex;
}

.item-purchased div:first-child {
  width: 100%;
}

.item-purchased div:not(:first-child) {
  flex: 1;
}
</style>
