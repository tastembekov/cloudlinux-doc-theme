<template>
  <component :is="layout"/>
</template>

<script>
import Vue from 'vue'
import { setGlobalInfo } from '@app/util'
import {mapGetters} from "vuex";

export default {
  methods: {
    getLayout () {
      if (this.$page.path) {
        switch (this.$pageType) {
          case 'helpCenter':
              return 'HelpCenterLayout';
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
    setBodyClass(cssClass, needAdd) {
      if (!document) {
        return
      }

      const bodyCls = document.body.classList;
      needAdd ? bodyCls.add(cssClass) : bodyCls.remove(cssClass);
    }
  },

  computed: {
    ...mapGetters('page', [
      'isSidebarOpen',
      'isProductsOpen',
    ]),
    layout () {
      const layout = this.getLayout()
      setGlobalInfo('layout', layout)
      return Vue.component(layout)
    }
  },
  watch: {
    isSidebarOpen() {
      this.setBodyClass('sidebar-open', this.isSidebarOpen);
    },
    isProductsOpen() {
      this.setBodyClass('products-menu-open', this.isProductsOpen);
    },
  },
}
</script>
