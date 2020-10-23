// 模拟分页
// 接受一个数组，以及页码索引,一页显示条数，返回一个目标数组
export default function getData(data,index,size){
    let tindex = ( index - 1 ) * size // 开始截取下标
    return data.slice(tindex, tindex + size)
}