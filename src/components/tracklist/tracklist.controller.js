import styles from './tracklist.css'

const template = document.createElement('template')
const tracks = [
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
  { name: 'alow', time: '3:05' },
]

let element = document.createElement('div')
const style = document.createElement('style')
style.textContent = "@import './styles.css';"
element = tracks
  .map((track, index) => {
    return `<div class="track">
            <span class="track-index"> ${index} </span>
            <span class="track-name"> ${track.name} </span>
            <span class="track-time" > ${track.time} </span>
            </div>
          `
  })
  .join('')
template.innerHTML = element

export default class TrackList extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(style)
    this.shadow.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('track-list', TrackList)
