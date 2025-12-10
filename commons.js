class Enum {
    constructor(values) {
        this.values = values;
        Object.keys(values).forEach(key => {
            this[key] = values[key];
        });
    }

    name(value) {
        return Object.keys(this.values).find(key => this.values[key] === value).replace(/_/g, ' ');
    }
}

const WeaponType = new Enum({
    Assault_Rifle: 0,
    Marksman_Rifle: 1,
    Sniper_Rifle: 2,
    Submachine_Gun: 3,
    Shotgun: 4,
    Explosive: 5,
    Energy_Based: 6,
    Pistol: 7,
    Melee: 8,
    Throwable: 9,
    Special: 10,
    Machine_Gun: 11,
    Launcher: 12,
    Sprayer: 13
});

const DamageType = new Enum({
    Physical: 0,
    Explosive: 1,
    Fire: 2,
    Laser: 3,
    Caustic: 4,
    Acid: 5,
    Electric: 6,
    Plasma: 7
});

const Thickness = new Enum({
    Unarmored: 0,
    Light: 1,
    Medium: 2,
    Heavy: 3,
    AntiTank: 4
});

const Damage = new Enum({
    Minimal: 0,
    Low: 1,
    Mild: 2,
    Moderate: 3,
    Decent: 4,
    High: 5,
    Severe: 6,
    Extreme: 7,
    Democratic: 8
});

const Accuracy = new Enum({
    Spread: 0,
    Wide: 1,
    Poor: 2,
    Fair: 3,
    Precise: 4,
    Pinpoint: 5
});

const StratInput = new Enum({
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
});

const UP = StratInput.Up;
const DOWN = StratInput.Down;
const LEFT = StratInput.Left;
const RIGHT = StratInput.Right;

const Stratatype = new Enum({
    Common: 0,
    Support: 1,
    Offensive: 2,
    Defensive: 3
});

const Faction = {
    seaf: "Super Earth Armed Forces",
    helldivers: "HELLDIVER Corps",
    terminid: "Terminid Swarm",
    collective: "Collective of Cyberstan",
    illuminate: "Illuminate Cult",
    dissidents: "Dissident Rebels" 
}

const Ranking = {
    helldiver: {
        honorary: "Honorary Diver",
        cadet: "Cadet",
        spaceCadet: "Space Cadet",
        sergeant: "Sergeant",
        masterSergeant: "Master Sergeant",
        chief: "Chief",
        spaceChiefPrime: "Space Chief Prime",
        deathCaptain: "Death Captain",
        marshal: "Marshal",
        starMarshal: "Star Marshal",
        admiral: "Admiral",
        skullAdmiral: "Skull Admiral",
        fleetAdmiral: "Fleet Admiral",
        admirableAdmiral: "Admirable Admiral",
        commander: "Commander",
        galacticCommander: "Galactic Commander",
        hellCommander: "Hell Commander",
        general: "General",
        fiveStarGeneral: "Five Star General",
        tenStarGeneral: "Ten Star General",
        private: "Private",
        superPrivate: "Super Private",
        superCitizen: "Super Citizen",
        viperCommando: "Viper Commando",
        fireSafetyOfficer: "Fire Safety Officer",
        expertExterminator: "Expert Exterminator",
        freeOfThought: "Free of Thought",
        superPedestrian: "Super Pedestrian",
        assaultInfantry: "Assault Infantry",
        servantOfFreedom: "Servant of Freedom"
    }
};

class Armor {
    constructor(name, plating = 0, resistance = 0, passive = "") {
        this.name = name;
        this.plating = Thickness.name(plating);
        this.resistance = Damage.name(resistance);
        this.passive = passive;
    }

    toString() {
        return `${this.name} (${this.plating} Armor, ${this.resistance} Resistance, PASSIVE: "${this.passive}")`;
    }
}
function findArmor(name, plating = 0) {

    if (plating == 0) 
        return armors.find(armor => armor.name.toLowerCase().includes(name.toLowerCase())) || new Armor("None");
    else if (plating > 3) return armorsSpecial.find(armor => armor.name.toLowerCase().includes(name.toLowerCase())) || new Armor("None");
    else {
        const armorp = armors.filter(armor => armor.plating === Thickness.name(plating));
        return armorp.find(armor => armor.name.toLowerCase().includes(name.toLowerCase())) || new Armor("None");
    }
}

class Weapon {
    constructor(name, weaponType = 0, damageType = [], penetration = 0, damage = 0, accuracy = 0, maxReloads = 0, passives = []) {
        this.name = name;
        this.weaponType = WeaponType.name(weaponType);
        this.damageType = damageType.map(dt => DamageType.name(dt));
        this.penetration = Thickness.name(penetration);
        this.damage = Damage.name(damage);
        this.accuracy = Accuracy.name(accuracy);
        this.reloads = maxReloads;
        this.maxReloads = maxReloads;
        this.passives = passives;
    }

    toString() {
        const damageTypes = this.damageType.length === 1 ? this.damageType[0] : `(${this.damageType.join(', ')})`;
        const passives = this.passives.length === 0 ? "None" : this.passives.length === 1 ? this.passives[0] : `(${this.passives.join(', ')})`;
        return `${this.name} (${WeaponType.name(this.weaponType)}, DMG TYPE: ${damageTypes}, ${this.penetration} Penetrating, ${this.damage} Damage, ${this.accuracy} Accuracy, Max Reloads: ${this.maxReloads}, PASSIVES: ${passives})`;
    }
}
function findWeapon(name, slot = 0) {
    if (name.toLowerCase == "none") return new Weapon("None");
    const allWeapons = [...weaponsPrimary, ...weaponsSecondary, ...weaponsThrowable, ...weaponsSupport];
    const weaponLists = [allWeapons, weaponsPrimary, weaponsSecondary, weaponsThrowable, weaponsSupport];
    const weapons = weaponLists[slot] || allWeapons;
    return weapons.find(weapon => weapon.name.toLowerCase().includes(name.toLowerCase())) || new Weapon("None");
}

class TacPack {
    constructor(name, description, modifier, count = 0, extra = null) {
        this.name = name;
        this.description = description;
        this.modifier = modifier;
        this.count = count;
        this.extra = extra;
    }

    toString() {
        return `${this.name}: ${this.description}`;
    }
}
function findTacPack(name) {
    return tacpacks.find(pack => pack.name.toLowerCase().includes(name.toLowerCase())) || null;
}

class Stratagem {
    constructor(name, type=0, code=[], description = "", modifier = [], cooldown = 0) {
        this.name = name;
        this.type = Stratatype.name(type);
        this.code = code.map(value => StratInput.name(value));
        this.description = description;
        this.cooldown = cooldown;
    }

    toString() {
        return `${this.name}: ${this.description}`;
    }
}
function findStratagem(name) {
    return stratagems.find(stratagem => stratagem.name.toLowerCase().includes(name.toLowerCase())) || null;
}

class Booster {
    constructor(name, description="", modifier="") {
        this.name = name;
        this.description = description;
        this.modifier = modifier;
    }
    toString() {return `${this.name}: ${this.description}`;}
}
function findBooster(name) {
    return boosters.find(booster => booster.name.toLowerCase().includes(name.toLowerCase())) || null;
}

class Character {
    constructor(
        name="", rank="None", faction="None", 
        strength=0, constitution=0, speed=0, stealth=0, precision=0, perception=0, 
        armor=null, weaponPrimary=null, weaponSecondary=null, weaponThrowable=null, weaponSupport=null, 
        backpack=null, stratagem1=null, stratagem2=null, stratagem3=null, stratagem4=null, booster=null
    ) {
        this.name = name;
        if (typeof(rank) == Number) this.rank = Ranking.name(rank);
        else this.rank = rank;
        this.faction = faction;

        this.strength = strength;
        this.constitution = constitution;
        this.speed = speed;
        this.stealth = stealth;
        this.precision = precision;
        this.perception = perception;

        this.armor = armor;
        this.weaponPrimary = weaponPrimary;
        this.weaponSecondary = weaponSecondary;
        this.weaponThrowable = weaponThrowable;
        this.weaponSupport = weaponSupport;
        this.backpack = backpack;
        this.stratagem1 = stratagem1;
        this.stratagem2 = stratagem2;
        this.stratagem3 = stratagem3;
        this.stratagem4 = stratagem4;
        this.booster = booster;
    }

    set(stat, value) {
        const stats = ["strength", "constitution", "speed", "stealth", "precision", "perception"];
        this[stats[stat]] = value;
    }
};

function NPC(name, faction, armor, weapon1=null, weapon2=null, weaponT=null, weaponS=null, pack=null, str=0, con=0, spe=0, ste=0, pre=0, per=0) {
    const c = new Character();
    c.name = name;
    c.faction = faction;

    c.armor = armor;
    c.weaponPrimary = weapon;
    c.weaponSecondary = weapon2;
    c.weaponsThrowable = weaponT;
    c.weaponSupport = weaponS;
    c.backpack = pack;

    c.strength = str;
    c.constitution = con;
    c.speed = spe;
    c.stealth = ste;
    c.precision = pre;
    c.perception = per;
    
    return c;
}