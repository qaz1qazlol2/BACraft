StartupEvents.registry("item",event => {
    event.create('gold_coin').displayName('金币').tooltip('用于商店抽奖以及兑换').rarity('uncommon')
    event.create('diamond_coin').displayName('钻石币').tooltip('用于商店抽奖以及兑换').rarity('epic').glow(true)//发光
})