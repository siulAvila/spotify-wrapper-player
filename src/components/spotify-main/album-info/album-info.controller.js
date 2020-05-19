export default class AlbumInfo extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['data']
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (newValue) {
      const album = JSON.parse(newValue)
      this.render(album)
    }
  }

  render(album) {
    const template = this.createTemplate(album)
    const style = this.createStyle()
    this.shadow.innerHTML = template
    this.shadow.appendChild(style)
  }

  createTemplate(album) {
    const template = `
    <div class="album-info center-content">
      <figure class="center-content">
        <img src=${album.images[1].url} alt="album cover">
      </figure>
      <div class="music-info class="center-content">
        <h1 class="album-name">${album.name}</h1>
        <h3 class="artist-name">${album.artists[0].name}</h3>
    </div>
    </div>
`
    return template
  }

  createStyle() {
    const style = document.createElement('style')
    style.textContent = `
    .center-content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .album-info {
      flex-direction: column;
    }
    
    .music-info {
      margin-top: 1rem;
    }
    
    h1,
    h3 {
      text-align: center;
    }
    
    .album-name {
      color: white;
      margin-bottom: 0;
    }
    
    .artist-name {
      margin-top: 0.5rem;
    }

    
    `
    return style
  }
}

customElements.define('album-info', AlbumInfo)
