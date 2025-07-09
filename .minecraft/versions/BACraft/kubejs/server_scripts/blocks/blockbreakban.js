const banned_break_blocks =[]

banned_break_blocks.forEach(banned_break_block =>{
    BlockEvents.broken(banned_break_block,event=>{
        event.cancel()
    })
})