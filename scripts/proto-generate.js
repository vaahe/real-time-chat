const { execSync } = require("child_process");
const { join, basename } = require("path");
const protoFiles = require("google-proto-files");
const { readdirSync, writeFileSync } = require("fs");

console.info("Generating TypeScript code from proto files...");

const pluginPath = join(
    process.cwd(),
    "node_modules",
    ".bin",
    process.platform === "win32" ? "protoc-gen-ts_proto.cmd" : "protoc-gen-ts_proto"
);

const protoPath = join("libs", "proto", "src", "protos", "*.proto");
const outputPath = join("libs", "proto", "src", "generated");

const googleProtoPath = join(protoFiles.getProtoPath(), "..");

execSync(
    `protoc \
    --plugin=protoc-gen-ts-proto="${pluginPath}" \
    --ts_proto_opt=nestJs=true \
    --ts_proto_out=${outputPath} \
    --proto_path=libs/proto \
    --proto_path=${googleProtoPath} \
    ${protoPath}`,
    { stdio: "inherit" }
);

const files = readdirSync(`${outputPath}/src/protos/`).filter((f) => f.endsWith(".ts") && f !== "index.ts");
const exportLines = [
  `export * from "./google/protobuf/struct";`,
  ...files.map((f) => {
    const name = basename(f, ".ts");
    return `export * as ${name} from "./src/protos/${name}";`;
  }),
];

writeFileSync(join(outputPath, "index.ts"), exportLines.join("\n") + "\n");

console.info("✅ Proto generation completed!");
