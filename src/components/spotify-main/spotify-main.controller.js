import albumInfo from './album-info/album-info.controller'
import trackList from './tracklist/tracklist.controller'

export default class SpotifyMain extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.render()
  }

  render() {
    const template = this.createTemplate()
    const style = this.createStyle()
    this.shadow.innerHTML = template
    this.shadow.appendChild(style)
  }

  createTemplate() {
    const template = ` 
    <div class="spotify-main">     
      <album-info id="album-info" album=""></album-info>
      <track-list id="trackList" tracks=""></track-list>
    <div>`
    return template
  }

  createStyle() {
    const style = document.createElement('style')
    style.textContent = `
    .spotify-main{
        display: flex;
        flex-direction: row;
        padding: 1rem;
        margin-top: 5rem;
    }
    album-info {
        width: 20vw;
    }
      
    track-list {
        width: 80vw;
        height: 80vh;
        overflow-y: auto;
        padding: 1rem;
        margin-left: 6rem;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }
    
    ::-webkit-scrollbar {
      width: 2px;
      background-color: #f5f5f5;
    }
    
    ::-webkit-scrollbar-thumb {
      background-color: #000000;
    }
    
      `
    return style
  }
}
customElements.define('spotify-main', SpotifyMain)
