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
    <form>
    <div class="row">
    <div class=" col input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"><img class="icon" src="https://starrsystems.net/wp-content/uploads/2016/07/Services-Music-Systems-page.png"></span>
        </div>
        <input type="text" class="form-control" name="query" placeholder="Search an artist..." aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
        <button type="submit" class="btn btn-outline-primary">Search</button>
    </div>
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
    <ul class =row container></ul>
</section`))

        this.__$list__ = this.$container.find('ul')
    }

    set artists(artists) {
        artists.forEach(({ id, name, images, followers, genres }) => {
            const genre = genres[0] ? genres[0] : 'Not available'
            const image = images[0] ? images[0].url : 'https://editorial.upc.edu.pe/wp-content/uploads/2018/08/no-photo.png'
            const $item = $(`<div class="item" data-id=${id}><img src="${image}" class="receivedImg">
            <li data-id=${id} class=title >${name}</li><li>Followers: ${followers.total}</li>
            <li>Main Genre: ${genre}</li>
            </div>`)

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
        <ul class = row></ul>
    </section`))

        this.__$list__ = this.$container.find('ul')
    }

    set albums(albums) {
        albums.forEach(({ id, name, images, release_date, total_tracks }) => {
            const $item = $(`<div data-id=${id} class="item"><img src="${images[0].url}" class ="receivedImg">
            <li data-id=${id} class=title>${name}</li><li>Release date: ${release_date}</li>
            <li>Total tracks: ${total_tracks}</li>
            </div>`)

            $item.click(() => {
                const id = $item.data('id')
                this.__onAlbumSelected__(id)
            })

            this.__$list__.append($item)
        })
    }

    set onAlbumSelected(callback) {
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
        tracks.forEach(({ id, name, preview_url, track_number, duration_ms }) => {
            const min = Math.floor((duration_ms/1000/60) << 0)
            const sec = Math.floor((duration_ms/1000) % 60)
            const $item = $(`<div class="item"><li data-id=${id} class="title" id="track">${track_number} - ${name}</li>
            <li><audio src="${preview_url}" controls></audio></li>
            <li>Duration: ${min}:${sec}</li>
    </div>`)

            this.__$list__.append($item)
        })
    }
    clear() {
        this.__$list__.empty()
    }
}
