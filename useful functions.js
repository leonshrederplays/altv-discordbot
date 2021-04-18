function generate(n) {
	var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

	if ( n > max ) {
			return generate(max) + generate(n - max);
	}

	max        = Math.pow(10, n+add);
	var min    = max/10; // Math.pow(10, n) basically
	var number = Math.floor( Math.random() * (max - min + 1) ) + min;

	return ("" + number).substring(add); 
}


// get livestream
const cp = require('child_process');
let streamers = ['shrederplays'];
new Promise((resolve, reject) => {
    streamers.forEach((streamer, args, index) => {
        console.log(streamer);
        cp.exec(`twitch-stream-check ${streamer} -gvptmsf`, (error, stdout, stderr) => {
            let out = stdout.split("\n");
            out.pop();
            // isStreaming?, Game, Viewers, whenStarted?, mature?, Title, Partner?, Follower.
            if(stdout === '') return logAll("The User does not exist", 'ERROR');
            console.log("Stuff: ", out);
            return resolve();
        });
    });
}).then(res => {
    
})

// --------------------------------------------------------------------------------------------------

function testLog() {
    logAll("This is a INFO");
    logAll("This is a ERROR", 'ERROR');
    logAll("This is a FATAL", 'FATAL');
    logAll("This is a TRACE", 'TRACE');
    logAll("This is a WARN", 'WARN');
    logAll("This is a DEBUG", 'DEBUG');
}