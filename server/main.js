import { Meteor } from 'meteor/meteor';

var Fiber   = require('fibers');
var options = {
		priority: "high",
		timeToLive: 30 * 0.1
	};
var _admin  = require("firebase-admin");
var _CA 	= require("path/CA.json");
	_admin.initializeApp({
	  credential: _admin.credential.cert(_CA),
	});



const KateAuthROT13 = "XngrPregvsvpngvba";

// MQTT To GreenPet
	var mqtt 	= require('mqtt');
	var options = {
		port:"1919",
		username:"jnadtechmqtt",
		password:"s123",
	};
	var lclient = mqtt.connect('mqtt://jnadtechmqtt.com',options);
	// lclient.on('connect', function () {
	//    	  lclient.subscribe('presence')
	//    	  lclient.publish('presence', 'Hello mqtt')
	// });
	// lclient.on('message', function (topic, message) {
	//    	  console.log(message.toString())
	//       // client.end()
	// });
	
// 登入 To App and Web
	function loginWithweb(email,passwd){
	  let laccount = Mongo_userInfo.findOne({'email': email});
	  let luser    = laccount.email;
	  let lpaswd   = laccount.passwd
	  if (String(luser) === String(email) && String(lpaswd) === String(passwd) && String(passwd) != String(null)) {
	    return "ok"
	  }
	  return "err";
	}

	Router.route('/loginusertogreenpet/:_id', { where: 'server' })
	.get(function () {
		this.response.setHeader('access-control-allow-origin', '*');
		let lkateJsn = { status : 0 , title : 'Error', body : 'Error' };
		let lid 	 = this.params._id;
		
		try{
			if(lid==KateAuth){
				let llogin  = loginWithweb();
				if(llogin=="ok"){
					var _Query  = this.request.query;
					lJsn.title  = _Query.userid;
					lJsn.body   = _Query.userpwd;
					lJsn.status = 1;
				}
			}
		}catch(ex){}

		this.response.setHeader('Content-Type', 'application/html');
		this.response.end(JSON.stringify(lJsn));
		// this.response.end("OK");
	});

// 註冊 	To App and Web
	function creatUserFuc(userEmail, userName, userPaswd, userBirday, userSex, userPhone, phoneVerifi) {
        Accounts.createUser({
            email:userEmail,
            password:userPaswd,
            profile:{
                createDate: new Date()
            }
        });
        let lemail   = Meteor.users.findOne({ "emails.0.address": userEmail });
        let luserPic = "https://mskflorist.com/PhoneIcon/1109/user.png";
        let lobj 	 = {
	            userid:lemail._id,email:userEmail,
	            name:userName,passwd:userPaswd,
	            serBirday:userBirday,userSex:userSex,
	            userPhone:userPhone,phoneVerifi:phoneVerifi,
	            userPic:luserPic
	        }
        creatUserInfoFuc(lobj);
    }
    function creatUserInfoFuc(info) {
        let lobj = {
            "userid":info.userid,"passwd":info.passwd,"device":"",
            "token":"","zip":"","name":info.name,"birthday":info.serBirday,"sex":info.userSex,
            "pic":info.userPic,"address":"","emails":{"address":info.email,"verified":false,},
            "phones":{"number":info.userPhone,"verified":info.phoneVerifi},
            "web":{"QA":[],"transaction":[]},"petlist":[],"notifi":[],
            "petdiary":[],"blog":[],"pointfb":[{"point":{"date":""}},{"point":{"date":""}}],
            "pointblog":[{"date":""},{"date":""}],"pointcart":[{"date":""},{"date":""}]
        }
        Mongo_userInfo_GP.insert(lobj);
    }

	Router.route('/createusertogreenpet/:_id', { where: 'server' })
	.get(function () {
		this.response.setHeader('access-control-allow-origin', '*');
		let lkateJsn = { status : 0 , title : 'Error', body : 'Error' };
		let lid 	 = this.params._id;
		
		try{
			if(lid==KateAuth){
				var _Query  = this.request.query;
				lJsn.title  = _Query.userid;
				lJsn.body   = _Query.userpwd;
				lJsn.status = 1;
			}
		}catch(ex){}

		this.response.setHeader('Content-Type', 'application/html');
		this.response.end(JSON.stringify(lJsn));
		// this.response.end("OK");
	});

// 忘記密碼 To App and Web
	function changePawdFuc(_id, newPaswd) {
	  Accounts.setPassword(luserid, luserpwd);
	  Mongo_userInfo.update({ "userid": _userid }, {
	    $set: {
	      "passwd": newPaswd
	    }
	  })
	};
	
	// 收到信件後並且修正密碼
		Router.route('/ReSetPwd/:_id', { where: 'server' })
		.get(function () {
			this.response.setHeader('access-control-allow-origin', '*');
			let lkateJsn = { status : 0 , title : 'Error', body : 'Error' };
			let lid 	 = this.params._id;
			
			try{
				if(lid==KateAuth){
					var _Query  = this.request.query;
					lJsn.title  = _Query.userid;
					lJsn.body   = _Query.userpwd;
					lJsn.status = 1;
					// changePawdFuc(_id, newPaswd);
				}
			}catch(ex){}

			this.response.setHeader('Content-Type', 'application/html');
			this.response.end(JSON.stringify(lJsn));
			// this.response.end("OK");
		});

	// 按下按鈕後送出信件
		Router.route('/sendtorepwdemail/:_id', { where: 'server' })
		.get(function () {
			this.response.setHeader('access-control-allow-origin', '*');
			// XngrPregvsvpngvba
			// var _Query = this.request.query;
			let lid = this.params._id;

			let luserid = Mongo_userInfo.findOne({ 'email': email });
		  	_userid = _userid.userid;

			this.response.setHeader('Content-Type', 'application/html');
			this.response.end('OK');
		});

// 推播資訊
	var payload = {
	  notification: {
	    title: '', body: '',
	    badge: "0", color: "#AAAAAA",
	    icon: "default", sound: "default"
	  }
	};

	Router.route('/notifi/', { where: 'server' })
	.get(function () {
		this.response.setHeader('access-control-allow-origin', '*');

		var _Query = this.request.query;
		
		payload.notification.title = _Query.title;
		payload.notification.body  = _Query.body;
		let _token = _Query.token;
		_admin.messaging().sendToDevice(_token, payload, options);

		this.response.setHeader('Content-Type', 'application/html');
		this.response.end('OK');
	});