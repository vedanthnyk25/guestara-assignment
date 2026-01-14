function toMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

export default function resolveDynamicPricing(config, atTime) {

  if(!Array.isArray(config.windows)){
    throw new Error('Invalid pricing configuration for DYNAMIC pricing type');
  };

  const now= atTime?toMinutes(atTime): (()=> {
    const d= new Date();
    return d.getHours()*60 + d.getMinutes();
  })();

  for(const window of config.windows){
    const start= toMinutes(window.start);
    const end= toMinutes(window.end);

    if(now>=start && now<end){
      return {
        available: true,
        base_price: window.price,
        pricing_type: 'DYNAMIC'
      }
    }
  };

  return {
    available: false,
    basePrice: null,
    pricingType: 'DYNAMIC'
  };
}
