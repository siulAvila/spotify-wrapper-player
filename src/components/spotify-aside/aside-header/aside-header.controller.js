import { debounce } from '../../../utils/utils'

export default class AsideHeader extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.render()
  }

  connectedCallback() {}

  render() {
    const template = this.createTemplate()
    const style = this.createStyle()
    this.shadow.innerHTML = template
    this.shadow.appendChild(style)
    this.eventListeners()
  }

  createTemplate() {
    const template = `<header>

    <div class="header-info">
        <svg class="spotify-icon" viewBox="0 0 167.5 167.5">
            <title>Spotify</title>
            <path fill="currentColor" d="M83.7 0C37.5 0 0 37.5 0 83.7c0 46.3 37.5 83.7 83.7 83.7 46.3 0 83.7-37.5 83.7-83.7S130 0 83.7 0zM122 120.8c-1.4 2.5-4.6 3.2-7 1.7-19.8-12-44.5-14.7-73.7-8-2.8.5-5.6-1.2-6.2-4-.2-2.8 1.5-5.6 4-6.2 32-7.3 59.6-4.2 81.6 9.3 2.6 1.5 3.4 4.7 1.8 7.2zM132.5 98c-2 3-6 4-9 2.2-22.5-14-56.8-18-83.4-9.8-3.2 1-7-1-8-4.3s1-7 4.6-8c30.4-9 68.2-4.5 94 11 3 2 4 6 2 9zm1-23.8c-27-16-71.6-17.5-97.4-9.7-4 1.3-8.2-1-9.5-5.2-1.3-4 1-8.5 5.2-9.8 29.6-9 78.8-7.2 109.8 11.2 3.7 2.2 5 7 2.7 10.7-2 3.8-7 5-10.6 2.8z"></path>
            <h1 class="aside-title">Spotify-Wrapper</h1>
        </svg>
    </div>

    <div class="search-form">
        <div class="form-group">
        <label id="form-label" for="search-input"> Type an artist/album  </label>
        <input id="search-input" />
        <svg class="search-icon" viewBox="0 0 20 20">
		<path fill="currentColor" d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
		</svg>
        </div>
    </div>

</header>`
    return template
  }

  createStyle() {
    const style = document.createElement('style')
    style.textContent = `

    .aside-header {
      color: white;
    }
    .header-info {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding-top: 2rem;
    }
    .spotify-icon {
      height: 2rem;
      width: 2rem;
    }
    
    .aside-title {
      font-size: 1.5rem;
    }
    
    .search-form {
      display: flex;
      justify-content: center;
      padding: 1rem;
      margin-top: 1rem;
    }
    
    .form-group {
      position: relative;
      width: 100%;
    }
    
    #search-input {
      width: 100%;
      font-size:1.5rem;
      background: inherit;
      border: 0;
      box-shadow: 0 1px 0 0 #e5e5e5;
      color: white;
      box-sizing: border-box;
      outline: 0;
    }

    #search-input:focus{
      color: #1ed760
    }

    #form-label {
      position: absolute;
      width: 100%;
      bottom: 1rem;
      color: grey;
      animation: ease-in;
      transition: transform 150ms ease-out, font-size 150ms ease-out;
    }
    
    .form-label-on-Focus {
      transform: translateY(-120%);
      font-size: 0.75rem;
    }
    
    .search-icon {
      height: 24px;
      width: 24px;
      position: absolute;
      right: 5%;
      bottom: 10px;
    }
    `
    return style
  }

  eventListeners() {
    const formInput = this.shadow.getElementById('search-input')
    const labelInput = this.shadow.getElementById('form-label')
    this.inputFocusEventListener(formInput, labelInput)
    this.inputBlurEventListener(formInput, labelInput)
    this.inputKeyUpEventListener(formInput)
  }

  inputFocusEventListener(formInput, labelInput) {
    formInput.addEventListener('focus', () => {
      labelInput.classList.add('form-label-on-Focus')
    })
  }

  inputBlurEventListener(formInput, labelInput) {
    formInput.addEventListener('blur', () => {
      if (!formInput.value) labelInput.classList.remove('form-label-on-Focus')
    })
  }

  inputKeyUpEventListener(formInput) {
    const debouceEmitValueEvent = debounce(this.emitInputValueEvent.bind(this), 1000)
    formInput.addEventListener('keyup', (event) => {
      const inputValue = event.target.value
      if (inputValue) debouceEmitValueEvent(inputValue)
    })
  }

  emitInputValueEvent(searchInputValue) {
    const inputSearchEvent = new CustomEvent('inputSearch', {
      bubbles: true,
      composed: true,
      detail: {
        searchInputValue,
      },
    })
    const label = this.shadow.querySelector('#search-input')
    label.classList.add('active')
    this.dispatchEvent(inputSearchEvent)
  }
}

customElements.define('aside-header', AsideHeader)
