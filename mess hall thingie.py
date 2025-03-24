from types import DynamicClassAttribute
from enum import Enum
from copy import copy
import random as R

class WeaponType(Enum):
    Assault_Rifle = 0
    Marksman_Rifle = 1
    Sniper_Rifle = 2
    Submachine_Gun = 3
    Shotgun = 4
    Explosive = 5
    Energy_Based = 6
    Pistol = 7
    Melee = 8
    Throwable = 9
    Special = 10
    Machine_Gun = 11
    Launcher = 12
    Sprayer = 13
    
    @DynamicClassAttribute
    def name(self): return super(WeaponType, self).name.replace("_", " ")

class DamageType(Enum):
    Physical = 0
    Explosive = 1
    Fire = 2
    Laser = 3
    Caustic = 4
    Acid = 5
    Electric = 6
    Plasma = 7

    @DynamicClassAttribute
    def name(self): return super(DamageType, self).name.replace("_", " ")
    
class Thickness(Enum):
    Unarmored = 0
    Light = 1
    Medium = 2
    Heavy = 3
    AntiTank = 4
 
class Damage(Enum):
    Minimal = 0
    Low = 1
    Mild = 2
    Moderate = 3
    Decent = 4
    High = 5
    Severe = 6
    Extreme = 7
    Democratic = 8

class Accuracy(Enum):
    Spread = 0
    Wide = 1
    Poor = 2
    Fair = 3
    Precise = 4
    Pinpoint = 5

class StratInput(Enum):
    Up = 0
    Down = 1
    Left = 2
    Right = 3
UP = StratInput.Up
DOWN = StratInput.Down
LEFT = StratInput.Left
RIGHT = StratInput.Right

class Stratatype(Enum):
    Common = 0
    Support = 1
    Offensive = 2
    Defensive = 3

class Weapon:
    def __init__(self, name:str, weaponType=0, damageType:list[int]=[], penetration=0, damage=0, accuracy=0, max_reloads=0, passives:list[str]=[]):
        self.name = name
        self.weaponType = WeaponType(weaponType)
        self.damageType = [DamageType(dt) for dt in damageType]
        self.penetration = Thickness(penetration)
        self.damage = Damage(damage)
        self.accuracy = Accuracy(accuracy) 
        self.reloads = max_reloads
        self.max_reloads = max_reloads
        self.passives = passives
    
    def __str__(self): 
        damagetypes = ""
        if len(self.damageType) == 1: damagetypes = self.damageType[0].name
        else:
            for dt in self.damageType: damagetypes += f"{dt.name}, "
            damagetypes = f"({damagetypes[:-2]})"
            
        passives = ""
        if len(self.passives) == 1: passives = self.passives[0]
        elif len(self.passives) == 0: passives = "None"
        else:
            for p in self.passives: passives += p+", "
            passives = f"({passives[:-2]})"
            
        return f"{self.name} ({self.weaponType.name}, DMG TYPE: {damagetypes}, {self.penetration.name} Penetrating, {self.damage.name} Damage, {self.accuracy.name} Accuracy, Max Reloads: {self.max_reloads}, PASSIVES: {passives})"
        
def FindWeapon(name:str, slot:int=0):
    if slot == 1:
        for weapon in weapons_primary:
            if name.lower() in weapon.name.lower(): return copy(weapon)
    elif slot == 2:
        for weapon in weapons_secondary: 
            if name.lower() in weapon.name.lower(): return copy(weapon)
    elif slot == 3:
        for weapon in weapons_throwable:
            if name.lower() in weapon.name.lower(): return copy(weapon)
    elif slot == 4:
        for weapon in weapons_support:
            if name.lower() in weapon.name.lower(): return copy(weapon)
    else:
        for weapon in [*weapons_primary, *weapons_secondary, *weapons_throwable, *weapons_support]:
            if name.lower() in weapon.name.lower(): return copy(weapon)
    return Weapon("None")    

class Armor:    
    def __init__(self, name:str, plating=0, resistance=0, passive=""):
        self.name = name
        self.plating = Thickness(plating)
        self.resistance = Damage(resistance)
        self.passive = passive
            
    def __str__(self): return f"{self.name} ({self.plating.name} Armor, {self.resistance.name} Resistance, PASSIVE: \"{self.passive}\")"

def FindArmor(name:str, plating:int=0):
    if plating == 1:
        for armor in armors_light:
            if name.lower() in armor.name.lower(): return copy(armor)
    elif plating == 2:
        for armor in armors_medium:
            if name.lower() in armor.name.lower(): return copy(armor)
    elif plating == 3:
        for armor in armors_heavy:
            if name.lower() in armor.name.lower(): return copy(armor)
    else:
        for armor in [*armors_light, *armors_medium, *armors_heavy]:
            if name.lower() in armor.name.lower(): return copy(armor)
    return Armor("None")

class TacPack:
    def __init__(self, name:str, description:str, modifier:int, count=0, extra:Weapon|Armor|None=None):
        self.name = name
        self.modifier = modifier
        self.description = description
        self.count = count

    def __str__(self): return f"{self.name}: {self.description}"
 
def FindTacPack(name:str):
    for pack in tacpacks:
        if name.lower() in pack.name.lower(): return copy(pack)
        
class Stratagem:
    def __init__(self, name:str,  stratatype:int, code:list[StratInput], description="", modifier=[], cooldown=0):
        self.name = name
        self.stratatype = Stratatype(stratatype)
        self.description = description
        self.code = code
        self.cooldown = cooldown
        
    def __str__(self): return f"{self.name}: {self.description}"

def FindStratagem(name:str):
    for stratagem in stratagems:
        if name.lower() in stratagem.name.lower(): return copy(stratagem)

weapons_primary = [
    Weapon("AR-23 Liberator",                   0, [0], 1, 3, 3, 8),
    Weapon("AR-23P Liberator Penetrator",       0, [0], 1, 2, 3, 7),
    Weapon("AR-23C Liberator Concussive",       0, [0], 1, 2, 3, 6, ["Stagger"]),
    Weapon("StA-52 Assault Rifle",              0, [0], 1, 3, 3, 6),
    Weapon("AR-23A Liberator Carbine",          0, [0], 1, 3, 2, 8),
    Weapon("AR-61 Tenderizer",                  0, [0], 1, 4, 3, 7),
    Weapon("BR-14 Adjudicator",                 0, [0], 2, 4, 2, 8),
    
    Weapon("R-2124 Constitution",               1, [0], 1, 4, 4, 99),
    Weapon("R-63 Diligence",                    1, [0], 1, 4, 4, 8),
    Weapon("R-63CS Diligence Counter-Sniper",   1, [0], 2, 4, 3, 6),
    
    Weapon("PLAS-39 Accelerator Rifle",         2, [1,7], 2, 4, 5, 8),

    Weapon("SMG-37 Defender",                   3, [0], 1, 3, 3, 7, ["One-handed"]),
    Weapon("SMG-72 Pummeler",                   3, [0], 1, 2, 2, 7, ["One-handed", "Stagger"]),
    Weapon("SMG-32 Reprimand",                  3, [0], 2, 4, 2, 9),
    Weapon("StA-11 SMG",                        3, [0], 1, 3, 2, 7, ["One-handed"]),
    Weapon("MP-98 Knight",                      3, [0], 1, 2, 1, 7, ["One-handed"]),

    Weapon("SG-8 Punisher",                     4, [0], 1, 4, 2, 60),
    Weapon("SG-8S Slugger",                     4, [0], 2, 3, 3, 60),
    Weapon("SG-225 Breaker",                    4, [0], 1, 4, 1, 7),
    Weapon("SG-225SP Breaker Spray&Pray",       4, [0], 1, 3, 1, 8),
    Weapon("SG-225IE Breaker Incendiary",       4, [0,2], 1, 3, 1, 4, ["Burn"]),
    Weapon("SG-451 Cookout",                    4, [0,2], 1, 4, 2, 60, ["Burn"]),
    Weapon("SG-20 Halt (Flechette)",            4, [0], 2, 3, 3, 30),
    Weapon("SG-20 Halt (Stun)",                 4, [0], 1, 2, 3, 30, ["Stun"]),

    Weapon("CB-9 Exploding Crossbow",           5, [0,1], 2, 4, 4, 8, ["Explosive", "One-handed"]),
    Weapon("R-36 Eruptor",                      5, [0,1], 2, 3, 5, 6, ["Explosive"]),
    
    Weapon("LAS-5 Scythe",                      6, [3], 1, 3, 5, 4, ["Heatsink"]),
    Weapon("LAS-16 Sickle",                     6, [3], 1, 3, 4, 3, ["Heatsink"]),
    Weapon("LAS-17 Double-Edge Sickle",         6, [3], 3, 4, 4, 3, ["Heatsink", "Backlash"]),
    Weapon("PLAS-1 Scorcher",                   6, [1,7], 2, 4, 4, 5, ["Explosive"]),
    Weapon("SG-8P Punisher Plasma",             6, [7], 2, 4, 2, 8, ["Explosive"]),
    Weapon("ARC-12 Blitzer",                    6, [6], 1, 3, 2, 0, ["Stun"]),
    Weapon("PLAS-101 Purifier",                 6, [1,7], 2, 3, 3, 6, ["Explosive"]),

    Weapon("FLAM-66 Torcher",                   10, [2], 3, 3, 4, 6, ["Fire", "Burn"]),
    Weapon("JAR-5 Dominator",                   10, [0], 2, 4, 3, 6)
]
weapons_secondary = [
    Weapon("P-2 Peacemaker",                    7, [0], 1, 1, 3, 6, ["One-handed"]),
    Weapon("P-19 Redeemer",                     7, [0], 1, 2, 2, 4, ["One-handed"]),
    Weapon("P-113 Verdict",                     7, [0], 2, 3, 3, 8, ["One-handed"]),
    Weapon("P-4 Senator",                       7, [0], 3, 3, 4, 40, ["One-handed"]),
    
    Weapon("CQC-19 Stun Lance",                 8, [0], 2, 2, 3, 0, ["Stun", "One-handed"]),
    Weapon("CQC-30 Stun Baton",                 8, [0], 2, 1, 2, 0, ["Stun", "One-handed"]),
    Weapon("CQC-5 Combat Hatchet",              8, [0], 2, 2, 2, 0, ["One-handed"]),

    Weapon("P-11 Stim Pistol",                  10, [0], 0, 0, 4, 24, ["Heal", "One-handed"]),
    Weapon("SG-22 Bushwhacker",                 10, [0], 1, 3, 2, 30, ["One-handed", "One-handed"]),
    Weapon("P-72 Crisper",                      10, [2], 1, 2, 3, 4, ["Fire", "Burn", "One-handed"]),
    Weapon("GP-31 Grenade Pistol",              10, [0,1], 2, 4, 4, 6, ["Explosive", "One-handed"]),
    Weapon("LAS-7 Dagger",                      10, [3], 1, 2, 4, 3, ["Heatsink", "One-handed"]),
    Weapon("GP-31 Ultimatum",                   10, [0,1], 4, 7, 4, 1, ["Explosive", "One-handed"]),
    Weapon("PLAS-15 Loyalist",                  10, [7], 2, 2, 3, 4, ["Explosive", "One-handed"])
]
weapons_throwable = [
    Weapon("G-6 Frag",                          9, [1], 2, 2, 3, 5, ["Explosive"]),
    Weapon("G-12 High Explosive",               9, [1], 3, 3, 4, 4, ["Explosive"]),
    Weapon("G-10 Incendiary",                   9, [1], 2, 2, 4, 4, ["Explosive", "Burn"]),
    
    Weapon("G-16 Impact",                       9, [1], 3, 2, 3, 4, ["Explosive", "Impact"]),
    Weapon("G-13 Incendiary Impact",            9, [1], 2, 1, 3, 4, ["Explosive", "Burn", "Impact"]),
    Weapon("G-23 Stun",                         9, [1], 4, 0, 2, 4, ["Explosive", "Stun"]),
    Weapon("G-4 Gas",                           9, [4], 4, 2, 3, 4, ["Explosive", "Gas"]),
    Weapon("G-50 Seeker",                       9, [1], 3, 3, 2, 4, ["Explosive", "Impact"]),
    Weapon("G-3 Smoke",                         9, [1], 0, 0, 3, 4, ["Explosive", "Smoke"]),
    Weapon("G-123 Thermite",                    9, [1,2], 4, 7, 3, 3, ["Burn"]),
    Weapon("K-2 Throwing Knife",                9, [0], 2, 3, 4, 20)
]
weapons_support = [
    Weapon("MG-43 Machine Gun",                 11, [0], 2, 5, 3, 3, ["Stationary Reload"]),
    Weapon("APW-1 Anti-Materiel Rifle",         2, [0], 3, 6, 5, 6),
    Weapon("M-105 Stalwart",                    11, [0], 1, 4, 4, 3),
    Weapon("EAT-17 Expendable Anti-Tank",       12, [0,1], 4, 7, 5, 0, ["Explosive", "Single Shot"]),
    Weapon("GR-8 Recoilless Rifle (HEAT)",      12, [0,1], 4, 7, 4, 0, ["Explosive", "Stationary Reload", "Backpack"]),
    Weapon("GR-8 Recoilless Rifle (HE)",        12, [0,1], 2, 5, 4, 0, ["Single Shot", "Stationary Reload", "Backpack"]),
    Weapon("FLAM-40 Flamethrower",              13, [2], 3, 5, 3, 4, ["Fire", "Burn"]),
    Weapon("AC-8 Autocannon (AP)",              0, [0,1], 3, 5, 4, 10, ["Explosive", "Stationary Reload", "Backpack"]),
    Weapon("AC-8 Autocannon (FLAK)",            0, [0,1], 2, 3, 4, 10, ["Explosive", "Stationary Reload", "Backpack"]),
    Weapon("MG-206 Heavy Machine Gun",          11, [0], 3, 6, 2, 2, ["Stationary Reload"]),
    Weapon("RL-77 Airburst Rocket Launcher",    12, [1], 2, 7, 3, 0, ["Explosive", "Stationary Reload", "Backpack"]),
    Weapon("MLS-4X Commando",                   12, [0,1], 4, 7, 5, 0, ["Explosive", "Laser-guided"]),
    Weapon("RS-422 Railgun",                    2, [0], 4, 7, 5, 20, ["Single Shot", "Safety Toggle"]),
    Weapon("FAF-14 Spear",                      12, [0], 4, 7, 4, 0, ["Explosive", "Stationary Reload", "Backpack"]),
    Weapon("StA-X3 W.A.S.P. Launcher",          12, [1], 4, 5, 4, 0, ["Explosive", "Stationary Reload", "Backpack"]),
    Weapon("GL-21 Grenade Launcher",            12, [1], 2, 4, 4, 3, ["Explosive"]),
    Weapon("LAS-98 Laser Cannon",               6, [3], 3, 5, 5, 2, ["Laser", "Burn"]),
    Weapon("ARC-3 Arc Thrower",                 6, [6], 4, 3, 3, 0, ["Electric", "Chargeup"]),
    Weapon("LAS-99 Quasar Cannon",              6, [1,7], 4, 7, 5, 0, ["Chargeup"]),
    Weapon("TX-41 Sterilizer",                  13, [4], 4, 2, 5, 4, ["Stagger", "Confuse"]),
    Weapon("SG-88 Break-Action Shotgun",        4, [0], 1, 3, 2, 40),
    Weapon("Entrenchment Tool",                 10, [0], 2, 2, 2, 0, ["One handed", "Shovel"]),
]
armors_light = [
    Armor("SC-34 Infilitrator", 1, 3, "Scout"),
    Armor("SC-30 Trailblazer Scout", 1, 2, "Scout"),
    Armor("AC-2 Obedient", 1, 2, "Acclimated"),
    Armor("EX-00 Prototype X", 1, 2, "Electrical Conduit"),
    Armor("CE-07 Demolition Specialist", 1, 3, "Engineering Kit"),
    Armor("CW-4 Arctic Ranger", 1, 2, "Scout"),
    Armor("PH-9 Predator", 1, 2, "Peak Physique"),
    Armor("I-09 Heatseeker", 1, 2, "Inflammable"),
    Armor("AF-50 Noxious Ranger", 1, 2, "Advanced Filtration"),
    Armor("UF-16 Inspector", 1, 2, "Unflinching"),
    Armor("SR-24 Street Scout", 1, 2, "Siege-Ready"),
    
    Armor("SC-37 Legionnare", 1, 2, "Servo-Assisted"),
    Armor("CE-74 Breaker", 1, 2, "Engineering Kit"),
    Armor("FS-38 Eradicator", 1, 2, "Fortified"),
    Armor("B-08 Light Gunner", 1, 2, "Extra Padding"),
    Armor("CM-21 Trench Paramedic", 1, 3, "Med-Kit"),
    Armor("CE-67 Titan", 1, 3, "Engineering Kit"),
    Armor("FS-37 Ravager", 1, 2, "Engineering Kit"),
    Armor("IE-57 Hell-Bent", 1, 2, "Integrated Explosives"),
]
armors_medium = [
    Armor("B-01 Tactical", 2, 3, "Extra Padding"),
    Armor("CE-35 Trench Engineer", 2, 3, "Engineering Kit"),
    Armor("CM-09 Bonesnapper", 2, 3, "Med-Kit"),
    Armor("DP-40 Hero of the Federation", 2, 3, "Democracy Protects"),
    Armor("SA-04 Combat Technician", 2, 3, "Scout"),
    Armor("CM-14 Physician", 2, 3, "Med-Kit"),
    Armor("DP-11 Champion of the People", 2, 3, "Democracy Protects"),
    Armor("DP-53 Savior of the Free", 2, 3, "Democracy Protects"),
    Armor("DP-00 Tactical", 2, 3, "Democracy Protects"),
    Armor("TR-9 Cavalier of Democracy", 2, 3, "Extra Padding"),
    Armor("DP-00 Tactical", 2, 3, "Democracy Protects"),
    Armor("TR-117 Alpha Commander", 2, 3, "Med-kit"),
    Armor("TR-40 Gold Eagle", 2, 3, "Extra Padding"),
    Armor("SA-25 Steel Trooper", 2, 3, "Servo-Assisted"),
    Armor("SA-12 Servo Assisted", 2, 3, "Servo-Assisted"),
    Armor("EX-03 Prototype 3", 2, 3, "Electrical Conduit"),
    Armor("EX-16 Prototype 16", 2, 3, "Electrical Conduit"),
    Armor("CE-27 Ground Breaker", 2, 3, "Engineering Kit"),
    Armor("I-102 Draconaught", 2, 3, "Inflammable"),
    Armor("AF-02 Haz-Master", 2, 3, "Advanced Filtration"),
    Armor("UF-50 Bloodhound", 2, 3, "Unflinching"),
    Armor("IE-3 Martyr", 2, 3, "Integrated Explosives"),
    Armor("IE-12 Righteous", 2, 3, "Integrated Explosives"),
    
    Armor("SC-15 Drone Master", 2, 3, "Engineering Kit"),
    Armor("B-24 Enforcer", 2, 4, "Fortified"),
    Armor("CE-81 Juggernaut", 2, 3, "Engineering Kit"),
    Armor("FS-34 Exterminator", 2, 3, "Fortified"),
    Armor("CM-10 Clinician", 2, 3, "Med-Kit"),
    Armor("CW-9 White Wolf", 2, 3, "Extra Padding"),
    Armor("PH-56 Jaguar", 2, 3, "Peak Physique"),
    Armor("I-92 Fire Fighter", 2, 3, "Inflammable"),
    Armor("AF-91 Field Chemist", 2, 3, "Advanced Filtration"),
    Armor("UF-84 Doubt Killer", 2, 3, "Unflinching"),
    Armor("AC-1 Dutiful", 2, 3, "Acclimated")
]
armors_heavy = [
    Armor("FS-05 Marksman", 3, 4, "Fortified"),
    Armor("FS-23 Battle Master", 3, 4, "Fortified"),
    Armor("TR-62 Knight", 3, 4, "Servo-Assisted"),
    Armor("SA-32 Dynamo", 3, 4, "Servo-Assisted"),
    Armor("FS-55 Devastator", 3, 4, "Fortified"),
    Armor("CW-36 Winter Warrior", 3, 4, "Servo-Assisted"),
    Armor("CW-22 Kodiak", 3, 4, "Fortified"),
    Armor("PH-202 Twigsnapper", 3, 4, "Peak Physique"),
    Armor("SR-18 Roadblock", 3, 4, "Siege-Ready"),
    Armor("B-27 Fortified Commando", 3, 4, "Extra Padding"),
    Armor("FS-61 Dreadnought", 3, 4, "Servo-Assisted"),
    Armor("FS-11 Executioner", 3, 4, "Fortified"),
    Armor("CM-17 Butcher", 3, 4, "Med-Kit"),
    Armor("CE-64 Grenadier", 3, 4, "Engineering Kit"),
    Armor("CE-101 Guerilla Gorilla", 3, 4, "Engineering Kit"),
    Armor("I-44 Salamander", 3, 4, "Inflammable"),
    Armor("AF-52 Lockdown", 3, 4, "Advanced Filtration"),
    Armor("SR-64 Cinderblock", 3, 4, "Siege-Ready")
]
armors_special = [
    Armor("SH-20 Ballistic Shield", 2, 4, "Backpack"),
    Armor("SH-32 Spherical Shield", 1, 2, "Backpack")
]
tacpacks = [
    TacPack("GR-8 Recoilless Rifle Backpack", "Holds 5 extra rounds to reload.", 5 ,5),
    TacPack("AC-8 Autocannon", "Holds 10 extra magazines to reload.", 10, 10),
    TacPack("StA-X3 W.A.S.P. Launcher", "Holds 5 extra magazines to reload.", 5, 5),
    TacPack("LIFT-850 Jump Pack", "Allows the wearer to jump short distances. +5 to movement-related rolls and DCs. 15 second recharge.", 5),
    TacPack("B-1 Supply Pack", "Allows the wearer to carry resupply boxes for themself or others. Max 4. Can be refilled with resupply drops.", 4, 4),
    TacPack("SH-20 Ballistic Shield Backpack", "Provides portable cover against oncoming fire when wielded. +4 to DC against incoming attacks you can see.", 4),
    TacPack("SH-32 Shield Generator Pack", "Provides portable cover against oncoming fire. Takes two successful hits before breaking. 15 second recharge.", 2, 2),
    TacPack("AX/AR-23 Guard Dog", "An autonomous drone equipped with a miniature Liberator. CAN BE ATTACKED. Will be forced to return to backpack after three hits.", 3, 3, FindWeapon("Liberator")),
    TacPack("AX/LAS-5 Guard Dog: Rover", "An autonomous drone equipped with a miniature Scythe. CAN BE ATTACKED. Will be forced to return to backpack after three hits.", 3, 3, FindWeapon("Scythe")),
    TacPack("AX/TX-13 Guard Dog: Dog Breath", "An autonomous drone equipped with a miniature Sterilizer. CAN BE ATTACKED. Will be forced to return to backpack after three hits.", 3, 3, FindWeapon("Sterilizer")),
    TacPack("B-100 Portable Hellbomb", "Remember to drop it once armed. 10 second countdown that CANNOT be canceled. Will kill anything within 20 meters of it, will wound anything within 40.", 0) 
]
stratagems = [
    Stratagem("Resupply", 0, [DOWN,DOWN,UP,RIGHT], "Deploys a container of four supply packs. Each supply pack fills primary and secondary weapon magazines to full, and all other ammo by half their max."),
    Stratagem("Reinforce", 0, [UP,DOWN,RIGHT,LEFT,UP], "Calls in a new Helldiver to reinforce. Limited to 3 reinforcements per Destroyer."),
    Stratagem("SoS Beacon", 0, [UP,DOWN,RIGHT,UP], "Deploys a beacon to transmit an SoS signal to other Helldivers. Basically a 'join the op' ex machina."),
    Stratagem("Eagle Rearm", 0, [DOWN,DOWN,UP,RIGHT], "Signals your Destroyer's Eagle to return to the ship to resupply, if one is in flight."),
    Stratagem("SEAF Artillery", 0, [RIGHT,UP,UP,DOWN], "Calls in an artillery strike from a SEAF Artillery turret, if one has been connected to your Destroyer."),
    Stratagem("Hellbomb", 0, [DOWN,UP,LEFT,DOWN,UP,RIGHT,DOWN,UP], "Deploys a Hellbomb. Must be armed manually. 10 second fuse."),
# Support Weapons  
    Stratagem("MG-43 Machine Gun", 1, [DOWN,RIGHT,DOWN,UP,RIGHT], "Deploys a machine gun designed for stationary use. High power, low accuracy."),
    Stratagem("APW-1 Anti-Materiel Rifle", 1, [DOWN,LEFT,RIGHT,UP,DOWN], "Deploys a high-caliber sniper rifle effective against heavy armor at a distance."),
    Stratagem("M-105 Stalwart", 1, [DOWN,LEFT,DOWN,UP,UP,LEFT], "Deploys a compact machine gun that trades power for ease of use."),
    Stratagem("EAT-17 Expendable Anti-Tank", 1, [DOWN,DOWN,LEFT,UP,RIGHT], "Deploys two single-use launchers specialized against vehicle armor."),
    Stratagem("GR-8 Recoilless Rifle", 1, [DOWN,LEFT,RIGHT,RIGHT,LEFT], "Deploys a launcher effective against vehicle armor. Includes backpack for reloading."),
    Stratagem("FLAM-40 Flamethrower", 1, [DOWN,LEFT,UP,DOWN,UP], "Deploys a flamethrower for close range that burns through heavy armor and alights terrain."),
    Stratagem("AC-8 Autocannon", 1, [DOWN,LEFT,DOWN,UP,UP,RIGHT], "Deploys a handheld cannon effective against vehicle armor. Includes backpack for reloading."),
    Stratagem("MG-206 Heavy Machine Gun", 1, [DOWN,LEFT,UP,DOWN,DOWN], "Deploys a powerful machine gun with intense recoil."),
    Stratagem("RL-77 Airburst Rocket Launcher",1,  [DOWN,UP,UP,LEFT,RIGHT], "Deploys a launcher that fires cluster rockets that detonate within enemy proximity."),
    Stratagem("MLS-4X Commando", 1, [DOWN,LEFT,UP,DOWN,RIGHT], "Deploys an expendable launcher with four laser-guided missiles."),
    Stratagem("RS-422 Railgun", 1, [DOWN,RIGHT,DOWN,UP,LEFT,RIGHT], "Deploys a railgun specialized for penetrating armor. Charges up to fire."),
    Stratagem("FAF-14 Spear", 1, [DOWN,DOWN,UP,DOWN,DOWN], "Deploys a missile launcher that locks onto target and specializes against heavy armor and larger enemies."),
    Stratagem("StA-X3 W.A.S.P. Launcher", 1, [DOWN,DOWN,UP,DOWN,RIGHT], "Deploys a missile launcher with a barrage of lock-on missiles. Includes backpack for reloading."),
    Stratagem("GL-21 Grenade Launcher", 1, [DOWN,LEFT,UP,LEFT,DOWN], "Deploys a grenade launcher effective against armored infantry."),
    Stratagem("LAS-98 Laser Cannon", 1, [DOWN,LEFT,DOWN,UP,LEFT], "Deploys a laser weapon that fires a continuous beam. Needs to cool down periodically."),
    Stratagem("ARC-3 Arc Thrower", 1, [DOWN,LEFT,UP,UP], "Deploys an electric weapon that charges and fires arcs of lightning at close-medium. Can chain to multiple targets."),
    Stratagem("LAS-99 Quasar Cannon", 1, [DOWN,DOWN,UP,LEFT,RIGHT], "Deploys a weapon that charges up to fire a single explosive energy burst. Specialized for vehicle armor."),
    Stratagem("TX-41 Sterilizer", 1, [DOWN,LEFT,UP,DOWN,LEFT], "Deploys a flamethrower-like weapon that releases caustic gas. Blinds, slows, and eventually liquifies enemies."),
# Support Tac-Packs
    Stratagem("LIFT-850 Jump Pack", 1, [DOWN,UP,UP,DOWN,UP], "Deploys a Tac-pack that allows the wearer to jump short distances quickly."),
    Stratagem("B-1 Supply Pack", 1, [DOWN,LEFT,UP,DOWN,RIGHT], "Deploys a Tac-pack that allows the wearer to carry resupply boxes for themself or others."),
    Stratagem("SH-20 Ballistic Shield Pack", 1, [DOWN,LEFT,UP,DOWN,LEFT], "Deploys a Tac-pack that provides a one-handed front-facing ballistic shield."),
    Stratagem("SH-32 Shield Generator Pack", 1, [DOWN,LEFT,UP,DOWN,RIGHT], "Deploys a Tac-pack that encloses a spherical energy shield around the wearer."),
    Stratagem("SH-51 Directional Shield Pack", 1, [DOWN,LEFT,UP,DOWN,RIGHT], "Deploys a Tac-pack that provides a one-handed device which creates a front-facing energy shield."),
    Stratagem("AX/AR-23 Guard Dog", 1, [DOWN,UP,LEFT,UP,RIGHT,DOWN], "Deploys a Tac-pack that releases an autonomous drone equipped with a miniature Liberator."),
    Stratagem("AX/LAS-5 Guard Dog: Rover", 1, [DOWN,UP,LEFT,UP,RIGHT,RIGHT], "Deploys a Tac-pack that releases an autonomous drone equipped with a miniature Scythe."),
    Stratagem("AX/TX-13 Guard Dog: Dog Breath", 1, [DOWN,UP,LEFT,UP,RIGHT,UP], "Deploys a Tac-pack that releases an autonomous drone equipped with a miniature Sterilizer."),
    Stratagem("B-100 Portable Hellbomb", 1, [DOWN,LEFT,UP,DOWN,LEFT], "Deploys a Tac-pack with a miniaturized Hellbomb. Remember to drop it once armed."),
# Support Vehicles
    Stratagem("M-102 Fast Recon Vehicle", 1, [LEFT,DOWN,RIGHT,DOWN,RIGHT,DOWN,UP], "Calls in a vehicle with a mounted machinegun. Carries up to five people."),
    Stratagem("EXO-45 Patriot Exosuit", 1, [LEFT,DOWN,RIGHT,UP,LEFT,DOWN,DOWN], "Calls in an armored walking mechsuit equipped with a minigun and rocket launcher."),
    Stratagem("EXO-49 Emancipator Exosuit", 1, [LEFT,DOWN,RIGHT,UP,LEFT,DOWN,UP], "Calls in an armored walking mechsuit equipped with a dual autocannons."),
# Offensive Orbitals
    Stratagem("Orbital Precision Strike", 2, [RIGHT,RIGHT,UP], "Calls a single precise strike that explodes on impact."),
    Stratagem("Orbital Gas Strike", 2, [RIGHT,RIGHT,DOWN,RIGHT], "Calls a single precise strike that releases a cloud of caustic gas."),
    Stratagem("Orbital EMS Strike", 2, [RIGHT,RIGHT,LEFT,DOWN], "Calls a single precise strike that stuns all targets with radius, and creates a slowing field."),
    Stratagem("Orbital Smoke Strike", 2, [RIGHT,RIGHT,DOWN,UP], "Calls a single precise strike that releases a cloud of thick smoke to block vision."),
    Stratagem("Orbital Gatling Barrage", 2, [RIGHT,DOWN,LEFT,UP,UP], "Calls a barrage of high explosive rounds from your Destroyer."),
    Stratagem("Orbital Airburst Strike", 2, [RIGHT,RIGHT,RIGHT], "Calls a series of strikes that explode in the air, raining shrapnel over a small area."),
    Stratagem("Orbital 120mm HE Barrage", 2, [RIGHT,RIGHT,DOWN,LEFT,RIGHT,DOWN], "Calls a prolonged explosive artillery salvo over a medium area."),
    Stratagem("Orbital 380mm HE Barrage", 2, [RIGHT,DOWN,UP,UP,LEFT,DOWN,DOWN], "Calls a prolonged high-explosive artillery salvo over a wide area."),
    Stratagem("Orbital Walking Barrage", 2, [RIGHT,DOWN,RIGHT,DOWN,RIGHT,DOWN], "Calls a linear artillery barrage that moves at intervals to clear an advance."),
    Stratagem("Orbital Laser Strike", 2, [RIGHT,DOWN,UP,RIGHT,DOWN], "Calls a continuous laser beam that sweeps over the nearby area, tracking the closest enemy in proximity."),
    Stratagem("Orbital Napalm Barrage", 2, [RIGHT,RIGHT,DOWN,LEFT,RIGHT,UP], "Calls a prolonged barrage of napalm shells over a small area, setting the terrain ablaze."),
    Stratagem("Orbital Railcannon Strike", 2, [RIGHT,DOWN,UP,LEFT,RIGHT,UP], "Calls a high-velocity railcannon round that automatically targets the largest enemy in proximity."),
# Offensive Eagles   
    Stratagem("Eagle Strafing Run", 2, [UP,RIGHT,RIGHT], "Calls a near-instant strafing run to clear small targets within proximity."),
    Stratagem("Eagle Airstrike", 2, [UP,RIGHT,DOWN,RIGHT], "Calls a barrage of high explosive bombs launched within proximity."),
    Stratagem("Eagle Cluster Bomb", 2, [UP,RIGHT,DOWN,DOWN,RIGHT], "Calls a targeted barrage of bombs unable to destroy buildings, but effective against smaller targets."),
    Stratagem("Eagle Napalm Airstrike", 2, [UP,RIGHT,DOWN,DOWN,RIGHT], "Calls a targeted barrage of napalm bombs that set terrain and enemies ablaze."),
    Stratagem("Eagle Smoke Strike", 2, [UP,RIGHT,UP,DOWN], "Calls a targeted barrage of smoke grenades to block vision and provide cover."),
    Stratagem("Eagle 110mm Rocket Pods", 2, [UP,RIGHT,UP,LEFT], "Calls a barrage of high explosive rockets targeting the largest enemy within proximity."),
    Stratagem("Eagle 500kg Bomb", 2, [UP,RIGHT,DOWN,DOWN,DOWN], "Calls a single high explosive bomb that obliterates anything within proximity."),
# Defensive Emplacements
    Stratagem("E/MG-101 HMG Emplacement", 3, [DOWN,UP,LEFT,RIGHT,RIGHT,LEFT], "Deploys a manned HMG turret. Slow to turn, quick to blast through enemies."),
    Stratagem("E/AT-12 Anti-Tank Emplacement", 3, [DOWN,UP,LEFT,RIGHT,RIGHT,RIGHT], "Deploys a manned anti-tank cannon turret. Slow to turn, but effective against heavy armor at range."),
    Stratagem("FX-12 Shield Generator Relay", 3, [DOWN,DOWN,LEFT,RIGHT,LEFT,RIGHT], "Deploys a shield generator that creates a protective barrier in a medium area. Has a limited regeneration."),
    Stratagem("A/ARC-3 Tesla Tower", 3, [DOWN,UP,RIGHT,UP,LEFT,RIGHT], "Deploys a tower that releases arcs of electricity at close range. Stay prone to avoid friendly fire."),
# Defensive Mines
    Stratagem("MD-6 Anti-Personnel Minefield", 3, [DOWN,LEFT,UP,RIGHT], "Deploys a minefield that covers a small area and explodes when triggered."),
    Stratagem("MD-I4 Incendiary Mines", 3, [DOWN,LEFT,LEFT,DOWN], "Deploys a minefield that explodes and sets enemies and terrain alight when triggered."),
    Stratagem("MD-17 Anti-Tank Mines", 3, [DOWN,LEFT,UP,UP], "Deploys a minefield that specializes against heavy enemies. Only triggered by large creatures."),
    Stratagem("MD-8 Gas Mines", 3, [DOWN,LEFT,LEFT,RIGHT], "Deploys a minefield that releases a cloud of caustic gas when triggered, blinding, slowing, and eventually liquifying anything caught."),
# Defensive Sentries
    Stratagem("A/MG-43 Machine Gun Sentry", 3, [DOWN,UP,RIGHT,RIGHT,UP], "Deploys an automated machine gun turret. Turns quickly."),
    Stratagem("A/G-16 Gatling Sentry", 3, [DOWN,UP,RIGHT,LEFT], "Deploys an automated gatling turret. Turns slowly, but fires rapidly. Clears out hordes of infantry with ease."),
    Stratagem("A/M-12 Mortar Sentry", 3, [DOWN,UP,RIGHT,RIGHT,DOWN], "Deploys an automated mortar turret. Effective at long range, and able to strike enemies behind cover."),
    Stratagem("A/M-23 EMS Mortar Sentry", 3, [DOWN,UP,RIGHT,DOWN,RIGHT], "Deploys an automated mortar turret that fires static field generators to stun and slow enemies."),
    Stratagem("A/AC-8 Autocannon Sentry", 3, [DOWN,UP,RIGHT,RIGHT,DOWN], "Deploys an automated autocannon turret. Turns slowly, but effective against heavy armor at range."),
    Stratagem("A/MLS-4X Rocket Sentry", 3, [DOWN,UP,RIGHT,RIGHT,LEFT], "Deploys an automated rocket turret. Effective against large groups & heavy armor. Will prioritise larger enemies."),
    Stratagem("A/FLAM-40 Flame Sentry", 3, [DOWN,UP,RIGHT,DOWN,UP,UP], "Deploys an automated flamethrower turret. Burns through heavy armor and alights terrain. May explode.")
]

class Ranking(Enum):
    Citizen = 0
    Cadet = 1
    Space_Cadet = 2
    Sergeant = 3
    Master_Sergeant = 4
    Chief = 5
    Space_Chief_Prime = 6
    Death_Captain = 7
    Marshal = 8
    Star_Marshal = 9
    Admiral = 10
    Skull_Admiral = 11
    Fleet_Admiral = 12
    Admirable_Admiral = 13
    Commander = 14
    Galactic_Commander = 15
    Hell_Commander = 16
    General = 17
    Five_Star_General = 18
    Ten_Star_General = 19
    Private = 20
    Super_Private = 21
    
    Super_Citizen = -1
    Viper_Commando = -2
    Fire_Safety_Officer = -3
    Expert_Exterminator = -4
    Free_of_Thought = -5
    Super_Pedestrian = -6
    Assault_Infantry = -7
    Servant_of_Freedom = -8
    
   
    @DynamicClassAttribute
    def name(self): return super(Ranking, self).name.replace("_", " ")

class Character:
    name = ""
    rank:Ranking
    faction = ""
    
    strength = 0
    constitution = 0
    speed = 0
    stealth = 0
    precision = 0
    perception = 0
    
    armor = FindArmor("trailblazer")
    weapon_primary = FindWeapon("R-63CS")
    weapon_secondary = FindWeapon("Senator")
    weapon_throwable = FindWeapon("G-6")
    weapon_support:Weapon|None = None
    backpack:TacPack|None = None
    
    stratagem1:Stratagem|None = None
    stratagem2:Stratagem|None = None
    stratagem3:Stratagem|None = None
    stratagem4:Stratagem|None = None
    
    booster = ""
    
    def Set(self, stat:int, setto:int):
        if stat == 0: self.strength = setto
        if stat == 1: self.constitution = setto
        if stat == 2: self.speed = setto
        if stat == 3: self.stealth = setto
        if stat == 4: self.precision = setto
        if stat == 5: self.perception = setto


def Generate():
    character = Character()
    character.name = input("Character name: ")
    character.rank = Ranking(int(input("Character rank (0-21, -1--8 for special titles):  ")))
    character.faction = input("Character faction: ")

    # Prompt for stat priorities
    priority1 = int(input("Choose your greatest ability from Strength(1), Constitution(2), Speed(3), Stealth(4), Precision(5), Perception(6):  "))
    priority2 = int(input("Choose your second-greatest ability from the same list:  "))
    priority3 = int(input("Choose one ability you want to keep decent (Can be 0 for none):  "))
    priority4 = int(input("Choose a second ability you want to keep decent (Can be 0 for none):  "))

    # Determine stats to dump
    stats = [1, 2, 3, 4, 5, 6]
    dumps = []
    for stat in stats:
        if stat not in [priority1,priority2,priority3,priority4]: dumps.append(stat) 

    # Initialize points and modifiers
    points = 6
    max_ = 3
    min_ = -2

    # Allocate points to the highest priority stat
    n = max_ - 1
    character.Set(priority1 - 1, n)
    points -= n

    # Allocate points to the second-highest priority stat
    n = R.randint(max_ - 3, max_ - 1)
    character.Set(priority2 - 1, n)
    points -= n

    # Allocate points to decent stats
    n = R.randint(0, max_ - 2)
    character.Set(priority3 - 1, n)
    points -= n

    n = R.randint(0, max_ - 2)
    character.Set(priority4 - 1, n)
    points -= n

    # Apply negative modifiers to dump stats to gain points
    for dump in dumps:
        n = R.randint(min_, 0)  # Negative or zero
        character.Set(dump - 1, n)
        points -= n

    # Distribute remaining points randomly among all stats
    while points > 0:
        stat = R.choice(stats)
        character.Set(stat - 1, character.__dict__[stat_to_attr(stat)] + 1)
        points -= 1

    # Assign equipment and stratagems
    character.armor = FindArmor(input("Armor name: "))
    character.weapon_primary = FindWeapon(input("Primary Weapon:  "), 1)
    character.weapon_secondary = FindWeapon(input("Secondary Weapon:  "), 2)
    character.weapon_throwable = FindWeapon(input("Throwable Weapon:  "), 3)
    character.weapon_support = FindWeapon(input("Support Weapon:  "), 4)
    character.backpack = FindTacPack(input("Tac-Pack:  "))
    character.stratagem1 = FindStratagem(input("Stratagem 1:  "))
    character.stratagem2 = FindStratagem(input("Stratagem 2:  "))
    character.stratagem3 = FindStratagem(input("Stratagem 3:  "))
    character.stratagem4 = FindStratagem(input("Stratagem 4:  "))
    character.booster = input("Booster:  ")

    # Display the generated character
    print("\nCharacter generated successfully!")
    print(f"Name: {character.name}")
    print(f"Rank: {character.rank}")
    print(f"Faction: {character.faction}")
    print(f"Stats: Strength={character.strength}, Constitution={character.constitution}, Speed={character.speed}, Stealth={character.stealth}, Precision={character.precision}, Perception={character.perception}")
    print(f"Armor: {character.armor}")
    print(f"Primary Weapon: {character.weapon_primary}")
    print(f"Secondary Weapon: {character.weapon_secondary}")
    print(f"Throwable Weapon: {character.weapon_throwable}")
    print(f"Support Weapon: {character.weapon_support}")
    print(f"Backpack: {character.backpack}")
    print(f"Stratagems: \n - {character.stratagem1}\n - {character.stratagem2}\n - {character.stratagem3}\n - {character.stratagem4}")
    print(f"Booster: {character.booster}")

def stat_to_attr(stat):
    """Helper function to map stat index to attribute name."""
    return ["strength", "constitution", "speed", "stealth", "precision", "perception"][stat - 1]
    
Generate()