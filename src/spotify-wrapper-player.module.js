import SpotifyWrapper from 'spotify-wrapper-test-tdd'

import spotifyAside from './components/spotify-aside/spotify-aside.controller'
import albumInfo from './components/album-info/album-info.controller'
import trackList from './components/tracklist/tracklist.controller'
import spotifyWrapperPlayer from './spotify-wrapper-player.controller'

import styles from './spotify-wrapper-player.css'

const spotify = new SpotifyWrapper({
  apiKey:
    'BQD3eAXltm6H6wLZpydfYCWmBj_pBAeS4lEenm4B6cPJRV_kUzqhu0XzWDjY2clRbRUqYm6fpW8vhEyLdiZUbTVjlITe_FwadQVyodhUZT2JqbNL4eZpA3BoFQujYgD5AkJjhzbO3MbCFfN9bXURZIyqLV2kNjjGwG4',
})

export default spotify
