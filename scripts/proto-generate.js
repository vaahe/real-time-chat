const { execSync } = require("child_process");
const { join } = require("path");

console.info('Generating TypeScript code from proto files...');

const pluginPath = join(process.cwd(), 'node_modules', '.bin', 'protoc-gen-ts_proto.cmd');
const protoPath = join('libs', 'proto', 'src', '*.proto');
const outputPath = join('libs', 'proto', 'generated');

execSync(`protoc --plugin=protoc-gen-ts-proto="${pluginPath}" --ts_proto_opt=nestJs=true --ts_proto_out=${outputPath} --proto_path=libs/proto ${protoPath}`, { stdio: 'inherit' });

console.info("✅ Proto generation completed!");