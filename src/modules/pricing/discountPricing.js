export default function resolveDiscountPricing(config) {

  const {base_price, discount_type, discount_value}= config;
  if(typeof base_price !== 'number' || base_price < 0) {
    throw new Error('Invalid basePrice in DISCOUNT pricing configuration');
  }

  let finalPrice= base_price;

  if(discount_type=== 'PERCENT'){
    finalPrice= base_price- (base_price * (discount_value / 100));
  }

  if(discount_type=== 'FLAT'){
    finalPrice= base_price- discount_value;
  }

  finalPrice= Math.max(0, finalPrice);

  return {
    available: true,
    base_price: finalPrice,
    pricing_type: 'DISCOUNT'
  };
};
