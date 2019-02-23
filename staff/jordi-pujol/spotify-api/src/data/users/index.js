'use strict'

const { ObjectId } = require('mongodb')

const user = {
    collection: null,

    add(user) {
        // TODO validate user and its fields (type and content)

        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    findByEmail(email) {
        if (typeof email !== 'string') throw TypeError(email + ' is not a string')
        if (!email.trim().length) throw Error('email cannot be empty')

        return this.collection.findOne({ email })
            .then (user => {
                if (!user) return null
                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    findById(id) {
        // if (typeof id !== 'string') throw TypeError (`${id} is not a string`)
        // if (!id.trim().length) throw Error ('id cannot be empty')

        return this.collection.findOne({_id: ObjectId(id)})
            .then( user => {
                if (!user) return null
                user.id = user._id.toString()

                delete user._id

                return user
            })
    },

    update(id, data){
        return this.collection.updateOne({_id: ObjectId(id)}, {$set: data})

    }

    // delete(user){

    //     return this.collection.remove({_id: ObjectId(user.id)}, {$set: })
    // }
}

module.exports = user