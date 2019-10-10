import NotFound from "./global-components/NotFound";
import HelpCenterLayout from "./layouts/HelpCenterLayout";
import ProductLayout from "./layouts/ProductLayout";
import DocumentationLayout from "./layouts/DocumentationLayout";
import KnowledgeBaseLayout from "./layouts/KnowledgeBaseLayout";
import GettingStartedLayout from "./layouts/GettingStartedLayout";
import VideoTutorialsLayout from "./layouts/VideoTutorialsLayout";
import store from './store';

const pageTypeByUrl = {
  '/home/': 'product',
  '/kb/': 'knowledgeBase',
  '/vt/': 'videoTutorials',
  '/getting-started/': 'gettingStarted',
};

export default ({
                  Vue, // the version of Vue being used in the VuePress app
                  options, // the options for the root Vue instance
                  router, // the router instance for the app
                  siteData // site metadata
                }) => {

  Vue.mixin({store: store})

  Vue.component('NotFound', NotFound);
  Vue.component('ProductLayout', ProductLayout);
  Vue.component('DocumentationLayout', DocumentationLayout);
  Vue.component('KnowledgeBaseLayout', KnowledgeBaseLayout);
  Vue.component('GettingStartedLayout', GettingStartedLayout);
  Vue.component('VideoTutorialsLayout', VideoTutorialsLayout);
  Vue.component('ProductLayout', ProductLayout);
  Vue.component('HelpCenterLayout', HelpCenterLayout);
  Vue.mixin({
    computed: {
      $pageType() {
        const isHelpCenterMain = this.$site.themeConfig.isHelpCenterMain;
        if (isHelpCenterMain === true) {
          return 'helpCenter';
        }

        const path = this.$page.path;
        if (path) {
          const relPath = path.replace(new RegExp(`^${this.$localePath}`), '/');
          const rootPathMatch = relPath.match(/\/[^\/]*\//)
          const type = rootPathMatch ? pageTypeByUrl[rootPathMatch[0]] : undefined;
          if (type) {
            return type;
          }
        }
        return 'documentation';
      },
      $layoutCfg() {
        return this.$themeLocaleConfig.layouts[this.$pageType] || {};
      },
      // override default $siteTitle
      $siteTitle() {
        return this.$layoutCfg.siteTitle || '';
      },
    }
  })
}
