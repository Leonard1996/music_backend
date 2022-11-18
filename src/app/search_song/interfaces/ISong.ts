export interface ISong {
  id: string
  name: string
  title: string
  artists: [
    {
      artist_id: string
      name: string
    }
  ]
  album: {
    album_id: string
    name: string
  }
  duration: number
  thumbnail: string
  relevance?: number
}
