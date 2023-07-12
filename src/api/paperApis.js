import request from '@/utils/request'

//试卷分页查询
export function getPapersPage(papersQuery){
    return request ({
        url: '/papers/page',
        method: 'post',
        data: papersQuery,
    })
}

//试卷数据根据id批量删除
export function deletePapers(Ids){
    return request ({
        url: '/papers/delBatch',
        method: 'post',
        data: Ids,
    })
}

//手动编写试卷
export function handlePaper(handPapersQuery){
    return request ({
        url: '/papers/handPaper',
        method: 'post',
        data: handPapersQuery,
    })
}

//试卷卡片新建或更新
export function updatePaper(papers){
    return request ({
        url: '/papers/save',
        method: 'post',
        data: papers,
    })
}

//根据试卷ID查找其包含的试题信息
export function getPaperQuestion(paperId){
    return request ({
        url: '/papers/view/' + paperId,
        method: 'get',
    })
}

//根据课堂ID查找试卷ID及其标题
export function getPaperOptionByClassId(classId){
    return request ({
        url: '/papers/getByClassId',
        method: 'get',
        params: {
            classId,
        }
    })
}

//自动生成试卷
export function autoGeneratePaper(generatePapersQuery){
    return request ({
        url: '/papers/autoTakePaper',
        method: 'post',
        data: generatePapersQuery,
    })
}