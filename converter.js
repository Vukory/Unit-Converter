"use strict";

/** Converter utility to convert data using specified datasets. */
class Converter {

    formTemplate = `
        <label for="{0}">{0}</label>
        <input id="{0}" type="number" value="{1}"/>
    `;

    constructor(data) {
        this.data = data;
    }

    /**
     * @param source The source unit to convert from.
     * @param target the target unit to convert to.
     * @param value The value of source units to convert to target.
     */
    convert(source, target, value) {

        if (!this.data.has(source))
            throw 'Source unit doesn\'t exist.';

        if (!this.data.has(target))
            throw 'Target unit doesn\'t exist.';

        if (source === target)
            return value;

        const sourceValue = this.data.get(source);
        const sourceTotal = sourceValue * value;

        const targetValue = this.data.get(target);
        const targetTotal = sourceTotal / targetValue;

        return targetTotal;

    }

    /** 
     * Generate the convertion input fields based
     * on the dataset.
     */

    generateForm() {
        let result = '';

        this.data.forEach((value, key) => {
            result += this.formTemplate.replace(/\{0\}/g, key)
                .replace('{1}', value);
        });

        return result;
    }
}

function insertForm(converter) {
    let result = converter.generateForm(data);
    let interfaceElement = document.getElementById('conversionUnits');
    interfaceElement.innerHTML = result;
}

function onInput(event) {
    console.log(event);
}

const distance = new Converter(new Map([
    ['Milimeter', 1],
    ['Centimeter', 10],
    ['Meter', 1000],
    ['Kilometer', 1000000],
    ['Inch', 25.3999999999],
    ['Feet', 304.7999999987],
]));

const mass = new Converter(new Map([
    ['Gram', 1],
    ['Kilogram', 1000],
    ['Pound', 453.5923699936],
    ['Stone', 6350.2931799101]
]));

const surface = new Converter(new Map([
    ['Square Millimeter', 1],
    ['Square Centimeter', 100],
    ['Square Inch', 645.1599999874],
    ['Square Feet', 92903.0399981823],
    ['Acre', 4046856422.320823],
]));

const volume = new Converter(new Map([
    ['Cubic Millimeter', 1],
    ['Cubic Meter', 1000000000],
    ['Cubic Dekameter', 1000000000000],
    ['Cubic Inch', 16387.064],
    ['Cubic Foot', 28316846.5917],
    ['Cubic Yard', 764554857.9752],
]));