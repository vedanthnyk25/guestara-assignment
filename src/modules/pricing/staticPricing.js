export default function resolveStaticPricing(config) {

  if(!config.price || typeof config.price !== 'number') {
    throw new Error('Invalid pricing configuration for STATIC pricing type');
  }

  return {
    available: true,
    basePrice: config.price,
    pricingType: 'STATIC'
  }
}
