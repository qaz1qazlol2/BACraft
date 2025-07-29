const banned_items = [
	"aquamirae:divider",
	"aquamirae:whisper_of_the_abyss",
	"terramity:chthonic_nectar",
	"enigmaticaddons:artificial_flower",
	"enigmaticlegacy:void_pearl",
	"enigmaticaddons:false_justice",
	"enigmaticaddons:forger_gem",
	"born_in_chaos_v1:soulbane",
	"born_in_chaos_vl:soul_cutlass",
	"enigmaticlegacy:fabulous_scroll",
	"artifacts:helium_flamingo",
	"bountifulbaubles:dark_dagger",
	"cataclysm:the_immolator",
	"cataclysm:the_incinerator",
	"ringsofascension:ring_flight",
];

JEIEvents.hideItems((event) => {
	// event.hide("example:ingredient");
	// 隐藏JEI中的物品
	banned_items.forEach((banned_item) => {
		event.hide(banned_item);
		console.log("隐藏物品：" + banned_item);
	});
});
