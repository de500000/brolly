import {Socket} from "phoenix"
import $        from "jquery"

import Gallows  from "./gallows"

export default class Hangman {

    constructor() {
        this.setupDOM()
        this.channel = this.join_channel();
        this.setupEventHandlers(this.channel)
        this.channel.push("get_status", {})
        this.gallows = new Gallows()
    }

    setupDOM() {
        this.input   = $(".entry input")
        this.drawing = $(".drawing")
        this.guessed = $(".guessed")
        this.guessed_letters = $(".guessed .letters")
        this.word    = $(".word")
    }

    join_channel() {
        let socket = new Socket("/socket", { logger: Hangman.my_logger })
        socket.connect()
        let channel = socket.channel("hangman:game")
        channel.join()
        return channel
    }

    setupEventHandlers(channel) {
        channel.on("status", msg => { this.update_status(msg) })
        this.input.on("keypress", (ev) =>  this.handle_keypress(ev))
    }

    handle_keypress(event) {
        this.input.prop('disabled', true)
        this.channel.push("guess", { letter: event.key })
    }

    update_status(msg) {
        this.input.val("")
        this.input.prop('disabled', false)
        this.input.focus()

        if (msg.used_so_far.length > 0) {
            this.guessed_letters.text(msg.used_so_far)
            this.guessed.show(500)
        }

        this.word.text(msg.word)

        switch (msg.status) {
        case "won":
            alert("you won")
            this.entry.hide()
            break
        case "lost":
            alert("you lost")
            $(".entry").hide()
        default:
            this.gallows.display_for(msg.turns_left)
        }
    }

    static my_logger(kind, msg, data) {
        console.log(`Socket: ${kind}: ${msg}`, data)
    }
}


