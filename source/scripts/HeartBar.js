import * as Pixi from "pixi.js"
Pixi.settings.SCALE_MODE = Pixi.SCALE_MODES.NEAREST

import {FRAME} from "scripts/Constants.js"

const UNDERLAY_TEXTURE = Pixi.Texture.from(require("images/heart-bar-underlay.png"))
const OVERLAY_TEXTURE = Pixi.Texture.from(require("images/heart-bar-overlay.png"))

const BAR_MARGIN = 8 // in pixels
const BAR_LENGTH = 100 // in hearts

export default class HeartBar extends Pixi.Container {
    constructor() {
        super(UNDERLAY_TEXTURE)

        this.position.x = BAR_MARGIN
        this.position.y = FRAME.HEIGHT - BAR_MARGIN

        this.addChild(this.underlay = new Pixi.Sprite(UNDERLAY_TEXTURE))
        this.addChild(this.overlay = new Pixi.Sprite(OVERLAY_TEXTURE))

        this.underlay.anchor.y = 1
        this.overlay.anchor.y = 1
    }
    update(delta) {
        this.resizeOverlays()
    }
    resizeOverlays() {
        if(OVERLAY_TEXTURE.hasLoaded == false) {
            return Pixi.Texture.EMPTY
        }

        var width = OVERLAY_TEXTURE.width * this.getHealthPercentage()
        var height = OVERLAY_TEXTURE.height

        this.overlay.texture = new Pixi.Texture(OVERLAY_TEXTURE, new Pixi.Rectangle(0, 0, width, height))
    }
    getHealthPercentage() {
        // If, for whatever reason,
        // we can't access the player,
        // then just return 100%.
        if(this.parent == undefined
        || this.parent.player == undefined) {
            return 1
        }

        // Calculate the percentage.
        var percentage = this.parent.player.hearts / BAR_LENGTH

        // Don't let the percentage fall below 0%.
        percentage = Math.max(percentage, 0)

        // Return the percentage
        return percentage
    }
}
