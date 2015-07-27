# FlattenCurve
Used to flatten a curve into a polyline

###Parameters###
In order to use **FlattenCurve.js**, all what you need to pass as parameters are:
- Projected coordinates of the first point -_(x,y)_-. Float.
- Projected coordinates of the second point -_(x,y)_-. Float.
- Direction of the Arc -_("Clockwise" or "Counterclockwise")_-. Text.
- Arc Magnitude -_in radians_-. Float.
- Radius -_Same system than the coordinates_-. Float.
- Tolerance -_Same system than the coordinates, for example, 0.01_-. Float.

###Use###
```
var myVar01 = new Flatten(pts[pts.length-1].x, pts[pts.length-1].y, X, Y, $('#clockwise').val(), arcRadians, radius, 0.01);
var mySomething = myVar01.flattenArc();
var pointsUsed = mySomething.length;
for (var i=0; i<pointsUsed-1;i++) {
    console.log(mySomething[i].x + "; " + mySomething[i].y);
    var inPoint = new esri.geometry.Point([mySomething[i].x,mySomething[i].y] , map.spatialReference);
    addPolygon(inPoint,false,"circleSymbol");
}
```
