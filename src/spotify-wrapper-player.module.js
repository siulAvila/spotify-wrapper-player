import SpotifyWrapper from 'spotify-wrapper-test-tdd'

import spotifyAside from './components/spotify-aside/spotify-aside.controller'
import albumInfo from './components/album-info/album-info.controller'
import trackList from './components/tracklist/tracklist.controller'
import spotifyWrapperPlayer from './spotify-wrapper-player.controller'

import styles from './spotify-wrapper-player.css'

const spotify = new SpotifyWrapper({
  apiKey:
    'BQBWlREYzcFxrzn50irErj4HPOEq7WvzJ8lzaJZ4TKzYGefd3LVHM2UA7wb5ltjGOZ2-1lLDxHt2nOuK7ldiF8Dny30eREm_6RHrkcrESzQjuXAb51y02He41O4U-EaCw7KIDp_aELgVUCuHVHMy6m4k0mmtxqKuXeI',
})

export default spotify
