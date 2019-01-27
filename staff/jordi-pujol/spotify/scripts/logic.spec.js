spotifyApi.token = 'BQB_Jui53czi62O0Abtu1f8v8BTNb1GFdlQmun-NZMA5wKE6hTxjdQCYM5uHZ8bY8l4mlcHTMhRawSG8Nnt2HyW7-SwKIsLe7LzQMYErt7fSmwuAG1I9IC-kjWc-OrsJq3G2-BAPcNpb8wM'

describe('logic', function () {
    describe('search artists', function () {
        it('should succeed on matching query', function (done) {
            const query = 'madonna'

            logic.searchArtists(query, function (error, artists) {
                expect(error).toBeUndefined()

                expect(artists).toBeDefined()
                expect(artists instanceof Array).toBeTruthy()
                expect(artists.length).toBeGreaterThan(0)

                artists.forEach(({ name }) => expect(name.toLowerCase()).toContain(query))

                done()
            })
        })

        it('should fail on empty query', function () {
            const query = ''

            expect(() => logic.searchArtists(query, function (error, artists) { })).toThrowError('query is empty')
        })
    })
    describe('search albums', function(){
        it('shoud succeed on matching albums', function (done) {

            const artistId = '40tHhop0T30DwienQBmTxb'

            logic.retrieveAlbums(artistId, function (error, albums) {
                expect(error).toBeUndefined()

                expect(albums).toBeDefined()
                expect(albums instanceof Array).toBeTruthy()
                expect(albums.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on empty query', function () {
            const artistId = ''

            expect(() => logic.searchArtists(artistId, function (error, albums) { })).toThrowError('query is empty')
        })
    })
    describe('search albums', function(){
        it('shoud succeed on matching tracks', function (done) {

            const albumId = '5cAaJpYGFuIaZmLigIuWBh'

            logic.retrieveTracks(albumId, function (error, tracks) {
                expect(error).toBeUndefined()

                expect(tracks).toBeDefined()
                expect(tracks instanceof Array).toBeTruthy()
                expect(tracks.length).toBeGreaterThan(0)

                done()
            })
        })

        it('should fail on empty query', function () {
            const albumId = ''

            expect(() => logic.searchArtists(albumId, function (error, tracks) { })).toThrowError('query is empty')
        })
    })
})


// artistId = "40tHhop0T30DwienQBmTxb"

// albumId = "5cAaJpYGFuIaZmLigIuWBh"