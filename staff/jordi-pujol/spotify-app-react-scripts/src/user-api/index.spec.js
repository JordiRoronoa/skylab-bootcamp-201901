'use strict'

import userApi from ".";

describe('user api', () =>{
    const username = `jordipujolooo-${Math.random()}`
    const password = '1234'

    describe('register', ()=>{

        it ('should succeed on correct data', ()=>
            userApi.register(username, password)
                .then(id => expect(id).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
            )

        it ('should fail on already existing user', () =>
            userApi.register(username, password)
                .then( ()=> {
                throw Error ('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    })

    describe('authorize', () =>{

        it ('should succed on correct data', ()=>
            userApi.authorize(username, password)
                .then(data => {
                    expect(data.id).toBeDefined()
                    expect(data.token).toBeDefined()
                })
                .catch(error => expect(error).toBeUndefined())
        )

        it ('should not return a token if user is not registered',() =>
            userApi.authorize('potato', password)
                .then ( ()=> {
                throw Error ('should not have passed by here')    
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${'potato'}\" does not exist`)

                })
        )
    })

    describe('retrieve', () =>{

        it('should succed on correct data', ()=>{
            userApi.authorize(username, password)
            .then((data) => {
                userApi.retrieve(data.id, data.token)
                .then(res => {
                    expect(res.username).toBeDefined()
                    expect(res.id).toBeDefined()})
                .catch(error => expect(error).toBeUndefined())
            })
        })
        it ('should fail if id does not exist',() =>
        userApi.authorize(username, password)
            .then((data) => {
            return userApi.retrieve('potato', data.token)
                .then ( () => {
                throw Error ('should not have passed by here')    
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`token id \"${data.id}\" does not match user \"${'potato'}\"`)
                })        
            })
        )
    })

    describe('update', () => {

        it('should succed on correct data', ()=>
            userApi.authorize(username, password)
            .then((data) => 
                userApi.update(data.id, data.token, {age: 23})
                .then(res => {
                    expect(res).toBeTruthy()
                return userApi.retrieve(data.id, data.token)})
                    .then(res => expect(res.age).toEqual(23))
                .catch(error => expect(error).toBeUndefined())
            )
        )

        it('should fail on empty input introduced', ()=>
        userApi.authorize(username, password)
        .then((data) => 
            userApi.update(data.id, data.token, 'potato')       
            .then(() => {
                throw Error ('should not have passed by here')    
                })
            .catch(error => {
                expect(error).toBeDefined()
            })  
        )   
        )
    })

    describe ('remove', () => {

    it('should succeed on correct data', () =>
        userApi.authorize(username, password)
        .then((data) => 
            userApi.remove (data.id, data.token, username, password))
            .then( res => {
                expect(res).toBeTruthy()
                return userApi.register(username, password)})
                    .then(id => expect(id).toBeDefined())
            .catch(error => {
                expect(error).toBeUndefined()
            })
        )

    it('should fail when username does not exists', () =>
        userApi.authorize(username, password)
        .then((data) =>
            userApi.remove(data.id, data.token, 'potato', password))
            .then( () => {
                throw Error ('should not have passed by here')})
        .catch(error => {
            expect(error).toBeDefined()
            expect(error.message).toBe('username and/or password wrong')
        })
    )
    })
})