import ajax from './request'

export const adList = (data = {}) => {
    return ajax('/ad/list', data, 'get');
}

export const adSave = (data = {}) => {
    return ajax('/ad/save', data);
}

export const delAd = (id) => {
    return ajax(`/ad/delete/${id}`, {});
}

export const userList = (data = {}) => {
    return ajax('/user/list', data, 'post');
}

export const getUser = (id) => {
    return ajax(`/user/get/${id}`, {},'get');
}

export const updateUser = (data = {}) => {
    return ajax('/user/update', data, 'post');
}

export const dictList = (data = {}) => {
    return ajax('/dict/list', data, 'post');
}

export const getDict = (id) => {
    return ajax(`/dict/get/${id}`, {},"get");
}

export const saveDict = (data = {}) => {
    return ajax('/dict/save', data,"post");
}

export const updateDict = (data = {}) => {
    return ajax('/dict/update', data,"post");
}

export const deleteDict = (id) => {
    return ajax(`/dict/delete/${id}`, {});
}

export const feedbackList = (data = {}) => {
    return ajax('/feedback/list', data, 'post');
}

export const getFeedback = (id) => {
    return ajax(`/feedback/get/${id}`, {},"get");
}

export const couponList = (data = {}) => {
    return ajax('/coupon/list', data, 'post');
}

export const transactionList = (data = {}) => {
    return ajax('/finance/transactionList', data, 'post');
}