// classify 账户分类
export default {
    classifyMap: [
        { n: '真人账户', classify: 1 },
        { n: '棋牌账户', classify: 2 },
        { n: '老虎机账户', classify: 3 }, // 老虎电游
        { n: '体育', classify: 4 },
        { n: '电竞', classify: 5 },
        { n: '捕鱼', classify: 6 },
        { n: '其他', classify: 0 }
    ],
    list: [
        // { id: 0, n: '主账户', key: 'availableBalance', classify: [] },
        { id: 1, key: 'specialBalance', n: '特殊账户', classify: [0] },
        { id: 2, key: 'bgmoney', n: 'BG账户', classify: [1, 3, 6] },
        { id: 3, key: 'tcgmoney', n: 'IBC账户', classify: [] },
        { id: 7, key: 'kymoney', n: '开元账户', classify: [2] },
        { id: 5, key: 'ptmoney', n: 'PT账户', classify: [1, 3, 6] },
        { id: 4, key: 'agmoney', n: 'AG账户', classify: [1, 3, 6] },
        { id: 9, key: 'sbmoney', n: '沙巴账户', classify: [4] },
        { id: 15, key: 'lymoney', n: '乐游账户', classify: [2] },
        { id: 17, key: 'uwinmoney', n: 'U赢账户', classify: [] },
        { id: 18, key: 'kgmoney', n: 'KG账户', classify: [0] },
        { id: 25, key: 'litAmount', n: '微游账户', classify: [] },
        { id: 19, key: 'pbAmount', n: '平博账户', classify: [4] },
        { id: 21, key: 'lgAmount', n: 'LG账户', classify: [3] },
        { id: 22, key: 'xyqpAmount', n: '幸运账户', classify: [2] },
        { id: 26, key: 'gdAmount', n: 'GD账户', classify: [1] },
        { id: 27, key: 'vgAmount', n: '财神账户', classify: [2] },
        { id: 28, key: 'dsAmount', n: '德胜账户', classify: [2] },
        { id: 29, key: 'jjbAmount', n: '小艾账户', classify: [5] },
        { id: 31, key: 'saAmount', n: 'SA真人账户', classify: [1, 6] },
        { id: 32, key: 'saEgameAmount', n: 'SA电游账户', classify: [3] },
        { id: 34, key: 'dfAmount', n: 'OG账户', classify: [1] },
        { id: 44, key: 'hlAmount', n: '欢乐账户', classify: [2] },
        // { id: '', key: '', n: '东森账户', classify: [5] },
        { id: '', key: '', n: '优惠券', classify: [0] }
    ]
}
