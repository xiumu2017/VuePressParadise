const path = require('path')
const fs = require('fs')

const siderbarMap = require('./siderbarMap')

exports.inferSiderbars = () => {
    const siderbar = {}
    siderbarMap.forEach(({title,dirName}) => {
        const dirPath = path.resolve(__dirname,'../' + dirName)
        const parent = `/${dirName}`
        const children = fs.readdirSync(dirPath).filter(item =>
            item.endsWith('.md') && fs.statSync(path.join(dirPath,item)).isFile()
        )
        .sort((prev,next) => (next.includes('README.md')? 1 : 0))
        .map(item => item.replace(/(README)?(.md)$/,''))

        siderbar[parent] = [{
            title,
            children,
            collapsable:true
        }]
    })
    
    return siderbar
}