import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  "compilerOptions": {
    // ... other options
    "typeRoots": ["./node_modules/@types", "./types"]
}
};

export default nextConfig;
