//禁止附魔种类


const banned_enchants = [

]



PlayerEvents.inventoryChanged(event => {
    let item = event.getItem()
    for (let key2 in item.getEnchantments()) {
        if (banned_enchants.includes(key2)) {
            event.player.statusMessage = "该物品含有非法附魔" + key2 + "，已自动删除"
            event.getPlayer().getInventory().clear(item)
        }
    }
})