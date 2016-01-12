# Karate Chop Exercise

This exercise has been taken from [Dave Thomas's Code Kata blog](http://codekata.com/kata/kata02-karate-chop/);

A binary chop (sometimes called binary search) finds the position of a value in a sorted array of values.
It achieves some efficiency by halving the number of items under consideration each time it probes the values.
In the first pass it determines whether the required value is in the top or the bottom half of the list of values.
In the second pass in considers only this half, again dividing it in to two.
It continues like this, eventually stopping when it finds the value it is looking for, or when it runs out of array to search.
If it finds the value, it returns the zero based index of it. If it doesn't find the value, it returns -1.
You are not allowed to use the array's indexOf method.

You are expected to produce binary search solutions as follows:
- A solution using a while loop
- A solution using recursion