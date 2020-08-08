<template>
  <div class="businessList">

    <div v-if='currentBusiness'>
      <md-dialog :md-active.sync="showHoursDialog">
        <md-dialog-title>Hours</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab
            v-for='(dayObject, index) in selectedHours'
            :key='index'
            :md-label="dayObject.daysEnd
              ? dayObject.daysStart + '-' + dayObject.daysEnd
              : dayObject.daysStart"
          >

            <p
              v-for='(hours, index) in dayObject.open'
              :key='index'
            >{{ hours }}</p>
          </md-tab>
        </md-tabs>

        <md-dialog-actions>
          <md-button
            class="md-primary"
            @click="showSelectedHours(null)"
          >Close</md-button>
        </md-dialog-actions>
      </md-dialog>
      <md-card
        class="md-card-example md-layout-item md-xsmall-size-100 md-small-size-45 md-medium-size-30 md-large-size-24 md-xlarge-size-21"
        v-for='(business, index) in currentBusiness'
        :key='index'
      >
        <md-card-area md-inset>
          <md-card-media md-ratio="16:9">
            <img :src='business.photo' alt="Business Image">
          </md-card-media>

          <md-card-header>
            <h2 class="md-title">{{ business.name }}</h2>
            <div class="md-subhead">
              <md-icon>location_on</md-icon>
              <span>{{ (business.distance / 1609).toFixed(2) }} miles</span>
            </div>
          </md-card-header>

          <md-card-content>
            {{ business.categories.reduce((acc, cur) => {
                return acc + cur.title + ', '
              }, '')
            }}
          </md-card-content>
        </md-card-area>

        <div v-if='todaysHours(business.hours)'>
          <md-card-content>
            <h3 class="md-subheading">Today's availability</h3>
            <div class="card-reservation">
              <md-icon>access_time</md-icon>
                <md-button
                  class="md-raised"
                  v-for='(hour, index) in todaysHours(business.hours)'
                  :key='index'
                  @click="showSelectedHours(business.hours)"
                  >{{hour}}</md-button>
            </div>
          </md-card-content>
        </div>

        <div v-else>
          <md-card-content>
            <h3 class="md-subheading">No availability for today</h3>
            <md-button class="md-raised" @click="showSelectedHours(business.hours)">
              Check other days
            </md-button>
          </md-card-content>
        </div>

        <div>
          <md-card-actions>
            <md-button class="md-icon-button" :href="business.url">
              <md-icon>link</md-icon>
            </md-button>

            <md-button class="md-icon-button" :href="'tel:' + business.phone">
              <md-icon>phone</md-icon>
            </md-button>

            <md-button class="md-icon-button" :href="'https://maps.google.com/?q=' + business.address">
              <md-icon>directions</md-icon>
            </md-button>

            <!-- TODO: Allow favoriting -->
            <!-- <md-button class="md-icon-button">
              <md-icon>favorite_border</md-icon>
            </md-button> -->

            <!-- <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
            </md-button> -->
          </md-card-actions>
        </div>
      </md-card>
    </div>

  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BusinessList',
  data: () => ({
    showHoursDialog: false,
    selectedHours: null
  }),
  computed: {
    currentBusiness: function () {
      if (this.filteredBusinesses && this.category) {
        return this.filteredBusinesses
      } else {
        return this.businesses
      }
    },
    category: {
      get () {
        return this.$store.state.category
      },
      set (value) {
        this.$store.commit('setCategory', { value })
      }
    },
    businesses: {
      get () {
        return this.$store.state.businesses
      },
      set (value) {
        this.$store.commit('setBusinesses', { value })
      }
    },
    filteredBusinesses: {
      get () {
        return this.$store.state.filteredBusinesses
      },
      set (value) {
        this.$store.commit('setFilteredBusinesses', { value })
      }
    },
    totalBusinesses: {
      get () {
        return this.$store.state.totalBusinesses
      },
      set (value) {
        this.$store.commit('setTotalBusinesses', { value })
      }
    }
  },
  methods: {
    todaysHours: function (days) {
      if (!days || !days[0]) return null
      const dayOfTheWeek = moment().isoWeekday()

      const todayObject = days.find((dayObject) => {
        return dayOfTheWeek === dayObject.day + 1
      })

      if (todayObject && todayObject.open) {
        return todayObject.open
      } else {
        return null
      }
    },
    showSelectedHours: function (hours) {
      const dayStrings = {
        0: 'Mon',
        1: 'Tue',
        2: 'Wed',
        3: 'Thu',
        4: 'Fri',
        5: 'Sat',
        6: 'Sun'
      }

      if (hours) {
        this.selectedHours = hours.reduce((newHours, dayObject) => {
          const dayString = dayStrings[dayObject.day]

          if (newHours[0]) {
            const lastDayObject = newHours[newHours.length - 1]
            const sameHours = this.arraysEqual(dayObject.open, lastDayObject.open)

            if (sameHours) {
              newHours[newHours.length - 1].daysEnd = dayString

              return newHours
            } else {
              newHours.push({
                daysStart: dayString,
                daysEnd: '',
                open: dayObject.open
              })

              return newHours
            }
          } else {
            newHours.push({
              daysStart: dayString,
              daysEnd: '',
              open: dayObject.open
            })

            return newHours
          }
        }, [])
      }

      this.showHoursDialog = !this.showHoursDialog
    },
    arraysEqual: function (a, b) {
      if (a === b) return true
      if (a == null || b == null) return false
      if (a.length !== b.length) return false

      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
      }

      return true
    }
  }
}
</script>

<style lang="scss">

  .md-dialog /deep/.md-dialog-container {
    max-width: 768px;
  }

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

  .md-card-example {
    .md-subhead {
      .md-icon {
        $size: 16px;

        width: $size;
        min-width: $size;
        height: $size;
        font-size: $size !important;
      }

      span {
        vertical-align: middle;
      }
    }

    .card-reservation {
      margin-top: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .md-icon {
        margin: 8px;
      }
    }

    .md-button-group {
      display: flex;

      .md-button {
        min-width: 60px;
        border-radius: 2px;
      }
    }
  }
</style>
