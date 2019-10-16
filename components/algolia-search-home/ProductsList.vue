<template>
    <div class="dropdown-wrapper">
        <span v-if="!!items.title" class="title">{{ items.title }}:</span>
        <a class="dropdown-title">
            <span class="text">
                {{ items.text }}
                <span class="dropdown-arrow"></span>
            </span>
        </a>

        <ul class="nav-dropdown">
            <li
                    class="dropdown-item"
                    :key="subItem.link || index"
                    v-for="(subItem, index) in items.items"
            >
                <router-link
                        class="nav-link"
                        v-if="!!subItem.link"
                        :to="subItem.link"
                        :exact="exact"
                >
                    {{ subItem.text }}
                </router-link>
                <span
                        class="nav-link"
                        v-else
                        v-on:click="emitEvent(subItem)">
                    {{ subItem.text }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            items: {
                required: true
            }
        },

        computed: {
            exact() {
                if (this.$site.locales) {
                    return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
                }
                return this.link === '/'
            }
        },

        methods: {
            emitEvent(value) {
                this.$emit('valueChanged', value);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '../../styles/config.styl'

    .dropdown-wrapper
        cursor pointer
        position relative

        .dropdown-title
            color #373737
            display flex

        .dropdown-arrow
            margin 2px 0 0 10px

        .nav-dropdown
            .dropdown-item
                color inherit
                line-height 1.7rem

                a, span
                    display block
                    color $textColor
                    line-height 1.7rem
                    position relative
                    border-bottom none
                    font-weight 400
                    margin-bottom 0
                    padding 0 1.5rem 0 1.25rem
                    text-decoration none

                    &:hover
                        color $accentColor

                    &.router-link-exact-active
                        color $accentColor

                        &::after
                            content ""
                            width 0
                            height 0
                            border-left 5px solid $accentColor
                            border-top 3px solid transparent
                            border-bottom 3px solid transparent
                            position absolute
                            top calc(50% - 2px)
                            left 9px

    @media (max-width: $MQMobile)
        .dropdown-wrapper
            &.open .dropdown-title
                margin-bottom 0.5rem

            .nav-dropdown
                transition height .1s ease-out
                overflow hidden
                background-color #fff

                .dropdown-item
                    & > a
                        font-size 15px
                        line-height 2rem

    @media (min-width: $MQMobile)
        .dropdown-wrapper
            display: flex
            align-items center
            padding 10px 0
            height: 100%;
            box-sizing: border-box;

            &:hover .nav-dropdown
                display block !important

            .dropdown-title
                .text
                    display flex
                    align-items center
                    margin-left 6px
                    font-weight 600

            .nav-dropdown
                display none
                height auto !important
                box-sizing border-box;
                max-height calc(100vh - 2.7rem)
                overflow-y auto
                position absolute
                top 100%
                right 0
                background-color #fff
                padding 0.6rem 0
                border 1px solid #ddd
                border-bottom-color #ccc
                text-align left
                border-radius 0.25rem
                white-space nowrap
                margin 0
</style>
