const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id }, headers: {authorization} } = req

    // const token = authorization.split(' ')[1]
    const [, token] = authorization.split(' ')

    try {
            logic.retrieveUser(id, token)
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