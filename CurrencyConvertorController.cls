public with sharing class CurrencyConvertorController {
    @AuraEnabled
    public static double convertAmount(String sourceCurrency,String targetCurrency,String amount){
        // try {

            
        // } catch (Exception e) {
        //     throw new AuraHandledException(e.getMessage());
        // }
        //Map<key,value> 
        //header- <key,value>

        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        Http http = new Http();
        String todayDate = String.valueOf(System.today());
        String apiKey = System.label.apiLayerA;
        req.setEndpoint(System.label.apiLayerEndpoint+sourceCurrency+'&to='+targetCurrency+'&amount='+amount+'&date='+todayDate);
        req.setMethod('GET');
        req.setHeader('apikey',apiKey);
        System.debug('-- request--'+req);
        res = http.send(req);
        System.debug('-- body--'+res.getBody());

        Map<String,Object> responsemap = (Map<String,Object>) JSON.deserializeUntyped(res.getBody());
        ConversionWrapper conCurrecyWrapObj = (ConversionWrapper)JSON.deserialize(res.getBody(),ConversionWrapper.class);
        System.debug('-- amount with wrapper--'+conCurrecyWrapObj);
        return (double) responsemap.get('result');

    }

    public Class ConversionWrapper{
        public Double result;

    }
    

    @AuraEnabled
    public static Decimal getAmountFromOpportunity(String recordId){
        Decimal amount = [SELECT Id,Amount FROM Opportunity WHERE Id=:recordId].Amount;
        // Opportunity opp = [SELECT Id,Amount FROM Opportunity WHERE Id=:recordId];
        // return opp.Amount;
        return amount;
    }
}