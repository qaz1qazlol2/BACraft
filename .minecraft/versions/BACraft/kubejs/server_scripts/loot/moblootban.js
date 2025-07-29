const banned_entity_loots = [
	"born_in_chaos_v1:soul_cutlass",
	"prehistoricexploration:parasite",
];

banned_entity_loots.forEach(banned_entity_loot => {
    LootJS.modifiers(event => {
        event.addLootTypeModifier(LootType.ENTITY).removeLoot(banned_entity_loot)
    })
})