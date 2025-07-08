//移除输出合成表
const banned_outputs = [
    "enigmaticaddons:forger_gem",             //移除锻造者的宝石制作
    "twilightforest:uncrafting_table",        //移除拆解台制作
    "enigmaticlegacy:the_cube",               //移除非欧立方
    "cataclysm:the_incinerator",
    "cataclysm:the_immolator",
    "binah:desert_jade",
    "blue_archivescraft:gebura_bankai"
]
//移除输入合成表
const banned_inputs = [
    "alexsmobs:mimicream"                     //移除复刻凝胶复刻道具
]


banned_outputs.forEach(banned_output => {
    ServerEvents.recipes(event => {
        event.remove({ output: banned_output })
    })
})
banned_inputs.forEach(banned_input => {
    ServerEvents.recipes(event => {
        event.remove({ input: banned_input })
    })
})




