export default function resolveDiscountPricing(config) {

  const {base_price, discountType, discountValue}= config;
  if(typeof base_price !== 'number' || base_price < 0) {
    throw new Error('Invalid basePrice in DISCOUNT pricing configuration');
  }

  let finalPrice= base_price;

  if(discountType=== 'PERCENT'){
    finalPrice= base_price- (base_price * (discountValue / 100));
  }

  if(discountType=== 'FLAT'){
    finalPrice= base_price- discountValue;
  }

  finalPrice= Math.max(0, finalPrice);

  return {
    available: true,
    base_price: finalPrice,
    pricing_type: 'DISCOUNT'
  };
};
