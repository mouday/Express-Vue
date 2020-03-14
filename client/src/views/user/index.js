// 用户类型
export const userTypes = [
    {
        label: '管理员',
        value: 'manager'
    },
    {
        label: '员工',
        value: 'employee'
    }
]

/**
 * 获取用户类型显示
 */
export function getUserType(identity) {
    for (let item of userTypes) {
        if (item.value == identity) {
            return item.label;
        }
    }
}