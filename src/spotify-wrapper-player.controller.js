import spotifyWrapperPlayerModule from './spotify-wrapper-player.module'

import { formatToAlbums, formatToTracks } from './utils/utils'

const spotifyData = []

const template = document.createElement('template')
template.innerHTML = `

<style>
@import './styles.css';
</style>
<div class="spotiy-wrapper">

    <aside class="side-nav">
    <spotify-aside id="aside" data='${spotifyData}'></spotify-aside>
    </aside>

    <main class="main-content">
      <album-info id="album-info" album=""></album-info>
      <track-list id="trackList" tracks=""></track-list>
    </main>

</div>
`

class SpotifyWrapperPlayer extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    this.eventListeners()
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
      .catch((error) => console.log(error))
  }

  getSelectedAlbum(albumId) {
    spotifyWrapperPlayerModule.albums
      .searchAlbumsById(albumId)
      .then((data) => {
        const albumInfo = this.shadow.getElementById('album-info')
        const trackList = this.shadow.getElementById('trackList')
        albumInfo.setAttribute('data', JSON.stringify(data))
        trackList.setAttribute('tracks', JSON.stringify(formatToTracks(data)))
      })
      .catch((error) => alert(error))
  }
}

customElements.define('spotify-wrapper', SpotifyWrapperPlayer)
