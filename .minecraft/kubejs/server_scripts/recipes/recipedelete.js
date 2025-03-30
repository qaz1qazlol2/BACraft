//移除合成表
ServerEvents.recipes(event => {
    event.remove({ output: 'enigmaticaddons:forger_gem' }) //移除锻造者的宝石制作
    event.remove({ output: 'twilightforest:uncrafting_table' })//移除拆解台
    event.remove({ output: 'minecraft:beacon' })//移除信标
    event.remove({ input: 'alexsmobs:mimicream' })//移除复刻凝胶复刻道具
    event.remove({ output: 'enigmaticlegacy:the_cube' })//移除非欧立方
})
