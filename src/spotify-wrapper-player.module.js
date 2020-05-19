import SpotifyWrapper from 'spotify-wrapper-test-tdd'

import spotifyAside from './components/spotify-aside/spotify-aside.controller'
import spotifyMain from './components/spotify-main/spotify-main.controller'

import spotifyWrapperPlayer from './spotify-wrapper-player.controller'

import styles from './spotify-wrapper-player.css'

const spotify = new SpotifyWrapper({
  apiKey:
    'BQAJR0ZMN0_Lw7DR7cGJ5pFGXpMPIkxUNGVIF88p8ekXa7rFwc_tVRM7kaveVPRK8vWlqV4-Fp5D9vn-ZPxbJ7n2szoKe_qlEWEr28L7D8Xu-7sCJ4v32N9-56Df64l1HcniSyFSJBtuB4Na8p89JdXZOMaiho6C2XY',
})

export default spotify
