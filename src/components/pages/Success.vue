<template>
  <div class="success">
      <h1 class="success__title">Заявка отправлена.</h1>
      <div class="success__img"></div>
  </div>
</template>

<script>
import store from '../../store'
import {router} from '../../router'

export default {
    name: 'Seccess',
    beforeRouteEnter (to, from, next) {
        if (store.state.appeal.isDataSended) {
            next()
        } else {
            router.push({name:'appeal'})
            next(false)
        }
    },
}
</script>

<style lang="sass" scoped src="../../media/sass/components/pages/success.sass"></style>
