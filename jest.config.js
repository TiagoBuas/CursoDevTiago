import { loadEnvConfig } from '@next/env'

const nextJest = require("next/jest");
const createJestConfig = nextJest();
const jestConfig = createJestConfig({
    moduleDirectories: ['node_modules', '<rootDir>'],
    verbose: true
});
 
const projectDir = process.cwd()
loadEnvConfig(projectDir)

module.exports = jestConfig;