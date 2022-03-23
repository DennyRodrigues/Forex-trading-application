import getExchangeRate from "../helpers/getExchangeRate"

exports.trade = (req:any, res:any) =>{
  const entryValue = Number(req.body.value);

  if (!isNaN(entryValue)){
    const ExchangeRate = getExchangeRate();
    ExchangeRate.then((response: any) => { 
      res.status(200).json({
      status:'sucess',
      results: {
        date: req.requestTime,
        exchangeSymbol: 'GBPUSD',
        exchangeRate:response,
        value: (entryValue * response),
      }
    })})

  }
  else{
    res.status(400).json({
      status: "fail",
      message: "request body needs a valid value property",

    });
  }

  

}