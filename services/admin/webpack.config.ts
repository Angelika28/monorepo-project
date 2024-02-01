import webpack from "webpack"
import path from "path"
import {BuildMode, BuildPaths, BuildPlatform, buildWebpack} from "@packages/build-config"
import packageJson from "./package.json"

interface EnvVariables {
    mode?: BuildMode
    port?: number
    analyzer?: boolean
    platform?: BuildPlatform
}
export default (env: EnvVariables) => { // передаем переменную окружения
    const paths: BuildPaths = {
        output: path.resolve(__dirname, "build"),
        entry: path.resolve(__dirname, "src", "index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        public: path.resolve(__dirname, "public"),
        src: path.resolve(__dirname, "src"),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3002,
        mode: env.mode ?? "development",
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? "desktop"
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: "admin",
        filename: "remoteEntry.js", // название файла, которое будет удалённо подключаться в хост контейнер
        exposes: {
            "./Router": "./src/router/Router.tsx" // здесь указываем что хотим предоставить хост контейнеру (т.е. наружу отдаем наш роутер)
        },
        shared: {  // указываем какие библиотеки общие, а какие шарятся
            ...packageJson.dependencies,
            react: {
                eager: true, //флаг значит, что библиотеку нужно подгрузить сразу (противоположность lazy loading)
                requiredVersion: packageJson.dependencies["react"],
            },
            "react-router-dom": {
                eager: true,
                requiredVersion: packageJson.dependencies["react-router-dom"],
            },
            "react-dom" : {
                eager: true,
                requiredVersion: packageJson.dependencies["react-dom"],
            }
        }
    }))

    return config
}
