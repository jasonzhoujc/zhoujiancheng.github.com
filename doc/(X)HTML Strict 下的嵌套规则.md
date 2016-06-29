## (X)HTML Strict 下的嵌套规则

> 原文 http://www.cs.tut.fi/~jkorpela/html/strict.html

![Alt text](./allowednesting.gif)

以上规则并不全是建议或者推荐写法，有一些是强制的，如果不遵守浏览器会按照它的方式来解析，
下面列一下不规范写法导致浏览器解析问题的case

#### case list

1. &lt;p>标签下嵌套**block** \(*注：为上图的**block** * \) 元素

        <p>
            <span></span>
            <div></div>
        </p>

  解析过程：

    1. 开始解析&lt;p>

    2. 发现块元素&lt;div>,则关闭第一步的&lt;p>

            <p><span></span></p>

    3. 解析块元素&lt;div>完毕

            <div></div>

    4. 发现未闭合的&lt;/p>，闭合

            <p></p>

  浏览器解析最终结果：

            <p><span></span></p>
            <div></div>
            <p></p>

2. ``<a>``标签下嵌套``<a>``

        <a href="">
            <span></span>
            <div></div>
            <a href=""></a>
        </a>

  解析过程:

    1. 开始解析&lt;a>

    2. 发现内嵌&lt;a>元素本身,则关闭第一步的&lt;a>

            <a href="">
                <span></span>
                <div></div>
            </a>

    3. 解析内嵌元素&lt;a>完毕

            <a href=""></a>

    4. 发现未闭合的&lt;/a>，因为是内联元素，忽略

  最终结果：

            <a href="">
                <span></span>
                <div></div>
            </a>
            <a href=""></a>

3. ``<button>``标签于``<a>``类似，也不能内嵌``<button>``本身

4. ``<form>``表单内嵌自身则内嵌的``<form>``表单被忽略

        <form action="out">
            <input type="text" />
            <form action="in">
                <input type="button" />
            </form>
        </form>

  解析后：

        <form action="out">
            <input type="text" />
            <input type="button" />
        </form>

5. ``<table>``标签下直接``<tr>``, 会增加``tbody``标签，影响dom查找

        <table>
            <tr>
                <td>
                    hello world
                </td>
            </tr>
        </table>

  解析后：

        <table>
            <tbody>
                <tr>
                    <td>
                        hello world
                    </td>
                </tr>
            </tbody>
        </table>
    
