const banned_rightclick_blocks = [
    "minecraft:beacon",
    "twilightforest:uncrafting_table"
]

banned_rightclick_blocks.forEach(banned_rightclick_block =>{
    BlockEvents.rightClicked(banned_rightclick_block,event=>{
        event.player.statusMessage = '无法使用~'
        event.cancel()
    })
})