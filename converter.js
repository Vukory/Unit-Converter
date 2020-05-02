"use strict";

/** Converter utility to convert data using specified datasets. */
class Converter {

    constructor(name, data) {
        this.name = name;
        this.data = data;
    }

    onChange(event) {
            console.log(event);
            const sourceUnit = event.target.getAttribute('id');
            const sourceValue = event.target.value;
            this.data.forEach((value, key) => {

                if (key === sourceUnit) {
                    return;
                }

                const result = this.convert(sourceUnit, key, sourceValue);
                document.getElementById(key).value = result;

            });
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
        let unitElement = document.createElement('div');

        this.data.forEach((value, key) => {
            let lableElement = document.createElement('label');
            lableElement.setAttribute('for', key);
            lableElement.innerText = key;
            unitElement.appendChild(lableElement);

            let inputElement = document.createElement('input');
            inputElement.setAttribute('id', key);
            inputElement.setAttribute('type', 'number');
            inputElement.addEventListener('change', (event) => this.onChange(event));
            inputElement.addEventListener('keyup', (event) => this.onChange(event));
            unitElement.appendChild(inputElement);
        });

        return unitElement;
    }
}

function onButtonPress(converter) {
    let titleElement = document.getElementById('header');
    titleElement.innerHTML = converter.name;

    let interfaceElement = document.getElementById('units');
    interfaceElement.innerHTML = '';

    const unitElement = converter.generateForm();
    interfaceElement.appendChild(unitElement);
}

const converters = [
    new Converter('Length', new Map([
        ['Millimeter', 1],
        ['Centimeter', 10],
        ['Meter', 1000],
        ['Kilometer', 1000000],
        ['Inch', 25.3999999999],
        ['Feet', 304.7999999987],
    ])),
    new Converter('Weight', new Map([
        ['Gram', 1],
        ['Kilogram', 1000],
        ['Pound', 453.5923699936],
        ['Stone', 6350.2931799101]
    ])),
    new Converter('Area', new Map([
        ['Square Millimeter', 1],
        ['Square Centimeter', 100],
        ['Square Inch', 645.1599999874],
        ['Square Feet', 92903.0399981823],
        ['Acre', 4046856422.320823],
    ])),
    new Converter('Volume', new Map([
        ['Cubic Millimeter', 1],
        ['Cubic Meter', 1000000000],
        ['Cubic Dekameter', 1000000000000],
        ['Cubic Inch', 16387.064],
        ['Cubic Foot', 28316846.5917],
        ['Cubic Yard', 764554857.9752],
    ]))
];

document.addEventListener("DOMContentLoaded", () => {
    let menu = document.getElementById('menu');

    converters.forEach((converter) => {
        let menuElement = document.createElement('button');
        menuElement.setAttribute('type', 'button');
        menuElement.innerText = converter.name;
        menuElement.addEventListener('click', () => onButtonPress(converter));
        menu.appendChild(menuElement);
    });
});