const bugsO = `
    <drop-option><img src="images/icons/outposts/terminid_small.webp"><p>Small Nest</p></drop-option>
    <drop-option><img src="images/icons/outposts/terminid_medium.webp"><p>Medium Nest</p></drop-option>
    <drop-option><img src="images/icons/outposts/terminid_heavy.webp"><p>Heavy Nest</p></drop-option>
    <drop-option><img src="images/icons/outposts/terminid_mega.webp"><p>Meganest</p></drop-option>
`;
const bugsM = `    
    <drop-option><img src="images/icons/main/terminid/Eradicate Terminid Swarm.webp"><p>Eradicate terminid Swarm</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Eliminate Brood Commanders.webp"><p>Eliminate Brood Commanders</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Eliminate Chargers.webp"><p>Eliminate Chargers</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Eliminate Impaler.webp"><p>Eliminate Impaler</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Eliminate Bile Titans.webp"><p>Eliminate Bile Titans</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Activate E-710 Pumps.webp"><p>Activate E-710 Pumps</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Purge Hatcheries.webp"><p>Purge Hatcheries</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Enable E-710 Extraction.webp"><p>Enable E-710 Extraction</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Nuke Nursery.webp"><p>Nuke Nursery</p></drop-option>
    <drop-option><img src="images/icons/main/terminid/Blitz - Destroy Nests.webp"><p>Blitz - Destroy Nests</p></drop-option>                
`;
const bugsS = `    
    <drop-option><img src="images/icons/side/terminid/Spore Spewer.webp"><p>Spore Spewer</p></drop-option>
    <drop-option><img src="images/icons/side/terminid/Stalker Lair.webp"><p>Stalker Lair</p></drop-option>
    <drop-option><img src="images/icons/side/terminid/Shrieker Nest.webp"><p>Shrieker Nest</p></drop-option>
    <drop-option><img src="images/icons/side/terminid/Retrieve Mutant Larva.webp"><p>Retrieve Mutant Larva</p></drop-option>              
`;
const botsO = `
    <drop-option><img src="images/icons/outposts/automaton_small.webp"><p>Small Outpost</p></drop-option>
    <drop-option><img src="images/icons/outposts/automaton_medium.webp"><p>Medium Outpost</p></drop-option>
    <drop-option><img src="images/icons/outposts/automaton_heavy.webp"><p>Heavy Outpost</p></drop-option>
    <drop-option><img src="images/icons/outposts/automaton_mega.webp"><p>Fortress</p></drop-option>
`;
const botsM = `
    <drop-option><img src="images/icons/main/automaton/Eradicate Automaton Forces.webp"><p>Eradicate Automaton Forces</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Destroy Transmission Network.webp"><p>Destroy Transmission Network</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Eliminate Devastators.webp"><p>Eliminate Devastators</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Eliminate Hulks.webp"><p>Eliminate Hulks</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Eliminate Factory Strider.webp"><p>Eliminate Factory Strider</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Sabotage Supply Bases.webp"><p>Sabotage Supply Bases</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Sabotage Air Ships.webp"><p>Sabotage Air Ships</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Sabotage Air Base.webp"><p>Sabotage Air Base</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Destroy Command Bunkers.webp"><p>Destroy Command Bunkers</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Neutralize Orbital Defenses.webp"><p>Neutralize Orbital Defenses</p></drop-option>
    <drop-option><img src="images/icons/main/automaton/Blitz - Destroy Fabricators.webp"><p>Blitz - Destroy Fabricators</p></drop-option>
`;
const botsS = `
    <drop-option><img src="images/icons/side/automaton/Detector Tower.webp"><p>Detector Tower</p></drop-option>
    <drop-option><img src="images/icons/side/automaton/Mortar Emplacement.webp"><p>Mortar Emplacement</p></drop-option>
    <drop-option><img src="images/icons/side/automaton/Stratagem Jammer.webp"><p>Stratagem Jammer</p></drop-option>
    <drop-option><img src="images/icons/side/automaton/Anti-Air Emplacement.webp"><p>Anti-Air Emplacement</p></drop-option>
    <drop-option><img src="images/icons/side/automaton/Gunship Facility.webp"><p>Gunship Facility</p></drop-option>
    <drop-option><img src="images/icons/side/automaton/Intercept Convoy.webp"><p>Intercept Convoy</p></drop-option>
    <drop-option><img src="images/icons/side/automaton/Enemy Bio-Processors.webp"><p>Enemy Bio-Processors</p></drop-option>
`;
const squidsO = `
    <drop-option><img src="images/icons/outposts/illuminate_small.webp"><p>Small Encampment</p></drop-option>
    <drop-option><img src="images/icons/outposts/illuminate_medium.webp"><p>Medium Encampment</p></drop-option>
    <drop-option><img src="images/icons/outposts/illuminate_heavy.webp"><p>Heavy Encampment</p></drop-option>
    <drop-option><img src="images/icons/outposts/illuminate_mega.webp"><p>Great Fleet</p></drop-option>
`;
const squidsM = `
    <drop-option><img src="images/icons/main/illuminate/Purge Illuminate.webp"><p>Purge Illuminate</p></drop-option>
    <drop-option><img src="images/icons/main/illuminate/Evacuate Colonists.webp"><p>Evacuate Colonists</p></drop-option>
    <drop-option><img src="images/icons/main/illuminate/Retrieve Recon Craft Intel.webp"><p>Retrieve Recon Craft Intel</p></drop-option>
    <drop-option><img src="images/icons/main/illuminate/Free Colony.webp"><p>Free Colony</p></drop-option>
    <drop-option><img src="images/icons/main/illuminate/Destroy Harvesters.webp"><p>Destroy Harvesters</p></drop-option>
    <drop-option><img src="images/icons/main/illuminate/Repel Invasion Fleet.webp"><p>Repel Invasion Fleet</p></drop-option>
    <drop-option><img src="images/icons/main/illuminate/Take Down Overship.webp"><p>Take Down Overship</p></drop-option>
    <drop-option><img src="images/icons/main/illuminate/Blitz - Destroy Warp Ships.webp"><p>Blitz - Destroy Warp Ships</p></drop-option>
`;
const squidsS = `
    <drop-option><img src="images/icons/side/illuminate/Cognitive Disruptor.webp"><p>Cognitive Disruptor</p></drop-option>
`;
const seO = `
    <drop-option><img src="images/icons/outposts/superearth_small.webp"><p>Small Guard</p></drop-option>
    <drop-option><img src="images/icons/outposts/superearth_medium.webp"><p>Medium Guard</p></drop-option>
    <drop-option><img src="images/icons/outposts/superearth_heavy.webp"><p>Heavy Guard</p></drop-option>
    <drop-option><img src="images/icons/outposts/superearth_mega.webp"><p>Bastion</p></drop-option>
`;
const dissO = `
    <drop-option><img src="images/icons/outposts/dissident_small.webp"><p>Small Base</p></drop-option>
    <drop-option><img src="images/icons/outposts/dissident_medium.webp"><p>Medium Base</p></drop-option>
    <drop-option><img src="images/icons/outposts/dissident_heavy.webp"><p>Heavy Base</p></drop-option>
    <drop-option><img src="images/icons/outposts/dissident_mega.webp"><p>Bunker</p></drop-option>
`;

const factions = [
    `<img src="images/icons/terminid.webp"><p>Terminids</p>`,
    `<img src="images/icons/automaton.webp"><p>Automatons</p>`,
    `<img src="images/icons/illuminate.webp"><p>Illuminate</p>`,
    `<img src="images/icons/superearth.webp"><p>Super Earth</p>`,
    `<img src="images/icons/dissidents.webp"><p>Dissidents</p>`
];

const environmntals = [
    `<img src="images/icons/enviromental/Intense Heat.webp"><p>Intense Heat <i>(Increases stamina drain and ICE heat buildup)</i></p>`,
    `<img src="images/icons/enviromental/Extreme Cold.webp"><p>Extreme Cold <i>(Decreases rate of fire and ICE heat buildup)</i></p>`,
    `<img src="images/icons/enviromental/Fire Tornados.webp"><p>Fire Tornados <i>(Temporarily creates blazing hazards)</i></p>`,
    `<img src="images/icons/enviromental/Blizzards.webp"><p>Blizzards <i>(Temporarily reduces mobility and visibility)</i></p>`,
    `<img src="images/icons/enviromental/Thick Fog.webp"><p>Thick Fog <i>(Reduces visibility)</i></p>`,
    `<img src="images/icons/enviromental/Tremors.webp"><p>Tremors <i>(Temporarily stuns everyone within the AO)</i></p>`,
    `<img src="images/icons/enviromental/Sandstorms.webp"><p>Sandstorms <i>(Temporarily reduces mobility and visibility)</i></p>`,
    `<img src="images/icons/enviromental/Rainstorms.webp"><p>Rainstorms <i>(Temporarily reduces visibility)</i></p>`,
    `<img src="images/icons/enviromental/Ion Storms.webp"><p>Ion Storms <i>(Temporarily disables Stratagems and long-range communications)</i></p>`,
    `<img src="images/icons/enviromental/Acid Storms.webp"><p>Acid Storms <i>(Temporarily reduces armor effectiveness and visibility)</i></p>`,
    `<img src="images/icons/enviromental/Meteor Storms.webp"><p>Meteor Storms <i>(Temporarily drops large meteors)</i></p>`,
    `<img src="images/icons/enviromental/Volcanic Activity.webp"><p>Volcanic Activity <i>(Temporarily drops volcanic rocks)</i></p>`
];