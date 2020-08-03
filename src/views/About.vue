<template>
  <div class="about">
    <h1>Black Owned Businesses (B.O.B.) List</h1>
    <p>The B.O.B. List was created in order to make it easier to support our local B.O.Bs</p>
    <p>Due to the pandamec most small businesses have suffered but none more than B.O.Bs</p>
    <p>"More than 40 percent of black business owners reported they weren’t working in April,
      when businesses were feeling the worst of the pandemic’s economic consequences.
      Only 17 percent of white small business owners said the same,
      according to an analysis of government data by Robert Fairlie of the University of California, Santa Cruz...
      Only 12 percent of black and Hispanic business owners polled between April 30 and May 12 received the funding they had requested."
      (Leatherby, Lauren. <i>Coronavirus Is Hitting Black Business Owners Hardest</i>. The New York Times. 2020.
      <a href="https://www.nytimes.com/interactive/2020/06/18/us/coronavirus-black-owned-small-business.html">
        www.nytimes.com/interactive/2020/06/18/us/coronavirus-black-owned-small-business.html
      </a>)
    </p>
    <div class="md-layout">
      <div class="md-layout md-alignment-top-left">
        <p>© {{ this.currentYear }} Jacob Anavisca</p>
      </div>

      <div class="md-layout md-alignment-top-right">
        <md-button class="md-icon-button" href="mailto:jacobanavisca@gmail.com">
          <font-awesome-icon icon="envelope" size="2x" />
        </md-button>

        <md-button class="md-icon-button" href="https://github.com/JacobAnavisca">
          <font-awesome-icon :icon="['fab', 'github-alt']" size="2x" />
        </md-button>

        <md-button class="md-icon-button" href="https://www.linkedin.com/in/jacob-anavisca/">
          <font-awesome-icon :icon="['fab', 'linkedin']" size="2x" />
        </md-button>

        <md-button class="md-icon-button" @click="copyDiscordUsr">
          <font-awesome-icon :icon="['fab', 'discord']" size="2x" />
        </md-button>

        <md-button class="md-icon-button" href="https://t.me/Calcifer_Howl">
          <font-awesome-icon :icon="['fab', 'telegram-plane']" size="2x" />
        </md-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    discordUsr: 'Howl.Calcifer#3602'
  }),
  computed: {
    currentYear: function () {
      return moment().format('YYYY')
    }
  },
  methods: {
    copyDiscordUsr: async function () {
      try {
        await navigator.clipboard.writeText(this.discordUsr)
        console.log(`Copied discord username: ${this.discordUsr}`)
      } catch (err) {
        console.error('Failed to copy: ', err)
      }
    }
  }
}
</script>
