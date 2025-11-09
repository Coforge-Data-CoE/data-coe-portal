module.exports = {
  apps: [
    {
      name: "data-coe-portal",
      script: "npm",
      args: "start",
      cwd: "C:\\apps\\data-coe-portal",
      interpreter: "cmd.exe",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};