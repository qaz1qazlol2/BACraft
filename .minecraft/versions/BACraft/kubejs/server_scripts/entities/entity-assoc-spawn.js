const BANNED_SPAWN_IN_WORLD = [
	"threateningly_mobs:solscarab_maximus",
	"threateningly_mobs:inferno",
	"threateningly_mobs:lich_re",
	"threateningly_mobs:moon_priest",
	"threateningly_mobs:armor_desert",
	"threateningly_mobs:earth_loong",
	"threateningly_mobs:titan_rabbit_re",
	"threateningly_mobs:re_rock_snail",
	"threateningly_mobs:beast_horseshoe_crab",
	"threateningly_mobs:abyss_fang",
	"threateningly_mobs:ferox_ice_worm",
	"threateningly_mobs:ferox_death_worm",
	"threateningly_mobs:basalt_wyvern",
	"threateningly_mobs:steelboar",
	"threateningly_mobs:terra_dragon",
	"threateningly_mobs:regalhart",
	"threateningly_mobs:hydra",
	// 测试用
	// "minecraft:zombie",
];
const MobSpawnType = Java.loadClass("net.minecraft.world.entity.MobSpawnType");
const EntityType = Java.loadClass("net.minecraft.world.entity.EntityType");

// 拦截一批怪物的自然生成
EntityEvents.checkSpawn(BANNED_SPAWN_IN_WORLD, (event) => {
	console.log(`${event.entity} 尝试生成 spawnType: ${event.type}`);
	// 对应类型
	if (event.type != MobSpawnType.NATURAL) {
		console.log(
			`${event.entity} 尝试生成,但 spawnType: ${event.type} 不是需要拦截的类型,跳过检查!`
		);
		return;
	}
	console.log(
		`${event.entity} 尝试生成,但 spawnType: ${event.type} 要拦截,现在阻止!`
	);
	// 用这个办法,不会产生粒子效果,也不会有生物死亡掉落
	event.entity.setRemoved("discarded");
	event.cancel();
});

// 下面是一些固定生成和几率生成
const spawnOnKillConfig = [
	// aquamirae:captain_cornelia 对 aquamirae:maze_mother
	{
		killed: "aquamirae:captain_cornelia",
		spawn: "aquamirae:maze_mother",
		probability: 1,
		killedName: "科妮莉亚船长",
		spawnName: "迷阵之母",
	},
	// eeeabsmobs:nameless_guardian 对 eeeabsmobs:immortal_boss
	{
		killed: "eeeabsmobs:nameless_guardian",
		spawn: "eeeabsmobs:immortal_boss",
		probability: 1,
		killedName: "无名守卫",
		spawnName: "不朽者",
	},
	// cataclysm:the_harbinger 对 corundumguardian:corundum_guardian
	{
		killed: "cataclysm:the_harbinger",
		spawn: "corundumguardian:corundum_guardian",
		probability: 1,
		killedName: "先驱者",
		spawnName: "金石守卫",
	},
	// cataclysm:the_leviathan 对 threateningly_mobs:abyss_fang
	{
		killed: "cataclysm:the_leviathan",
		spawn: "threateningly_mobs:abyss_fang",
		probability: 1,
		killedName: "利维坦",
		spawnName: "Abyss Fang",
	},
	// minecraft:rabbit 对 threateningly_mobs:titan_rabbit_re 5% 概率
	{
		killed: "minecraft:rabbit",
		spawn: "threateningly_mobs:titan_rabbit_re",
		probability: 0.05,
		killedName: "兔子",
		spawnName: "泰坦兔子",
	},
	// minecraft:slime 对 threateningly_mobs:re_rock_snail 5% 概率
	{
		killed: "minecraft:slime",
		spawn: "threateningly_mobs:re_rock_snail",
		probability: 0.05,
		killedName: "史莱姆",
		spawnName: "岩浆小蛇",
	},
	// legendary_monsters:ancient_guardian 对 threateningly_mobs:earth_loong
	{
		killed: "legendary_monsters:ancient_guardian",
		spawn: "threateningly_mobs:earth_loong",
		probability: 1,
		killedName: "远古守卫",
		spawnName: "地龙",
	},
	// legendary_monsters:overgrown_colossus 对 threateningly_mobs:regalhart
	{
		killed: "legendary_monsters:overgrown_colossus",
		spawn: "threateningly_mobs:regalhart",
		probability: 1,
		killedName: "狂生巨像",
		spawnName: "皇家雄鹿",
	},
	// legendary_monsters:dune_sentinel 对 threateningly_mobs:armor_desert
	{
		killed: "legendary_monsters:dune_sentinel",
		spawn: "threateningly_mobs:armor_desert",
		probability: 1,
		killedName: "沙丘哨兵",
		spawnName: "Armor of Desert",
	},
	// cataclysm:ancient_remnant 对 threateningly_mobs:solscarab_maximus
	{
		killed: "cataclysm:ancient_remnant",
		spawn: "threateningly_mobs:solscarab_maximus",
		probability: 1,
		killedName: "远古遗魂",
		spawnName: "巨日圣甲虫",
	},
	// cataclysm:netherite_monstrosity 对 threateningly_mobs:terra_dragon
	{
		killed: "cataclysm:netherite_monstrosity",
		spawn: "threateningly_mobs:terra_dragon",
		probability: 1,
		killedName: "下界合金巨兽",
		spawnName: "地脉龙",
	},
	// threateningly_mobs:terra_dragon 对 threateningly_mobs:inferno
	{
		killed: "threateningly_mobs:terra_dragon",
		spawn: "threateningly_mobs:inferno",
		probability: 1,
		killedName: "地脉龙",
		spawnName: "地狱火生物",
	},
	// legendary_monsters:lava_eater 对 threateningly_mobs:basalt_wyvern 5% 概率
	{
		killed: "legendary_monsters:lava_eater",
		spawn: "threateningly_mobs:basalt_wyvern",
		probability: 0.05,
		killedName: "熔岩食者",
		spawnName: "玄武岩翼龙",
	},
	// illagerinvasion:invoker 对 threateningly_mobs:lich_re
	{
		killed: "illagerinvasion:invoker",
		spawn: "threateningly_mobs:lich_re",
		probability: 1,
		killedName: "祈灵师",
		spawnName: "Lich",
	},
	// threateningly_mobs:lich_re threateningly_mobs:moon_priest
	{
		killed: "threateningly_mobs:lich_re",
		spawn: "threateningly_mobs:moon_priest",
		probability: 1,
		killedName: "Lich",
		spawnName: "月神祭司",
	},
	// threateningly_mobs:moon_priest 对 threateningly_mobs:saint
	{
		killed: "threateningly_mobs:moon_priest",
		spawn: "threateningly_mobs:saint",
		probability: 1,
		killedName: "月神祭司",
		spawnName: "伪善圣徒",
	},
	// cataclysm:hipppocamtus 对 threateningly_mobs:hydra
	{
		killed: "cataclysm:hippocamtus",
		spawn: "threateningly_mobs:hydra",
		probability: 1,
		killedName: "沧溟巡守",
		spawnName: "海九头蛇",
	},
	// cataclysm:coralssus 对 threateningly_mobs:beast_horseshoe_crab
	{
		killed: "cataclysm:coralssus",
		spawn: "threateningly_mobs:beast_horseshoe_crab",
		probability: 1,
		killedName: "珊瑚巨像",
		spawnName: "兽化鲎",
	},
	// legendary_monsters:frostbitten_golem 对 threateningly_mobs:ferox_ice_worm
	{
		killed: "legendary_monsters:frostbitten_golem",
		spawn: "threateningly_mobs:ferox_ice_worm",
		probability: 1,
		killedName: "冰冻魔像",
		spawnName: "凶暴冰蠕虫",
	},
	// legendary_monsters:skeletosaurus 对 threateningly_mobs:ferox_death_worm
	{
		killed: "legendary_monsters:skeletosaurus",
		spawn: "threateningly_mobs:ferox_death_worm",
		probability: 1,
		killedName: "骷髅巨龙",
		spawnName: "凶暴死亡蠕虫",
	},
	// 僵尸 对 骷髅
	// 这也是测试用,记得注释掉
	{
		killed: "minecraft:zombie",
		spawn: "minecraft:skeleton",
		probability: 1,
		killedName: "僵尸",
		spawnName: "骷髅",
	},
];

spawnOnKillConfig.forEach((config) => {
	EntityEvents.death(config.killed, (event) => {
		// 在这里检查是否是被玩家击杀的,不是则退出
		if (!event.source.player) {
			console.log(
				`怪物 ${config.killedName || config.killed} 不是被玩家击杀,不管`
			);
			return;
		}
		console.log(`怪物 ${config.killedName || config.killed} 被玩家击杀`);

		const shouldSpawn =
			config.probability === 1 ||
			(config.probability !== undefined && Math.random() < config.probability);
		// 条件不匹配提前退出
		if (!shouldSpawn) {
			return;
		}

		let probabilityText;
		if (config.probability === 1) {
			probabilityText = "必定";
		} else if (config.probability !== undefined) {
			probabilityText = `概率 ${config.probability * 100}%`;
		} else {
			// Fallback for cases where probability might be missing but shouldSpawn is true (should not happen with current config)
			probabilityText = "必定";
		}
		console.log(
			`${
				config.killedName || config.killed
			} 被击杀, 概率 ${probabilityText}, 生成 ${
				config.spawnName || config.spawn
			}!`
		);
		// 获取当前玩家所在的维度 (level)
		const currentLevel = event.entity.level;
		console.log(
			`当前玩家所在维度: ${currentLevel.dimension} 也在这个维度生成怪物`
		);
		const entityForSpawn = currentLevel.createEntity(config.spawn);
		entityForSpawn.setPos(event.entity.x, event.entity.y, event.entity.z);
		entityForSpawn.spawn();
		// event.server.runCommandSilent(
		// 	`summon ${config.spawn} ${event.entity.x} ${event.entity.y} ${event.entity.z}`
		// );
	});
});
