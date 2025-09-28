const { execSync } = require("child_process");
const { join } = require("path");
const protoFiles = require("google-proto-files");

console.info("Generating TypeScript code from proto files...");

const pluginPath = join(
    process.cwd(),
    "node_modules",
    ".bin",
    process.platform === "win32" ? "protoc-gen-ts_proto.cmd" : "protoc-gen-ts_proto"
);

const protoPath = join("libs", "proto", "src", "*.proto");
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

console.info("✅ Proto generation completed!");
