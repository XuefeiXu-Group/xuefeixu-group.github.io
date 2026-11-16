export const researchIntro =
  "We use chemical theory and molecular simulation to study reaction rates, catalytic mechanisms, and the behavior of interfaces.";

export const researchAreas = [
  {
    label: "Gas-phase kinetics",
    title: "High-accuracy gas-phase reaction dynamics",
    description:
      "We calculate rate coefficients and product branching for gas-phase reactions relevant to combustion and atmospheric chemistry. Our work examines how quantum tunneling, molecular flexibility, and collisions change which pathways dominate as temperature and pressure vary.",
    overview:
      "We benchmark electronic-structure methods against high-level calculations and use variational transition state theory to account for recrossing. We include contributions from different conformers and their torsional motion, and treat pressure dependence when collisional energy transfer competes with reaction. These calculations help identify where simpler kinetic models miss important channels.",
    figure: {
      image: "/assets/research/o-xylene-peroxy-enthalpy-2026.webp",
      width: 997,
      height: 613,
      alt: "Enthalpy diagram with molecular structures along the reaction pathways of o-xylyl and oxygen.",
      caption: "Calculated enthalpy profiles for oxygen addition to o-xylyl, the ensuing hydrogen shift, and competing product channels.",
      credit: "Li et al., J. Phys. Chem. A (2026), Fig. 1",
      doi: "https://doi.org/10.1021/acs.jpca.6c00250",
    },
    recentWork: [
      {
        title: "Peroxy-radical chemistry in o-xylene oxidation",
        source: "J. Phys. Chem. A · 2026",
        summary: "Tunneling accelerates the peroxy radical’s intramolecular hydrogen shift. Pressure changes the competition between return to the peroxy radical and formation of a cyclic oxide.",
        doi: "https://doi.org/10.1021/acs.jpca.6c00250",
      },
      {
        title: "Two routes for hydrogen abstraction from methanol",
        source: "Appl. Energy Combust. Sci. · 2025",
        summary: "For abstraction by NH₂, anharmonic motion increases the predicted rate of hydroxyl-site abstraction at low temperature. Methyl-site abstraction becomes dominant at higher temperatures.",
        doi: "https://doi.org/10.1016/j.jaecs.2025.100406",
      },
      {
        title: "Selecting pathways for flexible reactants",
        source: "J. Phys. Chem. A · 2025",
        summary: "For nitro-group transfer to ethylenediamine, ranking pathways by torsion-corrected partition functions gave steadier convergence at high temperature than ranking by electronic energy.",
        doi: "https://doi.org/10.1021/acs.jpca.5c06312",
      },
    ],
  },
  {
    label: "Catalysis & energy",
    title: "Catalyst design and clean-energy mechanisms",
    description:
      "We study how active-site structure and the surrounding solvent govern reaction pathways, from nitrogen reduction on supported metal sites to sulfur conversion in lithium–sulfur batteries.",
    overview:
      "We combine electronic-structure calculations with explicit-solvent simulations where the local environment can change the mechanism. For example, in nitrogen reduction at a Ru–N₄ site, water reorganizes around the reacting species and stabilizes the first hydrogenated intermediate. We also use molecular model reactions to examine how homogeneous metal catalysts alter proton-transfer pathways.",
    figure: {
      image: "/assets/research/ru-n4-nitrogen-hydrogenation-2026.webp",
      width: 1601,
      height: 868,
      alt: "Free-energy surfaces and representative configurations for the first hydrogenation of nitrogen at a Ru–N₄ site.",
      caption: "Free-energy surfaces and molecular snapshots for the first hydrogenation of adsorbed nitrogen at a Ru–N₄ site in water.",
      credit: "Zhang et al., J. Mater. Chem. A (2026), Fig. 5",
      doi: "https://doi.org/10.1039/D5TA09029F",
    },
    recentWork: [
      {
        title: "How water changes nitrogen reduction at Ru–N₄",
        source: "J. Mater. Chem. A · 2026",
        summary: "Enhanced sampling with a machine-learned potential showed that hydronium transfers a proton to adsorbed N₂ more readily than water does. Solvent hydrogen bonding stabilizes the resulting *NNH intermediate.",
        doi: "https://doi.org/10.1039/D5TA09029F",
      },
      {
        title: "Proton transfer in bismuth-catalyzed urethane formation",
        source: "Phys. Chem. Chem. Phys. · 2026",
        summary: "In a model reaction between methyl isocyanate and methanol, a second methanol provides a proton relay. Triphenylbismuth lowers the calculated barrier along this six-membered pathway.",
        doi: "https://doi.org/10.1039/D5CP03608A",
      },
      {
        title: "Solvent control of sulfur radicals in Li–S batteries",
        source: "J. Mater. Chem. A · 2023",
        summary: "Calculations indicate that DMSO coordinates Li⁺ more strongly than 1,3-dioxolane, making it easier to remove lithium from hexasulfide and opening a lower-barrier route to trisulfur radicals.",
        doi: "https://doi.org/10.1039/D3TA03366J",
      },
    ],
  },
  {
    label: "Interfacial chemistry",
    title: "AI-enabled surface and interface physical chemistry",
    description:
      "We use machine-learned interatomic potentials and enhanced sampling to study how ions, hydrogen bonding, and surface structure affect the behavior of water interfaces and nanobubbles.",
    overview:
      "We train potentials on electronic-structure data and use molecular dynamics to follow processes such as proton transfer, ion redistribution, and gas exchange. Free-energy calculations help distinguish effects of different electrolytes and interfaces. For nanobubbles, we connect those molecular-scale effects to nucleation, dissolution, and coarsening.",
    figure: {
      image: "/assets/research/nitrogen-nanobubble-pair-2026.webp",
      width: 1001,
      height: 669,
      alt: "Simulation cell containing two nitrogen nanobubbles surrounded by water.",
      caption: "The two-bubble simulation cell used to follow nitrogen transfer through water during Ostwald ripening.",
      credit: "Guo et al., J. Am. Chem. Soc. (2026), Fig. 1",
      doi: "https://doi.org/10.1021/jacs.6c08865",
    },
    recentWork: [
      {
        title: "Electrolytes change how nanobubbles coarsen",
        source: "J. Am. Chem. Soc. · 2026",
        summary: "Simulations found the fastest ripening in acid and the slowest in NaCl solution. The hydrated ion pairs at the saline interface impede nitrogen transport between bubbles.",
        doi: "https://doi.org/10.1021/jacs.6c08865",
      },
      {
        title: "Nitrogen nanobubbles at anatase–water interfaces",
        source: "J. Am. Chem. Soc. · 2026",
        summary: "A thin water film separates the bubble from anatase TiO₂. Simulations link hydroxide released by water dissociation at the surface to a higher barrier for bubble dissolution.",
        doi: "https://doi.org/10.1021/jacs.6c05480",
      },
      {
        title: "Water self-ions at air and oil interfaces",
        source: "Langmuir · 2025",
        summary: "Free-energy calculations place hydronium and hydroxide in different layers near the air–water interface. At the decane–water interface, hydroxide is weakly favored and hydronium is repelled.",
        doi: "https://doi.org/10.1021/acs.langmuir.4c05004",
      },
    ],
  },
  {
    label: "Nonequilibrium dynamics",
    title: "Extreme-condition reaction dynamics and method development",
    description:
      "We develop and test methods for chemistry far from equilibrium, including high-energy collisions, photoinduced reactions, and unimolecular processes in dilute environments where infrared absorption can compete with collisions.",
    overview:
      "When electronic states are coupled, we use mixed quantum–classical trajectories to follow transitions and energy exchange. Energy-resolved master equations then describe how populations evolve across many collisions or radiative events. We also contribute to TUMME, MSTor, and Polyrate, which support complementary calculations in kinetics and thermochemistry.",
    figure: {
      image: "/assets/research/oxygen-collision-relaxation-2026.webp",
      width: 993,
      height: 479,
      alt: "Schematic curves contrasting energy transfer and relaxation for electronically adiabatic and nonadiabatic oxygen collisions.",
      caption: "Graphical summary of how electronic excitation changes energy transfer and relaxation in high-energy O + O₂ collisions.",
      credit: "Zhao et al., J. Chem. Theory Comput. (2026), graphical abstract",
      doi: "https://doi.org/10.1021/acs.jctc.5c02041",
    },
    recentWork: [
      {
        title: "Electronic excitation in high-energy oxygen collisions",
        source: "J. Chem. Theory Comput. · 2026",
        summary: "Trajectories on 14 coupled triplet surfaces showed that electronic transitions reduce rates for large upward jumps in vibrational energy. Including those transitions slowed the predicted relaxation during heating.",
        doi: "https://doi.org/10.1021/acs.jctc.5c02041",
      },
      {
        title: "Photoinduced isomerization of a silicon cage",
        source: "J. Chem. Theory Comput. · 2026",
        summary: "Surface-hopping trajectories for cubic hydrogen silsesquioxane showed rapid internal conversion and traced isomerization through Si–H bond cleavage and O–H bond formation.",
        doi: "https://doi.org/10.1021/acs.jctc.5c01696",
      },
      {
        title: "Radiative activation in dilute gases",
        source: "Astrophys. J. · 2025",
        summary: "Master-equation calculations tested when infrared absorption overtakes collisions as a source of activation, including examples from a circumstellar envelope and Titan’s atmosphere.",
        doi: "https://doi.org/10.3847/1538-4357/adb1df",
      },
    ],
  },
];
