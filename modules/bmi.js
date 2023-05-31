//reference: https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html
module.exports = {
    getIndex : function getIndex(weight, height) {
        if(typeof(weight) === 'number' && typeof(height) === 'number') {
            return weight / (height * height);
        }
    },

    getCategory : function getCategory(index) {
        if (index < 18.5) {
            return 'Underweight';
        } else if (index < 25.0) {
            return 'Healthy Weight';
        } else if (index < 30.0) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    }
};