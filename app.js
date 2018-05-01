import getWinResultForTTT from './getWinResultForTTT'
let player = 'x';
let matrix = [
    ['x', 'e', 'x'],
    ['x', 'o', 'e'],
    ['e', 'e', 'x']
];
console.info(getWinResultForTTT({ player, matrix }));