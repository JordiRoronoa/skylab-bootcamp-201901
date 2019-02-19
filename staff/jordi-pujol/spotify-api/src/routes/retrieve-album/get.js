const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { albumId } } = req

    try {
        logic.retrieveAlbum(albumId)
            .then((result) => res.json(result))
            .catch(({ message }) => {
                res.status(400).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}