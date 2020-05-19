import SpotifyWrapper from 'spotify-wrapper-test-tdd'

import spotifyAside from './components/spotify-aside/spotify-aside.controller'
import spotifyMain from './components/spotify-main/spotify-main.controller'

import spotifyWrapperPlayer from './spotify-wrapper-player.controller'

import styles from './spotify-wrapper-player.css'

export const spotify = new SpotifyWrapper({
  apiKey:
    'BQCPwhV7kPChW8Q4IreMGj4lz3gF-kt5NMqgxH6QrXRq5eRqcbwiwf3Wt9D2I3fGmedtVW4WZD1UtpjzIWJZJ9NLBusyXfS2tYXQgmpXMzuetenXRNlhmwU8_pKO8tB1QLNcdRGK8eBAz_osdiNeGoxMnwVPaRWyhXs',
})

export default { spotifyWrapperPlayer, spotifyMain, spotifyAside }
