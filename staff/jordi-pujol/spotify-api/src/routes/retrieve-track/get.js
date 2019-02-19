const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { trackId } } = req

    try {
        logic.retrieveTrack(trackId)
            .then((result) => res.json(result))
            .catch(({ message }) => {
                res.status(500).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}