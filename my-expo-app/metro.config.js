const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

// Add tflite to asset extensions
config.resolver.assetExts.push('tflite');

module.exports = withNativeWind(config, { input: './global.css' });
