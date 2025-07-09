ItemEvents.rightClicked("enigmaticlegacy:forbidden_fruit",event=>{
    event.player.statusMessage=[Text.white('该物品无法食用')]
    event.cancel()
})