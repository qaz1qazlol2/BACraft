const banned_rightclick_blocks = [
    "twilightforest:uncrafting_table"   //拆解台
]

banned_rightclick_blocks.forEach(banned_rightclick_block => {
    BlockEvents.rightClicked(banned_rightclick_block, event => {
        event.player.statusMessage = '无法使用~'
        event.cancel()
    })
})