'use strict';

let expect = require('chai').expect;
let calculator = require('../../lib/katas/pizza-delivery-checkout-calculator');

describe('Pizza Delivery Checkout Calculator', function () {
    let testDate;

    beforeEach(() => {
        testDate = new Date(2016, 10, 9, 20, 0, 0); // 8:00pm Weds 9th Nov 2016 
    });

    describe('Basic checkout calculations', () => {
        it('It should handle an empty basket as expected', () => {
            let results = calculator({
                items: [],
                deliveryMethod: 'collection',
                date: testDate
            });

            expect(results.basketTotal).to.equal(0);
            expect(results.discount).to.be.null;
            expect(results.totalPayable).to.equal(0);
        });

        it('It should handle a small order as expected', () => {
            let results = calculator({
                items: [
                    side({ name: 'Garlic bread', price: 3.99 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(3.99);
            expect(results.discount).to.be.null;
            expect(results.totalPayable).to.equal(3.99);
        });

        it('It should handle an order with multiple items as expected', () => {
            let results = calculator({
                items: [
                    side({ name: 'Garlic bread', price: 3.99 }),
                    side({ name: 'Potato wedges', price: 3.49 })
                ],
                deliveryMethod: 'collection',
                date: testDate
            });

            expect(results.basketTotal).to.equal(7.48);
            expect(results.discount).to.be.null;
            expect(results.totalPayable).to.equal(7.48);
        });

        it('It should handle an order with multiple quantity as expected', () => {
            let results = calculator({
                items: [
                    side({ name: 'Garlic bread', price: 3.99, quantity: 2 }),
                    side({ name: 'Potato wedges', price: 3.49, quantity: 3 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(18.45);
            expect(results.discount).to.be.null;
            expect(results.totalPayable).to.equal(18.45);
        });
    });

    describe('30% discount', () => {
        it('Basket total below £25 - discount not applied', () => {
            let results = calculator({
                items: [
                    side({ name: 'Garlic bread', price: 24.99 })
                ],
                deliveryMethod: 'collection',
                date: testDate
            });

            expect(results.basketTotal).to.equal(24.99);
            expect(results.discount).to.be.null;
            expect(results.totalPayable).to.equal(24.99);
        });

        it('Basket total is £25 - discount applied', () => {
            let results = calculator({
                items: [
                    side({ name: 'Garlic bread', price: 25.00 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(25);
            expect(results.discount.name).to.equal('30% Discount');
            expect(results.discount.amount).to.equal(7.50);
            expect(results.totalPayable).to.equal(17.50);
        });

        it('Should round to nearest penny', () => {
            let results = calculator({
                items: [
                    side({ name: 'Garlic bread', price: 27.99 })
                ],
                deliveryMethod: 'collection',
                date: testDate
            });

            expect(results.basketTotal).to.equal(27.99);
            expect(results.discount.name).to.equal('30% Discount');
            expect(results.discount.amount).to.equal(8.40);
            expect(results.totalPayable).to.equal(19.59);
        });
    });

    describe('Venetian Deal 1', () => {
        it('Basic scenario where discount is applied - Same large pizza', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(39.97);
            expect(results.discount.name).to.equal('Venetian Deal 1');
            expect(results.discount.amount).to.equal(17.98);
            expect(results.totalPayable).to.equal(21.99);
        });

        it('Basic scenario where discount is applied - Different large pizza', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'large', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(38.97);
            expect(results.discount.name).to.equal('Venetian Deal 1');
            expect(results.discount.amount).to.equal(16.98);
            expect(results.totalPayable).to.equal(21.99);
        });

        it('Should be applied multiple times to same order', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 2 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'large', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(77.94);
            expect(results.discount.name).to.equal('Venetian Deal 1');
            expect(results.discount.amount).to.equal(33.96);
            expect(results.totalPayable).to.equal(43.98);
        });

        it('No bottle of drink - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(38.97);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 1');
        });

        it('2 pizzas of different sizes - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'medium', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(37.97);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 1');
        });

        it('2 pizzas of same size but not large - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 15.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'medium', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(34.97);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 1');
        });

        it('Extra bottles of drink should not be discounted and least expensive bottle should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 }),
                    drink({ name: 'Cheapo Cola', price: 0.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(40.96);
            expect(results.discount.name).to.equal('Venetian Deal 1');
            expect(results.discount.amount).to.equal(16.98);
            expect(results.totalPayable).to.equal(23.98);
        });

        it('Extra pizzas should not be discounted and least expensive pizzas should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 1.99, size: 'large', quantity: 2 }),
                    pizza({ name: 'Just The Pizza Base Please', price: 0.99, size: 'large', quantity: 1 }),
                    drink({ name: 'Golden Cola', price: 19.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(24.96);
            expect(results.discount.name).to.equal('Venetian Deal 1');
            expect(results.discount.amount).to.equal(0.98);
            expect(results.totalPayable).to.equal(23.98);
        });
    });

    describe('Venetian Deal 2', () => {
        it('Basic scenario where discount is applied - Same medium pizza', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(39.96);
            expect(results.discount.name).to.equal('Venetian Deal 2');
            expect(results.discount.amount).to.equal(20.97);
            expect(results.totalPayable).to.equal(18.99);
        });

        it('Basic scenario where discount is applied - Different medium pizza', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'medium', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(38.96);
            expect(results.discount.name).to.equal('Venetian Deal 2');
            expect(results.discount.amount).to.equal(19.97);
            expect(results.totalPayable).to.equal(18.99);
        });

        it('Should be applied multiple times to same order', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 2 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'medium', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 4 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(77.92);
            expect(results.discount.name).to.equal('Venetian Deal 2');
            expect(results.discount.amount).to.equal(39.94);
            expect(results.totalPayable).to.equal(37.98);
        });

        it('No can of drink - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(39.97);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 2');
        });

        it('2 pizzas of different sizes - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'medium', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(37.96);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 2');
        });

        it('2 pizzas of same size but not medium - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 17.99, size: 'large', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(38.96);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 2');
        });

        it('Extra cans of drink should not be discounted and least expensive can should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'can', quantity: 2 }),
                    drink({ name: 'Cheapo Cola', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(42.95);
            expect(results.discount.name).to.equal('Venetian Deal 2');
            expect(results.discount.amount).to.equal(21.97);
            expect(results.totalPayable).to.equal(20.98);
        });

        it('Extra pizzas should not be discounted and least expensive pizzas should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 2.99, size: 'medium', quantity: 2 }),
                    pizza({ name: 'Just The Pizza Base Please', price: 0.99, size: 'medium', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 7.99, size: 'can', quantity: 2 }),
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(22.95);
            expect(results.discount.name).to.equal('Venetian Deal 2');
            expect(results.discount.amount).to.equal(0.97);
            expect(results.totalPayable).to.equal(21.98);
        });
    });

    describe('Venetian Deal 3', () => {
        it('Basic scenario where discount is applied - Same small pizza', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(39.96);
            expect(results.discount.name).to.equal('Venetian Deal 3');
            expect(results.discount.amount).to.equal(22.97);
            expect(results.totalPayable).to.equal(16.99);
        });

        it('Basic scenario where discount is applied - Different small pizza', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'small', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(38.96);
            expect(results.discount.name).to.equal('Venetian Deal 3');
            expect(results.discount.amount).to.equal(21.97);
            expect(results.totalPayable).to.equal(16.99);
        });

        it('Should be applied multiple times to same order', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 2 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'small', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 4 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(77.92);
            expect(results.discount.name).to.equal('Venetian Deal 3');
            expect(results.discount.amount).to.equal(43.94);
            expect(results.totalPayable).to.equal(33.98);
        });

        it('No can of drink - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(39.97);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 3');
        });

        it('2 pizzas of different sizes - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'small', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(37.96);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 3');
        });

        it('2 pizzas of same size but not small - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 17.99, size: 'large', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 2 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(38.96);
            expect(results.discount && results.discount.name).to.not.equal('Venetian Deal 3');
        });

        it('Extra cans of drink should not be discounted and least expensive can should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 2 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'can', quantity: 2 }),
                    drink({ name: 'Cheapo Cola', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(42.95);
            expect(results.discount.name).to.equal('Venetian Deal 3');
            expect(results.discount.amount).to.equal(23.97);
            expect(results.totalPayable).to.equal(18.98);
        });

        it('Extra pizzas should not be discounted and least expensive pizzas should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 2.99, size: 'small', quantity: 2 }),
                    pizza({ name: 'Just The Pizza Base Please', price: 0.99, size: 'small', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 7.99, size: 'can', quantity: 2 }),
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(22.95);
            expect(results.discount.name).to.equal('Venetian Deal 3');
            expect(results.discount.amount).to.equal(2.97);
            expect(results.totalPayable).to.equal(19.98);
        });
    });

    describe('Family Deal 1', () => {
        it('Basic scenario where discount is applied - Same large pizza - Bottle of drink', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(27.97);
            expect(results.totalPayable).to.equal(30.99);
        });

        it('Basic scenario where discount is applied - Different large pizzas - Bottle of drink', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'large', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(29.97);
            expect(results.totalPayable).to.equal(30.99);
        });

        it('Basic scenario where discount is applied - Same large pizza - Garlic bread', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 3 }),
                    side({ name: 'Garlic bread', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(27.97);
            expect(results.totalPayable).to.equal(30.99);
        });

        it('Basic scenario where discount is applied - Different large pizzas - Garlic bread', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'large', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(29.97);
            expect(results.totalPayable).to.equal(30.99);
        });

        it('Basic scenario where discount is applied - Same large pizza - Cheesy chips', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 3 }),
                    side({ name: 'Cheesy chips', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(27.97);
            expect(results.totalPayable).to.equal(30.99);
        });

        it('Basic scenario where discount is applied - Different large pizzas - Cheesy chips', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'large', quantity: 1 }),
                    side({ name: 'Cheesy chips', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(29.97);
            expect(results.totalPayable).to.equal(30.99);
        });

        it('Should be applied multiple times to same order', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 3 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'large', quantity: 3 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'large', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 }),
                    side({ name: 'Cheesy chips', price: 3.49, quantity: 1 }),
                    side({ name: 'Garlic bread', price: 4.19, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(186.58);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(93.61);
            expect(results.totalPayable).to.equal(92.97);
        });

        it('Can of drink as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 1');
        });

        it('Potato wedges as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 3 }),
                    side({ name: 'Potato wedges', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 1');
        });

        it('Spicy wings as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 3 }),
                    side({ name: 'Spicy wings', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 1');
        });

        it('3 pizzas of different sizes - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 14.99, size: 'small', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(52.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 1');
        });

        it('3 pizzas of same size but not large - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 15.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 15.99, size: 'medium', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(50.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 1');
        });

        it('Extra sides/bottles should not be discounted and least expensive items should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(59.95);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(26.97);
            expect(results.totalPayable).to.equal(32.98);
        });

        it('Extra pizzas should not be discounted and least expensive pizzas should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'large', quantity: 3 }),
                    pizza({ name: 'Just The Pizza Base Please', price: 10.99, size: 'large', quantity: 1 }),
                    drink({ name: 'Golden Cola', price: 15.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(65.95);
            expect(results.discount.name).to.equal('Family Deal 1');
            expect(results.discount.amount).to.equal(21.97);
            expect(results.totalPayable).to.equal(43.98);
        });
    });

    describe('Family Deal 2', () => {
        it('Basic scenario where discount is applied - Same medium pizza - Bottle of drink', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(32.97);
            expect(results.totalPayable).to.equal(25.99);
        });

        it('Basic scenario where discount is applied - Different medium pizzas - Bottle of drink', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'medium', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(34.97);
            expect(results.totalPayable).to.equal(25.99);
        });

        it('Basic scenario where discount is applied - Same medium pizza - Garlic bread', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 3 }),
                    side({ name: 'Garlic bread', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(32.97);
            expect(results.totalPayable).to.equal(25.99);
        });

        it('Basic scenario where discount is applied - Different medium pizzas - Garlic bread', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'medium', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(34.97);
            expect(results.totalPayable).to.equal(25.99);
        });

        it('Basic scenario where discount is applied - Same medium pizza - Cheesy chips', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 3 }),
                    side({ name: 'Cheesy chips', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(32.97);
            expect(results.totalPayable).to.equal(25.99);
        });

        it('Basic scenario where discount is applied - Different medium pizzas - Cheesy chips', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'medium', quantity: 1 }),
                    side({ name: 'Cheesy chips', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(34.97);
            expect(results.totalPayable).to.equal(25.99);
        });

        it('Should be applied multiple times to same order', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 3 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'medium', quantity: 3 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'medium', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 }),
                    side({ name: 'Cheesy chips', price: 3.49, quantity: 1 }),
                    side({ name: 'Garlic bread', price: 4.19, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(186.58);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(108.61);
            expect(results.totalPayable).to.equal(77.97);
        });

        it('Can of drink as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 2');
        });

        it('Potato wedges as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 3 }),
                    side({ name: 'Potato wedges', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 2');
        });

        it('Spicy wings as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 3 }),
                    side({ name: 'Spicy wings', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 2');
        });

        it('3 pizzas of different sizes - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 14.99, size: 'small', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(52.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 2');
        });

        it('3 pizzas of same size but not medium - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 15.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 15.99, size: 'large', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(50.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 2');
        });

        it('Extra sides/bottles should not be discounted and least expensive items should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'medium', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(59.95);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(31.97);
            expect(results.totalPayable).to.equal(27.98);
        });

        it('Extra pizzas should not be discounted and least expensive pizzas should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'medium', quantity: 3 }),
                    pizza({ name: 'Just The Pizza Base Please', price: 10.99, size: 'medium', quantity: 1 }),
                    drink({ name: 'Golden Cola', price: 15.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(65.95);
            expect(results.discount.name).to.equal('Family Deal 2');
            expect(results.discount.amount).to.equal(26.97);
            expect(results.totalPayable).to.equal(38.98);
        });
    });

    describe('Family Deal 3', () => {
        it('Basic scenario where discount is applied - Same small pizza - Bottle of drink', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(36.97);
            expect(results.totalPayable).to.equal(21.99);
        });

        it('Basic scenario where discount is applied - Different small pizzas - Bottle of drink', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'small', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'small', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(38.97);
            expect(results.totalPayable).to.equal(21.99);
        });

        it('Basic scenario where discount is applied - Same small pizza - Garlic bread', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 3 }),
                    side({ name: 'Garlic bread', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(36.97);
            expect(results.totalPayable).to.equal(21.99);
        });

        it('Basic scenario where discount is applied - Different small pizzas - Garlic bread', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'small', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(38.97);
            expect(results.totalPayable).to.equal(21.99);
        });

        it('Basic scenario where discount is applied - Same small pizza - Cheesy chips', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 3 }),
                    side({ name: 'Cheesy chips', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(58.96);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(36.97);
            expect(results.totalPayable).to.equal(21.99);
        });

        it('Basic scenario where discount is applied - Different small pizzas - Cheesy chips', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'small', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'small', quantity: 1 }),
                    side({ name: 'Cheesy chips', price: 1.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(60.96);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(38.97);
            expect(results.totalPayable).to.equal(21.99);
        });

        it('Should be applied multiple times to same order', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 3 }),
                    pizza({ name: 'Rustic Rocket and Relish', price: 17.99, size: 'small', quantity: 3 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 21.99, size: 'small', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 }),
                    side({ name: 'Cheesy chips', price: 3.49, quantity: 1 }),
                    side({ name: 'Garlic bread', price: 4.19, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(186.58);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(120.61);
            expect(results.totalPayable).to.equal(65.97);
        });

        it('Can of drink as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 3');
        });

        it('Potato wedges as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 3 }),
                    side({ name: 'Potato wedges', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 3');
        });

        it('Spicy wings as extra - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 3 }),
                    side({ name: 'Spicy wings', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(57.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 3');
        });

        it('3 pizzas of different sizes - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'medium', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 14.99, size: 'small', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(52.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 3');
        });

        it('3 pizzas of same size but not small - Should not apply this discount', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 15.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Rustic Rocket And Relish', price: 16.99, size: 'large', quantity: 1 }),
                    pizza({ name: 'Special Spicy Spinoff', price: 15.99, size: 'large', quantity: 1 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(50.96);
            expect(results.discount && results.discount.name).to.not.equal('Family Deal 3');
        });

        it('Extra sides/bottles should not be discounted and least expensive items should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 18.99, size: 'small', quantity: 3 }),
                    drink({ name: 'Dr Spice Cola', price: 1.99, size: 'bottle', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 0.99, quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(59.95);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(35.97);
            expect(results.totalPayable).to.equal(23.98);
        });

        it('Extra pizzas should not be discounted and least expensive pizzas should be discounted', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 3 }),
                    pizza({ name: 'Just The Pizza Base Please', price: 10.99, size: 'small', quantity: 1 }),
                    drink({ name: 'Golden Cola', price: 15.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: testDate
            });

            expect(results.basketTotal).to.equal(65.95);
            expect(results.discount.name).to.equal('Family Deal 3');
            expect(results.discount.amount).to.equal(30.97);
            expect(results.totalPayable).to.equal(34.98);
        });
    });

    describe('Lunchtime Offer 1', () => {
        it('Basic scenario where discount is applied - Monday - Morning boundary', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 7, 11, 30, 0) // Monday 7th November 11:30am
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.equal('Lunchtime Offer 1');
            expect(results.discount.amount).to.equal(5.48);
            expect(results.totalPayable).to.equal(11.99);
        });
        
        it('Basic scenario where discount is applied - Tuesday - Mid day', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 8, 12, 30, 0) // Tuesday 8th November 12:30pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.equal('Lunchtime Offer 1');
            expect(results.discount.amount).to.equal(5.48);
            expect(results.totalPayable).to.equal(11.99);
        });
        
        it('Basic scenario where discount is applied - Wednesday - Mid day', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 9, 12, 30, 0) // Wednesday 9th November 1:30pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.equal('Lunchtime Offer 1');
            expect(results.discount.amount).to.equal(5.48);
            expect(results.totalPayable).to.equal(11.99);
        });
        
        it('Basic scenario where discount is applied - Thursday - Afternoon boundary', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 3, 16, 30, 59) // Thursday 3rd November 4:30:59pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.equal('Lunchtime Offer 1');
            expect(results.discount.amount).to.equal(5.48);
            expect(results.totalPayable).to.equal(11.99);
        });
        
        it('Basic scenario where discount is not applied - Thursday - Afternoon boundary', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 3, 16, 31, 0) // Thursday 3rd November 4:31:00pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.not.equal('Lunchtime Offer 1');
        });
        
        it('Basic scenario where discount is not applied - Monday - Morning boundary', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 7, 1, 11, 29, 59) // Monday 1st August 11:29:59am
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.not.equal('Lunchtime Offer 1');
        });
        
        it('Basic scenario where discount is not applied - Friday - Lunchtime', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 4, 12, 30, 0) // Friday 4th November 12:30pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.not.equal('Lunchtime Offer 1');
        });
        
        it('Basic scenario where discount is not applied - Saturday - Lunchtime', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 5, 13, 30, 0) // Saturday 5th November 1:30pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.not.equal('Lunchtime Offer 1');
        });
        
        it('Basic scenario where discount is not applied - Sunday - Lunchtime', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 6, 14, 30, 0) // Sunday 6th November 2:30pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.not.equal('Lunchtime Offer 1');
        });

        it('Basic scenario where discount is not applied - Tuesday - Lunchtime - Medium pizza instead of small', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'medium', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 8, 12, 30, 0) // Tuesday 8th November 12:30pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.not.equal('Lunchtime Offer 1');
        });

        it('Basic scenario where discount is not applied - Monday - Lunchtime - Cheesy chips instead of Garlic bread', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Cheesy chips', price: 3.49, quantity: 1 }),
                    drink({ name: 'Orange Twist', price: 0.99, size: 'can', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 7, 13, 0, 0) // Monday 7th November 1:00pm
            });

            expect(results.basketTotal).to.equal(17.47);
            expect(results.discount.name).to.not.equal('Lunchtime Offer 1');
        });

        it('Basic scenario where discount is not applied - Monday - Lunchtime - Bottle of drink instead of can', () => {
            let results = calculator({
                items: [
                    pizza({ name: 'Pepperoni Pizzazz', price: 12.99, size: 'small', quantity: 1 }),
                    side({ name: 'Garlic bread', price: 3.49, quantity: 1 }),
                    drink({ name: 'Fuzzy Fizz', price: 1.99, size: 'bottle', quantity: 1 })
                ],
                deliveryMethod: 'delivery',
                date: new Date(2016, 10, 9, 13, 30, 0) // Wednesday 9th November 1:30pm
            });

            expect(results.basketTotal).to.equal(18.47);
            expect(results.discount.name).to.not.equal('Lunchtime Offer 1');
        });

        // Extra items not counted - cheapest in deal
        // Multiple applications of discount
    });
});

function pizza(params) {
    return {
        name: params.name,
        price: params.price,
        quantity: params.quantity || 1,
        type: 'pizza',
        subType: params.size
    };
}

function side(params) {
    return {
        name: params.name,
        price: params.price,
        quantity: params.quantity || 1,
        type: 'side',
        subType: null
    };
}

function drink(params) {
    return {
        name: params.name,
        price: params.price,
        quantity: params.quantity || 1,
        type: 'drink',
        subType: params.size
    };
}