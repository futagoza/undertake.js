"use strict";

const babel = require( "rollup-plugin-babel" );
const readFileSync = require( "fs" ).readFileSync;
const json = require( "rollup-plugin-json" );

const targets = [];
const plugins = [ json() ];

switch ( process.env.ROLLUP_TARGET ) {

    case "browser":

        const config = JSON.parse( readFileSync( "src/.babelrc", "utf8" ) );
        config.babelrc = false;
        // { presets: [ [ "futagozaryuu", {} ] ] }
        config.presets[ 0 ][ 1 ] = {
            defaultNodeVersion: null,
            node: null,
            forceAllTransforms: true
        };
        plugins.push( babel( config ) );
        targets.push( { dest: "dist/undertake.es5.js", format: "umd" } );
        break;

    case "module":

        targets.push( { dest: "dist/undertake.esm.js", format: "es" } );
        break;

    default:

        console.error( "Enviroment key \"ROLLUP_TARGET\" must have a value of either \"browser\", \"module\" or \"node\"." );
        process.exit( 1 );

}

module.exports = {

	entry: "src/undertake.js",
    banner: readFileSync( "src/banner.js", "utf8" ),
	plugins: plugins,
	targets: targets,
	sourceMap: true

};
