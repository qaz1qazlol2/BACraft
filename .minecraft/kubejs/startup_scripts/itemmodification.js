ItemEvents.modification(event => {
    event.modify("dotcoinmod:gold_coin", item => {
        item.setRarity("uncommon")
    })
    event.modify("dotcoinmod:diamond_coin", item => {
        item.setRarity("epic")
    })
})