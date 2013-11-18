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

var win3 = Ti.UI.createWindow({
	backgroundColor: 'white',
	backgroundImage: '/wall.png'
});


var view1 = Ti.UI.createView();

var step ;

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
	height: 70,
	top : 180,
	width: 250,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_BEZEL
});

var pwd = Ti.UI.createTextField({
	hintText: 'Password',
	borderColor:'657738',
	height: 70,
	top : 270,
	width: 250
});

var button1 = Ti.UI.createButton({
	title: 'Login',
	top: 350,
	width: 250,
	height: 70
});

button1.addEventListener('click',function(e){
Cloud.Users.login({
    login: usname.value,
    password: pwd.value,
}, function (e) {
    if (e.success) {
        var user = e.users[0];
        alert('Login Successfully!');
        if (step = '0')  {
        	win2.open();
        } 
        else {
        	win3.open();
        }
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

var time = new Date();

button2.addEventListener('click',function(e){
Cloud.Objects.create({
    classname: 'Checkin',
    fields: {
        ID: 'user1',
        CaseID: CaseID.value,
        time: time
    }
}, function (e) {
    if (e.success) {
        alert("Checked In Sucessfully");
        step = '1';
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
        CaseID: CaseID.value,
        time: ''
    }
}, function (e) {
    if (e.success) {
			alert('Checkout sucessfully You just made a difference in a Kids Life');
			step = '0';
			win2.open();
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
});

view1.add(button1);

view1.add(usname);

view1.add(pwd);

view2.add(button2);

view2.add(button4);

view3.add(button3);

//view1.add(rem);

view2.add(CaseID);

win1.add(view1);

win2.add(view2);

win3.add(view3);



win1.open();

