import path from "node:path";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { transformerTwoslash } from "fumadocs-twoslash";
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs";
import { createGenerator, remarkAutoTypeTable } from "fumadocs-typescript";
import ts from "typescript";

export const docs = defineDocs({
  dir: "content/docs",
});

const generator = createGenerator({
  tsconfigPath: path.resolve(process.cwd(), "tsconfig.json"),
});

// Parse tsconfig.app.json to get compiler options
const configPath = path.resolve(process.cwd(), "tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  path.dirname(configPath),
);

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [[remarkAutoTypeTable, { generator }]],
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      langs: ["typescript", "javascript", "tsx", "jsx", "js", "json", "bash"],
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          twoslashOptions: {
            compilerOptions: {
              ...parsedConfig.options,
              incremental: false,
            },
          },
          typesCache: createFileSystemTypesCache(),
        }),
      ],
    },
  },
});
