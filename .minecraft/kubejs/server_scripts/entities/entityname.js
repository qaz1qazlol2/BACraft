//修改怪物名字池子
const names = [
    { id: 'minecraft:wither', name: "\u00A79Hardcore\u00A7f——\u00A7b躁动的灵魂\u00A7f——\u00A7e凋零" }
]



names.forEach(namemodifier => {
    EntityEvents.spawned(namemodifier.id,event => {
            event.entity.setCustomName(Text.of(namemodifier.name))
    })
})

