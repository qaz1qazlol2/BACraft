const banned_items = [
    "bountifulbaubles:dark_dagger"
]



PlayerEvents.inventoryChanged(event => {
    let item = event.item.id
    if (banned_items.includes(item)) {
        event.player.statusMessage = "该物品不可使用，已自动删除"
        event.getPlayer().getInventory().clear(item)
    }
})