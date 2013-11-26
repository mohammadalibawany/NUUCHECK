var win1 = Ti.UI.createWindow({
	backgroundColor: 'white',
	navBarHidden:true,
	backgroundImage: '/wall.png'
});

var win4 = Ti.UI.createWindow({
	
	backgroundColor: 'white',
	navBarHidden:true,
	fullscreen: false,
	backgroundImage: '/wall.png'
});

var win3 = Ti.UI.createWindow({
	backgroundColor: 'white',
	navBarHidden:true,
	fullscreen: false,
	backgroundImage: '/wall.png'
});

var win2 = Ti.UI.createWindow({
	backgroundColor: 'white',
	navBarHidden:true,
	fullscreen: false,
	backgroundImage: '/wall.png'
});

var Cloud = require('ti.cloud');
Cloud.debug = true;

var view1 = Ti.UI.createView();

var view2 = Ti.UI.createView();

var view3 = Ti.UI.createView();

var view4 = Ti.UI.createView();

var logo = Ti.UI.createImageView({
	image:'/logo.png',
	top : 480
});

/////

////

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
	width: 125,
	backgroundImage:'/r1.png',
	height: 60
});



var toast = Ti.UI.createNotification({
    message:"Logged In",
    duration: Ti.UI.NOTIFICATION_DURATION_SHORT
});

var toasty = Ti.UI.createNotification({
    message:"Checked In",
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
});

//////////////

button1.addEventListener('click',function(e){
Cloud.Users.login({
    login: usname.value,
    password: pwd.value,
}, function (e) {
    if (e.success) {
        var user = e.users[0];
        toast.show();
        win2.open({
    activityEnterAnimation: Ti.Android.R.anim.fade_in,
    activityExitAnimation: Ti.Android.R.anim.fade_out
});
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
});

var button2 = Ti.UI.createButton({
	title: 'Check In',
	top: 180,
	backgroundImage:'/r1.png',
	width: 150,
	height :60
});

var button4 = Ti.UI.createButton({
	title: 'Go to \n Checkout',
	top: 480,
	backgroundImage:'/r1.png',
	width: 100,
	height :50
});

var button3 = Ti.UI.createButton({
	title: 'Check Out',
	top: 150,
	backgroundImage:'/r1.png',
	width: 150,
	height :60
});

var button5 = Ti.UI.createButton({
	title: 'Check Out',
	top: 150,
	backgroundImage:'/r1.png',
	width: 150,
	height :60
});


var CaseID = Ti.UI.createTextField({
	hintText: 'Enter Case ID',
	backgroundImage:'/r.png',
	height: 70,
	top : 70,
	width: 250
	
});

var CaseID2 = Ti.UI.createTextField({
	hintText: 'Enter Case ID',
	backgroundImage:'/r.png',
	height: 70,
	top : 50,
	width: 250
	
});

var time = new Date();

var csid;

button2.addEventListener('click',function(e){
Cloud.Objects.create({
    classname: 'Checkin',
    fields: {
        ID: 'user1',
        CaseID: CaseID.value,
        time: time,
        coordinates: [longitude, latitude]
    }
}, function (e) {
    if (e.success) {
        toasty.show();
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
        CaseID: csid,
        time: time,
        coordinates: [longitude, latitude]
    }
}, function (e) {
    if (e.success) {
    	    win2.open();
    	    win3.close();
    	    csid='';
			alert('Checkout sucessfully You just made a difference in a Kids Life');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
});


button5.addEventListener('click',function(e){
Cloud.Objects.create({
    classname: 'Checkout',
    fields: {
        ID: 'user1',
        CaseID: CaseID2.value,
        time: time,
        coordinates: [longitude, latitude]
    }
}, function (e) {
    if (e.success) {
    	    win4.close();
			alert('Checkout sucessfully You just made a difference in a Kids Life');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
});

var scrollableView = Ti.UI.createScrollableView({
  views:[view1],
  showPagingControl:true
});

usname.addEventListener("focus", function() { scrollableView.scrollTo(0, 100); });
usname.addEventListener("blur", function() { scrollableView.scrollTo(0, 0); });
pwd.addEventListener("focus", function() { scrollableView.scrollTo(0, 100); });
pwd.addEventListener("blur", function() { scrollableView.scrollTo(0, 0); });

win1.add(scrollableView);


///////////////////////////////////////////////////////////

view1.add(button1);

view1.add(usname);

view1.add(pwd);

view2.add(button2);

view2.add(button4);

view3.add(button3);

view4.add(button5);

view4.add(CaseID2);

view2.add(CaseID);

//win1.add(view1);

win2.add(view2);

win3.add(view3);

win4.add(view4);

////

win1.open();








