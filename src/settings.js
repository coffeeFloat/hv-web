module.exports = {
  title: '我的网站',
  rootPath: ['stage', 'production'].includes(process.env.ENV)
    ? '/cos-plus/'
    : '/',
}
