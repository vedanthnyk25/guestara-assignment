import resolveStaticPricing from './staticPricing.js';
import resolveDiscountPricing from './discountPricing.js';
import resolveDynamicPricing from './dynamicPricing.js';

export const resolvePricing= (item, atTime)=> {

  switch(item.pricing_type) {
  
    case 'STATIC':
      return resolveStaticPricing(item.pricing_config);
    
      case 'DISCOUNT':
      return resolveDiscountPricing(item.pricing_config, atTime);
    
      case 'DYNAMIC':
      return resolveDynamicPricing(item.pricing_config, atTime);
    
      default:
      throw new Error(`Unknown pricing type: ${item.pricing_type}`);
  }
}
