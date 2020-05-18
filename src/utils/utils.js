import albums from 'spotify-wrapper-test-tdd/lib/api/albums'

export const debounce = (func, timeout) => {
  let timer
  return (...args) => {
    const next = () => func(...args)
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(next, timeout > 0 ? timeout : 3000)
  }
}

export const formatToAlbums = (albumList) => {
  return albumList.albums.items || []
}

export const formatToTracks = (trackList) => {
  return trackList.tracks.items || []
}

export const convertMsToSeconds = (milliseconds) => {
  let s = parseInt((milliseconds / 1000) % 60, 10)
  const m = parseInt((milliseconds / (1000 * 60)) % 60, 10)

  s = s < 10 ? `0${s}` : s

  return `${m}:${s}`
}
