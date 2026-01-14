export default function resolveStaticPricing(config) {

  if(!config.price || typeof config.price !== 'number') {
    throw new Error('Invalid pricing configuration for STATIC pricing type');
  }

  return {
    available: true,
    base_price: config.price,
    pricing_type: 'STATIC'
  }
}
