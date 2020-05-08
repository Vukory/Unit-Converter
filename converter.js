"use strict";

/** Converter utility to convert data using specified datasets. */
class Converter {

    constructor(name, data, icon) {
        this.name = name;
        this.data = data;
        this.icon = icon;
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

    let iconElement = document.getElementsById('icon');
    let image = document.createElement('img');
    image.src = converter.icon;
    iconElement.appendChild(image);

    const unitElement = converter.generateForm();
    interfaceElement.appendChild(unitElement);

}

const converters = [
    new Converter('Dužina', new Map([
        ['Milimetar (mm)', 1],
        ['Centimetar (cm)', 10],
        ['Metar (m)', 1000],
        ['Kilomatar (km)', 1000000],
        ['Inč (in)', 25.3999999999],
        ['Stope (ft)', 304.7999999987]
    ], "Assets/Images/meter.png")),

    new Converter('Masa', new Map([
        ['Gram (g)', 1],
        ['Kilogram (kg)', 1000],
        ['Funta (lb)', 453.5923699936],
        ['Kamen (st)', 6350.2931799101]
    ], "Assets/Images/meter.png")),

    new Converter('Površina', new Map([
        ['Kvadratni milimetar (mm²)', 1],
        ['Kvadratni centimetar (cm²)', 100],
        ['Kvadratni inč (in²)', 645.1599999874],
        ['Kvadratna stopa (ft²)', 92903.0399981823],
        ['Aker (acre)', 4046856422.320823]
    ], "Assets/Images/meter.png")),

    new Converter('Zapremina', new Map([
        ['Kubni milimetar (mm³)', 1],
        ['Kubni metar (m³)', 1000000000],
        ['Kubni decimetar (dm³)', 1000000000000],
        ['Kubni inč (in³)', 16387.064],
        ['Kubna stopa (ft³)', 28316846.5917],
        ['Kubni jard (yd³)', 764554857.9752]
    ], "Assets/Images/meter.png"))
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