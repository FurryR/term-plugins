export default {
  name: 'dfqlblog',
  version: '1.0.0',
  desc: '道锋潜麟的博客',
  url: 'https://furryr.github.io/term-plugins/dfqlblog.js',
  start: async (handler, args) => {
    const { Link } = await import('https://furryr.github.io/dist/util.js')
    async function getList(page) {
      return (
        await (
          await fetch('https://b.4l2.cn/joe/api', {
            referrer: 'https://b.4l2.cn/',
            body: `routeType=publish_list&page=${page}&pageSize=12&type=created`,
            method: 'POST',
            mode: 'cors',
            credentials: 'omit'
          })
        ).json()
      ).data
    }
    switch (args[0] ?? 'help') {
      case 'help': {
        handler.term.write('dfqlblog [COMMAND] [OPTIONS]...\n')
        handler.term.write('访问道锋潜麟的博客。\n')
        handler.term.write('命令：\n')
        handler.term.write('  help 显示帮助消息。\n')
        handler.term.write('  version 显示版本信息。\n')
        handler.term.write('  show [id] 显示编号为id的页面。\n')
        handler.term.write(
          '  list [page] 列出页面（需要指定编号，一页12篇）。\n'
        )
        handler.term.write(
          '此应用不能用于代替',
          Link('道锋潜麟博客', 'https://b.4l2.cn/'),
          '。\n'
        )
        return 0
      }
      case 'show': {
        if (args.length == 2) {
          const i = parseInt(args[1])
          const s = document.createElement('iframe')
          s.src = `https://b.4l2.cn/archives/${i}/`
          s.height = 500
          s.width = '100%'
          s.title = '道锋潜麟 博客浏览'
          handler.term.write(s, '\n')
          return 0
        }
        handler.term.write('至少得指定一个编号吧！\n')
        return 1
      }
      case 'list': {
        if (args.length == 2) {
          const i = parseInt(args[1])
          const list = await getList(i)
          handler.term.write(`第 ${i} 页：\n`)
          for (const item of list)
            handler.term.write(
              `${item.permalink.substring(26, item.permalink.length - 1)} "${
                item.title
              }" 阅读量:${item.views}，评论数:${item.commentsNum}，作于 ${
                item.time
              }\n`
            )
          handler.term.write(`共 ${list.length} 个结果\n`)
          return 0
        }
        handler.term.write('至少得指定一个页面吧！\n')
        return 1
      }
      case 'version': {
        handler.term.write('道锋潜麟博客第三方客户端 v1.0.0\n')
        handler.term.write('此博客的内容不代表第三方客户端开发者的观点。\n')
        handler.term.write(
          '此博客可能会执行未经验证的脚本对您的行为记录等进行追踪，请注意您的隐私安全。\n'
        )
        handler.term.write('此博客含有未经分级的内容。\n')
        return 0
      }
      default: {
        handler.term.write('未知命令。输入 dfqlblog help 来获得帮助。\n')
        return 1
      }
    }
  }
}
