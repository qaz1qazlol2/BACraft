//移除合成表
ServerEvents.recipes(event => {
    event.remove({ output: 'enigmaticaddons:forger_gem' }) //移除锻造者的宝石制作
    event.remove({ output: 'twilightforest:uncrafting_table' })//移除拆解台
    event.remove({ output: 'minecraft:beacon' })//移除信标
    event.remove({ input: 'alexsmobs:mimicream' })//移除复刻凝胶复刻道具
    event.remove({ output: 'enigmaticlegacy:the_cube' })//移除非欧立方
})
//创建合成表
ServerEvents.recipes(event => {
    event.shaped('enigmaticlegacy:etherium_ingot', [
        'SSS',
        'SAS',
        'SSS'
    ], {
        S: 'enigmaticlegacy:etherium_scraps',
        A: 'minecraft:netherite_ingot'
    })
    event.shaped('cataclysm:enderite_ingot', [
        ' S ',
        'SAS',
        ' S '
    ], {
        S: 'enigmaticlegacy:etherium_scraps',
        A: 'minecraft:netherite_ingot'
    })
    event.shaped('cataclysm:zweiender', [
        'CAC',
        'CAC',
        ' B '
    ], {
        A: 'cataclysm:enderite_ingot',
        B: 'enigmaticlegacy:ender_rod',
        C: 'enigmaticlegacy:evil_essence'
    })
    event.shaped("minecraft:emerald_pickaxe", [
        'AAA',
        ' B ',
        ' B '
    ], {
        A: 'minecraft:emerald',
        B: '#forge:rods/wooden'
    })
})