import SpotifyWrapper from 'spotify-wrapper-test-tdd'

import spotifyAside from './components/spotify-aside/spotify-aside.controller'
import spotifyMain from './components/spotify-main/spotify-main.controller'

import spotifyWrapperPlayer from './spotify-wrapper-player.controller'

import styles from './spotify-wrapper-player.css'

export const spotify = new SpotifyWrapper({
  apiKey:
    'BQANkVco2yn86diJnlguCWFfob0EksetjcXN8aJLkqLydz319h7y7XNygg0PTJZXGdiwCNo8E3ZzCviLYDUc8vpv1nwyfGWdp3vVHWZuEraYImg6YuflEqi_J9XuQkzIjMaBeYJBN1XWsQPjU6Mg64Fn7Z1TqUI2ok8',
})

export default { spotifyWrapperPlayer, spotifyMain, spotifyAside }
