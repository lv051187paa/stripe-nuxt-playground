<template>
  <div class="container">
    <div>
      {{test}}
      <logo />
      <h1 class="title">stripe-playground</h1>
      <h2 class="subtitle">Stripe playground</h2>
      <button @click="submit">Submit</button>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      test: {}
    }
  },
  components: {
    Logo
  },
  methods: {
    submit: async function() {
      try {
        const token = await this.$store.getters['stripe/getToken']({
          cardNumber: '4000002760000016',
          expMonth: '11',
          expYear: '2022',
          cvc: '111'
        })

        const customer = await this.$store.getters['stripe/createCustomer']({
          fullName: `Andrii Pavliuk`,
          email: 'lv051187paa@gmail.com',
          token: token.data.id
        })

        const subscription = await this.$store.getters[
          'stripe/createSubscription'
        ](customer.data.id)
        if (subscription.data.status === 'active') {
          console.log('subscription is active now')
        } else {
          const paymentIntetntId =
            subscription.data.latest_invoice.payment_intent.id
          const paymentIntetntSecret =
            subscription.data.latest_invoice.payment_intent.client_secret
          const intent = await this.$store.getters['stripe/aprovePayment']({
            secret: paymentIntetntId,
            redirect: 'http://localhost:3000'
          })
          const action = intent.data.next_action
          if (action && action.type === 'redirect_to_url') {
            window.location = action.redirect_to_url.url
          }
          console.log('subscription is active now')
        }
      } catch (err) {
        console.log(err)
      }
    },
    hideModal: function() {
      this.displayModal = false
      this.$router.push(
        this.localePath(this.getReferrer ? this.getReferrer : 'recipes')
      )
    },
    selectYear: function(e) {
      this.cardYear = e
    },
    selectMonth: function(e) {
      this.cardMonth = e
    },
    showModal: function() {
      this.displayModal = true
    }
  }
  // async created() {
  //   try {
  //     const res = await this.$store.getters['stripe/getToken']({
  //       cardNumber: '4242424242424242',
  //       expMonth: '11',
  //       expYear: '2022',
  //       cvc: '111'
  //     })

  //     this.test = res.data
  //   } catch (e) {
  //     console.log('Error: ' + e)
  //   }
  // }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
