const logic = require('../../logic')

module.exports = (req, res) => {
    const { params: { userId }, headers: {authorization} } = req

    // const token = authorization.split(' ')[1]
    const [, token] = authorization.split(' ')

    try {
            logic.retrieveUser(userId, token)
                .then((result) => res.json(result))
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