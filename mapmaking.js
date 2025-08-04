const bugsO = `
    <drop-option><img src="images/icons/outposts/terminid_small.webp"><p>Small Nest</p></drop-option>
    <drop-option><img src="images/icons/outposts/terminid_medium.webp"><p>Medium Nest</p></drop-option>
    <drop-option><img src="images/icons/outposts/terminid_heavy.webp"><p>Heavy Nest</p></drop-option>
    <drop-option><img src="images/icons/outposts/terminid_mega.webp"><p>Meganest</p></drop-option>
`;
const botsO = `
    <drop-option><img src="images/icons/outposts/automaton_small.webp"><p>Small Outpost</p></drop-option>
    <drop-option><img src="images/icons/outposts/automaton_medium.webp"><p>Medium Outpost</p></drop-option>
    <drop-option><img src="images/icons/outposts/automaton_heavy.webp"><p>Heavy Outpost</p></drop-option>
    <drop-option><img src="images/icons/outposts/automaton_mega.webp"><p>Fortress</p></drop-option>
`;
const squidsO = `
    <drop-option><img src="images/icons/outposts/illuminate_small.webp"><p>Small Encampment</p></drop-option>
    <drop-option><img src="images/icons/outposts/illuminate_medium.webp"><p>Medium Encampment</p></drop-option>
    <drop-option><img src="images/icons/outposts/illuminate_heavy.webp"><p>Heavy Encampment</p></drop-option>
    <drop-option><img src="images/icons/outposts/illuminate_mega.webp"><p>Great Fleet</p></drop-option>
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
const bugsS = `    
    <drop-option><img src="images/icons/side/terminid/Spore Spewer.webp"><p>Spore Spewer</p></drop-option>
    <drop-option><img src="images/icons/side/terminid/Stalker Lair.webp"><p>Stalker Lair</p></drop-option>
    <drop-option><img src="images/icons/side/terminid/Shrieker Nest.webp"><p>Shrieker Nest</p></drop-option>
    <drop-option><img src="images/icons/side/terminid/Retrieve Mutant Larva.webp"><p>Retrieve Mutant Larva</p></drop-option>              
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
const squidsS = `
    <drop-option><img src="images/icons/side/illuminate/Cognitive Disruptor.webp"><p>Cognitive Disruptor</p></drop-option>
`;

/*const missions_misc = [
    "Extraction Point"={},
    Minor Point of Interest
    Terminate Illegal Broadcast
    Pump Fuel To ICBM
    Upload Escape Pod Data
    Spread Democracy
    Conduct Geological Survey
    Launch ICBM
    Retrieve Valuable Data
    Emergency Evacuation
    Retrieve Essential Personnel
    Evacuate High-Value Assets
];*/