<template>
  <div v-if="data">
    <apexchart
      width="100%"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <v-row v-if="data">
      <v-col cols="6">
        <div
          v-for="(events, index) in stackedPurchasedItems"
          :key="index"
          class="item-container my-4 "
        >
          <h1>{{ getTime(events[0].timestamp) }}</h1>
          <div
            v-for="(groups, index) in events"
            :key="index"
            :style="`height: ${groups.timestamp / 10000 + 64}px`"
          >
            <v-img
              max-width="64px"
              max-height="64px"
              class="item-image inline-flex"
              :src="
                `https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/item/${
                  groups.itemId
                }.png`
              "
              ><span v-if="groups.count > 1" class="item-count ml-12 pl-1 pa-2">
                {{ groups.count }}
              </span>
              {{
            }}</v-img>
          </div>
        </div>
        ></v-col
      >

      <v-col cols="6">
        <div v-if="championId">
          <div v-for="skills in skillLevels" :key="skills.timestamp">
            {{ skillsMatch[skills[0].skillSlot] }}
            <h1>{{ getTime(skills[0].timestamp) }}</h1>
            <div :style="`height: ${skills[0].timestamp / 10000 + 64}px`"></div>
            <!-- <v-img
              :src="
                `https://cdn.communitydragon.org/latest/champion/${
                  championId.participantChampion
                }/ability-icon/${skillsMatch[skills[0].skillSlot]}`
              "
              max-width="64px"
              max-height="64px"
              class="item-image"
            ></v-img> -->
          </div>
        </div></v-col
      >
    </v-row>
    <div></div>
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

    this.data = res.data.result;

    this.championId = res.data;

    this.events = res.data.participantEvents;
    console.log(this.events);

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
    versionNumber() {
      return this.version ? this.version[0] : '';
    },
    stackedPurchasedItems() {
      let ids = [];
      let final = [];
      console.log(this.events);
      const items = this.events.filter(item => item.type === 'ITEM_PURCHASED');

      items.map(item => {
        const itemId = item.itemId;
        const foundId = ids.indexOf(itemId);

        if (foundId === -1) {
          item.count = 1;
          final.push(item);
          ids.push(itemId);
        } else {
          final.map(item => {
            if (item.itemId === itemId) {
              item.count++;
            }
          });
        }
      });

      //Track the last timestamp
      var last = 0;
      //Reduce the array into an array of arrays
      const groups = final.reduce((acc, item) => {
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
    },
    skillLevels() {
      let ids = [];
      let final = [];

      const skills = this.events.filter(item => item.type === 'SKILL_LEVEL_UP');

      //Track the last timestamp
      var last = 0;
      //Reduce the array into an array of arrays
      const groups = skills.reduce((acc, item) => {
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
      console.log(groups);
    },
    skillLevels() {
      let ids = [];
      let final = [];

      const skills = this.events.filter(item => item.type === 'SKILL_LEVEL_UP');

      //Track the last timestamp
      var last = 0;
      //Reduce the array into an array of arrays
      const groups = skills.reduce((acc, item) => {
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
      console.log(groups);
    }
  }
};
</script>

<style>
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
</style>
