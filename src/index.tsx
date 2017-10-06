/*
 * 要通过import导入，webpack才能建立依赖关系。如果采用全局变量的方式使用React，
 * 那么可以不用import，但是要修改webpack的配置文件，把React配置为external的。
 */
import * as ReactDOM from 'react-dom'   
import * as React from 'react' 

ReactDOM.render(
    <h1>Hello, world!</h1>, document.getElementById('main')
)
