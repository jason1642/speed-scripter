/** @type {import('next').NextConfig} */
const nextConfig = {
    '@mui/styled-engine': '@mui/styled-engine-sc',
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
      }
}

module.exports = nextConfig
