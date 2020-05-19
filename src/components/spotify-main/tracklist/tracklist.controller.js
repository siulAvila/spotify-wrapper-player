import { convertMsToSeconds } from '../../../utils/utils'

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
      const tracks = JSON.parse(newVal)
      this.render(tracks)
    }
  }

  render(tracks) {
    const template = this.createTemplate(tracks)
    const style = this.createStyle()
    this.shadow.innerHTML = template
    this.shadow.appendChild(style)
    this.eventClickTrack()
  }

  createTemplate(tracks) {
    const template = tracks
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
    return template
  }

  createStyle() {
    const style = document.createElement('style')
    style.textContent = `
    .track {
      display: flex;
      padding: 1rem;
    }
    
    .track:hover {
      cursor: pointer;
      background: rgba(29, 32, 40, 0.61);
    }
    
    .track-index {
      width: 5%;
    }
    
    .track-name {
      width: 75%;
    }
    
    .track-time {
      width: 20%;
      text-align: end;
    }
    
    .active {
      color: green;
    }

    
    `
    return style
  }

  eventClickTrack() {
    const tracks = this.shadow.querySelectorAll('#track')
    tracks.forEach((track) => {
      track.addEventListener('click', (event) => {
        const { target } = event
        const { parentNode } = target

        const targetTrack = parentNode.shadowRoot === undefined ? event.target : parentNode
        const audioPreviewUrl = targetTrack.getAttribute('data-track-preview')
        this.audioPlayer(audioPreviewUrl, targetTrack)
      })
    })
  }

  audioPlayer(audioPreviewUrl, targetTrack) {
    if (targetTrack.classList.contains('active')) {
      this.audioObj.pause()
    } else {
      if (this.audioObj) {
        this.audioObj.pause()
      }

      this.audioObj = new Audio(audioPreviewUrl)
      targetTrack.classList.add('active')
      this.audioObj.addEventListener('pause', () => {
        targetTrack.classList.remove('active')
      })
      setTimeout(() => {
        this.audioObj.play()
      }, 500)
    }
  }
}

customElements.define('track-list', TrackList)
