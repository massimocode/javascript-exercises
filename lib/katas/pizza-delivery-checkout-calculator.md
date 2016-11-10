# Pizza Delivery Checkout Calculator

## Introduction
The purpose of this exercise is to write the core logic of the checkout calculator of a pizza delivery website.
The calculator will, given a list of items and a range of available discounts, calculate the price that the customer has to pay
and let the customer how much discount was applied and which discount it was.

## Requirements
- The calculator will be given a Basket object. See the Data section for the specification of how that will look.
- The calculator can only apply 1 discount. Some discounts can be applied several times to the same order, and some can only be applied once.
- The calculator should choose the overall best discount.
- The calculator should choose the most profitable way of calculating each discount.
- The calculator should return a CheckoutTotals object detailing the order total and which discount was applied. See the Data section for the specification how that should look.
- It should be easy to add/remove discounts, change product prices and add/remove products without changing the core logic of the checkout
or affecting other existing discounts. This requirement is not specifically enforced using tests and you might meet this requirement
naturally as part of writing the calculator, but it's definitely a point you should think about once you have completed your solution.

## Data
### Basket
This is the object that is passed to the calculateBasket function. It has the following properties.
- items - an array of BasketItem
- deliveryMethod - a string with the value "collection" or "delivery"
- date - a Date object representing the current date

### BasketItem
This object represents a single item in the basket. It has the following properties:
- name - a string containing the name of the item
    - For sides it will be one of the following
        - Garlic bread
        - Cheesy chips
        - Spicy wings
        - Potato wedges
- price - the price of 1 of these items
- quantity - the number of these that the user wants to buy
- type - a string with one of the following values:
    - pizza
    - side
    - drink
- subType - a string with one of the following values:
    - For items with type pizza it will be one of the following:
        - small
        - medium
        - large
    - For items with type side it will be null
    - For items with type drink it will be one of the following:
        - can
        - bottle

### CheckoutTotals
This object represents the results of the calculations. It has the following properties:
- basketTotal - the total price of the items in the basket (before any discount)
- totalPayable - the total amount payable (i.e. discount applied)
- discount - a Discount object or null if no discount was applied

### Discount
- name - the name of the discount (from the table below)
- amount - the total amount of discount

## Discounts
Here is a list of the discounts that the system should know about:
|Discount name|Discount rules|
|---|---|
|30% Discount|30% off the basket total on orders over £25 (inclusive). Can only be applied once to an order.|
|Venetian Deal 1|Any 2 x large pizzas + 1 bottle of drink for £21.99.|
|Venetian Deal 2|Any 2 x medium pizzas + 2 cans of drink for £18.99.|
|Venetian Deal 3|Any 2 x small pizzas + 2 cans of drink for £16.99.|
|Family Deal 1|Any 3 x large pizzas and either cheesy chips or bottle of drink or garlic bread for £30.99.|
|Family Deal 2|Any 3 x medium pizzas and either cheesy chips or bottle of drink or garlic bread for £25.99.|
|Family Deal 3|Any 3 x small pizzas and either cheesy chips or bottle of drink or garlic bread for £21.99.|
|Lunchtime Offer 1|Any small pizza with garlic bread and a can of drink for £11.99. Only valid Monday to Thursday 11:30am to 4:30pm.|
|Lunchtime Offer 2|Any medium pizza with garlic bread and a can of drink for £12.99. Only valid Monday to Thursday 11:30am to 4:30pm.|
|Lunchtime Offer 3|Any large pizza with garlic bread and a can of drink for £13.99. Only valid Monday to Thursday 11:30am to 4:30pm.|
|2 Large Pizzas|Any 2 x large pizzas for £16.99. Only valid when collecting or for delivery with at least one side.|
|Special Meal Deal 1|Any 2 x medium pizzas with spicy wings, garlic bread and bottle of drink for £24.99.|
|Special Meal Deal 2|Any 2 x large pizzas with spicy wings, garlic bread and bottle of drink for £28.99.|