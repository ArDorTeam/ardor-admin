// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(body: { email: string }, options?: { [key: string]: any }) {
  return request<API.CurrentUserResult>('/api/v1/users/getUser', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/v1/auth/logout */
export async function outLogin(body: API.LogoutParams, options?: { [key: string]: any }) {
  return request<API.DefaultResult>('/api/v1/auth/logout', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 登录接口 POST /api/v1/auth/signin */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/v1/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/v1/auth/signup */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.RegisterResult>('/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章列表 POST /api/v1/article/getArticleList */
export async function getArticleList(
  params: API.ArticleListParams,
  sort: API.PageSort,
  options?: { [key: string]: any },
) {
  const { title, gmt_create, gmt_modified, current, pageSize, article_type, tags, is_recommend } =
    params;
  const paramsMap = {
    searchValue: title,
    createTime: gmt_create,
    updateTime: gmt_modified,
    article_type,
    tags,
    is_recommend,
    offset: current,
    length: pageSize,
  };
  const res = await request<API.ArticleList>('/api/v1/article/getArticleList', {
    method: 'POST',
    data: { ...paramsMap, sort: Object.keys(sort).length > 0 ? sort : undefined },
    ...(options || {}),
  }).catch((e) => {});
  if (res?.code === 200) {
    return {
      data: res?.data?.list || [],
      success: true,
      total: res?.data?.total,
    };
  } else {
    return {
      data: [],
      success: false,
      total: 0,
    };
  }
}

/** 获取文章详情 POST /api/v1/addArticle */
export async function getArticleDetail(
  params: API.getArticleParams,
  options?: { [key: string]: any },
) {
  return request<API.getArticleResult>('/api/v1/article/getArticleDetail', {
    method: 'POST',
    data: { ...params },
    ...(options || {}),
  });
}

/** 新增文章 POST /api/v1/addArticle */
export async function addArticle(params: API.AddArticleParams, options?: { [key: string]: any }) {
  return request<API.DefaultResult>('/api/v1/article/addArticle', {
    method: 'POST',
    data: { ...params },
    ...(options || {}),
  });
}

/** 编辑文章 POST /api/v1/updateArticle */
export async function updateArticle(
  params: API.UpdateArticleParams,
  options?: { [key: string]: any },
) {
  return request<API.DefaultResult>('/api/v1/article/updateArticle', {
    method: 'POST',
    data: { ...params },
    ...(options || {}),
  });
}

/** 删除文章 POST /api/v1/deleteArticle */
export async function deleteArticle(
  params: API.DeleteArticleParams,
  options?: { [key: string]: any },
) {
  return request<API.DefaultResult>('/api/v1/article/deleteArticle', {
    method: 'POST',
    data: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
