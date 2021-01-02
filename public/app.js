// const url = 'https://git.heroku.com/twitter-applicatin.git';
const url = "http://localhost:5000";



let currentUser;
if (localStorage.getItem("currentUser")) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
}

var socket = io(url);

io.on("connect", function () {
    console.log("user is connect")
})

function signup() {
    var singupdata = {
        username: document.getElementById("txt_name").value,
        useremail: document.getElementById("txt_email").value,
        userpassword: document.getElementById("txt_password").value,
        usergender: document.getElementById("gender_value").value,
        userphonenumber: document.getElementById("txt_phoneNumber").value,
        userChat: [],
    };

    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/signup");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(singupdata));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {

            // console.log(Http.responseText)
            let jsonRes = JSON.parse(Http.responseText)

            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                window.location.href = "login.html";
            } else {
                alert(jsonRes.message);
            }
        }
    }
    return false;
}

function login() {
    var logindata = {
        useremail: document.getElementById("l_email").value,
        userpassword: document.getElementById("l_password").value
    }
    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/login");
    Http.setRequestHeader("Content-Type", "application/json");
    Http.send(JSON.stringify(logindata));

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {

            // console.log(Http.responseText)
            let jsonRes = JSON.parse(Http.responseText)

            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                localStorage.setItem("currentUser", JSON.stringify(jsonRes.currentUser));
                window.location.href = "Dashborad.html";
            } else {
                alert(jsonRes.message);
            }
        }
    }
    return false;
}

function Send() {
    let chattxt = document.getElementById("usermsg").value;
    const Http = new XMLHttpRequest();
    Http.open("POST", url + "/send");
    Http.setRequestHeader("Content-Type", "application/json");

    Http.send(JSON.stringify({
        username: currentUser.username,
        userphonenumber: currentUser.userphonenumber,
        usertime: new Date().getTime(),
        chattxt: chattxt,
    }));
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            jsonRes = JSON.parse((Http.responseText));
            console.log("posted success");
        }
    }

}
function getdata() {
    if (localStorage.getItem("currentUser")) {
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
        document.getElementById("welcomeUser").innerHTML = `WELLCOME : , ${currentUser.username}`
    }
    const Http = new XMLHttpRequest();
    Http.open("GET", url + "/getdata");
    Http.setRequestHeader("Content-Type", "application/json");

    Http.send();
    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4) {
            jsonRes = JSON.parse((Http.responseText));
            for (i = 0; i < jsonRes.length; i++) {
                let eachuser = document.createElement("p")
                eachuser.innerHTML = `<h5>${jsonRes.username}</h5>
                <label>${jsonRes.userphonenumber}</label>
                <br/>
                <label>${jsonRes.usertime}</label>
                <br/>
                <p>${jsonRes.chattxt}</p> `
                document.getElementById("result").appendChild(eachuser);
            }
        }
    }
}

socket.on("CURRENTUSER", (user) => {
    let curentuser = JSON.parse(user)
})