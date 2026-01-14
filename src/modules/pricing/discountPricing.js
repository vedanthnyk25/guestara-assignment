export default function resolveDiscountPricing(config) {

  const {basePrice, discountType, discountValue}= config;
  if(typeof basePrice !== 'number' || basePrice < 0) {
    throw new Error('Invalid basePrice in DISCOUNT pricing configuration');
  }

  let finalPrice= basePrice;

  if(discountType=== 'PERCENT'){
    finalPrice= basePrice- (basePrice * (discountValue / 100));
  }

  if(discountType=== 'FLAT'){
    finalPrice= basePrice- discountValue;
  }

  finalPrice= Math.max(0, finalPrice);

  return {
    available: true,
    basePrice: finalPrice,
    pricingType: 'DISCOUNT'
  };
};
