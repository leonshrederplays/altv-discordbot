module.exports = {
	envFinder() {
		require('dotenv').config({
			path: require('find-config')('.env')
		});
	}
};