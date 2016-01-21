#Prototypes

##Car
Export a prototype called Car with the following functionality:
- When a new Car is created, it should have a speed of 100.
- The car prototype should have an accelerate method that increases the speed by 10.
- The car prototype should have a getSpeed method that returns the current speed.
- Car should have a static getTypeOf method that prints out the type of the given car
(you can use object.constructor.name as you are working in Node JS which uses the V8 engine,
but be aware that this does not work in all JavaScript engines)

##Sports Car
Export a prototype called SportsCar as follows:
- It should extend the Car prototype
- Whenever accelerate is called, it should also multiply the speed by 1.1.
    - Note: It should first call the Car prototype's accelerate method and then multiply the speed by 1.1.
- It should have a turbo method that doubles the speed