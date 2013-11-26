var win1 = Ti.UI.createWindow({
	backgroundColor: 'white',
	backgroundImage: '/wall.png'
});

var win4 = Ti.UI.createWindow({
	backgroundColor: 'white',
	backgroundImage: '/wall.png'
});

var win2 = Ti.UI.createWindow({
	backgroundColor: 'white',
	backgroundImage: '/wall.png'
});

var Cloud = require('ti.cloud');
Cloud.debug = true;
////
var rem = Titanium.UI.createSwitch({
	top:500,
    value:false
});







///////

var win3 = Ti.UI.createWindow({
	backgroundColor: 'white',
	backgroundImage: '/wall.png'
});


var view1 = Ti.UI.createView();

var view2 = Ti.UI.createView();

var view3 = Ti.UI.createView();

var view4 = Ti.UI.createView();

var logo = Ti.UI.createImageView({
	image:'/logo.png',
	top : 480
});

var usname = Ti.UI.createTextField({
	hintText: 'Username',
	borderColor:'657738',
	backgroundImage:'/r.png',
	height: 70,
	top : 180,
	width: 250,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL
});

var pwd = Ti.UI.createTextField({
	hintText: 'Password',
	borderColor:'657738',
	backgroundImage:'/r.png',
	height: 70,
	top : 270,
	width: 250
});

var button1 = Ti.UI.createButton({
	title: 'Login',
	top: 350,
	width: 250,
	backgroundImage:'/r.png',
	height: 70
});







rem.addEventListener('change', function(e) {
    if (e.value==true){
        Ti.App.Properties.setString('username',usname.value);
        Ti.App.Properties.setString('password',pwd.value);
        
    } else {
        Ti.App.Properties.setString('username','');
        Ti.App.Properties.setString('password','');
    }
});

var toast = Ti.UI.createNotification({
    message:"Logged In",
    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
});

var longitude;

var latitude;

Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HIGH;
Titanium.Geolocation.distanceFilter = 10;
Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (e.error)
    {
        alert('HFL cannot get your current location');
    }
    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
    alert('abs'+longitude+' '+latitude);
});

//////////////

button1.addEventListener('click',function(e){
Cloud.Users.login({
    login: usname.value,
    password: pwd.value,
}, function (e) {
    if (e.success) {
        var user = e.users[0];
        //Ti.App.Properties.setString("sessionid", Cloud.session_id);
        toast.show();
        win2.open();
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
});

var button2 = Ti.UI.createButton({
	title: 'Check In',
	top: 150,
	width: 150,
	height :60
});

var button4 = Ti.UI.createButton({
	title: 'Go to Checkout page',
	top: 450,
	width: 150,
	height :60
});

var button3 = Ti.UI.createButton({
	title: 'Check Out',
	top: 150,
	width: 150,
	height :60
});

var CaseID = Ti.UI.createTextField({
	hintText: 'Enter Case ID',
	height: 70,
	top : 50,
	width: 250
	
});

//var session = Ti.App.Properties.getString("sessionid");

//var time = new Date();

var csid;



button2.addEventListener('click',function(e){
Cloud.Objects.create({
    classname: 'Checkin',
    fields: {
        ID: 'user1',
        CaseID: CaseID.value,
        //date: time,
        coordinates: [longitude, latitude]
    }
}, function (e) {
    if (e.success) {
        alert("Checked In Sucessfully");
        csid = CaseID.value;
        win3.open();
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
});

button4.addEventListener('click',function(e){
	win4.open();
});

button3.addEventListener('click',function(e){
Cloud.Objects.create({
    classname: 'Checkout',
    fields: {
        ID: 'user1',
        //CaseID: csid,
        time: ''
    }
}, function (e) {
    if (e.success) {
    	    win2.open();
    	    //csid=''
			alert('Checkout sucessfully You just made a difference in a Kids Life');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
});

///DEBUG///
var buttond = Ti.UI.createButton({
	title: 'Login',
	top: 350,
	width: 250,
	height: 70
});

var userd = Ti.App.Properties.getString('username');
var pasd  = Ti.App.Properties.getString('password');

buttond.addEventListener('click',function(e){
	win2.open();
});
///////////////////////////////////////////////////////////

view1.add(button1);

view1.add(usname);

view1.add(pwd);

view3.add(buttond);

view2.add(button2);

view2.add(button4);

view3.add(button3);

view4.add(button3);

view4.add(CaseID);

view1.add(rem);

//view1.add(rem);

view2.add(CaseID);

win1.add(view1);

win2.add(view2);

win3.add(view3);

win4.add(view4);

////

win1.open();






