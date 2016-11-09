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