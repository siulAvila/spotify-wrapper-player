import styles from './album-info.css'

export default class AlbumInfo extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['data']
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (newValue) {
      this.render(JSON.parse(newValue))
    }
  }

  render(album) {
    const albumInfo = `
          <style>
          @import './styles.css';
          </style>

          <div class="album-info center-content">
            <figure class="center-content">
              <img src=${album.images[1].url} alt="album cover">
            </figure>
            <div class="music-info class="center-content">
              <h1 class="album-name">${album.name}</h1>
              <h3 class="artist-name">${album.artists[0].name}</h3>
          </div>
          </div>
`
    this.shadow.innerHTML = albumInfo
  }
}

customElements.define('album-info', AlbumInfo)
