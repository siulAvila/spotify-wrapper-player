import spotifyWrapperPlayerModule from './spotify-wrapper-player.module'

import { formatToAlbums, formatToTracks } from './utils/utils'

class SpotifyWrapperPlayer extends HTMLElement {
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
    this.eventListeners()
  }

  createTemplate() {
    const template = `
    <div class="spotify-wrapper">
        <aside class="side-nav">
         <spotify-aside id="aside" data=''></spotify-aside>
        </aside>
    
        <main class="main-content">
          <spotify-main></spotify-main>
        </main>
    </div>
    `
    return template
  }

  createStyle() {
    const style = document.createElement('style')
    style.textContent = `@import './styles.css'`
    return style
  }

  eventListeners() {
    this.addEventListener('inputSearch', (event) => {
      const { searchInputValue } = event.detail
      this.getAlbumList(searchInputValue)
    })

    this.addEventListener('clickedAlbum', (event) => {
      const { albumId } = event.detail
      this.getSelectedAlbum(albumId)
    })
  }

  getAlbumList(searchInputValue) {
    spotifyWrapperPlayerModule.search
      .searchItems(searchInputValue, 'album')
      .then((data) => {
        const aside = this.shadow.getElementById('aside')
        aside.setAttribute('data', JSON.stringify(formatToAlbums(data)))
      })
      .catch((error) => alert(error))
  }

  getSelectedAlbum(albumId) {
    spotifyWrapperPlayerModule.albums
      .searchAlbumsById(albumId)
      .then((data) => {
        const main = this.shadow.querySelector('spotify-main')

        const albumInfo = main.shadowRoot.getElementById('album-info')
        const trackList = main.shadowRoot.getElementById('trackList')

        albumInfo.setAttribute('data', JSON.stringify(data))
        trackList.setAttribute('tracks', JSON.stringify(formatToTracks(data)))
      })
      .catch((error) => alert(error))
  }
}

customElements.define('spotify-wrapper', SpotifyWrapperPlayer)
