const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        logic.retrieveTracks(id)
            .then((result) => res.json(result))
            .catch(({ message }) => {
                if (message === 'The access token expired'){
                    res.status(401).json({
                        error: message
                    })
                }
                else if (message === 'invalid id'){
                    res.status(400).json({
                        error: message
                    })
                }
                else {
                    res.status(500).json({
                        error: message
                    })
                }
            })
    } catch ({ message }) {
        res.status(401).json({
            error: message
        })
    }
}