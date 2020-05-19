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
    if (newValue) {
      const albums = JSON.parse(newValue)
      this.render(albums)
    }
  }

  render(albums) {
    const template = this.createTemplate(albums)
    const style = this.createStyle()
    this.shadow.innerHTML = template
    this.shadow.appendChild(style)
    this.eventListener()
  }

  createTemplate(albums) {
    const li = albums
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

    const template = `<ul class="album-list">${li}</ul>`

    return template
  }

  createStyle() {
    const style = document.createElement('style')
    style.textContent = `
    .album-list {
      color: white;
      height: 75vh;
      overflow-y: auto;
      padding: 0;
    }
    
    ul {
      list-style: none;
    }
    
   
    
    .list-item {
      padding: 1rem;
      transition: opacity 0.4s;
    }
    
    .item-album {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
    }
    
    .item-album-cover {
      margin: 0;
      width: 30%;
    }
    
    .list-item:nth-of-type(even) {
      background: rgba(29, 32, 40, 0.61);
    }
    
    .list-item:hover {
      opacity: 0.3;
      cursor: pointer;
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
