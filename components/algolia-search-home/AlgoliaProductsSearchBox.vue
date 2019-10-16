<template>
    <div class="algolia-search-box">
        <input class="search-input"
               v-model="query"
               :placeholder="$themeLocaleConfig.searchPlaceholder"/>
        <div class="search-results" v-if="showResults">
            <ul>
                <li v-for="(productResults, index) in searchResults" class="product-item">
                    <div class="product-title">{{ getProductTitle(index) }}</div>
                    <ul>
                        <li v-for="item in productResults" class="result">
                            <a :href="item.url" class="result__link">
                                <span class="result__parent">{{ item.hierarchy.lvl0 }}:</span>
                                <span class="result__anchor">
                                    {{ item.anchor }}
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['options'],

        data() {
            return {
                query: '',
                searchResults: {},
                indexes: {},
                showResults: false
            };
        },

        mounted() {
            this.initialize(this.options);
        },

        methods: {
            initialize(userOptions) {
                this.searchResults = {};
                this.showResults = false;
                Promise.all([
                    import(/* webpackChunkName: "docsearch" */ 'algoliasearch/dist/algoliasearch.js')
                ]).then(([algoliasearch]) => {
                    this.indexes = {};
                    for (let option of this.options) {
                        const client = algoliasearch.default(option.appId, option.apiKey);
                        this.indexes[option.id] = client.initIndex(option.indexName);
                    }
                });
            },

            getProductTitle(productId) {
                const product = this.$themeLocaleConfig.products.find(item => item.id === +productId);
                return product ? product.title : null;
            }
        },

        watch: {
            options(newValue) {
                this.initialize(newValue);
            },

            query(newValue) {
                this.searchResults = {};
                this.showResults = false;
                if (!newValue) {
                    return;
                }
                console.log(this.indexes, 'indexes');
                for (let id in this.indexes) {
                    this.indexes[id].search({ query: newValue },
                        (err, { hits } = {}) => {
                            if (err) throw err;
                            if (hits.length === 0) return;
                            this.searchResults[id] = hits;
                            this.showResults = true;
                        }
                    );
                }
            },

            searchResults(newValue) {
                console.log(newValue);
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .algolia-search-box
        width 100%
        position relative

    .search-input
        width 100%
        height 48px
        box-sizing border-box
        font-size 14px
        color #373737
        line-height 48px
        border none
        outline none

        &::placeholder
            color #adadad

    & > span
        vertical-align middle

    .search-results
        position absolute
        min-height 200px
        max-height 560px
        overflow-y auto
        overflow-x hidden
        background-color #FFF
        color #000
        width 560px
        height auto
        box-sizing border-box
        padding 0.6rem
        border 1px solid #ddd
        border-bottom-color #ccc
        text-align left
        border-radius 0.25rem
        white-space nowrap

    .product-item
        margin-top 10px
        padding-top 10px
        border-top 1px solid #ccc

        &:first-child
            margin-top 0
            padding-top 0
            border-top none

    .product-title
        font-size 1rem
        font-weight 600
        margin-bottom 10px

    .result
        border-bottom 1px solid #2b98f0
        padding 5px 10px

        &:last-child
            border none

        &__link
            text-decoration none

        &__parent
            font-weight 600
            color: #000
            margin-right 10px
            word-wrap: break-word;

            &:nth-child(even)
                background-color #FFF

        &__anchor
            word-wrap: break-word;

</style>
