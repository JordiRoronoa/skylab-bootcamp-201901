const searchPanel = new SearchPanel
const artitstsPanel = new ArtistsPanel

const $root = $('#root')

artitstsPanel.hide()

$root.append(searchPanel.$container)
$root.append(artitstsPanel.$container)

searchPanel.onSearch = function(query) {

    try {
        logic.searchAr(query, function (error, artists){
            if (error) searchPanel.error = error
            else {
                artistsPanel.artists = artists

                artistsPanel.show()
            }
        })
    } catch (err) {}


}