(this["webpackJsonpdaily-challenge"]=this["webpackJsonpdaily-challenge"]||[]).push([[0],{40:function(e,t,a){e.exports=a(81)},45:function(e,t,a){},46:function(e,t,a){},47:function(e,t,a){},72:function(e,t){},79:function(e,t,a){},80:function(e,t,a){},81:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(36),r=a.n(l),s=(a(45),a(11)),i=a(12),c=a(6),d=a(14),m=a(13),u=a(18),h=a(5),g=(a(46),a(47),a(20)),p=a.n(g);a(57);p.a.initializeApp({apiKey:"AIzaSyAYSAWMfJdxW46ZTes2IRwN3kMP5WKoTy8",authDomain:"daily-challenge-73242.firebaseapp.com",databaseURL:"https://daily-challenge-73242.firebaseio.com",projectId:"daily-challenge-73242",storageBucket:"daily-challenge-73242.appspot.com",messagingSenderId:"1047266952950"});var y=p.a.auth(),f=p.a.firestore(),b=p.a,v=a(37),w=a.n(v),E=["Drink a beer or two","Sit silently","Do a good deed","Be kind","High five","Sneak into the opposite gender restroom","Do a silly dance","Go outside","Go out tonight"],C=["Don't produce any waste today.","Do one good deed.","Do two good deeds.","Do three good deeds.","Go to work 15 minutes early.","Go to work 15 minutes late.","Pet a random dog."],S=["Don't eat any","Only eat","Try a new"],N=["Spend a maximum of","Spend a minimum of","Save a total of"],k=["50 cents","$1","$5","$10","$50","$100"],O=["Talk to","Spend an hour with","Spend 30 minutes with","Spend a day with","Visit"],P=["Run","Walk","Jog","Climb","Skip"],M=["Do 10","Do 25","Do 50","Do 75","Do 100"],I=["push-ups","sit-ups","squats","jumping jacks","burpees","high knees","stretches"],D=["your significant other","your pet","your sibling","your mother","your best friend","your father","your friend","someone you haven't contacted in a long time","a distant friend","a random stranger","the person to your left","the person to your right","the person across from you","an elder","someone younger than you"],_=["for","with"],j=["5 minutes","10 minutes","15 minutes","30 minutes","45 minutes","an hour","two hours","half a day","the whole day"],B=["sugar","potatoes","bananas","fruit","bread","candy","gluten","meat","Chinese food","American food","Thai food","Vietnamese food","Asian food","European food","Italian food","French food","Korean food","Mexican food","Indian food","Malaysian food","Filipino food"],A=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={currentChallenge:"",category:"",completed:!1,user:null},n.generateChallenge=n.generateChallenge.bind(Object(c.a)(n)),n.completeChallenge=n.completeChallenge.bind(Object(c.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){if(console.log(localStorage),console.log(this.props),console.log("mounting"),document.body.style.setProperty("background-color","#FFCC00"),document.getElementById("home-tab").style.setProperty("color","white"),document.getElementById("home-tab").style.setProperty("font-weight","bold"),"true"===localStorage.getItem("flag_daily_complete"))document.body.style.setProperty("background-color","MediumSeaGreen"),document.body.style.transition="all 1s ease-out";else if(document.body.style.setProperty("background-color","#FFCC00"),document.body.style.transition="all 1s ease-out",localStorage.getItem("currChallenge")){var e=JSON.parse(localStorage.getItem("currChallenge"));this.setState({currentChallenge:e.currentChallenge}),this.setState({category:e.category})}else this.generateChallenge();w.a.scheduleJob("0 0 * * *",(function(){localStorage.clear()})),this.props.user&&this.setState({user:this.props.user})}},{key:"componentWillReceiveProps",value:function(e){console.log(e),e.user?this.setState({user:e.user}):this.setState({user:null})}},{key:"componentDidUpdate",value:function(e){console.log(this.props),console.log(e),this.props!==e&&(console.log("update user"),this.setState({user:e.user}))}},{key:"getRandomArbitrary",value:function(e,t){return Math.round(Math.random()*(t-e)+e)}},{key:"generateChallenge",value:function(){var e="",t="",a="",n="",o="",l=this.getRandomArbitrary(0,4);if(0===l)0===this.getRandomArbitrary(0,1)?(e=E[Math.floor(Math.random()*E.length)],"for"===(t=_[Math.floor(Math.random()*_.length)])?a=j[Math.floor(Math.random()*j.length)]:"with"===t&&(a=D[Math.floor(Math.random()*D.length)]),n=e+" "+t+" "+a+"."):n=C[Math.floor(Math.random()*C.length)],o="Action";else if(1===l)n=(e=S[Math.floor(Math.random()*S.length)])+" "+(a=B[Math.floor(Math.random()*B.length)])+".",o="Food";else if(2===l)n=(e=N[Math.floor(Math.random()*N.length)])+" "+(a=k[Math.floor(Math.random()*k.length)])+".",o="Finance";else if(3===l)n=(e=O[Math.floor(Math.random()*O.length)])+" "+(a=D[Math.floor(Math.random()*D.length)])+".",o="Communication";else{0===this.getRandomArbitrary(0,1)?(e=P[Math.floor(Math.random()*P.length)],"for"===(t=_[Math.floor(Math.random()*_.length)])?a=j[Math.floor(Math.random()*j.length)]:"with"===t&&(a=D[Math.floor(Math.random()*D.length)]),n=e+" "+t+" "+a+"."):n=(e=M[Math.floor(Math.random()*M.length)])+" "+(a=I[Math.floor(Math.random()*I.length)])+".",o="Exercise"}var r={currentChallenge:n,category:o};localStorage.setItem("currChallenge",JSON.stringify(r)),this.setState({currentChallenge:n}),this.setState({category:o})}},{key:"completeChallenge",value:function(){var e=this;if(document.getElementById("refreshChallenge")&&(document.getElementById("refreshChallenge").disabled=!0),document.body.style.setProperty("background-color","MediumSeaGreen"),document.body.style.transition="all 1s ease-out",""!==this.state.currentChallenge&&null!==this.state.currentChallenge){if(this.props.user){var t=f.collection("users").doc(this.props.user.email);t.get().then((function(a){if(a.exists){var n=a.data(),o={challenges:e.state.currentChallenge,type:e.state.category,date_completed:new Date};if(console.log("Document data:",n),null==n.completed_challenges)console.log("empty data"),t.set({name:e.props.user.displayName,completed_challenges:[o],duplicates:!1});else{var l=n.completed_challenges;l.push(o),t.set({name:e.props.user.displayName,completed_challenges:l,duplicates:!1})}}})).catch((function(e){console.log("Error getting document:",e)}))}else console.log("guest user");localStorage.setItem("flag_daily_complete",!0),this.setState({completed:!0})}}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",null,this.state.user?o.a.createElement("h2",null," Hi ",this.state.user.displayName,"! "):o.a.createElement("h2",null," Hi Guest! "),"true"===localStorage.getItem("flag_daily_complete")?o.a.createElement("h1",null," Congratulations! "):o.a.createElement("div",{className:"prompt"},o.a.createElement("h3",null," Today's Challenge:"),o.a.createElement("h1",{className:"challenge"}," ",this.state.currentChallenge," "),o.a.createElement("p",null," Category: ",this.state.category," "),o.a.createElement("button",{type:"button",id:"refreshChallenge",onClick:this.generateChallenge,className:"btn btn-light"},"Reroll for another challenge!"))),"true"===localStorage.getItem("flag_daily_complete")?o.a.createElement("div",{className:"form-container"},o.a.createElement("h2",null," You've completed your daily task. "),o.a.createElement("br",null),this.props.user?o.a.createElement("h4",null," You will receive a new challenge after midnight! Meanwhile, check out the analytics tab. "):o.a.createElement("h4",null," You will receive a new challenge after midnight! Register to view your analytics! ")):o.a.createElement("div",{className:"form-container"},o.a.createElement("form",null,o.a.createElement("div",null,o.a.createElement("div",{className:"btn-group btn-group-toggle","data-toggle":"buttons"},o.a.createElement("label",{htmlFor:"completeOption1",className:"completeBtn btn btn-secondary active"},o.a.createElement("input",{type:"radio",name:"completeOption1",id:"incomplete",autoComplete:"off",defaultChecked:!0})," Incomplete"),o.a.createElement("label",{htmlFor:"completeOption2",className:"completeBtn btn btn-secondary",onClick:this.completeChallenge},o.a.createElement("input",{name:"completeOption2",type:"radio",id:"complete",autoComplete:"off"})," Complete"))))),o.a.createElement("div",{className:"note"},o.a.createElement("p",null," Note: Only one challenge can be completed per day and it cannot be undone. ")))}}]),a}(n.Component),T=Object(h.f)(A);a(79);google.charts.load("current",{packages:["corechart"]});var F=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={totalCompleted:0,categoryPieData:[],completed_challenges:[]},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){console.log(this.state.completed_challenges),localStorage.getItem("logged_on")||this.props.history.push("/"),console.log(localStorage),localStorage.getItem("user")&&(this.getCompletedChallenges(JSON.parse(localStorage.getItem("user"))),window.onload=this.drawChart,window.onresize=this.drawChart)}},{key:"getCompletedChallenges",value:function(e){var t=this;f.collection("users").doc(e.email).get().then((function(e){var a=e.data();t.setState({totalCompleted:a.completed_challenges.length}),t.setState({completed_challenges:a.completed_challenges.reverse().slice(0,10)});var n=a.completed_challenges,o={Action:0,Food:0,Finance:0,Exercise:0,Communication:0};for(var l in n)o[n[l].type]++;for(var r in o)t.state.categoryPieData.push([r,o[r]]);localStorage.setItem("categoryPieData",JSON.stringify(t.state.categoryPieData)),t.drawChart()}))}},{key:"drawChart",value:function(){var e=new google.visualization.DataTable;e.addColumn("string","Category"),e.addColumn("number","Count"),e.addRows(JSON.parse(localStorage.getItem("categoryPieData")));for(var t=document.getElementById("chart_div");null!=t&&t.firstChild;)t.removeChild(t.firstChild);new google.visualization.PieChart(document.getElementById("chart_div")).draw(e,{is3D:!0,legend:"bottom"})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"card bg-light mb-3",id:"total-card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("h5",{className:"card-title"},"You've completed a total of"),o.a.createElement("p",{className:"card-text total-completed-challenges"},this.state.totalCompleted),o.a.createElement("p",{className:"card-text"},"challenges")))),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-6"},o.a.createElement("div",{className:"analytics-card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("h5",{className:"card-title"},"Categories Completed"),0===this.state.totalCompleted?"None Completed":o.a.createElement("div",{id:"chart_div"})))),o.a.createElement("div",{className:"col-md-6"},o.a.createElement("div",{className:"analytics-card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("h5",{className:"card-title"},"History of Completed"),0===this.state.totalCompleted?"None Completed":o.a.createElement("div",null,this.state.completed_challenges.map((function(e,t){var a=e.date_completed.toDate();return o.a.createElement("p",{className:"challenge-history",key:t}," ",a.getMonth()+1,"/",a.getDate(),"/",a.getFullYear(),"  ",e.challenges," ")})))))))))}}]),a}(n.Component),R=Object(h.f)(F),U=(a(80),function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={name:"",email:"",password:"",confirmPassword:"",login_email:"",login_password:"",warning:""},n.createNewUser=n.createNewUser.bind(Object(c.a)(n)),n.loginUser=n.loginUser.bind(Object(c.a)(n)),n.validateEmail=n.validateEmail.bind(Object(c.a)(n)),n.validatePassword=n.validatePassword.bind(Object(c.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;console.log("registration mounted"),this.fireBaseListener=y.onAuthStateChanged((function(t){t&&(console.log("logged on!!!"),localStorage.setItem("user",JSON.stringify(t)),e.props.history.push({pathname:"/",state:{user:JSON.stringify(t)}}))})),document.getElementById("home-tab").style.setProperty("color","gray"),document.getElementById("home-tab").style.setProperty("font-weight","normal"),document.getElementById("analytics-tab")&&(document.getElementById("analytics-tab").style.setProperty("color","gray"),document.getElementById("analytics-tab").style.setProperty("font-weight","normal"))}},{key:"componentWillUnmount",value:function(){this.fireBaseListener()}},{key:"validateEmail",value:function(e){return!!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)}},{key:"validatePassword",value:function(e){return!!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(e)}},{key:"validateForms",value:function(e,t){if(!this.validateEmail(e.email))return this.setState({warning:"The email you have entered is invalid. Please double-check!"}),!1;if(t){if(""===e.name)return this.setState({warning:"Please enter a display name."}),!1;if(e.password!==e.confirmPassword)return this.setState({warning:"Your passwords do not match!"}),!1}return!!this.validatePassword(e.password)||(this.setState({warning:"Your password must be 6-20 characters. Have at least one uppercase, one lowercase, and one digit."}),!1)}},{key:"createNewUser",value:function(e){var t=this;e.preventDefault();var a={name:this.state.name,email:this.state.email,password:this.state.password,confirmPassword:this.state.confirmPassword};this.validateForms(a,!0)&&b.auth().createUserWithEmailAndPassword(a.email,a.password).then((function(){console.log("registering...");var e=b.auth().currentUser;e.updateProfile({displayName:a.name}),f.collection("users").doc(e.email).set({name:e.displayName,completed_challenges:[],duplicates:!1}),localStorage.clear()})).catch((function(e){t.setState({warning:"The email address is already in use by another account!"}),console.log(e.code),console.log(e.message)}))}},{key:"loginUser",value:function(e){var t=this;e.preventDefault();var a={email:this.state.login_email,password:this.state.login_password};this.validateForms(a,!1)&&b.auth().signInWithEmailAndPassword(a.email,a.password).then((function(e){console.log("checking login credentials..."),localStorage.clear()})).catch((function(e){t.setState({warning:"Either your email or password login is incorrect."}),console.log(e.code),console.log(e.message)}))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("p",{className:"form-validation"}," ",this.state.warning)),o.a.createElement("div",{className:"register-container"},o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("div",{className:"card-contents"},o.a.createElement("h5",{className:"card-title"},"New to Daily Challenge?"),o.a.createElement("p",{className:"card-text"},"Register to keep track of the challenges you've completed!"),o.a.createElement("form",{onSubmit:function(t){return e.createNewUser(t)}},o.a.createElement("input",{type:"text",className:"form-control register-input",placeholder:"Display Name","aria-label":"Display Name",value:this.state.name,onChange:function(t){return e.setState({name:t.target.value})},"aria-describedby":"basic-addon1"}),o.a.createElement("input",{type:"email",className:"form-control register-input",placeholder:"Email Address","aria-label":"Email Address",value:this.state.email,onChange:function(t){return e.setState({email:t.target.value})},"aria-describedby":"basic-addon1"}),o.a.createElement("input",{type:"password",className:"form-control register-input",placeholder:"Password","aria-label":"Password",value:this.state.password,onChange:function(t){return e.setState({password:t.target.value})},"aria-describedby":"basic-addon1"}),o.a.createElement("input",{type:"password",className:"form-control register-input",placeholder:"Confirm Password","aria-label":"Confirm Password",value:this.state.confirmPassword,onChange:function(t){return e.setState({confirmPassword:t.target.value})},"aria-describedby":"basic-addon1"}),o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Register"))))),o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("div",{className:"card-contents"},o.a.createElement("form",{onSubmit:function(t){return e.loginUser(t)}},o.a.createElement("h5",{className:"card-title"},"Returning User?"),o.a.createElement("p",{className:"card-text"},"Log In to view analytics and change your settings!"),o.a.createElement("input",{type:"email",className:"form-control register-input",placeholder:"Email Address","aria-label":"Email Address",value:this.state.login_email,onChange:function(t){return e.setState({login_email:t.target.value})},"aria-describedby":"basic-addon1"}),o.a.createElement("input",{type:"password",className:"form-control register-input",placeholder:"Password","aria-label":"Password",value:this.state.login_password,onChange:function(t){return e.setState({login_password:t.target.value})},"aria-describedby":"basic-addon1"}),o.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Login")))))))}}]),a}(n.Component)),W=Object(h.f)(U),x=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={user:null,disabled:!1},n.logOut=n.logOut.bind(Object(c.a)(n)),n.analyticsTabClicked=n.analyticsTabClicked.bind(Object(c.a)(n)),n.homeTabClicked=n.homeTabClicked.bind(Object(c.a)(n)),n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props),console.log(localStorage),this.fireBaseListener=y.onAuthStateChanged((function(t){t?(console.log(t),localStorage.setItem("logged_on",!0),localStorage.setItem("user",JSON.stringify(t)),e.setState({user:t}),e.setState({disabled:!1})):(e.setState({user:null}),e.setState({disabled:!0}))}))}},{key:"componentWillUnmount",value:function(){this.fireBaseListener()}},{key:"logOut",value:function(){var e=this;console.log("logging out"),y.signOut().then((function(){localStorage.clear(),e.setState({user:null}),e.setState({disabled:!1}),e.props.history.push("/"),document.body.style.setProperty("background-color","#FFCC00"),document.body.style.transition="all 1s ease-out"})).catch((function(e){console.log(e)}))}},{key:"analyticsTabClicked",value:function(e){document.getElementById("home-tab").style.setProperty("color","gray"),document.getElementById("home-tab").style.setProperty("font-weight","normal"),document.getElementById("analytics-tab").style.setProperty("font-weight","bold"),document.getElementById("analytics-tab").style.setProperty("color","white"),this.state.disabled&&e.preventDefault()}},{key:"homeTabClicked",value:function(e){document.getElementById("home-tab").style.setProperty("color","white"),document.getElementById("home-tab").style.setProperty("font-weight","bold"),document.getElementById("analytics-tab")&&(document.getElementById("analytics-tab").style.setProperty("color","gray"),document.getElementById("analytics-tab").style.setProperty("font-weight","normal"))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},o.a.createElement("ul",{className:"header"},o.a.createElement("li",null,o.a.createElement(u.b,{id:"home-tab",to:"/daily-challenge/",onClick:function(t){return e.homeTabClicked(t)}},"Home")),this.state.user?o.a.createElement("li",null,o.a.createElement(u.b,{id:"analytics-tab",className:"analytics-tab",onClick:function(t){return e.analyticsTabClicked(t)},to:"/daily-challenge/analytics"},"Analytics")):null,this.state.user?o.a.createElement("button",{type:"button",className:"btn btn-dark",onClick:this.logOut},"Log Out"):o.a.createElement("button",{type:"button",className:"btn btn-dark"},o.a.createElement(u.c,{to:"/register"},"Register or Login"))),o.a.createElement(h.c,null,o.a.createElement(h.a,null,o.a.createElement(T,{user:this.state.user})),o.a.createElement(h.a,null,o.a.createElement(R,{user:this.state.user})),o.a.createElement(h.a,{path:"/daily-challenge/register",component:W})))}}]),a}(n.Component),J=Object(h.f)(x),L=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Y(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(o.a.createElement(u.a,null,o.a.createElement(J,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/daily-challenge",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/daily-challenge","/service-worker.js");L?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Y(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):Y(e)}))}}()}},[[40,1,2]]]);
//# sourceMappingURL=main.e5040735.chunk.js.map