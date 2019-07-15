const sidebarCls = 'sidebar-opened';
const productsMenuCls = 'products-menu-opened';

export default {
  computed: {
    isSidebarOpened() {
      return false;
    },
    isProducsOpened() {

    }
  },
  watch: {
    isSidebarOpened() {
      const bodyCls = document.body.classList;
      this.isSidebarOpened ? bodyCls.add(sidebarCls) : bodyCls.remove(sidebarCls);
    },
    isProducsOpened() {
      const bodyCls = document.body.classList;
      this.isProducsOpened ? bodyCls.add(sidebarCls) : bodyCls.remove(sidebarCls);
    }
  }
}
