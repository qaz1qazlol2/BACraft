ServerEvents.recipes((event) => {
	// 未花的平底锅,全部改用奥秘之书
	// 中间改为
	// 先删除原始配方
	// event.remove({ id: "blue_archivescraft:mika_pan" });
	// 再添加
	// event.shaped("blue_archivescraft:mika_pan", ["ABA", "ACA", "ABA"], {
	// 	A: "blue_archivescraft:mysterious_book",
	// 	B: "blue_archivescraft:strawberry_swiss_roll",
	// 	C: "enigmaticlegacy:eldritch_pan",
	// });
	// 这是一个更先进的处理方式
	// 替换下界合金剑为饕餮之锅
	event.replaceInput(
		{ id: "blue_archivescraft:mika_pan" },
		"minecraft:netherite_sword",
		"enigmaticlegacy:eldritch_pan"
    );
    // 替换奥秘之书碎片为奥秘之书
    event.replaceInput(
			{ id: "blue_archivescraft:mika_pan" },
			"blue_archivescraft:mysterious_fragments_book",
			"blue_archivescraft:mysterious_book"
		);
});
