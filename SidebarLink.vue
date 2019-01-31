<script>
import { isActive, hashRE, groupHeaders } from './util'

export default {
  functional: true,

  props: ['item'],

  render (h, { parent: { $page, $site, $route }, props: { item }}) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path)
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active = item.type === 'auto'
      ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
      : selfActive
    const link = renderLink(h, item.path, item.title || item.path, active)
    const configDepth = $page.frontmatter.sidebarDepth != null
      ? $page.frontmatter.sidebarDepth
      : $site.themeConfig.sidebarDepth
    const maxDepth = configDepth == null ? 1 : configDepth
    const displayAllHeaders = !!$site.themeConfig.displayAllHeaders
    if (item.type === 'auto') {
      return [link, renderChildren(h, item.children, item.basePath, $route, maxDepth)]
    } else if ((active || displayAllHeaders) && item.headers && !hashRE.test(item.path)) {
      const children = groupHeaders(item.headers)
      return [link, renderChildren(h, children, item.path, $route, maxDepth)]
    } else {
      return link
    }
  }
}

function renderLink (h, to, text, active) {
  return h('router-link', {
    props: {
      to,
      activeClass: '',
      exactActiveClass: ''
    },
    class: {
      active,
      'sidebar-link': true
    }
  }, text)
}

function renderChildren (h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h('ul', { class: 'sidebar-sub-headers' }, children.map(c => {
    const active = isActive(route, path + '#' + c.slug)
    return h('li', { class: 'sidebar-sub-header' }, [
      renderLink(h, path + '#' + c.slug, c.title, active),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1)
    ])
  }))
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.sidebar .sidebar-sub-header
  padding-left 1rem
  font-size 0.95em

a.sidebar-link
  font-weight 400
  display inline-block
  color $textColor
  margin 0 0 0 2rem
  line-height 1.4
  background-image url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAbCAYAAAA6aQxyAAAAAXNSR0IArs4c6QAABTNJREFUWAnNV01MlEcYfvcPFhQEqxZNPLQJqT8gCBa92KZaq7EaD/ZWT/Zk0osXezDRePDkwZMXD03sxaRpD7ahjaE00aaJFARZf1rTpIfWIAVx+WdhWb4+z8vMx+wHy+5CGn2T4Z33mffnmflmZgeRgHieF0L7Ei0oFwOu/5uJwheDxWGTUyhvUThdWyLYQufyJlilAwqds8WW0NeWTY+AK27Q38/6vIHBIRdi//Nlk6xikLndYqxNDgG5smQJOF1yHZ/19XutbXe8H9t/8V4MJd2hORifLZlkFSBzojG3CmuyNjmQS0Au2VJhdjD4BdQFC/YPvJDex0/VnJubk64HjyQ5PGKHuQ+vI+ZTC6xWm1zXkUf3OGuxJmtTEk+eCjk5csFwljA6DHrPGXTJKpxBok4kHB4ds26c+A3EnrTASrXJcQPxupis0dnzSFjTiufJIk4Y20/u4VAohGEhkXYbsK32bdm6pcaaqmdnM9LZ/VBGx8YtHkHnJpJ8bIFitYm9iTjm0tysMZvJZKUiF3JyhFw/IXedNTopACfQfqUTbKnbXitbajbR9CU9Oyu/ocD4xKTFYuh8AyIfWqBQbWK+hT9zaE7mZg1XyIFcyMkIOZ4wnOc/GwcATEAdResytjTsfEdqNm2g6ctMOi0d9xMyMTllsTg6t0BovwXyaeN7C36l9GUu5mRuV1ibHBzy5HbUcFVX/QI2CAOj6B9GSxBjYGPdNtm4YT1NX6ZnZqSjOyFTKX44lXL8bQWxFmPnVManFQ6M0RzMxZyusCZrO+TJ6bDh6LtmTYAoHF5CHUL7g3Y4HJam+h3yRnUVTV9SqWldtdT0tMUq0LkNgo0WCGozdhs4fYWxXHnmcoW1WJO1jZDLIcPNYqp9DxeF4wDsg2h/EY9EwtLcuFOqqypp+jI5lVICzupxlm0gusN3Mh2DtcHUldCvCPLM4QprsBZrGiGHg4aTxXzte/mI6SCgD90DaP8QikYisqexTtZVrqXpC/evHr6F/ctD0w7CtdbJ9Hlz6IFKw5cxzjlSV+ZmDdYywtoHDBeLZWn/aGehjmGK3wG0mbA9xGPjPPMLwuItTbskFo1akMXt78td9LdyYP4mS8jIqH8dE5aKtWtkb/MuKYnppUToOdr7IP8njVySdwIMNJ+fk9AV5Oe/19W7aAWr11XKu0317gry87PGW2h6v/OeT47wrliQNeVlsm9Pg5SWlFiQP7sk/8QCuXRBE2AwJrEb6mc03cM8gJxEcA/zAHIbOHuY4ZLJzD9JhpLDats/5WVxJR8v1RuVMB0+APkH1mc5nfMMBIOQsAfYETR9T7DgXmwZp7CGkGB34rH/jiHINw2xIPl4fFEO5j5SKHnmLngCdEbiDqhjaPpTXIbV4751Pj3dZHAoKT0PfwdxTxv7xFxhDBeAOYww5zFTw2J5dcFbyM2E7fQR7O/Q9LvzQN+73yvpdPYzYPObGzXs+b+DbrjEYlHZ19ygB9cM8IfgOMjzmi1KVjQBVsAkjkP5bxk+8jgJPvqWk2g0ouQrK/zrmO+HkyD//XJxucaK2kJuElPwFDBlTEItu+txeP073HXXPsfo45Bn7KmVkmfSFU+AwSj8NdRpND7JpYrXKH5FnScAYRViHKOPEcacNjksVrRe1QRYDQS+gjpjK6/HNdrcgEksPH+1T4xjjpwxsQ70Crs4E2fRfMG/gN4PP93Vxn5Azr5CqrlLg+R5l2hf/4DHFpDzuTO8BiMgezlA2DUvvwYU81MA46sua9O/mj+yeI//AL+Jay6qcHkTAAAAAElFTkSuQmCC')
  background-repeat no-repeat
  background-position left center
  background-size 16px 9px
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color #3a3d3f
    border-left-color $accentColor
    background-image url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAbCAYAAAA6aQxyAAAAAXNSR0IArs4c6QAABSFJREFUWAm1V0tInVcQHq9vxSpaRatFqRZLK9VCpYtCF0kIgVCyCYVsGpBiEcTXIpsuQiBZBRURFUFdubOlJUjIo8miurAKFh9VsWIFUUQrPqoRn7ffdzrn93hj1Ks3HwznzJyZ75vx/i9F3gL8fn89LBD1b0Eq9JTo+kFg547/IPSKIWREoz84zfoHBgaMuTHmhFBSIkJFhsaqwXXf8g0NDUl7e7txIyMjpbCw0B7dR+6rsLCwkFxSPst6kRUNfY/6OssxNjYmra2tsr+/b4x7xhzUaY0TOt/2wgOgkW8h3WLlJycnpbm5Wfb29mzI7BnjmYMWrXVCwW8vNAAa+AaSHbAwSk9PT0tjY6Ps7OzQPQLGeMYcBWs6lMPGgl7PPQCEv4ZaJyycqrOzs9LQ0CDb29t0jwXPmMNcBWs7lcvGglrPNQAEr0KlCxZJtfn5eamvr5etrS26HoqLi4XmgjnMZY2CHF3KaWNnXoMeAEJfgf0XWDRVFhcXTUMbGxt0PRQVFUlJSYkx7l0wl0OwVkGun5Xbxs60BjUABL4AazcsluzLy8tSW1sra2trdD0UFBRIaWmphIeHG+OeMResYS05FHFYu1XDxk5dzzwAiD8D2xNYAllXV1elrq5OVlZW6HrIz8+XsrIyiYg4fMVwzxjPXLCWHORSkPuJatnYieuZBgDhJ2B5Bksi2/r6uhFeWlqi6yE3N1fKy8uFLy4FHzl/c88Yz5jjghwcgpwKajyD5sc2cNJ66gAg+hAEv8LeJdHm5qa5fhcWFuh6yMnJkYqKComONrcG43zUXIZd0r05Y052djZChyAX7wlyK6j1QrVt7Nj1xAFAQKUXsHRW8wnCx+Dc3BxdD5mZmVJZWSmxsebWYJzTXcbnwgyNe42ZnKqqKmGNC3KS23mSUZNDHJ3WLcL+jQOg8D2cv4S9zxo+w/kimpmZoeshPT1dampqJD4+3sb+weYKGv/LBnR/BT7PTC5rWOuC3NRw3iXUfqm9uKne/tgBUJCGDP7lP2Dm7u6uNDU1ydTUFF0PqamppvmEBHNfM8678Soa/tNL0o3G+P4wdyxrOAQ5XFCDWtRUsAf+EuzpNbw2ABKTkfUc9hGz+U3T0tIiExMTdD0kJyebBpKSzH3N+L+wa2j0Dy8pYKNn1zRXWMshyOWCWtR0vqfYy3PtzU09egkh4R2cPoV9yqyDgwNpa2uT0dFRuh4SExONcEpKio29wuY6GvzdBt60as51nLNGyMEhyOmCmtRmDwr29FR7tLHDAXDAi/gx7HOesrCjo0MGBwfperA/fVqa94vy4+cGGuvxkk7ZaO4NpJkPJ3JxCOdSNAzUZg/OEOztsfZqcswlhEAMvEewLxmFL52dndLf30/XQ1xcnFRXV0tGRoaN8UK9iYb4mA0KWnMTReZiJye5qeGCPbAX9qRgj4+0Z/Fhw8/an2CXNEG6urqkt7fXumaNiYkRPv6ysrJsfB+bW2ik2waCXbX2FurIZbipQS0X7IU9OWCvP7J3H0g42m/OoeTl5QniXigqKsq8pPiyUvDCvI0cDn4hKMdtkJiL3b4QqWnh8/lMT9bXtUd7/9/FNPdgHvr6+vz4CPPjG8Y/Pj7uxbE5gH0XQHZhl5zKjcVvNKnNHthLAO4dK4ikh25iT0+Pf2RkxA1xX35scQiC5HbFhoeH/ewhAA9PlEJyU0CB6945sTgEhxC74woG7JtOlUBBGIz/qwbi7qnFIUqA8N1Acfjs6fDGVK3/AGNFZ80LUX0iAAAAAElFTkSuQmCC')
  .sidebar-group &
    padding 1rem 0 1rem 2rem
  .sidebar-sub-headers &
    border-left none
    background-image none
    &.active
      font-weight 500
      border-right 3px solid $accentColor
      background-color #f3f5f7
</style>
