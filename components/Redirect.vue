<template></template>

<script>
import RedirectMixin from '../mixins/RedirectMixin';

export default {
    mixins: [RedirectMixin],
    created() {
        this.checkRedirect();
    }
}
</script>
