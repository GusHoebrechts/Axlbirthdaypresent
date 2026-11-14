import { minecraftBuildIdeas } from './idealist.js';

export function getRandomMinecraftBuildIdea() {
    dayofmonth = new Date().getDate();
    let seed = dayofmonth * 2654435761; // Knuth's multiplicative hash
    seed = (seed ^ (seed >>> 16)) >>> 0;

    return minecraftBuildIdeas[seed%minecraftBuildIdeas.length];
}