'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const users = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('user', () => {
    let client

    before(() =>
        MongoClient.connect(DB_URL, { useNewUrlParser: true })
            .then(_client => {
                client = _client
                users.collection = client.db().collection('users')
            })
    )

    beforeEach(() => users.collection.deleteMany())

    describe('add', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        it('should succeed on correct data', () =>
            users.add(_user)
                .then(id => {
                    expect(id).to.exist
                    expect(id).to.be.a('string')

                    return users.collection.findOne({ _id: ObjectId(id) })
                })
                .then(({ name, surname, email, password }) => {
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )
    })

    describe('findByEmail', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        beforeEach(() =>
            users.collection.insertOne(_user)
        )

        it('should suceed on correct data', () =>
            users.findByEmail(_user.email)
                .then(({ id, _id, name, surname, email, password }) => {
                    expect(id).to.exist
                    expect(_id).not.to.exist
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )
    })

    describe('findById', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        beforeEach(() => users.collection.insertOne(_user)
            .then(({ insertedId }) => _user.id = ObjectId(insertedId).toString())
        )

        it('should suceed on correct data', () =>
            users.findById(_user.id)
                .then(({ id, _id, name, surname, email, password }) => {
                    expect(id).to.exist
                    expect(_id).not.to.exist
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )
    })

    describe('update', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        const data = { name: 'Messi' }
        const data2 = { color: 'orange' }

        beforeEach(() => users.collection.insertOne(_user)
            .then(({ insertedId }) => _user.id = insertedId.toString())
        )

        it('should suceed on correct update', () =>
            users.update(_user.id, data)
                .then(() => users.collection.findOne({ _id: ObjectId(_user.id) }))
                .then(({ _id, name, surname, email, password }) => {
                    expect(_id).to.exist
                    expect(name).to.equal('Messi')
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )

        it('should suceed on correct update', () =>
            users.update(_user.id, data2)
                .then(() => users.collection.findOne({ _id: ObjectId(_user.id) }))
                .then(({ _id, name, surname, email, password, color }) => {
                    expect(_id).to.exist
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                    expect(color).to.equal(data2.color)
                })
        )

    })

    // describe('delete', () => {
    //     const _user = {
    //         name: 'Tachi',
    //         surname: 'Melodin',
    //         email: 'tachito',
    //         password: 'meguhtalagasssolina'
    //     }

    //     beforeEach(() => users.collection.insertOne(_user)
    //         .then(({ insertedId }) => _user.id = insertedId.toString())
    //     )

    //     it('should succeed on deleting data', () => {
    //         users.delete
        
    //     })
    // )

    after(() =>
        users.collection.deleteMany()
            .then(() => client.close())
    )
})