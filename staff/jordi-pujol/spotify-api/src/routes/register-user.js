const logic = require('../logic')

module.exports = (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(id => res.json({status : 'OK', data: {id}}))
            // .then(res.json.bind(res))
            .catch(({ message }) => {
                res.status(409).json({
                    error: message
                })
            })
    } catch ({ message }) {
        res.status(400).json({
            error: message
        })
    }
}