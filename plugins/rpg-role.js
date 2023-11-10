global.rpg = {
	
  role(level) {
    level = parseInt(level)
    if (isNaN(level)) return { name: '', level: '' }
    
    const role = [
      { name: "سيان🐍", level: 0 }, { name: "سوبر سيان🐉", level: 4 }, 
      { name: "شيطان متحول👾", level: 8 }, { name: "شيطان ادني⚡", level: 12 }, 
      { name: "قمر علوي🌑", level: 16 }, { name: "اوتشيها🩸", level: 20 }, 
      { name: "هوكاجي🌟", level: 24 }, { name: "عملاق مهاجم🧑🏻‍🔬", level: 28 }, 
      { name: "عملاق مؤسس💿", level: 32 }, { name: "جاسوس📯", level: 36 },
      { name: "جاسوس محترف🌞", level: 48 }, { name: "وزير✨", level: 52 }, 
      { name: "جنرال مساعد💨", level: 56 }, { name: "جنرال اول💫", level: 60 }, 
      { name: "ملك الاوتاكو👑", level: 100 }
    ];

    return role.reverse().find(role => level >= role.level)
  }
}