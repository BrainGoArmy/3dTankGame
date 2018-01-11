var postman = {}

postman.incoming = function (event) {
    var obj = JSON.parse(event.data)
    var conversation = obj.conversation
    if (conversation == "S_CHANGE_VIEW") {
        web.changeView(obj.view)

    } else if (conversation == "S_LIST_OF_GAMES") {
        web.showListOfGames(obj.games)

    } else if (conversation == "S_SCOREBOARD") {
        postman.scoreboard(obj)

    } else if (conversation == "S_SHARE_TAG") {
        match.tag = obj.tag

    } else if (conversation == "S_SHARE_MAP") {
        baby.createMap(obj.MAP)

    } else if (conversation == "S_PLAY_SOUND") {
        gSound.playSound(obj.FILE)

    } else if (conversation == "S_PLAYER_LEFT") {
        postman.playerLeft(obj)

    } else if (conversation == "S_SHARE_DYNAMIC_THINGS") {
        postman.recievedDynamicThings(obj)

    }
    // alert("Unhandled message" + event.data)

}

postman.scoreboard = function (obj) {
    
    Object.keys(obj.TAGS).forEach((key) => {
        baby.createSphereIfNotExists(obj.TAGS[key], key)
    })

    game.scores = []
    Object.keys(obj.SCORES).forEach((key) => {
        game.scores.push({
            key: key,
            value: obj.SCORES[key]
        })
    })
    game.scores.sort(function(a, b){
        return a.value - b.value
    })
    baby.displayScores()

}

postman.playerLeft = function (obj) {
    getPlayerByTag(obj.tag).dispose()
    match.playerTanks.delete(obj.tag)

}

postman.recievedDynamicThings = function (obj) {
    obj.THINGS.forEach(t => {
        if (t.tag == match.tag) {
            baby.camera.position.x = t.x
            baby.camera.position.y = t.y + 0.25
            baby.camera.position.z = t.z
            baby.camera.rotation.y = t.rotation
        }
        var s = getPlayerByTag(t.tag)
        if (s) {
            s.position.x = t.x
            s.position.y = t.y
            s.position.z = t.z
            s.rotation.y = t.rotation
        }
    })

}