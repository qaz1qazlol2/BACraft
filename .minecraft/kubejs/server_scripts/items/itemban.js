const banned_items = [
    "bountifulbaubles:dark_dagger",
    "twilightforest:uncrafting_table",
    "born_in_chaos_v1:soul_cutlass",
    "cataclysm:the_incinerator",
    "cataclysm:the_immolator",
    "enigmaticaddons:forger_gem",
    "born_in_chaos_v1:soulbane",
    "aquamirae:divider",
    "aquamirae:whisper_of_the_abyss"
]



PlayerEvents.inventoryChanged(event => {
    let item = event.item.id
    if (banned_items.includes(item)) {
        event.player.statusMessage = "该物品不可使用，已自动删除"
        event.getPlayer().getInventory().clear(item)
    }
})