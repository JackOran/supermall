import {request} from "./request";

export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid,
    }
  })
}

//请求详情页推荐数据
export function getRecommendData() {
  return request({
    url: '/recommend'
  })
}

//详情页商品信息
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.lowNowPrice = itemInfo.lowNowPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.desc = itemInfo.desc;

    this.columns = columns;
    this.services = services;
  }
}

//详情页店家信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.goodsCount = shopInfo.cGoods;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
  }
}

//详情页商品参数
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}


