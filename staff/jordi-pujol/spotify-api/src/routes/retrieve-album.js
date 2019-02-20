const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        logic.retrieveAlbum(id)
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