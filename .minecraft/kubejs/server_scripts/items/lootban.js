LootJS.modifiers((event) => {
    event.addLootTypeModifier(LootType.CHEST).removeLoot("twilightforest:uncrafting_table")   //移除拆解台获取方式
    event.addLootTypeModifier(LootType.CHEST).removeLoot("bountifulbaubles:dark_dagger")      //移除暗影匕首获取方式
})