'use strict';

/**
 * Duckling API client.
 * 
 * @version 1.0.0
 */
var spotifyApi = {
    
    /**
     * Searches ducklings.
     * 
     * @param {string} query - The text to match on search.
     * @param {function} callback - The expression to evaluate on response. If error first 
     * argument informs the error message, othwerwise first argument is undefined and second argument provides the matching 
     * results.
     */
    searchArtists (query, callback) {
 
        fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer BQD7CRlEe0DEbl3toUHzxfR4EI7HPuDonijKtaFA_EiRtcK4FNmuVQ6c2LJd927yTJcjVR2WGfxPWQgwnEO6KWKf-okAN9tbEC4OCKKnrnZJiJLaOGa5_x1OAiVQjj0mzqnDh2tCZ_COp5E'
            },
        })
        .then(res => res.json())
        .then(({artists: {items}}) => callback (undefined, items))
    },

    retrieveAlbums (artistId, callback) {

        fetch(`https://api.spotify.com/v1/search?q=${artistId}&type=artist`, {
            method: 'GET',
            headers: {
                authorization: 'Bearer BQD7CRlEe0DEbl3toUHzxfR4EI7HPuDonijKtaFA_EiRtcK4FNmuVQ6c2LJd927yTJcjVR2WGfxPWQgwnEO6KWKf-okAN9tbEC4OCKKnrnZJiJLaOGa5_x1OAiVQjj0mzqnDh2tCZ_COp5E'
            }
        })
        .then(res => res.json())
        .then(({items}) => callback (undefined, items))
    }
};