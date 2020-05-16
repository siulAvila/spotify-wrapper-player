import albumList from './album-list/album-list.controller'
import asideHeader from './aside-header/aside-header.controller'

import './spotify-aside.css'

const template = document.createElement('template')
const style = document.createElement('style')

style.textContent = "@import './styles.css';"

template.innerHTML = `
<div class="aside">
  <aside-header></aside-header>
  <album-list></album-list>
</div>
`
export default class SpotifyAside extends HTMLElement {
  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(style)
    this.shadow.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('spotify-aside', SpotifyAside)
