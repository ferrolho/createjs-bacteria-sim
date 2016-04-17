# Bacteria Simulator

A bacteria simulator using CreateJS.

## Entities

- Substances
- Bacteria

### Substances

Substances can be either **edible** or **poisonous**.

There is a total of 5 different substances:

- A (yellow circles)
- B (green triangles)
- C (red squares)
- D (pink pentagons)
- E (blue hexagons)

A random substance type is spawned at a regular rate.

### Bacteria

Each bacterium has a unique **ID**, its own **DNA**, and **health** bar. The DNA has a length of **5 bits**.

Each bit of the DNA tells if the bacterium is a consumer of a certain substance or not.  

Examples:

- A bacterium with DNA `10000` only consumes substance A (and ignores every other substance).
- A bacterium with DNA `11011` consumes every substance, *except* substance C.

When two bacteria collide, and both are healthy (life > 70%), an offspring spawns. The DNA of the offspring is a random **crossover** of the parents DNA. Each bit of the resulting DNA has a 2% probability of **mutating**.

## Interacting with the simulator

The simulator has a right side bar where the user can control if a certain substance is *edible* or *poisonous*.

The user can *click/tap* anywhere on the simulation canvas to spawn a bacterium with a **random** DNA.

## Fun observations and tests

Start a new simulation and add about 20 bacteria.

Since every substance is edible, the bacteria will reproduce into a prosperous population.

Every time the population increases too much, there will be resources scarcity and some of the bacteria will die due to starvation.

Genetic mutations upon reproduction will lead to a long term evolution and adaptation to the surrounding environment. As a consequence, after a few minutes you should start to notice that the bacteria have evolved and the DNA of the new offsprings will almost always be `11111`.

A fun test to carry out at this stage is to simulate a drastic change in the environment: a **plague** for example.

In order to do that, just *uncheck* one of the checkboxes on the right side bar. This will turn one of the substances from **edible** to **poisonous**. For the sake of this explanation, I will assume you unchecked substance **A** (the yellow circles).

As a result, you will see a lot of bacteria die, because they consume that substance, which has now turned poisonous.

The most probable outcome at this stage is **mass extinction**. The only thing that can save your population of bacteria is the remote chance of occuring a **mutation** of the correct bit upon reproduction of the dying bacteria.

In the remote chance of your population being lucky and one or two offspring spawn with DNA `01111`, it might survive! These new offspring are elite and completely adapted to the new environment. They will survive easily and will be responsible of generating more offspring. Your colony of bacteria will thrive once again - and if you notice their DNA, all of them should have evolved to `01111`.
