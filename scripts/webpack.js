const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const { argv } = require("process");

function BuildConfig(config,baseDir){
    if(typeof config !== "object") throw new TypeError("Config is not type of object");
    const {projectDir = ".",outDir = "./dist/", entries} = config;
    const sourceDir = path.resolve(baseDir,projectDir);
    if(typeof entries !== "object") throw new TypeError("entries in Config must be type of object (key: outputFileName,value: entryFilePath)");
    const WB = {
        mode: "production",
        target: ["es2020"],
        // ------ ^
        module: {rules: []},
        resolve: {
            plugins: [],
            extensions: [".js"]
        },
        optimization: {
            minimize: true,
            minimizer: []  
        },
        output: {
            filename: '[name].js',
            path: path.resolve(sourceDir,outDir),
            library: {type: 'module'},
        },
        experiments: {outputModule: true,},
        externalsType: "module",
        externals: {
            "@minecraft/server": '@minecraft/server',
            "@minecraft/server-ui": '@minecraft/server-ui',
            "@minecraft/server-admin": '@minecraft/server-server-admin',
            "@minecraft/server-gametest": '@minecraft/server-gametest',
            "@minecraft/server-net": '@minecraft/server-net',
            "@minecraft/server-editor":'@minecraft/server-editor',
            "@minecraft/server-editor-bindings":'@minecraft/server-editor-bindings'
        }
    };
    WB.entry = {};
    const module_names = Object.getOwnPropertyNames(entries);
    for(const module_name of module_names){
      WB.entry[module_name] = path.resolve(sourceDir,entries[module_name]);
      console.log(sourceDir,entries[module_name],path.resolve(sourceDir,entries[module_name]));
    }
    return WB;
}
async function BundleModules(webpack_config){
    console.log("[Webpack] Starting. . .");
    let run=()=>{};    
    const promise = new Promise(res=>run = res)
    const compiler = webpack(webpack_config,(err,stats)=>{
        run();
        if(err) {console.error(err,err.stack); process.exitCode = 1;}
        if(stats.hasErrors()){console.error("[Webpack][Error]",stats.compilation.errors.map(e=>e.message + " " + e.stack).join("\n")); process.exitCode = 1;}
        if(stats.hasWarnings()) console.warn("[Webpack][Warning]",stats.compilation.warnings.map(e=>e.message + " " + e.stack).join("\n"));
        console.log("[Webpack]-[Done]",`bundled via Webpack v${webpack.version} compiled in ${stats.endTime - stats.startTime}ms`);
    });
    await promise;
}
const config = argv[2];
if(config){
    if(!fs.existsSync(config)) return console.error("File not found: " + config);
    if(!config.endsWith(".json")) console.warn("'" + config + "' should end with '.json'");
    const dirname = path.dirname(config);
    const a = JSON.parse(fs.readFileSync(config));
    BundleModules(BuildConfig(a,dirname)).catch(er=>console.error(er,er.stack));
}
else console.error("No config specified.");