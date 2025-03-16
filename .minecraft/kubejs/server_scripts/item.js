ServerEvents.recipes(event => {
    event.remove({ output:'enigmaticaddons:forger_gem'}) //移除锻造者的宝石制作
    event.remove({ output:'twilightforest:uncrafting_table'})//移除拆解台
    event.remove({ output:'minecraft:beacon'})//移除信标
})

LootJS.modifiers((event) => {
    event.addLootTypeModifier(LootType.CHEST).removeLoot("twilightforest:uncrafting_table")
})

//禁止放置信标
BlockEvents.placed("minecraft:beacon" , event => {
    event.cancel()
})


//禁止放置拆解台
BlockEvents.placed("twilightforest:uncrafting_table" , event => {
    event.cancel()
})
