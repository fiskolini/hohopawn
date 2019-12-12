let wrapper = {
    /** Welcome object instance */
    welcome: {
        /** @let ({HTMLElement|null}) $el */
        $el: document.getElementById("wrap-welcome"),
    },

    /** Pawn object instance */
    pawn: {
        /** @let ({HTMLElement|null}) $el */
        $el: document.getElementById("wrap-pawn"),
    },

    /**
     * Verifies if required ctx is valid
     *
     * @param {string} ctx required context
     * @private
     * @throws error message if required ctx isn't valid
     */
    _verify: function (ctx) {
        if (wrapper.hasOwnProperty(ctx) && wrapper[ctx].$el instanceof HTMLElement) {
            return;
        }

        throw "The required " + ctx + " is invalid";
    },

    /**
     * Shows required item
     *
     * @param {string} ctx required context to apply
     *
     * @return {wrapper}
     */
    show: function (ctx) {
        this._verify(ctx);
        wrapper[ctx].$el.style.visibility = "visible";

        return this;
    },

    /**
     * Remove required item
     *
     * @param {string} ctx required context to apply
     * @return {wrapper}
     */
    remove: function (ctx) {
        this._verify(ctx);
        wrapper[ctx].$el.style.visibility = "hidden";
        //wrapper[ctx].$el.nextElementSibling.remove();

        return this;
    },
};

let Username = {
    get: function () {
        return window.cookie.read("username") || false;
    },

    set: function (name) {
        window.cookie.create("username", name, 10)
    }
};

let Pawn = {
    /**
     *
     * @param {object} msg
     */
    commit: function (msg) {
        let same_author = msg.pawn_author === window.cookie.read('username'),
            author = !same_author ? msg.pawn_author : "you",
            inc = same_author ? " Now wait 5 seconds to pawn again." : "";

        $.toast({
            heading: 'Toast',
            text: "Daaaammmnn! <strong style='font-size:20px'>" + author +
                "</strong> just pawned with  <strong style='font-size:18px'>`" +
                msg.action.replace("_", " ") + "`</strong>!" + inc,
            position: 'bottom-right',
            loader: false,
            stack: 50,
            icon: 'success',
            hideAfter: false,
            bgColor: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
        // play sound
        document.getElementById("plucky").play();
    }
};

let WSocket = {

    get: function () {
        if (typeof window.socket === "undefined") {
            window.socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + '/');
        }
        return window.socket;
    },

    register: function () {
        let socket = this.get();

        // connect response receiver
        socket.on('connect', function () {
            // ... connected
        });

        // pawn response event receiver

        socket.on('pawn_response', Pawn.commit);
    }
};

let Binds = {
    $inputEl: $("#ask-name-input"),
    $pawnBt: $("#pawn"),

    register: function () {
        // Username
        this.$inputEl.keyup(function (e) {
            if (e.keyCode === 13) {
                let username = $(this).val();

                if (username.length > 3) {
                    Username.set(username);
                    // user defined

                    setTimeout(function () {
                        window.location.reload()
                    }, 2000) // for drama
                } else {
                    $.toast({
                        heading: 'Hm... that\'s not funny!',
                        icon: 'error',
                        text: "You should tell us your REAL name.",
                        position: 'bottom-right',
                        loader: false
                    })
                }
            }
        });

        if (window.cookie.read('block_pawn')) {
            this.$pawnBt.prop('disabled', true);
        }
        // Roll the dice
        this.$pawnBt.on('click', function () {
            let _t = $(this);
            WSocket.get().emit("pawn", {user: window.cookie.read("username")});

            // gen new cookie
            window.cookie.create('block_pawn', true, 0.00005787037037); // 5secs

            // block this button
            _t.prop('disabled', true);
            setTimeout(function () {
                _t.prop("disabled", false)
            }, 5000);
        });
    }
};

/**
 * Init app
 */
$(document).ready(function () {
    // Register socket actions
    WSocket.register();
    // Register bind events
    Binds.register();

    // Check if username is set
    if (Username.get()) {
        // show pawn container
        wrapper.show('pawn').remove('welcome');
        //wrapper.show('welcome').remove('pawn');
    } else {
        // show welcome container
        wrapper.show('welcome').remove('pawn');
    }
});
