//修改怪物生命池子
const healths = [
    { id: 'minecraft:wither', health: 1200 },
    { id: 'minecraft:warden', health: 2500 }
]



healths.forEach(heahthmodifier => {
    EntityEvents.spawned(heahthmodifier.id, event => {
        event.entity.mergeNbt('{Attributes:[{Base:' + heahthmodifier.health.toString() + ',Name:"minecraft:generic.max_health"}],Health:' + heahthmodifier.health.toString() + '}')
    })
})