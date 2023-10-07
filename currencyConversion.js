import { LightningElement,track,api } from 'lwc';
import convertAmount from '@salesforce/apex/CurrencyConvertorController.convertAmount';
import getAmountFromOpportunity from '@salesforce/apex/CurrencyConvertorController.getAmountFromOpportunity';
export default class CurrencyConversion extends LightningElement {
    sourceCurrency = 'USD';
    targetCurrency = 'INR';
    @track amount = '';
    @track convertedAmount;
    isLoading = false;
    @api recordId;

    connectedCallback(){
        console.log('--recordId--',this.recordId);
        if(this.recordId){
            this.fetchAmountFromOpp(this.recordId);
        }
       
    }

    fetchAmountFromOpp(recId){
        getAmountFromOpportunity({recordId:recId})
        .then(res=>{
            this.amount = res;
        })
        .catch(error=>{
            console.error('-- error--',error);
        })
    }

    get options(){
        return [
            { label: 'US Dollar', value: 'USD' },
            { label: 'Great Britian Pound', value: 'GBP' },
            { label: 'Indian Rupee', value: 'INR' },
            { label: 'Afghan', value: 'AFN' },
            { label: 'Australian', value: 'AUD' },
            { label: 'Bangladeshi', value: 'BDT' },
            { label: 'Chinese', value: 'CNY' },
            { label: 'Hong Kong', value: 'HKD' },
            { label: 'Indonesian', value: 'IDR' },
            { label: 'Japanese', value: 'JPY' },
            { label: 'Nepalese', value: 'NPR' },
            { label: 'New Zealand', value: 'NZD' },
            { label: 'Pakistani', value: 'PKR' },
            { label: 'Singapore', value: 'SGD' },
            { label: 'South Korean', value: 'KRW' },
            { label: 'Sri Lankan', value: 'LKR' },
            { label: 'New Taiwan', value: 'TWD' },
            { label: 'Vietnamese', value: 'VND' }
        ];
    }

    sourcehandleChange(event){
        this.sourceCurrency = event.detail.value;
        console.log('-- source --',this.sourceCurrency);
    }

    handleAmountChnage(event){
        this.amount = event.target.value;
        console.log('-- amount--',this.amount);
    }

    targethandleChange(event){
        this.targetCurrency = event.detail.value;
    }

    handleConvert(){
        this.isLoading = true;
        convertAmount({sourceCurrency: this.sourceCurrency,
                    targetCurrency: this.targetCurrency,
                    amount:this.amount
        }).then(result=>{
            this.convertedAmount = result;
             this.isLoading = false;
        })
        .catch(error=>{
            console.error('--- error occur when convert amount',error);
        })

    }

}