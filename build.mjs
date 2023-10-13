import esbuild from "esbuild"
import { sassPlugin } from 'esbuild-sass-plugin'
import { glsl } from "esbuild-plugin-glsl";

esbuild.build({
  plugins: [
    sassPlugin({ type: "style" }),
    glsl({ minify: true })
  ],
  entryPoints: ["src/app.ts", "src/scss/global.scss"],
  bundle: true,
  outdir: "public/built",
  define: {
    'window.IS_PRODUCTION': 'true',
  },
  minify: true,
  treeShaking: true,
  sourcemap: false,
})

console.log("build complete");