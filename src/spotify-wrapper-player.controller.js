import spotifyAside from './components/spotify-aside/spotify-aside.controller'
import albumInfo from './components/album-info/album-info.controller'
import trackList from './components/tracklist/tracklist.controller'

import styles from './spotify-wrapper-player.css'

const template = document.createElement('template')
template.innerHTML = `

<style>
@import './styles.css';
</style>
<div class="spotiy-wrapper">

    <aside class="side-nav">
    <spotify-aside></spotify-aside>
    </aside>

    <main class="main-content">
      <album-info></album-info>
      <track-list></track-list>
    </main>

</div>
`

class SpotifyWrapperPlayer extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(template.content.cloneNode(true))
  }
}
customElements.define('spotify-wrapper', SpotifyWrapperPlayer)
