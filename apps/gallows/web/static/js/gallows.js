import SVG from "svg.js"

const WOOD = {
    fill: "#60f"
}

const ROPE = {
    fill: "#aa0"
}

const BODY = {
    fill: "#a0a"
}

const ANIM = 1300

export default class Gallows {

    constructor() {
        this.draw = SVG('drawing');
        this.parts = []
    }

    display_for(turns_left) {
        const parts = [
            this.leg2,
            this.leg1,
            this.arm2,
            this.arm1,
            this.trunk,
            this.head,
            this.rope,
            this.bar,
            this.post,
            this.base,
            () => {}
        ]

        this.parts.concat(parts[turns_left].apply(this))
    }
    
    base() {
        return this.draw.rect(200, 20).fill("#fff").move(20, 560).animate(2000).attr(WOOD)
    }

    post() {
        return this.draw.rect(20, 500).fill("#fff").move(110, 60).animate(ANIM).attr(WOOD)
    }

    bar() {
        return this.draw.rect(200, 20).fill("#fff").move(110, 40).animate(ANIM).attr(WOOD)
    }

    rope() {
        return this.draw.rect(8, 100).fill("#fff").move(270, 60).animate(ANIM).attr(ROPE)
    }

    head() {
        return this.draw.circle(80).fill("#fff").move(235, 150).animate(ANIM).attr(BODY)
    }
    
    trunk() {
        return this.draw.rect(12, 200).fill("#fff").move(270, 190).animate(ANIM).attr(BODY)
    }

    arm1() {
        return this.draw.rect(12, 80).fill("#fff").move(267, 240).animate(ANIM).rotate(45, 267, 240).attr(BODY)
    }
    
    arm2() {
        return this.draw.rect(12, 80).fill("#fff").move(267, 240).animate(ANIM).rotate(-45, 267, 240).attr(BODY)
    }
    
    leg1() {
        return this.draw.rect(12, 140).fill("#fff").move(270, 380).animate(ANIM).rotate(25, 260, 380).attr(BODY)
    }
    
    leg2() {
        return  this.draw.rect(12, 140).fill("#fff").move(270, 380).animate(ANIM).rotate(-25, 270, 380).attr(BODY)
    }
    
}
