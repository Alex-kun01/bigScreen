// 获取年-月-日 时间

function getDateStr (){
    let date = new Date()
    let year = date.getFullYear().toString().padStart(4, '0')
    let month = ( date.getMonth() + 1 ).toString().padStart(2, '0')
    let day = date.getDate().toString().padStart(2, '0')
    let hour = date.getHours().toString().padStart(2, '0')
    let minute = date.getMinutes().toString().padStart(2, '0')
    let second = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

export default getDateStr