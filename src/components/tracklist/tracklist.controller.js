import { convertMsToSeconds } from '../../utils/utils'

import styles from './tracklist.css'

let trackList = document.createElement('div')

export default class TrackList extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['tracks']
  }

  attributeChangedCallback(attributeName, oldVal, newVal) {
    if (newVal) {
      this.render(JSON.parse(newVal))
    }
  }

  render(tracks) {
    trackList = tracks
      .map((track) => {
        return `
        <div  id="track" class="track" data-track-preview=${track.preview_url}>
              <span class="track-index"> ${track.track_number} </span>
              <span class="track-name"> ${track.name} </span>
              <span class="track-time" > ${convertMsToSeconds(track.duration_ms)} </span>
       </div>
            `
      })
      .join('')

    this.shadow.innerHTML = ` <style> @import './styles.css</style> 
                              <div class="track-list">
                                ${trackList}
                              </div>`
    this.eventClickTrack()
  }

  eventClickTrack() {
    const tracks = this.shadow.querySelectorAll('#track')
    tracks.forEach((track) => {
      track.addEventListener('click', (event) => {
        const { target } = event
        const { parentNode } = target
        const audioPreviewUrl =
          parentNode.getAttribute('data-track-preview') || target.getAttribute('data-track-preview')
        this.audioPlayer(audioPreviewUrl)
      })
    })
  }

  audioPlayer(audioPreviewUrl) {
    if (this.audioObj) {
      this.audioObj.pause()
    }
    this.audioObj = new Audio(audioPreviewUrl)
    setTimeout(() => {
      this.audioObj.play()
    }, 500)
  }
}

customElements.define('track-list', TrackList)
