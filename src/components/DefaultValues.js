const dropDownProps = {
    shopDropDown: {
        id: 'shop',
        label: '店家',
        helperText: '請選擇飲料店',
        items: [{name: ''}, {name: '清心楠梓店'}, {name: '杯樂創新店'}, {name: '50嵐高科店'}]
    },
    discountDropDown: {
        id: 'discount',
        label: '優惠',
        helperText: '請選擇適用之優惠',
        items: [{name: ''},{name: '滿10杯免運費', totalCount: 10}, {name: '滿15杯打8折', totalCount: 15}, {name: '買5杯打95折', totalCount: 5}]
    },
    drinkDropDown: {
        id: 'drink',
        label: '飲料',
        helperText: '請選擇欲訂購之飲料',
        items: [{name: ''},{name: '珍珠奶茶'}, {name: '多多綠茶'}, {name: '黃金烏龍綠'}, {name: '古早味紅茶'}, {name: '茉莉綠茶'}]
    },
    iceDropDown: {
        id: 'ice',
        label: '冰量',
        helperText: '請選擇冰量',
        items: [{name: ''},{name: '正常冰'}, {name: '少冰'}, {name: '微冰'}, {name: '常溫'}, {name: '熱'}]
    },
    sweetDropDown: {
        id: 'sweet',
        label: '甜度',
        helperText: '請選擇甜度',
        items: [{name: ''},{name: '正常甜'}, {name: '少糖'}, {name: '半糖'}, {name: '微糖'}, {name: '無糖'}]
    }
}

const inputBoxText = {
    name: {
        id: 'userName input',
        label: '姓名',
        helperText: '含有無效字元'
    },
    address: {
        id: 'userAddress input',
        label: '送達地址',
        helperText: '含有無效字元'
    }
}

const signInputBoxText = {
    email: {
        id: 'SignEmail input',
        label: '您的電子郵件信箱',
        helperText: '含有無效字元或非有效信箱'
    },
    password: {
        id: 'signPassword input',
        label: '您的密碼',
        helperText: '密碼不符合要求或含有無效字元'
    },
    name: {
        id: 'SignName input',
        label: '請輸入您的暱稱',
        helperText: '含有無效字元'
    }
}

const defaultOrder = {
    orderId: '',
    timestamp: '',
    address: '',
    shop: '',
    discount: '',
    totalCount: '',
    remainedCount: ''
}

const defaultDrink = {
    drinkId: '',
    drink: '',
    count: 1,
    ice: '',
    sweet: '',
    totalDrinks: [],
}

const defaultAuth = {
    uid: '',
    emailVerified: false,
    displayName: ''
}

export { dropDownProps, inputBoxText, signInputBoxText, defaultOrder, defaultDrink, defaultAuth }