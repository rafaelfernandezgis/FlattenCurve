//Constructor
var Flatten = function (x1, y1, x2, y2, clockwise, arc_rad, radius, maxSagitta) {
    if ($.isNumeric(x1) == false || $.isNumeric(y1) == false || $.isNumeric(x2) == false
        || $.isNumeric(y2) == false || $.isNumeric(arc_rad) == false || $.isNumeric(radius) == false || $.isNumeric(maxSagitta) == false) {
        console.log("Some arguments are not numeric. Please, review your coordinates, arc_rad, radius or sagitta");
            return;
    }
    if (clockwise != "Clockwise" && clockwise != "Counterclockwise") {
        console.log("clockwise only can takes two values: Clockwise or Counterclockwise");
        return;
    }
    //Some properties
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    //setting the clockwise
    if (clockwise == "Clockwise") this.clockwise = 1;
    else this.clockwise = -1;

    this.radius = parseFloat(radius);
    this.maxSagitta = parseFloat(maxSagitta);
    //Angles
    //Setting the ARC in degrees, so transforming from radians to degrees
    this.alpha = arc_rad * 180 / (Math.PI * this.radius);
    this.omega = (180 - this.alpha) / 2;
    //Getting the bearing, according the position of the points
    this.bearing = this.getBearing().trim();
    this.beta = this.getBeta(this.bearing);
    this.delta = this.getDelta();

    //Getting the center of the Arc, according the position of the points and clockwise too
    this.c = this.getCenter();
};

Flatten.prototype.getCenter = function() {
    var c = [];
    switch (this.bearing)
    {
        case "NE":
            if (this.clockwise == -1){
                var z = parseFloat(this.delta) * Math.PI / 180;
                if (this.omega > this.beta) {
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if (this.omega < this.beta) {
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if (this.omega == this.beta) {
                    var z = 0;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
            }
            else {
                if ((this.beta + this.omega) < 90) {
                    var z = parseFloat(this.delta) * Math.PI / 180;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if ((this.beta + this.omega) > 90) {
                    var z = (180 - parseFloat(this.delta)) * Math.PI / 180;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
                if ((this.beta + this.omega) == 90) {
                    var z = 90 * Math.PI / 180;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
            }
            break;
        case "NW":
            if (this.clockwise == -1){
                if ((this.beta + this.omega) < 90) {
                    var z = parseFloat(this.delta) * Math.PI / 180;
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if ((this.beta + this.omega) > 90) {
                    var z = (180 - parseFloat(this.delta)) * Math.PI / 180;
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
                if ((this.beta + this.omega) == 90) {
                    var z = 90 * Math.PI / 180;
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
            }
            else {
                var z = parseFloat(this.delta) * Math.PI / 180;
                if (this.omega > this.beta) {
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if (this.omega < this.beta) {
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if (this.omega == this.beta) {
                    var z = 0;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
            }
            break;
        case "SE":
            if (this.clockwise == -1){
                if (this.delta < 90) {
                    var z = parseFloat(this.delta) * Math.PI / 180;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if (this.delta < 90) {
                    var z = (180 - parseFloat(this.delta)) * Math.PI / 180;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
                if (this.delta == 90) {
                    var z = Math.PI / 2;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
            }
            else {
                if (this.delta > 90) {
                    var z = (180 - parseFloat(this.delta)) * Math.PI / 180;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
                if (this.delta == 180) {
                    var z = Math.PI;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if (this.delta > 180) {
                    var z = (parseFloat(this.delta) - 180) * Math.PI / 180;
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
            }
            break;
        case "SW":
            if (this.clockwise == -1){
                if (this.delta > 180) {
                    var z = (parseFloat(this.delta) - 180) * Math.PI / 180;
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
                if (this.delta < 180) {
                    var z = (180 - parseFloat(this.delta)) * Math.PI / 180;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
                if (this.delta == 180) {
                    var z = Math.PI;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
            }
            else {
                if (this.delta > 270) {
                    var z = (360 - parseFloat(this.delta)) * Math.PI / 180;
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
                if (this.delta < 270) {
                    var z = (parseFloat(this.delta) - 180) * Math.PI / 180;
                    c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
                }
                if (this.delta == 270) {
                    var z = parseFloat(this.delta) * Math.PI / 180;
                    c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
                }
            }
            break;
        case "N":
            if (this.clockwise == -1){
                var z = (360 - parseFloat(this.delta)) * Math.PI / 180;
                c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
            }
            else {
                var z = parseFloat(this.delta) * Math.PI / 180;
                c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
            }
            break;
        case "S":
            if (this.clockwise == -1){
                var z = (180 - parseFloat(this.delta)) * Math.PI / 180;
                c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
            }
            else {
                var z = (parseFloat(this.delta) - 180) * Math.PI / 180;
                c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
            }
            break;
        case "E":
            if (this.clockwise == -1){
                var z = parseFloat(this.delta) * Math.PI / 180;
                c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
            }
            else {
                var z = (parseFloat(this.delta) - 90) * Math.PI / 180;
                c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
            }
            break;
        case "W":
            if (this.clockwise == -1){
                var z = (parseFloat(this.delta) - 180) * Math.PI / 180;
                c.push({a:this.x1 - (this.radius * Math.sin(z)), b:this.y1 - (this.radius * Math.cos(z))});
            }
            else {
                var z = (360 - parseFloat(this.delta)) * Math.PI / 180;
                c.push({a:this.x1 + (this.radius * Math.sin(z)), b:this.y1 + (this.radius * Math.cos(z))});
            }
            break;
    }
    return c;
};

Flatten.prototype.getDelta = function() {
    switch (this.bearing)
    {
        case "NE":
            if (this.clockwise == -1) {
                if (this.beta > this.omega) return (this.beta - this.omega);
                if (this.beta < this.omega) return (this.omega - this.beta);
                if (this.beta == this.omega) return 0;
            }
            else return (this.omega + this.beta);
            break;
        case "NW":
            if (this.clockwise == -1) return (this.omega + this.beta);
            else {
                if (this.beta > this.omega) return (this.beta - this.omega);
                if (this.beta < this.omega) return (this.omega - this.beta);
                if (this.beta == this.omega) return 0;
            }
            break;
        case "SE":
            if (this.clockwise == -1) return (this.beta - this.omega);
            else return (this.beta + this.omega);
            break;
        case "SW":
            if (this.clockwise == -1) return (this.beta - this.omega);
            else return (this.beta + this.omega);
            break;
        case "N":
            if (this.clockwise == -1) return (360 - this.omega);
            else return this.omega;
            break;
        case "S":
            if (this.clockwise == -1) return (180 - this.omega);
            else return (180 + this.omega);
            break;
        case "E":
            if (this.clockwise == -1) return (90 - this.omega);
            else return (90 + this.omega);
            break;
        case "W":
            if (this.clockwise == -1) return (270 - this.omega);
            else return (270 + this.omega);
            break;
    }
};

Flatten.prototype.getBeta = function(myBearing) {
    switch (myBearing)
    {
        case "NE":
            return Math.atan((this.x2 - this.x1) / (this.y2 - this.y1)) * 180 / Math.PI;
            break;
        case "NW":
            return Math.atan((this.x1 - this.x2) / (this.y2 - this.y1)) * 180 / Math.PI;
            break;
        case "SE":
            return 180 - (Math.atan((this.x2 - this.x1) / (this.y1 - this.y2)) * 180 / Math.PI);
            break;
        case "SW":
            return 180 - (Math.atan((this.x1 - this.x2) / (this.y1 - this.y2)) * 180 / Math.PI);
            break;
        case "N":
            return 0;
            break;
        case "S":
            return 180;
            break;
        case "E":
            return 90;
            break;
        case "W":
            return 270;
            break;
    }
};

Flatten.prototype.getBearing = function() {
    if (this.y2 > this.y1 && this.x2 > this.x1) return "NE";
    if (this.y2 > this.y1 && this.x2 < this.x1) return "NW";
    if (this.y2 < this.y1 && this.x2 > this.x1) return "SE";
    if (this.y2 < this.y1 && this.x2 < this.x1) return "SW";
    if (this.y2 > this.y1 && this.x2 == this.x1) return "N";
    if (this.y2 < this.y1 && this.x2 == this.x1) return "S";
    if (this.y2 == this.y1 && this.x2 > this.x1) return "E";
    if (this.y2 == this.y1 && this.x2 < this.x1) return "W";
};

Flatten.prototype.flattenArc = function() {
    var myArray = [];
    //Calculus minimun angle according maximun sagitta. So it is myMinimumAngle
    var i = 1;
    var myMinimumAngle = (this.alpha / (Math.pow(2,i)));
    do {
        myMinimumAngle = (this.alpha / (Math.pow(2,i)));
        var myAngle = (90 - parseFloat(myMinimumAngle/2)) * Math.PI / 180;
        var sagitta = parseFloat(this.radius - (this.radius * Math.sin(myAngle)));
        i++;
    } while (sagitta > this.maxSagitta);

    //Get Orientations
    var oriStartPoint = this.getOrientation(this.x1,this.y1,this.c[0].a,this.c[0].b);
    var oriEndPoint = this.getOrientation(this.x2,this.y2,this.c[0].a,this.c[0].b);

    if (oriStartPoint < oriEndPoint) {
        var tetha = oriEndPoint - oriStartPoint;
        if((tetha - this.alpha) > 0.5) var steering = -1;
        else var steering = 1;
    }
    if (oriStartPoint > oriEndPoint) {
        var tetha = oriStartPoint - oriEndPoint;
        if((tetha - this.alpha) > 0.5) var steering = 1;
        else var steering = -1;
    }

    //Calculus coordinates for each point on the arc. Starting to draw
    var j = 1;
    do {
        var myOriInEachPoint = oriStartPoint + (myMinimumAngle * j * steering);
        j++;
        var z2 = parseFloat(myOriInEachPoint) * Math.PI / 180;
        myArray.push({x:this.c[0].a + (this.radius * Math.sin(z2)), y:this.c[0].b + (this.radius * Math.cos(z2))});
    } while ((this.alpha - (myMinimumAngle * j)) > 0);
    myArray.push({x:this.x2, y:this.y2});

    return myArray;
};

Flatten.prototype.getOrientation = function(X2,Y2,X1,Y1) {
    if (Y2 > Y1 && X2 > X1) return Math.atan((X2 - X1) / (Y2 - Y1)) * 180 / Math.PI;
    if (Y2 > Y1 && X2 < X1) return (270 + (Math.atan((Y2 - Y1) / (X1 - X2)) * 180 / Math.PI));
    if (Y2 < Y1 && X2 > X1) return (180 - (Math.atan((X2 - X1) / (Y1 - Y2)) * 180 / Math.PI));
    if (Y2 < Y1 && X2 < X1) return (180 + (Math.atan((X1 - X2) / (Y1 - Y2)) * 180 / Math.PI));
    if (Y2 > Y1 && X2 == X1) return 0;
    if (Y2 < Y1 && X2 == X1) return 180;
    if (Y2 == Y1 && X2 > X1) return 90;
    if (Y2 == Y1 && X2 < X1) return 270;
};