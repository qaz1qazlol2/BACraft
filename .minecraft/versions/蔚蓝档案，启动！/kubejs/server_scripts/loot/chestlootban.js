const banned_chest_loots = [
    "twilightforest:uncrafting_table",
    "bountifulbaubles:dark_dagger",
    "enigmaticaddons:forger_gem",
    "enigmaticlegacy:void_pearl"
]

banned_chest_loots.forEach(banned_chest_loot => {
    LootJS.modifiers(event => {
        event.addLootTypeModifier(LootType.CHEST).removeLoot(banned_chest_loot)
    })
})
