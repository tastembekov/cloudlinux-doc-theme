<template lang="html">
  <a
    v-if="isExternalLink"
    :href="url"
    target="_blank"
    @click.native="$emit('click')"
  >
    <slot></slot>
  </a>
  <router-link
    v-else
    :to="url"
    @click.native="$emit('click')"
  >
    <slot></slot>
  </router-link>
</template>

<script lang="js">
  import {isExternal} from '../util';

  export default {
    props: {
      url: String
    },
    computed: {
      isExternalLink() {
        return isExternal(this.url);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .relative-link {

  }
</style>
