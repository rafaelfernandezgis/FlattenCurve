# FlattenCurve
Used to flatten a curve into a polyline

###Parameters###
In order to use **FlattenArc.js**, all what you need to pass as parameters are:
- Projected coordinates of the first point -_(x,y)_-. Float.
- Projected coordinates of the second point -_(x,y)_-. Float.
- Direction of the Arc -_("Clockwise" or "Counterclockwise")_-. Text.
- Arc Magnitude -_in radians_-. Float.
- Radius -_Same system than the coordinates_-. Float.
- Tolerance -_Same system than the coordinates, for example, 0.01_-. Float.

###Use###
```
var myVar01 = new Flatten(X1, Y2, X2, Y2, "Clockwise", "11.081", "17", 0.01); //Constructor
var mySomething = myVar01.flattenArc(); //Function for flattening the arc
var pointsUsed = mySomething.length; //#points used for that arc with your tolerance
for (var i=0; i<pointsUsed-1;i++) {
    console.log("Coordinates of the point number " + i + " are: " + mySomething[i].x + "; " + mySomething[i].y);
}
```
If you are using a *projected coordinate reference system*, any calculation is already done in the flattenArc function, getting points belonging to the curve on that specific arc.
