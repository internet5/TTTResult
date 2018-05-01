import { countBy } from 'lodash'
/***************************
*功能:根据任意井字棋盘输入获取可能的获胜结果集（支持棋盘尺寸扩展）
*时间:2018/4/30
*作者:xx
*参数:
 palyer:x|o
 matrix:方形矩阵，值仅能为x|o|e
****************************/
const getWinResultForTTT = ({ player, matrix }) => {
    //矩阵长度
    const num = matrix.length;
    //一条线内赢家棋子需要达到的数量
    const winLength = num - 1;
    //空位字符,玩家1，玩家2
    const emptyPlace = 'e',playerOne = 'x',playerTwo = 'o';

    //检查player输入参数格式是否正确
    if (player != playerOne && player != playerTwo)
        throw new Error('palyer输入错误，只能为o,x');

    //检查matrix输入是否正确
    for (let i = 0; i < matrix.length; i++) {
        //棋盘不为方形
        if (matrix[i] == null || matrix[i].length != num)
            throw Error('棋盘矩阵输入不为方形矩阵');
        for (let j = 0; j < matrix[i].length; j++) {
            //棋盘字符不等于e,o,x
            if (matrix[i][j] != emptyPlace && matrix[i][j] != playerOne && matrix[i][j] != playerTwo)
                throw Error('棋盘矩阵输入字符不为e,o,x');
        }
    }

    //获胜落子结果集
    const result = [];

    //横线，查找每条横线的获胜棋子
    for (let x = 0; x < num; x++) {
        let counts = countBy(matrix[x])
        checkWin(counts, player, winLength) && result.push([x, matrix[x].findIndex(item => item == emptyPlace)]);
    }
    //竖线，查找每条竖线的获胜棋子
    for (let y = 0; y < num; y++) {
        let verticalArr = matrix.map(item => item[y])
        let counts = countBy(verticalArr)
        checkWin(counts, player, winLength) && result.push([verticalArr.findIndex(item => item == emptyPlace), y]);
    }
    //正斜线，查找正斜线的获胜棋子
    let backslashArr = matrix.map((item, index) => item[index])
    let backslashCounts = countBy(backslashArr)
    let backslashIndex = backslashArr.findIndex(item => item == emptyPlace)
    checkWin(backslashCounts, player, winLength) && result.push([backslashIndex, backslashIndex]);

    //反斜线，查找反斜线的获胜棋子
    let slashArr = matrix.map((item, index) => item[winLength - index])
    let slashCounts = countBy(slashArr)
    let slashIndex = slashArr.findIndex(item => item == emptyPlace)
    checkWin(slashCounts, player, winLength) && result.push([slashIndex, winLength - slashIndex]);

    return result;
}
//检查一条线内是否可以一步为赢
//counts:各棋子数量
//player:玩家棋子
//winLength:赢棋玩家棋子数量
const checkWin = (counts, player, winLength) => {
    return counts.e == 1 && counts[player] == winLength
}

export default getWinResultForTTT;