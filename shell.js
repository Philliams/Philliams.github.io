// shell.js

var length = 12;
var random_url = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
var random_ip = Math.floor(Math.random() * 40 + 10) + "." + Math.floor(Math.random() * 100 + 100) + "." + Math.floor(Math.random() * 60 + 10) + "." + Math.floor(Math.random() * 100 + 100);

var header = [
"╦ ╦┌─┐┬  ┌─┐┌─┐┌┬┐┌─┐\n",
"║║║├┤ │  │  │ ││││├┤ \n",
"╚╩╝└─┘┴─┘└─┘└─┘┴ ┴└─┘\n",
"┌┬┐┌─┐\n",
" │ │ │\n",
" ┴ └─┘\n",
" ╦╔═╗   ╔═╗╔═╗\n",
" ║╚═╗───║ ║╚═╗\n",
"╚╝╚═╝   ╚═╝╚═╝\n"
].reverse();

var instruction = [
"Welcome to emulated Javascript bash (JS-OS), version 3.2.57(1)-release (x86_64-apple-darwin15)",
"This website is intended to emulate a Bash terminal in the browser.",
"The shell commands are defined internally.  Type \'help\' to see the list.",
"There are several emulated functionalities in JS-OS.",
"Simulated programs can be run by typing 'run' plus the .exe filename.",
"To exit a simulated program, click outside of the program window",
"Files can also be read by typing 'cat' plus the .txt filename.",
"Type ls to see all files and their extensions.",
"Type clear to clear screen."
].reverse();

var text = [
">OpenSSH_6.9p1, LibreSSL 2.1.8",
">Reading configuration data /etc/ssh/ssh_config",
">/etc/ssh/ssh_config line 20: Applying options for *",
">/etc/ssh/ssh_config line 102: Applying options for *",
">Connecting to " + random_url + ".com " + random_ip + " port 22.",
">Connection established.",
">key_load_public: No such file or directory",
">identity file ./key.pem type -1",
">key_load_public: No such file or directory",
">identity file ./key.pem-cert type -1",
">Enabling compatibility mode for protocol 2.0",
">Local version string SSH-2.0-OpenSSH_6.9",
">Remote protocol version 2.0, remote software version OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.4",
">match: OpenSSH_6.6.1p1 Ubuntu-2ubuntu2.4 pat OpenSSH_6.6.1* compat 0x04000000",
">Authenticating to " + random_url + ":22 as 'ubuntu'",
">SSH2_MSG_KEXINIT sent",
">SSH2_MSG_KEXINIT received",
">kex: server->client chacha20-poly1305@openssh.com <implicit> none",
">kex: client->server chacha20-poly1305@openssh.com <implicit> none",
">expecting SSH2_MSG_KEX_ECDH_REPLY",
">Server host key: ecdsa-sha2-nistp256 SHA256:zrx3jzRhIE1OaXu4pzLECOoOr1gR840enllDrRFUCTA",
">Host '" + random_url + "' is known and matches the ECDSA host key.",
">Found key in /Users/local/.ssh/known_hosts:9",
">SSH2_MSG_NEWKEYS sent",
">expecting SSH2_MSG_NEWKEYS",
">SSH2_MSG_NEWKEYS received",
">SSH2_MSG_SERVICE_REQUEST sent",
">SSH2_MSG_SERVICE_ACCEPT received",
">Authentications that can continue: publickey",
">Next authentication method: publickey",
">Trying private key: ./key.pem",
">Authentication succeeded (publickey).",
">Authenticated to ec2-54-191-62-179.us-west-2.compute.amazonaws.com ([" + random_ip + "]:22).",
">channel 0: new [client-session]",
">Requesting no-more-sessions@openssh.com",
">Entering interactive session.",
">Sending environment.",
">Sending env LANG = en_CA.UTF-8",
"Welcome to Ubuntu 14.04.3 LTS (GNU/Linux 3.13.0-74-generic x86_64)"].reverse();

var p,n;

function LinkedListNode(child) {
	this.parent;
	this.child = child;
	this.command = '';
}

var head;
var cursor;

function newLine(text,tag){
	var temp = new LinkedListNode(head);
	if(head){
		head.parent = temp;
	}
	head = temp;
	cursor = temp;
	p = document.createElement(tag);
	n = document.createTextNode("");
	p.appendChild(document.createTextNode(text));
	p.appendChild(n);
	document.body.appendChild(p);
	window.scrollTo(0,document.body.scrollHeight);
}

function cliOutput(text){
	p = document.createElement("p");
	n = document.createTextNode(text);
	p.appendChild(n);
	document.body.appendChild(p);
	window.scrollTo(0,document.body.scrollHeight);
}

function loadDoc(url) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		console.log("state change");
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			cliOutput(xhttp.responseText);
			newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
		}else if(xhttp.readyState == 4 && xhttp.status == 404){
			cliOutput("err: file not found");
			newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function parseCommand(cmd){
	if(cmd != ''){
		cmd = cmd.split(" ");
		if(cmd[0] == "clear"){
			head = null;
			var nodes = document.getElementsByTagName("p");
			var length = nodes.length;
			for(var i = 0; i < length; i++) {
				document.body.removeChild(nodes[0]);
			}
			var nodes = document.getElementsByTagName("pre");
			var length = nodes.length;
			for(var i = 0; i < length; i++) {
				document.body.removeChild(nodes[0]);
			}
			var nodes = document.getElementsByTagName("br");
			var length = nodes.length;
			for(var i = 0; i < length; i++) {
				document.body.removeChild(nodes[0]);
			}
			newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
		}else if(cmd[0] == "ls"){
			var files = ["asteroids.exe","molecule.exe","resume.txt","ai.exe","svg.exe"];
			cliOutput("===");
			for(var i = 0; i < files.length; i++){
				cliOutput(files[i]);
			}
			cliOutput("===");
			newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
		}else if(cmd[0] == "run"){
			var iframe = document.createElement('iframe');
			iframe.style.height = "90%;";
			iframe.style.width = "90%;";
			iframe.frameBorder = 1;
			iframe.src = "./" + cmd[1].replace(".exe","") + "/" + cmd[1].replace(".exe","") + ".html";
			document.body.appendChild(iframe);
			var rect = iframe.getBoundingClientRect();
			window.scrollTo(0, rect.top);
		}else if(cmd[0] == "cat"){
			loadDoc("/text_files/" + cmd[1]);
		}else if(cmd[0] == "help"){
			var help = ["Type \'help\' to see this list.",
			"There are several emulated functionalities in JS-OS.",
			"Simulated programs can be run by typing 'run' plus the .exe filename.",
			"To exit a simulated program, click outside of the program window",
			"Files can also be read by typing 'cat' plus the .txt filename.",
			"Type ls to see all files and their extensions.",
			"Type info for a short description of what each file contains",
			"Type clear to clear screen."
			];
			cliOutput("===");
			for(var i = 0; i < help.length; i++){
				cliOutput(help[i]);
			}
			cliOutput("===");
			newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
		}else if(cmd[0] == "info"){
			var info = ["Here is a short description of some of my side projects",
			">asteroids.exe --> 3D port of classic 80's game using javascript and Three.js",
			">resume.exe --> online resume, built entirely using one inline svg element",
			">ai.exe --> simple reinforcement learning teaching ai to battle spaceships",
			">resume.txt --> plaintext version of resume",
			">molecule.exe --> simple atom animation in html5 canvas"
			];
			cliOutput("===");
			for(var i = 0; i < info.length; i++){
				cliOutput(info[i]);
			}
			cliOutput("===");
			newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
		}else{
			cliOutput("-bash: " + cmd[0] + ": command not found");
			newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
		}
	}
}

window.onload = function(e){ 

	//document.body.style.cursor = 'none';
	var pre = document.createElement("pre");
	while(header.length != 0){
		n = document.createTextNode(header.pop());
		pre.appendChild(n);
	}
	document.body.appendChild(pre);
	document.body.appendChild(document.createElement("br"));
	document.body.appendChild(document.createElement("br"));

	while(instruction.length != 0 ){
		var p = document.createElement("p");
		var n = document.createTextNode(instruction.pop());
		p.appendChild(n);
		document.body.appendChild(p);
	}
	var rect = p.getBoundingClientRect();
	window.scrollTo(0, rect.top);

	document.body.appendChild(document.createElement("br"));
	var p = document.createElement("p");
	p.appendChild(document.createTextNode("Press any key to login"));
	var s = document.createElement("span");
	s.setAttribute("class","blinking-cursor");
	s.appendChild(document.createTextNode("|"));
	p.appendChild(s);
	document.body.appendChild(p);
	document.body.appendChild(document.createElement("br"));

}
function init(event){
	event.preventDefault();
	var n = document.getElementsByClassName("blinking-cursor")[0];
	n.parentNode.removeChild(n);
	var total = 0;
	cliOutput("local-machine:login phil$ ssh -i ./key.pem -v ubuntu@" + random_url + ".com","p");
	cliOutput("===");

	for(var i = 0; i < text.length; i++){
		total += Math.random()*500;
		setTimeout(function(){ 
			cliOutput(text.pop());
			if(text.length == 0){
				setTimeout(function(){ 
					newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
				}, 500); 
			}
		}, total);  
	}
	document.removeEventListener('keydown',init, true);
	document.addEventListener('keydown', function(event) {
		shell(event.keyCode);
	}, true);
}

document.addEventListener('keydown',init, true);
document.addEventListener('keydown',function(e){
	e.preventDefault();
}, true);
document.addEventListener('click', function(e){
	var nodes = document.getElementsByTagName("iframe");
	var length = nodes.length;
	for(var i = 0; i < length; i++) {
		document.body.removeChild(nodes[0]);
	}
	if(length > 0){
		newLine("ubuntu@ip-" + random_ip.replace(".","-") + ":~$ ","p");
	}
	
}, true);



function upLinkedList(node){
	if(node.parent){
		return node.parent;
	}else{
		return node;
	}
}

function downLinkedList(node){
	if(node.child){
		return node.child;
	}else{
		return node;
	}
}

function shell(keycode) {

		if(keycode == 13){ // code for enter
			parseCommand(cursor.command);
		}else if(keycode == 8){ // code for backspace
			n.nodeValue = n.nodeValue.substring(0, n.nodeValue.length - 1);
			head.command = head.command.substring(0, head.command.length - 1);
		}else if(keycode == 37){ // code for left arrow
			
		}else if(keycode == 38){ // code for up arrow
			cursor = downLinkedList(cursor);
			n.nodeValue = cursor.command;
		}else if(keycode == 39){ // code for right arrow
			
		}else if(keycode == 40){ // code for down arrow
			cursor = upLinkedList(cursor);
			n.nodeValue = cursor.command;
		}else if(keycode == 190){ // capture .
			n.nodeValue += ".";
			head.command += ".";
		}else{
			n.nodeValue += String.fromCharCode(keycode).toLowerCase();
			head.command += String.fromCharCode(keycode).toLowerCase();
		}
	}