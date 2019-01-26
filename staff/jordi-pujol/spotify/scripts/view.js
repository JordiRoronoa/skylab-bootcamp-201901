class Panel {
    constructor($container) {
        this.$container = $container
    }

    show() {
        this.$container.show()
    }

    hide() {
        this.$container.hide()
    }
}

class SearchPanel extends Panel {
    constructor() {
        super($(`<section class="search container">
        <h2>Search</h2>
    <form>
        <input type="text" name="query" placeholder="Search an artist...">
        <button type="submit">Search</button>
    </form>
</section>`))

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }
}

class ArtistsPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
    <h3>Artists</h3>
    <ul></ul>
</section`))

        this.__$list__ = this.$container.find('ul')
    }

    set artists(artists) {
        artists.forEach(({ id, name }) => {
            const $item = $(`<li data-id=${id}>${name}</li>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onArtistSelected__(id)
            })

            this.__$list__.append($item)

        })
    }
    set onArtistSelected(callback) {
        this.__onArtistSelected__ = callback
    }

    clear() {
        this.__$list__.empty()
    }

}

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
        <h3>Albums</h3>
        <ul></ul>
    </section`))

        this.__$list__ = this.$container.find('ul')
    }

    set albums(albums) {
        albums.forEach(({ id, name }) => {
            const $item = $(`<li data-id=${id}>${name}</li>`)

            $item.click(() => {
                const id = $item.data('id')
                this.__onAlbumSelected__(id)
            })

            this.__$list__.append($item)
        }
        )
    }

    set onAlbumSelected (callback) {
        this.__onAlbumSelected__ = callback
    }

    clear() {
        this.__$list__.empty()
    }
}

class TrackPanel extends Panel {

    constructor() {

        super($(`<section class="results container">
        <h3>Tracks</h3>
        <ul></ul>
    </section`))

        this.__$list__ = this.$container.find('ul')
    }

    set tracks(tracks) {
        tracks.forEach(({ id, name}) => {
            const $item = $(`<li data-id=${id}>${name}<audio src="" controls></audio></li>`)

            $item.click(() => {
                const id = $item.data('id')
                this.__onPlayTrack__(id)

            })

            this.__$list__.append($item)
        })
    }
    clear () {
        this.__$list__.empty()
    }

    set onPlayTrack (track) {
        this.__onPlayTrack__ = track
    }

    set play (track) {
        const $audio = $item.find('audio')

        $audio.play(track)
    }
}
