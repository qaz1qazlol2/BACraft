const banned_place_blocks = [            //禁止放置的方块
    "twilightforest:uncrafting_table",   //拆解台
]

banned_place_blocks.forEach(banned_place_block =>{
    BlockEvents.placed(banned_place_block,event =>{
        event.cancel()
    })
})
