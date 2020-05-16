import './album-list.css'

const data = [
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
  { name: 'alow', img: 'a', artist: 'a' },
]

const template = document.createElement('template')

let albumList = document.createElement('ul')

const style = document.createElement('style')
style.textContent = "@import './styles.css';"

albumList = data
  .map((album) => {
    return `<li class="list-item">
                <div class="item-album"> 
                    <figure class="item-album-cover">
                        <img class="album-cover" alt="album cover" src="${album.img}"/>
                    </figure>
                    <div  class="item-album-info">
                        <p> ${album.name}</p>
                        <p> ${album.artist}</p>
                    </div>
                 </div>
        </li>`
  })
  .join('')

template.innerHTML = `
<ul class="album-list">${albumList}</ul>`

export default class AlbumList extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(style)
    this.shadow.appendChild(template.content.cloneNode(true))
  }
}

customElements.define('album-list', AlbumList)
