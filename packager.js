const exec = require('child_process').exec;
const publish = (process.env.npm_config_publish === 'true');

console.log('Compiling source...');
exec('cross-env NODE_ENV=prod webpack && cd ./dist && npm install --production && npm run electron:rebuild', (error) => {
	if (!error) {
		console.log('Creating windows packager...');
		let command = 'build --win --ia32';
		if (publish) command += ' -p always';
		const build = exec(command);
		build.stdout.on('data', function (data) {
			console.log(data.toString());
		});
		build.stderr.on('data', function (data) {
			console.log(data.toString());
		});
		build.on('exit', function (code) {
			if (code === 0) {
				console.log('Successfully created windows package inside ./build/');
				if (publish) console.log('Successfully released app');
			} else {
				console.log('An error occured, please check configuration an retry');
			}
		});
	} else {
		console.log('Error : ' + error);
	}
});
