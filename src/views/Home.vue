<template>
  <div class="home">
    <div class="md-layout md-gutter md-alignmen-center-center">
      <div class="md-layout-item md-xsmall-hide md-small-hide md-size-25"></div>

      <div class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-25">
        <md-field>
          <md-input v-model="location" placeholder="Enter city and state code ex. boston, MA"></md-input>
        </md-field>
      </div>

      <div class="md-layout-item md-xsmall-size-50 md-small-size-50 md-size-25">
        <md-field>
          <md-select v-model="category" placeholder="Category">

            <md-option value="">All Categories</md-option>
            <md-option v-for='(category, index) in parentCategories' :key='index' :value='category.alias'>{{ category.title }}</md-option>

          </md-select>
        </md-field>
      </div>

      <div class="md-layout-item md-xsmall-hide md-small-hide md-size-25"></div>
    </div>

    <BusinessList class="md-layout md-alignment-top-center" />

    <!-- <md-tabs class="md-transparent" md-alignment="fixed">
      <md-tab id="tab-list" md-label="List View">
        <BusinessList />
      </md-tab>

      TODO: Add map view
      <md-tab id="tab-map" md-label="Map View">
        <BusinessMap />
      </md-tab>

      TODO: Add favorites view
      <md-tab id="tab-favorites" md-label="Favorites">
        Favorites tab
      </md-tab>
    </md-tabs> -->

  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import BusinessList from '@/components/BusinessList.vue'
// import BusinessMap from '@/components/BusinessMap.vue'

export default {
  name: 'Home',
  components: {
    BusinessList
    // BusinessMap
  },
  computed: {
    location: {
      get () {
        return this.$store.state.location
      },
      set (value) {
        this.$store.commit('setLocation', { value })

        this.triggerSearch()
      }
    },
    businesses: {
      get () {
        return this.$store.state.businesses
      },
      set (value) {
        this.$store.commit('setBusinesses', { value })
        if (this.category) {
          this.filterBusinessesByCategory()
        }
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
    },
    allCategories: {
      get () {
        return this.$store.state.allCategories
      },
      set (value) {
        this.$store.commit('setAllCategories', { value })
      }
    },
    parentCategories: {
      get () {
        return this.$store.state.parentCategories
      },
      set (value) {
        this.$store.commit('setParentCategories', { value })
      }
    },
    category: {
      get () {
        return this.$store.state.category
      },
      set (value) {
        this.$store.commit('setCategory', { value })
        if (this.businesses) {
          this.filterBusinessesByCategory()
        }
      }
    }
  },
  methods: {
    triggerSearch () {
      const latLongMatch = [...this.location.matchAll(/^([-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)), ([-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?))$/g)][0]
      const lat = latLongMatch
        ? latLongMatch[1]
        : null
      const long = latLongMatch
        ? latLongMatch[5]
        : null
      const addressMatch = [...this.location.matchAll(/^[A-Za-z]+,[ ]?[A-Za-z]{2}$/g)][0]

      const searchQuery = lat && long
        ? `lat=${lat}&long=${long}`
        : addressMatch
          ? `location=${addressMatch[0]}`
          : null

      if (searchQuery) {
        const url = `https://1klcoul265.execute-api.us-west-2.amazonaws.com/production/v1/business?${searchQuery}`
        const requestType = 'businessSearch'
        this.searchRequest(url, requestType)
      }
    },
    async searchRequest (requestUrl, requestType) {
      try {
        const options = {
          headers: {
            'X-Api-Key': process.env.VUE_APP_DENO_API_KEY
          }
        }

        const yelpResponse = await axios.get(requestUrl, options)

        if (requestType === 'categories') {
          this.allCategories = yelpResponse.data
          this.parentCategories = this.allCategories.filter(category => !category.parentCategory)
        } else if (requestType === 'businessSearch' && this.location) {
          this.businesses = yelpResponse.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    async filterBusinessesByCategory () {
      try {
        const businesses = this.businesses

        this.filteredBusinesses = await this.asyncFilter(businesses, async (business) => {
          var mainBusinessCategories = []

          for (const businessCategory of business.categories) {
            const category = await this.allCategories.filter((category) => {
              return category.alias === businessCategory.alias
            })[0]
            const mainCategory = await this.categoryParentRecursion(category)

            await mainBusinessCategories.push(mainCategory.alias)
          }

          return mainBusinessCategories.includes(this.category)
        })
      } catch (err) {
        console.log(err)
      }
    },
    async categoryParentRecursion (subCategory) {
      try {
        if (!subCategory.parentCategory) {
          return subCategory
        } else {
          const parentCategory = this.allCategories.filter((category) => {
            return category.alias === subCategory.parentCategory
          })[0]

          return await this.categoryParentRecursion(parentCategory)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async asyncFilter (arr, predicate) {
      const results = await Promise.all(arr.map(predicate))

      return arr.filter((_v, index) => results[index])
    }
  },
  mounted () {
    this.$nextTick(() => {
      const url = 'https://1klcoul265.execute-api.us-west-2.amazonaws.com/production/v1/category'
      const requestType = 'categories'
      this.searchRequest(url, requestType)
      this.$getLocation()
        .then(coordinates => {
          this.location = `${coordinates.lat}, ${coordinates.lng}`
        })
    })
  }
}
</script>

<style lang="scss">
  .md-tabs {
    margin-bottom: 24px;
  }

  .home {
    font-family: $mainFont;
  }
</style>
