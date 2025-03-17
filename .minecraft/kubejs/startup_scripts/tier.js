ItemEvents.toolTierRegistry(event => {
    event.add('emerald', tier => {
      tier.uses = 1561 
      tier.speed = 8.0 
      tier.attackDamageBonus = 3.0 
      tier.level = 3 
      tier.enchantmentValue = 14 
      tier.repairIngredient = 'minecraft:emerald'
    })
  }
)
ItemEvents.toolTierRegistry(event => {
  event.add('shuijing', tier => {
    tier.uses = 100 
    tier.speed = 8.0 
    tier.attackDamageBonus = 4.0 
    tier.level = 3 
    tier.enchantmentValue = 14 
    tier.repairIngredient = 'minecraft:end_rod'
  })
}
)