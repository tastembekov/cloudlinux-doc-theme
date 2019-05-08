export default {
    methods: {
        checkRedirect() {
            const redirectionMapping = this.$site.themeConfig.redirectionMapping;

            if (redirectionMapping) {
                let path = this.$route.fullPath;

                if (path === '/') {
                    this.$router.replace(this.$site.themeConfig.defaultURL);
                    return true;
                }
    
                if (path.substr(0, 2) === '/?') {
                    path = [path.slice(0, 1), 'index.html', path.slice(1)].join(''); // insert index.html into path
                }
    
                const newUrl = redirectionMapping[path];
                if (newUrl) {
                    this.$router.replace(newUrl);
                    return true;
                }
            }

            return false;
        }
    }
}
