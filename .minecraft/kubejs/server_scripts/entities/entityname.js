//修改怪物名字池子
const names = [
]



names.forEach(namemodifier => {
    EntityEvents.spawned(namemodifier.id, event => {
        event.entity.setCustomName(Text.of(namemodifier.name))
    })
})

