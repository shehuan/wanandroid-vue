import {Toast} from "vant";

export const showLoading = () => Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
    loadingType: 'spinner',
});

export const clearLoading = () => Toast.clear();