<template>
    <div class="search-bar">
        <div class="search-bar__search-input">
            <div class="search-input">
                <div class="search-input__search-type">
                    <ProductsList :items="searchDropDownItems" v-on:valueChanged="valueChanged($event)"/>
                </div>
                <div class="search-input__input-wrapper">
                    <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algoliaOptions"/>
                </div>
                <div class="search-input__icon-wrapper">
                    <img class="product-item__icon" :src="$withBase('/search-icon.svg')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ProductsList from './ProductsList'
    import AlgoliaSearchBox from './AlgoliaProductsSearchBox'

    const ALL_PRODUCTS = 1;

    export default {
        components: { ProductsList, AlgoliaSearchBox },

        data() {
            return {
                searchInProduct: ALL_PRODUCTS, // All products
                searchDropDownItems: {},
            };
        },

        created() {
            const items = this.allSearchOptions;
            const text = this.getOptionTitle(this.searchInProduct);
            this.searchDropDownItems = { items, text };
        },

        watch: {
            $lang(newValue) {
                const items = this.allSearchOptions;
                const text = this.getOptionTitle(ALL_PRODUCTS);
                this.searchDropDownItems = { items, text };
            },

            searchInProduct(newProductId) {
                const items = this.allSearchOptions;
                const text = this.getOptionTitle(newProductId);
                this.searchDropDownItems = { items, text };
            }
        },

        computed: {
            algoliaOptions() {
                if (this.searchInProduct === ALL_PRODUCTS) {
                    return this.$themeLocaleConfig.algolia.filter(product => this.hasAlgoliaConfig(product));
                }

                const currentProduct = this.getCurrentProduct;
                const hasAlgoliaOptions = this.hasAlgoliaConfig(currentProduct);
                return hasAlgoliaOptions ? [currentProduct] : [];
            },

            isAlgoliaSearch() {
                return this.algoliaOptions && this.algoliaOptions.length > 0;
            },

            getCurrentProduct() {
                return this.$themeLocaleConfig.algolia.find(product => product.id === this.searchInProduct);
            },

            allSearchOptions() {
                const items = this.$themeLocaleConfig.algolia.filter(product => this.hasAlgoliaConfig(product));
                items.push({ id: ALL_PRODUCTS, text: this.$themeLocaleConfig.defaultSearchTitle });
                return items;
            },
        },

        methods: {
            valueChanged(newValue) {
                this.searchInProduct = newValue.id;
            },

            getOptionTitle(searchProductId) {
                const currentProduct = this.allSearchOptions.find((item) => searchProductId === item.id);
                return currentProduct ? currentProduct.text : this.$themeLocaleConfig.defaultSearchTitle;
            },

            hasAlgoliaConfig(algoliaProduct) {
                return algoliaProduct && algoliaProduct.apiKey && algoliaProduct.indexName;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .dropdown-selector
        width 300px
        position relative

    .search-bar
        text-align center
        color #FFF

        &__title
            font-weight normal
            font-size 55px

        &__description
            font-size 14px
            margin-top 8px

        &__search-input
            display flex
            justify-content center
            margin-top 26px

    .search-input
        display flex
        width 830px
        height 65px

        &__search-type
            width 213px
            height 65px
            padding-left 40px
            box-sizing border-box
            color #373737
            background-color #FFF
            font-size 14px
            font-weight 600
            border-radius 30px
            border-top-right-radius 0
            border-bottom-right-radius 0

        &__input-wrapper
            display flex
            align-items center
            width 560px
            background-color #FFF

        &__icon-wrapper
            display flex
            width 57px
            height 65px
            background-color #FFF
            border-radius 30px
            border-top-left-radius 0
            border-bottom-left-radius 0

</style>
