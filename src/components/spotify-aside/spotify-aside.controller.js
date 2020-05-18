import albumList from './album-list/album-list.controller'
import asideHeader from './aside-header/aside-header.controller'

import './spotify-aside.css'

const template = document.createElement('template')
const style = document.createElement('style')

style.textContent = "@import './styles.css';"

template.innerHTML = `
<div class="aside">
  <aside-header id="header"></aside-header>
  <album-list albums=""></album-list>
</div>
`
export default class SpotifyAside extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(style)
    this.shadow.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {}

  static get observedAttributes() {
    return ['data']
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (newValue) {
      const albumListComponent = this.shadow.querySelector('album-list')
      albumListComponent.setAttribute('albums', newValue)
    }
  }
}

customElements.define('spotify-aside', SpotifyAside)
