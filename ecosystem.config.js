module.exports = {
  apps: [
    {
      name: "data-cosmos",
      script: "npm",
      args: "start",
      cwd: "C:\\apps\\data-coe-portal",
      interpreter: "cmd.exe",
      node_args: "--max-old-space-size=512",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}
