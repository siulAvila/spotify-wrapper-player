import styles from './album-info.css'

const img = ''
const name = 'Make Yourself'
const music = 'Incubus'

const template = document.createElement('template')
template.innerHTML = `
<style>
@import './styles.css';
</style>

<div class="album-info center-content">
  <figure class="center-content">
    <img src=${img} alt="album cover">
  </figure>
  <div class="music-info class="center-content">
    <h1 class="album-name">${name}</h1>
    <h3 class="music-name">${music}</h3>
</div>

</div>
`
export default class AlbumInfo extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(template.content.cloneNode(true))
  }
}
customElements.define('album-info', AlbumInfo)
