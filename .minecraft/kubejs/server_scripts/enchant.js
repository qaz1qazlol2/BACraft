function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};


//禁止附魔种类


const banned_enchants = [

]



PlayerEvents.inventoryChanged(event=>{
    let item = event.getItem()
    for (let key2 in item.getEnchantments()) {
        if (banned_enchants.includes(key2)) {
            event.player.statusMessage = "该物品含有非法附魔"+key2+"，已自动删除"
            event.getPlayer().getInventory().clear(item)
        }
    }
})