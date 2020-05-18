import './album-list.css'

let albumList = document.createElement('ul')

export default class AlbumList extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {}

  static get observedAttributes() {
    return ['albums']
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (newValue) this.render(JSON.parse(newValue))
  }

  render(albums) {
    albumList = albums
      .map((album) => {
        return `<li id="item" data-album-id=${album.id}  class="list-item">
                  <div  data-album-id=${album.id} class="item-album"> 
                      <figure  data-album-id=${album.id} class="item-album-cover">
                          <img  data-album-id=${album.id}  class="album-cover" alt="album cover" src="${album.images[2].url}"/>
                      </figure>
                      <div  data-album-id=${album.id} class="item-album-info">
                          <p  data-album-id=${album.id} > ${album.name}</p>
                          <p  data-album-id=${album.id}> ${album.artists[0].name}</p>
                      </div>
                   </div>
          </li>`
      })
      .join('')

    this.shadow.innerHTML = `
    <style> @import './styles.css'</style>
  <ul class="album-list">${albumList}</ul>`
    this.eventListener()
  }

  eventListener() {
    const itens = this.shadow.querySelectorAll('#item')
    itens.forEach((item) => {
      item.addEventListener('click', (event) => {
        const { target } = event
        const albumId = target.getAttribute('data-album-id')
        this.dispatchEventClickedAlbum(albumId)
      })
    })
  }

  dispatchEventClickedAlbum(albumId) {
    const clickeAlbumEvent = new CustomEvent('clickedAlbum', {
      bubbles: true, // bubble event to containing elements
      composed: true, // let the event pass through the shadowDOM boundary
      detail: {
        albumId,
      },
    })
    this.dispatchEvent(clickeAlbumEvent)
  }
}

customElements.define('album-list', AlbumList)
