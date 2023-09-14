// @ts-ignore
/* eslint-disable */

declare namespace API {
  type DefaultResult = {
    code?: number;
    data?: string | object;
    message?: string;
  };

  type CurrentUser = {
    user_id?: string;
    user_avatar?: string;
    user_name?: string;
    mobile?: string;
    toekn?: string;
    role_id?: string;
    status?: string;
    email?: string;
  };

  type CurrentUserResult = {
    code: number;
    data?: CurrentUser;
    msg: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type LoginResult = {
    code?: number;
    data?: { access_token?: string; refresh_token?: string };
    msg?: string;
  };

  type LoginParams = {
    email: string;
    password: string;
  };

  type RegisterParams = {
    email: string;
    password: string;
    captcha: string;
  };

  type RegisterResult = {
    code?: number;
    data?: { tokens: string };
    msg?: string;
  };

  type LogoutParams = {
    user_id?: string;
  };

  type LogoutResult = {
    code?: number;
    data?: object;
    msg?: string;
  };

  type ArticleListParams = PageParams & {
    title?: string;
    gmt_create?: string[];
    gmt_modified?: string[];
    article_type?: stirng;
    tags?: number[];
    is_recommend?: number;
  };

  type PageSort = {
    [K: string]: 'descend' | 'ascend' | null;
  };

  type ArticleList = {
    data?: {
      list?: ArticleListItem[];
      total?: number;
    };
    /** 列表的内容总数 */
    success?: boolean;
    code?: number;
    message?: string;
  };

  type ArticleListItem = {
    id: string; // 主键id
    article_id: string; // 文章id
    article_type: string; // 文章类型
    title: string; // 文章标题
    sub_title: string; //文章摘要
    cover_url?: string; // 封面图
    content?: string; // 文章内容
    visits: string; // 浏览次数
    is_recommend: string; // 是否置顶
    gmt_create: string; // 创建时间
    gmt_modified: string; // 更新时间
  };

  type AddArticleParams = {
    title: string; // 文章标题
    sub_title?: string; // 文章摘要
    cover_url?: string; // 文章封面
    content: string; // 文章内容
    category?: string; // 分类
    tag?: number[]; // 标签
  };

  type DeleteArticleParams = {
    article_id: string;
  };
}
