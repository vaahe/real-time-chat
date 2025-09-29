const { execSync } = require("child_process");
const { join, basename } = require("path");
const protoFiles = require("google-proto-files");
const { readdirSync, readFileSync, writeFileSync } = require("fs");

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

const protoGeneratedPath = join(outputPath, "src", "protos");

const files = readdirSync(protoGeneratedPath).filter((f) => f.endsWith(".ts") && f !== "index.ts");

files.forEach((f) => {
    const filePath = join(protoGeneratedPath, f);
    const name = basename(f, ".ts");
    let content = readFileSync(filePath, "utf-8");

    // Rename protobufPackage
    const newPackageName = `protobuf${name.charAt(0).toUpperCase() + name.slice(1)}Package`;
    content = content.replace(/export const protobufPackage = /, `export const ${newPackageName} = `);

    writeFileSync(filePath, content);
});

const exportLines = [
    `export * from "./google/protobuf/struct";`,
    ...files.map((f) => {
        const name = basename(f, ".ts");

        return `export * from "./src/protos/${name}";`;
    }),
];

writeFileSync(join(outputPath, "index.ts"), exportLines.join("\n") + "\n");

console.info("✅ Proto generation completed!");
