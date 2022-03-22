const ExternalAPI = require('../websocket.ts')

exports.trade = (req:any, res:any) =>{
  const entryValue = Number(req.body.value);

  if (!isNaN(entryValue)){
    const ExchangeRate = ExternalAPI();
    ExchangeRate.then((response:any) => { 
      res.status(200).json({
      status:'sucess',
      results: {
        date: req.requestTime,
        exchangeSymbol: 'GBPUSD',
        exchangeRate:response.mid,
        value: (entryValue * response.mid),
      }
    })})

  }
  else{
    res.status(400).json({
      status: 'fail',
      message: 'request body needs a valid value property'
    })
  }

  

}