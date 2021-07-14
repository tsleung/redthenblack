import {createPolicyConfidenceCurve} from "./demon-utils";
/**
 * Red then Black - Find my retirement algorithm
 * 
 * Collect after tax salary and amount saved, 
 * - create slider to move from spend to saved
 * - if no savings, default accumulated savings to one year of income 
 * Output spending immediately, that's the target which is needed for retirement
 * 
 * Create trajectories of a nest egg which can achieve the spend with 95% confidence
 * - produce samples and find where 95% confidence is, back out the nest egg amount
 * Create trajectories that can convert savings of salary into nest egg
 * - produce samples and find where 95% reach the nest egg, pick slowest time
 * 
 */

function prompter(message: string = "", val: string = "") {
    return window.prompt(message, val);
}

export function findMyRetirement(leverage = .75, yearsOfRetirement = 45) {
    /*
    const afterTaxSalary = Number(prompter("After Tax Salary", "50000"));
    const afterTaxSavings = Number(prompter(`How much do you save of ${afterTaxSalary}`,"0"));

    const afterTaxSpend = afterTaxSalary - afterTaxSavings;

    // if savings is 0, no accumulation, assume they already have savings then
    const initialInvestmentAccount = afterTaxSavings ?? afterTaxSalary;
*/
    // show the red then black retirement curve 
    // withdrawal + investment policy vs confidence

    return createPolicyConfidenceCurve(leverage, yearsOfRetirement);
    // we can hone in on 95% confidence
    // create 100(0) runs of stocks over 60 yr timebox for retirement to demo the curve


    // create 100(0) runs of stocks over 60 yr timebox + contribution based on nest egg


    // show insights, most retirements fail in the first N years, 
    // - working longer flexibly than minimum time can decrease nest egg requirement
}










