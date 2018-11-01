// 配置文件

const g_version = 'release';

// 云环境
const cloud_env = g_version == 'test' ? 'jy-test-e9b329' :'release-2f776b'

module.exports = {
  g_version:g_version,
  cloud_env: cloud_env
}