const expect = require('chai').expect;
const getWinResultForTTT = require('../getWinResultForTTT');
describe('expect',()=>{
    it("根据任意井字棋盘输入获取可能的获胜结果集",()=>{
        let player = 'x';
        let matrix = [
            ['x','e','x'],
            ['e','o','e'],
            ['e','e','x']
            ];
        expect(getWinResultForTTT({player,matrix})).to.deep.include.members([[0,1],[1,2]]);
    });
});

describe('expect',()=>{
    it("根据任意井字棋盘输入获取可能的获胜结果集(4X4)",()=>{
        let player = 'x';
        let matrix = [
            ['x','e','x','x'],
            ['e','e','e','o'],
            ['e','e','x','o'],
            ['e','e','x','x']
            ];
        expect(getWinResultForTTT({player,matrix})).to.deep.include.members([[0,1],[1,1],[1,2]]);
    });
});