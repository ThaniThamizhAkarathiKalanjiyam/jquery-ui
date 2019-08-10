var LC = {
	lunarInfo: new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0),
	Animals: new Array("Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Sheep", "Monkey", "Rooster", "Dog", "Pig"),
	Gan: new Array("Jia", "Yi", "Bing", "Ding", "Wu", "Ji", "Geng", "Xin", "Ren", "Gui"),
	Zhi: new Array("Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"),
	weekDayNames: ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	monthName: new Array("January", "February", "March", "April", "May ", "June", "July", "August", "September", "October", "November", "December"),
	lYearDays: function (y) {
		var i,
		sum = 348
			for (i = 0x8000; i > 0x8; i >>= 1)
				sum += (LC.lunarInfo[y - 1900] & i) ? 1 : 0
				return (sum + LC.leapDays(y))
	},
	leapDays: function (y) {
		if (this.leapMonth(y))
		{
			return ((LC.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
		}
		else
		{
				return (0);
		}
	},
	leapMonth: function (y) {
		return (LC.lunarInfo[y - 1900] & 0xf);
	},
	monthDays: function (y, m) {
		return ((LC.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
	},
	newf: function (y, m) {
		return ((LC.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
	},
	lunar: function (objDate) {
		var i,
		leap = 0,
		temp = 0
			var baseDate = new Date(1900, 0, 31)
			var offset = (objDate - baseDate) / 86400000
			this.dayCyl = offset + 40
			this.monCyl = 14
			for (i = 1900; i < 2050 && offset > 0; i++) {
				temp = LC.lYearDays(i)
					offset -= temp
					this.monCyl += 12
			}
			if (offset < 0) {
				offset += temp;
				i--;
				this.monCyl -= 12
			}
			this.year = i
			this.yearCyl = i - 1864
			leap = LC.leapMonth(i)
			this.isLeap = false
			for (i = 1; i < 13 && offset > 0; i++) {
				if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
					--i;
					this.isLeap = true;
					temp = LC.leapDays(this.year);
				} else {
					temp = LC.monthDays(this.year, i);
				}
				if (this.isLeap == true && i == (leap + 1))
					this.isLeap = false
						offset -= temp
						if (this.isLeap == false)
							this.monCyl++
			}
			if (offset == 0 && leap > 0 && i == leap + 1)
				if (this.isLeap) {
					this.isLeap = false;
				} else {
					this.isLeap = true;
					--i;
					--this.monCyl;
				}
			if (offset < 0) {
				offset += temp;
				--i;
				--this.monCyl;
			}
			this.month = i
			this.day = parseInt(offset) + 1
	},
	get_ganzhi: function (year) {
		var num = year - 1900 + 36;
		return (LC.Gan[num % 10] + " " + LC.Zhi[num % 12]);
	},
	get_animal: function (year) {
		return LC.Animals[(year - 4) % 12];
	},
	get_ganzhiMonth: function (year, month) {
		var num = year - 1900 + 36;
		var gan = ((num % 10) % 5 + 1) * 2;
		gan = gan == 10 ? 0 : gan;
		gan = gan + month;
		gan = gan >= 10 ? gan - 10 : gan;
		var zhi = month + 2;
		zhi = zhi >= 12 ? zhi - 12 : zhi;
		return (LC.Gan[gan] + " " + LC.Zhi[zhi]);
	},
	get_ganzhiDay: function (curDate) {
		var year = curDate.getFullYear();
		var p = [0, 1, 0, 1, 1, 2, 2, 3, 4, 4, 5, 5];
		var y = year >= 2000 ? (100 + year - 2000) : year - 1900;
		var d1 = (y * 5) % 60;
		var d2 = Math.floor(y / 4);
		var m = (curDate.getMonth() + 1) % 2 == 0 ? 30 : 0;
		var d = d1 + d2 + 9 + curDate.getDate() + p[curDate.getMonth()] - m;
		d = d > 60 ? (d - 60) : d;
		var gan = (d % 10 == 0 ? 10 : d % 10) - 1;
		var zhi = (d % 12 == 0 ? 12 : d % 12) - 1;
		if (year % 4 != 0 && curDate.getMonth() < 2) {
			gan = (gan == 9 ? 0 : gan + 1);
			zhi = (zhi == 11 ? 0 : zhi + 1);
		}
		return (LC.Gan[gan] + " " + LC.Zhi[zhi]);
	},
	get_season: function (month) {
		if (month < 6 && month > 2)
			return "Spring";
		else if (month < 9 && month > 5)
			return "Summer";
		else if (month < 12 && month > 8)
			return "Autumn";
		else
			return "Winter";
	}
}
