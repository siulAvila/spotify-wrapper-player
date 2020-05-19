import albumList from './album-list/album-list.controller'
import asideHeader from './aside-header/aside-header.controller'

export default class SpotifyAside extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.render()
  }

  connectedCallback() {}

  render() {
    const template = this.createTemplate()
    const style = this.createStyle()
    this.shadow.innerHTML = template
    this.shadow.appendChild(style)
  }

  createTemplate() {
    const template = `
    <div class="aside">
      <aside-header id="header"></aside-header>
      <album-list albums=""></album-list>
    </div>
    `
    return template
  }

  createStyle() {
    const style = document.createElement('style')
    style.textContent = `
    
    
    .aside {
      background: #0f1015;
      box-shadow: 0px 5px 8px #0f1015;
      height: 100vh;
    }
    `
    return style
  }

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
