<template></template>

<script>
import RedirectMixin from 'vuepress-theme-cloudlinux/mixins/RedirectMixin';

export default {
    mixins: [RedirectMixin],
    created() {
        this.checkRedirect();
    }
}
</script>
