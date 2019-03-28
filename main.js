var style = document.getElementById('style')
    var code = document.querySelector('#code')
    var str = `
    /* 
     * 面试官你好，我是XXX
     * 只用文字作做我介绍太单调了
     * 我就用代码来介绍吧
     * 首先准备一些样式
     */
     *{
        transition: all 1s;
     }
     html{
        background-color:rgb(252, 244, 245);
     }
    #code{
        border: 1px solid #aaa;
        padding: 16px;
    }

    /* 我需要一点代码高亮 */
    .token.selector{color: #690!important; }
    .token.property{color: #905; }

    /* 加一个呼吸效果 */
    #code{
        animation: breath 0.8s infinite alternate-reverse;
    }

    /* 现在正式开始 */

    /* 我需要一张白纸 */
    #code-wapper{
        width: 50%; 
        left: 0; 
        position: fixed; 
        height: 100%;
    }
    #paper > .content {
        display: block;
    }

    /* 于是我就可以在白纸上写字了，请看右边 */
`
    var str2 = `
    /* 感谢观看*/
    `
    var md = `
    # 自我介绍
    我叫 XXX
    1990 年 1 月出生
    XXX 学校毕业
    自学前端半年
    希望应聘前端开发岗位
    # 技能介绍
    熟悉 JavaScript CSS
    `
    function writeCSS(lastStr, codeStr, fn) {
        var i = 0
        var time = setInterval(() => {
            code.innerHTML = Prism.highlight(lastStr + codeStr.substring(0, i), Prism.languages.css);
            // code.innerHTML = str.substring(0,i)
            style.innerHTML = lastStr + codeStr.substring(0, i)
            code.scrollTop = code.scrollHeight
            i = i + 1
            // console.log(i)
            if (i === codeStr.length) {
                window.clearInterval(time)
                fn.call()
                // console.log(fn)
            }
        }, 30)
    }

    function writeMarkdown(markdown, fn) {
        let domPaper = document.querySelector('#paper>.content')
        let n = 0
        let id = setInterval(() => {
            n += 1
            domPaper.innerHTML = markdown.substring(0, n)
            // console.log('domPaper')
            // console.log(domPaper.innerHTML)
            domPaper.scrollTop = domPaper.scrollHeight
            if (n >= markdown.length) {
                window.clearInterval(id)
                fn.call()
            }
        }, 35)
    }

    writeCSS('', str, () => {
        createPaper(() => {
            // console.log('123')
            writeMarkdown(md, () => {
                writeCSS(str, str2, () => {
                    // convertMarkdownToHtml(() => {
                        // writeCss(css1 + css2, css3, () => {
                            console.log('完成')
                        // })
                    // })
                })
            })
        })
    })
    function createPaper(fn) {
        // console.log('fn')
        var paper = document.createElement('div')
        paper.id = 'paper'
        var content = document.createElement('pre')
        content.className = 'content'
        paper.appendChild(content)
        document.body.appendChild(paper)
        fn.call()
    }
    // function convertMarkdownToHtml(fn) {
    //     var div = document.createElement('div')
    //     div.className = 'html markdown-body'
    //     div.innerHTML = marked(md)
    //     let markdownContainer = document.querySelector('#paper > .content')
    //     markdownContainer.replaceWith(div)
    //     fn && fn.call()
    // }