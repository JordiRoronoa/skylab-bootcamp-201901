class Panel {
    constructor($container) {
        this.$container = $container
    }

    show() {
        this.$container.show()
    }

    hide() {
        this.$container.hide()
    }
}

class SearchPanel extends Panel {
    constructor() {
        super($(`<section class="search container">    
    <form>
    <div class="row">
    <div class=" col input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default"><img class="icon" src="https://starrsystems.net/wp-content/uploads/2016/07/Services-Music-Systems-page.png"></span>
        </div>
        <input type="text" class="form-control" name="query" placeholder="Search an artist..." aria-label="Default" aria-describedby="inputGroup-sizing-default">
    </div>
        <button type="submit" class="btn btn-outline-primary">Search</button>
    </div>
    </form>
</section>`))

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')
    }

    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }
}

class ArtistsPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
    <button type="submit" class="btn btn-info">Go back</button>
    <h3>Artists</h3>
    <ul class =row container></ul>
</section>`))

        this.__$list__ = this.$container.find('ul')
        this.__$buttonBack__ = this.$container.find('button')
    }

    set artists(artists) {
        artists.forEach(({ id, name, images, followers, genres }) => {
            const genre = genres[0] ? genres[0] : 'Not available'
            const image = images[0] ? images[0].url : 'https://editorial.upc.edu.pe/wp-content/uploads/2018/08/no-photo.png'
            const $item = $(`<div class="item" data-id=${id}><img src="${image}" class="receivedImg">
            <li data-id=${id} class=title >${name}</li><li>Followers: ${followers.total}</li>
            <li>Main Genre: ${genre}</li>
            </div>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onArtistSelected__(id)
            })

            this.__$list__.append($item)

        })
    }
    set onArtistSelected(callback) {
        this.__onArtistSelected__ = callback
    }

    set onGoBack(callback) {
        this.__$buttonBack__.on('click', callback)
    }

    clear() {
        this.__$list__.empty()
    }
}

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="results container">
        <button type="submit" class="btn btn-info">Go back</button>
        <h3>Albums</h3>
        <ul class = row></ul>
    </section`))

        this.__$list__ = this.$container.find('ul')
        this.__$buttonBack__ = this.$container.find('button')
    }

    set albums(albums) {
        albums.forEach(({ id, name, images, release_date, total_tracks }) => {
            const $item = $(`<div data-id=${id} class="item"><img src="${images[0].url}" class ="receivedImg">
            <li data-id=${id} class=title>${name}</li><li>Release date: ${release_date}</li>
            <li>Total tracks: ${total_tracks}</li>
            </div>`)

            $item.click(() => {
                const id = $item.data('id')
                this.__onAlbumSelected__(id)
            })

            this.__$list__.append($item)
        })
    }

    set onAlbumSelected(callback) {
        this.__onAlbumSelected__ = callback
    }

    set onGoBack (callback) {
        this.__$buttonBack__.on('click', callback)
    }

    clear() {
        this.__$list__.empty()
    }
}

class TrackPanel extends Panel {

    constructor() {

        super($(`<section class="results container">
        <button type="submit" class="btn btn-info">Go back</button>
        <h3>Tracks</h3>
        <ul></ul>
    </section`))

        this.__$list__ = this.$container.find('ul')
        this.__$buttonBack__ = this.$container.find('button')
    }

    set tracks(tracks) {
        tracks.forEach(({ id, name, preview_url, track_number, duration_ms }) => {
            const min = Math.floor((duration_ms/1000/60) << 0)
            const sec = Math.floor((duration_ms/1000) % 60)
            const $item = $(`<div class="item"><li data-id=${id} class="title" id="track">${track_number} - ${name}</li>
            <li><audio src="${preview_url}" controls></audio></li>
            <li>Duration: ${min}:${sec}</li>
    </div>`)

            this.__$list__.append($item)
        })
    }
    clear() {
        this.__$list__.empty()
    }

    set onGoBack (callback) {
        this.__$buttonBack__.on('click', callback)
    }
}


//#region login panel

class LoginPanel extends Panel {

    constructor() {
        super($('<section class="login container">'
            + '<h2>Login</h2>'
            + '<form class="login__form" >'

            + '<div class="row">'
            + '<div class="col-xs-12 col-sm-12 col-md-7">'
            + '<label for="email">E-mail:</label>'
            + '<div class="input-group flex-nowrap">'
            + '<div class="input-group-prepend">'
            + '<span class="input-group-text" id="addon-wrapping">@</span>'
            + '</div>'
            + '<input type="email" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" required>'
            + '</div>'
            + '</div>'
            + '<div class="col-xs-12 col-sm-12 col-md-5">'
            + '<label for="password">Password:</label>'
            + '<div class="input-group mb-3">'
            + '<div class="input-group-prepend">'
            + '<span class="input-group-text" id="inputGroup-sizing-default">PSWD</span>'
            + '</div>'
            + '<input type="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" required>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div class="row">'
            + '<div class = "col-12">'
            + '<button type="submit" class="btn btn-outline-primary btn-lg">Login</button>'
            + '</div>'
            + '</div>'
            + '</form>'
            + '</section>'));

    this.__$form__ = this.$container.find('form');

    this.__$emailInput__ = this.__$form__.find('input[type=email]');

    this.__$passwordInput__ = this.__$form__.find('input[type=password]');

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $registerLink = $('<a href="#" class="login__register-link"><span class="badge badge-dark">Register</a>');
    this.$container.append($registerLink);
    this.__$registerLink__ = $registerLink;
    }
}

Object.defineProperty(LoginPanel.prototype, 'onLogin', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();

            callback(email, password);
        }.bind(this));
    }
});

Object.defineProperty(LoginPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

LoginPanel.prototype.clear = function () {
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

Object.defineProperty(LoginPanel.prototype, 'onGoToRegister', {
    set: function (callback) {
        this.__$registerLink__.on('click', callback);
    }
});

//#endregion

//#region register panel

class RegisterPanel extends Panel {
    constructor(){
    
    super($('<section class="register container">'
        + '<h2>Register</h2>'
        + '<form class="register__form">'
        + '<div class = "row">'
        + '<div class="input-group mb-3 col-md-7">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon1">Name</span>'
        + '</div>'
        + '<input type="text" name="name" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required>'
        + '</div>'
        + '<div class="input-group mb-3 col-md-5">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon1">Surname</span>'
        + '</div>'
        + '<input type="text" name="surname" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" required>'
        + '</div>'
        + '</div>'
        + '<div class="input-group mb-3">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon3">https://example.com/users/</span>'
        + '</div>'
        + ' <input type="email" name="email" class="form-control" id="basic-url" placeholder="E-mail" aria-describedby="basic-addon3" required>'
        + '</div>'
        + '<div class = "row">'
        + '<div class="input-group mb-3 col-md-6">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon1">Password</span>'
        + '</div>'
        + '<input type="password" name="password" placeholder="password" class="form-control" aria-label="Username" aria-describedby="basic-addon1" required>'
        + '</div>'
        + '<div class="input-group mb-3 col-md-6">'
        + '<div class="input-group-prepend">'
        + '<span class="input-group-text" id="basic-addon1">Password confirmation</span>'
        + '</div>'
        + '<input type="password" name="password-confirmation" class="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" required>'
        + '</div>'
        + '</div>'
        + '<button class="btn btn-outline-primary btn-lg" type="submit">Register</button>'
        + '</form>'
        + '</section>'));


    this.__$form__ = this.$container.find('form');
    var $form = this.__$form__;

    this.__$nameInput__ = $form.find('input[name=name]');

    this.__$surnameInput__ = $form.find('input[name=surname]');

    this.__$emailInput__ = $form.find('input[type=email]');

    this.__$passwordInput__ = $form.find('input[name=password]');

    this.__$passwordConfirmationInput__ = $form.find('input[name=password-confirmation]');

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$element);
    this.__errorPanel__ = errorPanel;

    var $loginLink = $('<a href="#" class="register__login-link"><span class="badge badge-info">Return to Login page</a>');
    this.$container.append($loginLink)
    this.__$loginLink__ = $loginLink;
    }
}

Object.defineProperty(RegisterPanel.prototype, 'onRegister', {
    set: function (callback) {
        this.__$form__.on('submit', function (event) {
            event.preventDefault();

            var name = this.__$nameInput__.val();
            var surname = this.__$surnameInput__.val();
            var email = this.__$emailInput__.val();
            var password = this.__$passwordInput__.val();
            var passwordConfirmation = this.__$passwordConfirmationInput__.val();

            callback(name, surname, email, password, passwordConfirmation);
        }.bind(this));
    }
});

Object.defineProperty(RegisterPanel.prototype, 'error', {
    set: function (message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show();
    }
});

RegisterPanel.prototype.clear = function () {
    this.__$nameInput__.val('');
    this.__$surnameInput__.val('');
    this.__$emailInput__.val('');
    this.__$passwordInput__.val('');
    this.__$passwordConfirmationInput__.val('');
    this.__errorPanel__.message = '';
    this.__errorPanel__.hide();
};

Object.defineProperty(RegisterPanel.prototype, 'onGoToLogin', {
    set: function (callback) {
        this.__$loginLink__.on('click', callback);
    }
});

//#endregion

//#region error panel

class ErrorPanel extends Panel {
    constructor(){
    super($('<section class="error"></section>'));
    }
}

Object.defineProperty(ErrorPanel.prototype, 'message', {
    set: function (message) {
        this.$container.text(message);
    }
});

//#endregion 