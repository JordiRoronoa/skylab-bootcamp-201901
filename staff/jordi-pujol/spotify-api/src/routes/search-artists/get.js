const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { query } } = req

    try {
            logic.searchArtists(query)
                .then((result) => res.json(result))
                .catch(({ message }) => {
                    res.status(502).json({
                        error: message
                    })
                })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}