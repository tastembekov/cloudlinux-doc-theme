<template>
  <component :is="layout"/>
</template>

<script>
import Vue from 'vue'
import { setGlobalInfo } from '@app/util'

export default {
  methods: {
    getLayout () {
      if (this.$page.path) {
        switch (this.$pageType) {
          case 'product':
            return 'ProductLayout';
          case 'gettingStarted':
            return 'GettingStartedLayout';
          case 'knowledgeBase':
            return 'KnowledgeBaseLayout';
          case 'videoTutorials':
            return 'VideoTutorialsLayout';
          case 'documentation':
          default:
            return 'DocumentationLayout';
        }
      }
      return 'NotFound';
    },
  },

  computed: {
    layout () {
      const layout = this.getLayout()
      setGlobalInfo('layout', layout)
      return Vue.component(layout)
    }
  }
}
</script>
