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
    event.shaped(Item.of("blue_archivescraft:strawberry_swiss_roll", 10), [
        "ACA",
        "CBC",
        "ACA"
    ], {
        A: "#forge:fruits/strawberry",
        B: "pamhc2foodextended:meringueitem",
        C: "#forge:dough"
    })
    event.shapeless(Item.of("minecraft:crafting_table"), [
        "#biomeswevegone:crafting_tables"
    ])
})