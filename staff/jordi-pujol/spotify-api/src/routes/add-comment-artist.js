const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { userId, comment }, params: { artistId }, headers: { authorization } } = req

    const token = authorization.substring(7)

    try {
        logic.addCommentToArtist(userId, token, artistId, comment)
            // .then(res => res.json(res))
            .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(401).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}