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

class Weapon {
    constructor(name, weaponType = 0, damageType = [], penetration = 0, damage = 0, accuracy = 0, maxReloads = 0, passives = []) {
        this.name = name;
        this.weaponType = weaponType;
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
    const allWeapons = [...weaponsPrimary, ...weaponsSecondary, ...weaponsThrowable, ...weaponsSupport];
    const weaponLists = [allWeapons, weaponsPrimary, weaponsSecondary, weaponsThrowable, weaponsSupport];
    const weapons = weaponLists[slot] || allWeapons;
    return weapons.find(weapon => weapon.name.toLowerCase().includes(name.toLowerCase())) || new Weapon("None");
}

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
    const allArmors = [...armorsLight, ...armorsMedium, ...armorsHeavy];
    const armorLists = [allArmors, armorsLight, armorsMedium, armorsHeavy];
    const armors = armorLists[plating] || allArmors;
    return armors.find(armor => armor.name.toLowerCase().includes(name.toLowerCase())) || new Armor("None");
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
    constructor(name, stratatype, code, description = "", modifier = [], cooldown = 0) {
        this.name = name;
        this.stratatype = Stratatype.name(stratatype);
        this.code = code;
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

const weaponsPrimary = [
    new Weapon("AR-23 Liberator", 0, [0], 1, 3, 3, 8),
    new Weapon("AR-23P Liberator Penetrator", 0, [0], 1, 2, 3, 7),
    new Weapon("AR-23C Liberator Concussive", 0, [0], 1, 2, 3, 6, ["Stagger"]),
    new Weapon("StA-52 Assault Rifle", 0, [0], 1, 3, 3, 6),
    new Weapon("AR-23A Liberator Carbine", 0, [0], 1, 3, 2, 8),
    new Weapon("AR-61 Tenderizer", 0, [0], 1, 4, 3, 7),
    new Weapon("BR-14 Adjudicator", 0, [0], 2, 4, 2, 8),
    new Weapon("R-2124 Constitution", 1, [0], 1, 4, 4, 99),
    new Weapon("R-63 Diligence", 1, [0], 1, 4, 4, 8),
    new Weapon("R-63CS Diligence Counter-Sniper", 1, [0], 2, 4, 3, 6),
    new Weapon("PLAS-39 Accelerator Rifle", 2, [1, 7], 2, 4, 5, 8),
    new Weapon("SMG-37 Defender", 3, [0], 1, 3, 3, 7, ["One-handed"]),
    new Weapon("SMG-72 Pummeler", 3, [0], 1, 2, 2, 7, ["One-handed", "Stagger"]),
    new Weapon("SMG-32 Reprimand", 3, [0], 2, 4, 2, 9),
    new Weapon("StA-11 SMG", 3, [0], 1, 3, 2, 7, ["One-handed"]),
    new Weapon("MP-98 Knight", 3, [0], 1, 2, 1, 7, ["One-handed"]),
    new Weapon("SG-8 Punisher", 4, [0], 1, 4, 2, 60),
    new Weapon("SG-8S Slugger", 4, [0], 2, 3, 3, 60),
    new Weapon("SG-225 Breaker", 4, [0], 1, 4, 1, 7),
    new Weapon("SG-225SP Breaker Spray&Pray", 4, [0], 1, 3, 1, 8),
    new Weapon("SG-225IE Breaker Incendiary", 4, [0, 2], 1, 3, 1, 4, ["Burn"]),
    new Weapon("SG-451 Cookout", 4, [0, 2], 1, 4, 2, 60, ["Burn"]),
    new Weapon("SG-20 Halt (Flechette)", 4, [0], 2, 3, 3, 30),
    new Weapon("SG-20 Halt (Stun)", 4, [0], 1, 2, 3, 30, ["Stun"]),
    new Weapon("CB-9 Exploding Crossbow", 5, [0, 1], 2, 4, 4, 8, ["Explosive", "One-handed"]),
    new Weapon("R-36 Eruptor", 5, [0, 1], 2, 3, 5, 6, ["Explosive"]),
    new Weapon("LAS-5 Scythe", 6, [3], 1, 3, 5, 4, ["Heatsink"]),
    new Weapon("LAS-16 Sickle", 6, [3], 1, 3, 4, 3, ["Heatsink"]),
    new Weapon("LAS-17 Double-Edge Sickle", 6, [3], 3, 4, 4, 3, ["Heatsink", "Backlash"]),
    new Weapon("PLAS-1 Scorcher", 6, [1, 7], 2, 4, 4, 5, ["Explosive"]),
    new Weapon("SG-8P Punisher Plasma", 6, [7], 2, 4, 2, 8, ["Explosive"]),
    new Weapon("ARC-12 Blitzer", 6, [6], 1, 3, 2, 0, ["Stun"]),
    new Weapon("PLAS-101 Purifier", 6, [1, 7], 2, 3, 3, 6, ["Explosive"]),
    new Weapon("FLAM-66 Torcher", 10, [2], 3, 3, 4, 6, ["Fire", "Burn"]),
    new Weapon("JAR-5 Dominator", 10, [0], 2, 4, 3, 6)
];
const weaponsSecondary = [
    new Weapon("P-2 Peacemaker", 7, [0], 1, 1, 3, 6, ["One-handed"]),
    new Weapon("P-19 Redeemer", 7, [0], 1, 2, 2, 4, ["One-handed"]),
    new Weapon("P-113 Verdict", 7, [0], 2, 3, 3, 8, ["One-handed"]),
    new Weapon("P-4 Senator", 7, [0], 3, 3, 4, 40, ["One-handed"]),
    new Weapon("CQC-19 Stun Lance", 8, [0], 2, 2, 3, 0, ["Stun", "One-handed"]),
    new Weapon("CQC-30 Stun Baton", 8, [0], 2, 1, 2, 0, ["Stun", "One-handed"]),
    new Weapon("CQC-5 Combat Hatchet", 8, [0], 2, 2, 2, 0, ["One-handed"]),
    new Weapon("P-11 Stim Pistol", 10, [0], 0, 0, 4, 24, ["Heal", "One-handed"]),
    new Weapon("SG-22 Bushwhacker", 10, [0], 1, 3, 2, 30, ["One-handed", "One-handed"]),
    new Weapon("P-72 Crisper", 10, [2], 1, 2, 3, 4, ["Fire", "Burn", "One-handed"]),
    new Weapon("GP-31 Grenade Pistol", 10, [0, 1], 2, 4, 4, 6, ["Explosive", "One-handed"]),
    new Weapon("LAS-7 Dagger", 10, [3], 1, 2, 4, 3, ["Heatsink", "One-handed"]),
    new Weapon("GP-31 Ultimatum", 10, [0, 1], 4, 7, 4, 1, ["Explosive", "One-handed"]),
    new Weapon("PLAS-15 Loyalist", 10, [7], 2, 2, 3, 4, ["Explosive", "One-handed"])
];
const weaponsThrowable = [
    new Weapon("G-6 Frag", 9, [1], 2, 2, 3, 5, ["Explosive"]),
    new Weapon("G-12 High Explosive", 9, [1], 3, 3, 4, 4, ["Explosive"]),
    new Weapon("G-10 Incendiary", 9, [1], 2, 2, 4, 4, ["Explosive", "Burn"]),
    new Weapon("G-16 Impact", 9, [1], 3, 2, 3, 4, ["Explosive", "Impact"]),
    new Weapon("G-13 Incendiary Impact", 9, [1], 2, 1, 3, 4, ["Explosive", "Burn", "Impact"]),
    new Weapon("G-23 Stun", 9, [1], 4, 0, 2, 4, ["Explosive", "Stun"]),
    new Weapon("G-4 Gas", 9, [4], 4, 2, 3, 4, ["Explosive", "Gas"]),
    new Weapon("G-50 Seeker", 9, [1], 3, 3, 2, 4, ["Explosive", "Impact"]),
    new Weapon("G-3 Smoke", 9, [1], 0, 0, 3, 4, ["Explosive", "Smoke"]),
    new Weapon("G-123 Thermite", 9, [1, 2], 4, 7, 3, 3, ["Burn"]),
    new Weapon("K-2 Throwing Knife", 9, [0], 2, 3, 4, 20)
];
const weaponsSupport = [
    new Weapon("MG-43 Machine Gun", 11, [0], 2, 5, 3, 3, ["Stationary Reload"]),
    new Weapon("APW-1 Anti-Materiel Rifle", 2, [0], 3, 6, 5, 6),
    new Weapon("M-105 Stalwart", 11, [0], 1, 4, 4, 3),
    new Weapon("EAT-17 Expendable Anti-Tank", 12, [0, 1], 4, 7, 5, 0, ["Explosive", "Single Shot"]),
    new Weapon("GR-8 Recoilless Rifle (HEAT)", 12, [0, 1], 4, 7, 4, 0, ["Explosive", "Stationary Reload", "Backpack"]),
    new Weapon("GR-8 Recoilless Rifle (HE)", 12, [0, 1], 2, 5, 4, 0, ["Single Shot", "Stationary Reload", "Backpack"]),
    new Weapon("FLAM-40 Flamethrower", 13, [2], 3, 5, 3, 4, ["Fire", "Burn"]),
    new Weapon("AC-8 Autocannon (AP)", 0, [0, 1], 3, 5, 4, 10, ["Explosive", "Stationary Reload", "Backpack"]),
    new Weapon("AC-8 Autocannon (FLAK)", 0, [0, 1], 2, 3, 4, 10, ["Explosive", "Stationary Reload", "Backpack"]),
    new Weapon("MG-206 Heavy Machine Gun", 11, [0], 3, 6, 2, 2, ["Stationary Reload"]),
    new Weapon("RL-77 Airburst Rocket Launcher", 12, [1], 2, 7, 3, 0, ["Explosive", "Stationary Reload", "Backpack"]),
    new Weapon("MLS-4X Commando", 12, [0, 1], 4, 7, 5, 0, ["Explosive", "Laser-guided"]),
    new Weapon("RS-422 Railgun", 2, [0], 4, 7, 5, 20, ["Single Shot", "Safety Toggle"]),
    new Weapon("FAF-14 Spear", 12, [0], 4, 7, 4, 0, ["Explosive", "Stationary Reload", "Backpack"]),
    new Weapon("StA-X3 W.A.S.P. Launcher", 12, [1], 4, 5, 4, 0, ["Explosive", "Stationary Reload", "Backpack"]),
    new Weapon("GL-21 Grenade Launcher", 12, [1], 2, 4, 4, 3, ["Explosive"]),
    new Weapon("LAS-98 Laser Cannon", 6, [3], 3, 5, 5, 2, ["Laser", "Burn"]),
    new Weapon("ARC-3 Arc Thrower", 6, [6], 4, 3, 3, 0, ["Electric", "Chargeup"]),
    new Weapon("LAS-99 Quasar Cannon", 6, [1, 7], 4, 7, 5, 0, ["Chargeup"]),
    new Weapon("TX-41 Sterilizer", 13, [4], 4, 2, 5, 4, ["Stagger", "Confuse"]),
    new Weapon("SG-88 Break-Action Shotgun", 4, [0], 1, 3, 2, 40),
    new Weapon("Entrenchment Tool", 10, [0], 2, 2, 2, 0, ["One handed", "Shovel"])
];
const armorsLight = [
    new Armor("SC-34 Infilitrator", 1, 3, "Scout"),
    new Armor("SC-30 Trailblazer Scout", 1, 2, "Scout"),
    new Armor("AC-2 Obedient", 1, 2, "Acclimated"),
    new Armor("EX-00 Prototype X", 1, 2, "Electrical Conduit"),
    new Armor("CE-07 Demolition Specialist", 1, 3, "Engineering Kit"),
    new Armor("CW-4 Arctic Ranger", 1, 2, "Scout"),
    new Armor("PH-9 Predator", 1, 2, "Peak Physique"),
    new Armor("I-09 Heatseeker", 1, 2, "Inflammable"),
    new Armor("AF-50 Noxious Ranger", 1, 2, "Advanced Filtration"),
    new Armor("UF-16 Inspector", 1, 2, "Unflinching"),
    new Armor("SR-24 Street Scout", 1, 2, "Siege-Ready"),
    new Armor("SC-37 Legionnare", 1, 2, "Servo-Assisted"),
    new Armor("CE-74 Breaker", 1, 2, "Engineering Kit"),
    new Armor("FS-38 Eradicator", 1, 2, "Fortified"),
    new Armor("B-08 Light Gunner", 1, 2, "Extra Padding"),
    new Armor("CM-21 Trench Paramedic", 1, 3, "Med-Kit"),
    new Armor("CE-67 Titan", 1, 3, "Engineering Kit"),
    new Armor("FS-37 Ravager", 1, 2, "Engineering Kit"),
    new Armor("IE-57 Hell-Bent", 1, 2, "Integrated Explosives")
];
const armorsMedium = [
    new Armor("B-01 Tactical", 2, 3, "Extra Padding"),
    new Armor("CE-35 Trench Engineer", 2, 3, "Engineering Kit"),
    new Armor("CM-09 Bonesnapper", 2, 3, "Med-Kit"),
    new Armor("DP-40 Hero of the Federation", 2, 3, "Democracy Protects"),
    new Armor("SA-04 Combat Technician", 2, 3, "Scout"),
    new Armor("CM-14 Physician", 2, 3, "Med-Kit"),
    new Armor("DP-11 Champion of the People", 2, 3, "Democracy Protects"),
    new Armor("DP-53 Savior of the Free", 2, 3, "Democracy Protects"),
    new Armor("DP-00 Tactical", 2, 3, "Democracy Protects"),
    new Armor("TR-9 Cavalier of Democracy", 2, 3, "Extra Padding"),
    new Armor("TR-117 Alpha Commander", 2, 3, "Med-kit"),
    new Armor("TR-40 Gold Eagle", 2, 3, "Extra Padding"),
    new Armor("SA-25 Steel Trooper", 2, 3, "Servo-Assisted"),
    new Armor("SA-12 Servo Assisted", 2, 3, "Servo-Assisted"),
    new Armor("EX-03 Prototype 3", 2, 3, "Electrical Conduit"),
    new Armor("EX-16 Prototype 16", 2, 3, "Electrical Conduit"),
    new Armor("CE-27 Ground Breaker", 2, 3, "Engineering Kit"),
    new Armor("I-102 Draconaught", 2, 3, "Inflammable"),
    new Armor("AF-02 Haz-Master", 2, 3, "Advanced Filtration"),
    new Armor("UF-50 Bloodhound", 2, 3, "Unflinching"),
    new Armor("IE-3 Martyr", 2, 3, "Integrated Explosives"),
    new Armor("IE-12 Righteous", 2, 3, "Integrated Explosives"),
    new Armor("SC-15 Drone Master", 2, 3, "Engineering Kit"),
    new Armor("B-24 Enforcer", 2, 4, "Fortified"),
    new Armor("CE-81 Juggernaut", 2, 3, "Engineering Kit"),
    new Armor("FS-34 Exterminator", 2, 3, "Fortified"),
    new Armor("CM-10 Clinician", 2, 3, "Med-Kit"),
    new Armor("CW-9 White Wolf", 2, 3, "Extra Padding"),
    new Armor("PH-56 Jaguar", 2, 3, "Peak Physique"),
    new Armor("I-92 Fire Fighter", 2, 3, "Inflammable"),
    new Armor("AF-91 Field Chemist", 2, 3, "Advanced Filtration"),
    new Armor("UF-84 Doubt Killer", 2, 3, "Unflinching"),
    new Armor("AC-1 Dutiful", 2, 3, "Acclimated")
];
const armorsHeavy = [
    new Armor("FS-05 Marksman", 3, 4, "Fortified"),
    new Armor("FS-23 Battle Master", 3, 4, "Fortified"),
    new Armor("TR-62 Knight", 3, 4, "Servo-Assisted"),
    new Armor("SA-32 Dynamo", 3, 4, "Servo-Assisted"),
    new Armor("FS-55 Devastator", 3, 4, "Fortified"),
    new Armor("CW-36 Winter Warrior", 3, 4, "Servo-Assisted"),
    new Armor("CW-22 Kodiak", 3, 4, "Fortified"),
    new Armor("PH-202 Twigsnapper", 3, 4, "Peak Physique"),
    new Armor("SR-18 Roadblock", 3, 4, "Siege-Ready"),
    new Armor("B-27 Fortified Commando", 3, 4, "Extra Padding"),
    new Armor("FS-61 Dreadnought", 3, 4, "Servo-Assisted"),
    new Armor("FS-11 Executioner", 3, 4, "Fortified"),
    new Armor("CM-17 Butcher", 3, 4, "Med-Kit"),
    new Armor("CE-64 Grenadier", 3, 4, "Engineering Kit"),
    new Armor("CE-101 Guerilla Gorilla", 3, 4, "Engineering Kit"),
    new Armor("I-44 Salamander", 3, 4, "Inflammable"),
    new Armor("AF-52 Lockdown", 3, 4, "Advanced Filtration"),
    new Armor("SR-64 Cinderblock", 3, 4, "Siege-Ready")
];
const armorsSpecial = [
    new Armor("SH-20 Ballistic Shield", 2, 4, "Backpack"),
    new Armor("SH-32 Spherical Shield", 1, 2, "Backpack")
];
const stratagems = [
    new Stratagem("Resupply", 0, [DOWN, DOWN, UP, RIGHT], "Deploys a container of four supply packs. Each supply pack fills primary and secondary weapon magazines to full, and all other ammo by half their max."),
    new Stratagem("Reinforce", 0, [UP, DOWN, RIGHT, LEFT, UP], "Calls in a new Helldiver to reinforce. Limited to 3 reinforcements per Destroyer."),
    new Stratagem("SoS Beacon", 0, [UP, DOWN, RIGHT, UP], "Deploys a beacon to transmit an SoS signal to other Helldivers. Basically a 'join the op' ex machina."),
    new Stratagem("Eagle Rearm", 0, [DOWN, DOWN, UP, RIGHT], "Signals your Destroyer's Eagle to return to the ship to resupply, if one is in flight."),
    new Stratagem("SEAF Artillery", 0, [RIGHT, UP, UP, DOWN], "Calls in an artillery strike from a SEAF Artillery turret, if one has been connected to your Destroyer."),
    new Stratagem("Hellbomb", 0, [DOWN, UP, LEFT, DOWN, UP, RIGHT, DOWN, UP], "Deploys a Hellbomb. Must be armed manually. 10 second fuse."),

    new Stratagem("MG-43 Machine Gun", 1, [DOWN, RIGHT, DOWN, UP, RIGHT], "Deploys a machine gun designed for stationary use. High power, low accuracy."),
    new Stratagem("APW-1 Anti-Materiel Rifle", 1, [DOWN, LEFT, RIGHT, UP, DOWN], "Deploys a high-caliber sniper rifle effective against heavy armor at a distance."),
    new Stratagem("M-105 Stalwart", 1, [DOWN, LEFT, DOWN, UP, UP, LEFT], "Deploys a compact machine gun that trades power for ease of use."),
    new Stratagem("EAT-17 Expendable Anti-Tank", 1, [DOWN, DOWN, LEFT, UP, RIGHT], "Deploys two single-use launchers specialized against vehicle armor."),
    new Stratagem("GR-8 Recoilless Rifle", 1, [DOWN, LEFT, RIGHT, RIGHT, LEFT], "Deploys a launcher effective against vehicle armor. Includes backpack for reloading."),
    new Stratagem("FLAM-40 Flamethrower", 1, [DOWN, LEFT, UP, DOWN, UP], "Deploys a flamethrower for close range that burns through heavy armor and alights terrain."),
    new Stratagem("AC-8 Autocannon", 1, [DOWN, LEFT, DOWN, UP, UP, RIGHT], "Deploys a handheld cannon effective against vehicle armor. Includes backpack for reloading."),
    new Stratagem("MG-206 Heavy Machine Gun", 1, [DOWN, LEFT, UP, DOWN, DOWN], "Deploys a powerful machine gun with intense recoil."),
    new Stratagem("RL-77 Airburst Rocket Launcher", 1, [DOWN, UP, UP, LEFT, RIGHT], "Deploys a launcher that fires cluster rockets that detonate within enemy proximity."),
    new Stratagem("MLS-4X Commando", 1, [DOWN, LEFT, UP, DOWN, RIGHT], "Deploys an expendable launcher with four laser-guided missiles."),
    new Stratagem("RS-422 Railgun", 1, [DOWN, RIGHT, DOWN, UP, LEFT, RIGHT], "Deploys a railgun specialized for penetrating armor. Charges up to fire."),
    new Stratagem("FAF-14 Spear", 1, [DOWN, DOWN, UP, DOWN, DOWN], "Deploys a missile launcher that locks onto target and specializes against heavy armor and larger enemies."),
    new Stratagem("StA-X3 W.A.S.P. Launcher", 1, [DOWN, DOWN, UP, DOWN, RIGHT], "Deploys a missile launcher with a barrage of lock-on missiles. Includes backpack for reloading."),
    new Stratagem("GL-21 Grenade Launcher", 1, [DOWN, LEFT, UP, LEFT, DOWN], "Deploys a grenade launcher effective against armored infantry."),
    new Stratagem("LAS-98 Laser Cannon", 1, [DOWN, LEFT, DOWN, UP, LEFT], "Deploys a laser weapon that fires a continuous beam. Needs to cool down periodically."),
    new Stratagem("ARC-3 Arc Thrower", 1, [DOWN, LEFT, UP, UP], "Deploys an electric weapon that charges and fires arcs of lightning at close-medium. Can chain to multiple targets."),
    new Stratagem("LAS-99 Quasar Cannon", 1, [DOWN, DOWN, UP, LEFT, RIGHT], "Deploys a weapon that charges up to fire a single explosive energy burst. Specialized for vehicle armor."),

    new Stratagem("LIFT-850 Jump Pack", 1, [DOWN, UP, UP, DOWN, UP], "Deploys a Tac-pack that allows the wearer to jump short distances quickly."),
    new Stratagem("B-1 Supply Pack", 1, [DOWN, LEFT, UP, DOWN, RIGHT], "Deploys a Tac-pack that allows the wearer to carry resupply boxes for themself or others."),
    new Stratagem("SH-20 Ballistic Shield Pack", 1, [DOWN, LEFT, UP, DOWN, LEFT], "Deploys a Tac-pack that provides a one-handed front-facing ballistic shield."),
    new Stratagem("SH-32 Shield Generator Pack", 1, [DOWN, LEFT, UP, DOWN, RIGHT], "Deploys a Tac-pack that encloses a spherical energy shield around the wearer."),
    new Stratagem("SH-51 Directional Shield Pack", 1, [DOWN, LEFT, UP, DOWN, RIGHT], "Deploys a Tac-pack that provides a one-handed device which creates a front-facing energy shield."),
    new Stratagem("AX/AR-23 Guard Dog", 1, [DOWN, UP, LEFT, UP, RIGHT, DOWN], "Deploys a Tac-pack that releases an autonomous drone equipped with a miniature Liberator."),
    new Stratagem("AX/LAS-5 Guard Dog: Rover", 1, [DOWN, UP, LEFT, UP, RIGHT, RIGHT], "Deploys a Tac-pack that releases an autonomous drone equipped with a miniature Scythe."),
    new Stratagem("AX/TX-13 Guard Dog: Dog Breath", 1, [DOWN, UP, LEFT, UP, RIGHT, UP], "Deploys a Tac-pack that releases an autonomous drone equipped with a miniature Sterilizer."),
    new Stratagem("B-100 Portable Hellbomb", 1, [DOWN, LEFT, UP, DOWN, LEFT], "Deploys a Tac-pack with a miniaturized Hellbomb. Remember to drop it once armed."),

    new Stratagem("M-102 Fast Recon Vehicle", 1, [LEFT, DOWN, RIGHT, DOWN, RIGHT, DOWN, UP], "Calls in a vehicle with a mounted machinegun. Carries up to five people."),
    new Stratagem("EXO-45 Patriot Exosuit", 1, [LEFT, DOWN, RIGHT, UP, LEFT, DOWN, DOWN], "Calls in an armored walking mechsuit equipped with a minigun and rocket launcher."),
    new Stratagem("EXO-49 Emancipator Exosuit", 1, [LEFT, DOWN, RIGHT, UP, LEFT, DOWN, UP], "Calls in an armored walking mechsuit equipped with a dual autocannons."),

    new Stratagem("Orbital Precision Strike", 2, [RIGHT, RIGHT, UP], "Calls a single precise strike that explodes on impact."),
    new Stratagem("Orbital Gas Strike", 2, [RIGHT, RIGHT, DOWN, RIGHT], "Calls a single precise strike that releases a cloud of caustic gas."),
    new Stratagem("Orbital EMS Strike", 2, [RIGHT, RIGHT, LEFT, DOWN], "Calls a single precise strike that stuns all targets with radius, and creates a slowing field."),
    new Stratagem("Orbital Smoke Strike", 2, [RIGHT, RIGHT, DOWN, UP], "Calls a single precise strike that releases a cloud of thick smoke to block vision."),
    new Stratagem("Orbital Gatling Barrage", 2, [RIGHT, DOWN, LEFT, UP, UP], "Calls a barrage of high explosive rounds from your Destroyer."),
    new Stratagem("Orbital Airburst Strike", 2, [RIGHT, RIGHT, RIGHT], "Calls a series of strikes that explode in the air, raining shrapnel over a small area."),
    new Stratagem("Orbital 120mm HE Barrage", 2, [RIGHT, RIGHT, DOWN, LEFT, RIGHT, DOWN], "Calls a prolonged explosive artillery salvo over a medium area."),
    new Stratagem("Orbital 380mm HE Barrage", 2, [RIGHT, DOWN, UP, UP, LEFT, DOWN, DOWN], "Calls a prolonged high-explosive artillery salvo over a wide area."),
    new Stratagem("Orbital Walking Barrage", 2, [RIGHT, DOWN, RIGHT, DOWN, RIGHT, DOWN], "Calls a linear artillery barrage that moves at intervals to clear an advance."),
    new Stratagem("Orbital Laser Strike", 2, [RIGHT, DOWN, UP, RIGHT, DOWN], "Calls a continuous laser beam that sweeps over the nearby area, tracking the closest enemy in proximity."),
    new Stratagem("Orbital Napalm Barrage", 2, [RIGHT,RIGHT,DOWN,LEFT,RIGHT,UP], "Calls a prolonged barrage of napalm shells over a small area, setting the terrain ablaze."),
    new Stratagem("Orbital Railcannon Strike", 2, [RIGHT,DOWN,UP,LEFT,RIGHT,UP], "Calls a high-velocity railcannon round that automatically targets the largest enemy in proximity."),
    
    new Stratagem("Eagle Strafing Run", 2, [UP,RIGHT,RIGHT], "Calls a near-instant strafing run to clear small targets within proximity."),
    new Stratagem("Eagle Airstrike", 2, [UP,RIGHT,DOWN,RIGHT], "Calls a barrage of high explosive bombs launched within proximity."),
    new Stratagem("Eagle Cluster Bomb", 2, [UP,RIGHT,DOWN,DOWN,RIGHT], "Calls a targeted barrage of bombs unable to destroy buildings, but effective against smaller targets."),
    new Stratagem("Eagle Napalm Airstrike", 2, [UP,RIGHT,DOWN,DOWN,RIGHT], "Calls a targeted barrage of napalm bombs that set terrain and enemies ablaze."),
    new Stratagem("Eagle Smoke Strike", 2, [UP,RIGHT,UP,DOWN], "Calls a targeted barrage of smoke grenades to block vision and provide cover."),
    new Stratagem("Eagle 110mm Rocket Pods", 2, [UP,RIGHT,UP,LEFT], "Calls a barrage of high explosive rockets targeting the largest enemy within proximity."),
    new Stratagem("Eagle 500kg Bomb", 2, [UP,RIGHT,DOWN,DOWN,DOWN], "Calls a single high explosive bomb that obliterates anything within proximity."),
    
    new Stratagem("E/MG-101 HMG Emplacement", 3, [DOWN,UP,LEFT,RIGHT,RIGHT,LEFT], "Deploys a manned HMG turret. Slow to turn, quick to blast through enemies."),
    new Stratagem("E/AT-12 Anti-Tank Emplacement", 3, [DOWN,UP,LEFT,RIGHT,RIGHT,RIGHT], "Deploys a manned anti-tank cannon turret. Slow to turn, but effective against heavy armor at range."),
    new Stratagem("FX-12 Shield Generator Relay", 3, [DOWN,DOWN,LEFT,RIGHT,LEFT,RIGHT], "Deploys a shield generator that creates a protective barrier in a medium area. Has a limited regeneration."),
    new Stratagem("A/ARC-3 Tesla Tower", 3, [DOWN,UP,RIGHT,UP,LEFT,RIGHT], "Deploys a tower that releases arcs of electricity at close range. Stay prone to avoid friendly fire."),
    
    new Stratagem("MD-6 Anti-Personnel Minefield", 3, [DOWN,LEFT,UP,RIGHT], "Deploys a minefield that covers a small area and explodes when triggered."),
    new Stratagem("MD-I4 Incendiary Mines", 3, [DOWN,LEFT,LEFT,DOWN], "Deploys a minefield that explodes and sets enemies and terrain alight when triggered."),
    new Stratagem("MD-17 Anti-Tank Mines", 3, [DOWN,LEFT,UP,UP], "Deploys a minefield that specializes against heavy enemies. Only triggered by large creatures."),
    new Stratagem("MD-8 Gas Mines", 3, [DOWN,LEFT,LEFT,RIGHT], "Deploys a minefield that releases a cloud of caustic gas when triggered, blinding, slowing, and eventually liquifying anything caught."),
    
    new Stratagem("A/MG-43 Machine Gun Sentry", 3, [DOWN,UP,RIGHT,RIGHT,UP], "Deploys an automated machine gun turret. Turns quickly."),
    new Stratagem("A/G-16 Gatling Sentry", 3, [DOWN,UP,RIGHT,LEFT], "Deploys an automated gatling turret. Turns slowly, but fires rapidly. Clears out hordes of infantry with ease."),
    new Stratagem("A/M-12 Mortar Sentry", 3, [DOWN,UP,RIGHT,RIGHT,DOWN], "Deploys an automated mortar turret. Effective at long range, and able to strike enemies behind cover."),
    new Stratagem("A/M-23 EMS Mortar Sentry", 3, [DOWN,UP,RIGHT,DOWN,RIGHT], "Deploys an automated mortar turret that fires static field generators to stun and slow enemies."),
    new Stratagem("A/AC-8 Autocannon Sentry", 3, [DOWN,UP,RIGHT,RIGHT,DOWN], "Deploys an automated autocannon turret. Turns slowly, but effective against heavy armor at range."),
    new Stratagem("A/MLS-4X Rocket Sentry", 3, [DOWN,UP,RIGHT,RIGHT,LEFT], "Deploys an automated rocket turret. Effective against large groups & heavy armor. Will prioritise larger enemies."),
    new Stratagem("A/FLAM-40 Flame Sentry", 3, [DOWN,UP,RIGHT,DOWN,UP,UP], "Deploys an automated flamethrower turret. Burns through heavy armor and alights terrain. May explode.")
];

const Ranking = new Enum({
    Citizen: 0,
    Cadet: 1,
    Space_Cadet: 2,
    Sergeant: 3,
    Master_Sergeant: 4,
    Chief: 5,
    Space_Chief_Prime: 6,
    Death_Captain: 7,
    Marshal: 8,
    Star_Marshal: 9,
    Admiral: 10,
    Skull_Admiral: 11,
    Fleet_Admiral: 12,
    Admirable_Admiral: 13,
    Commander: 14,
    Galactic_Commander: 15,
    Hell_Commander: 16,
    General: 17,
    Five_Star_General: 18,
    Ten_Star_General: 19,
    Private: 20,
    Super_Private: 21,
    Super_Citizen: -1,
    Viper_Commando: -2,
    Fire_Safety_Officer: -3,
    Expert_Exterminator: -4,
    Free_of_Thought: -5,
    Super_Pedestrian: -6,
    Assault_Infantry: -7,
    Servant_of_Freedom: -8
});

class Character {
    constructor() {
        this.name = "";
        this.rank = null;
        this.faction = "";
        this.strength = 0;
        this.constitution = 0;
        this.speed = 0;
        this.stealth = 0;
        this.precision = 0;
        this.perception = 0;

        this.armor = null;
        this.weaponPrimary = null;
        this.weaponSecondary = null;
        this.weaponThrowable = null;
        this.weaponSupport = null;
        this.backpack = null;
        this.stratagem1 = null;
        this.stratagem2 = null;
        this.stratagem3 = null;
        this.stratagem4 = null;
        this.booster = null;
    }

    set(stat, value) {
        const stats = ["strength", "constitution", "speed", "stealth", "precision", "perception"];
        this[stats[stat]] = value;
    }
};

function generateCharacter() {
    const character = new Character();

    const stats = [1, 2, 3, 4, 5, 6];
    const priorities = [parseInt(priority1), parseInt(priority2), parseInt(priority3), parseInt(priority4)];
    const dumps = stats.filter(stat => !priorities.includes(stat));

    let points = 6;
    const max = 3;
    const min = -2;

    character.set(priorities[0] - 1, max - 1);
    points -= max - 1;

    character.set(priorities[1] - 1, Math.max(0, max - 3));
    points -= Math.max(0, max - 3);

    priorities.slice(2).forEach(priority => {
        if (priority > 0) {
            const value = Math.max(0, max - 2);
            character.set(priority - 1, value);
            points -= value;
        }
    });

    dumps.forEach(dump => {
        const value = Math.min(0, min);
        character.set(dump - 1, value);
        points -= value;
    });

    while (points > 0) {
        const stat = stats[Math.floor(Math.random() * stats.length)];
        character.set(stat - 1, character[stat] + 1);
        points--;
    }
};

//for (var weapon of weaponsPrimary) createDDCC("weaponsPrimary", weapon.name);
//for (var weapon of weaponsSecondary) createDDCC("weaponsSecondary", weapon.name);
//for (var weapon of weaponsThrowable) createDDCC("weaponsThrowable", weapon.name);
//for (var weapon of weaponsSupport) createDDCC("weaponsSupport", weapon.name);

createDDCC("weaponsPrimary", findWeapon("liberator").name)

function createDDCC(id, name) {
    const element = document.getElementById(id);
    var d = document.createElement('div');
    d.setAttribute('class', "dropdown_custom_item");
    var h = document.createElement('h4');
    h.appendChild(new Text(name));
    var i = document.createElement('img');
    i.setAttribute('src', "images/" + name + ".webp");
    d.appendChild(h);
    d.appendChild(i);
    element.appendChild(d);
}



const hidden = {};

function toggleDisplay(id) {
    if (!hidden[id]) {
        hidden[id] = [];
    }

    const element = document.getElementById(id);
    
    if (hidden[id].length === 0) {
        console.log("new");
        hidden[id].push(element.style.display);
        element.style.display = "hidden";
    } else {
        console.log("remove");
        element.style.display = hidden[id].pop();
    }

    console.log(id, element.style.display);
}