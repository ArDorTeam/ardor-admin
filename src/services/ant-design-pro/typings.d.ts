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

  type CurrentUserResult = DefaultResult & {
    data?: CurrentUser;
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

  type LoginResult = DefaultResult & {
    data?: { access_token?: string; refresh_token?: string };
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

  type RegisterResult = DefaultResult & {
    data?: { tokens: string };
  };

  type LogoutParams = {
    user_id?: string;
  };

  type ArticleListParams = PageParams & {
    title?: string;
    gmt_create?: string[];
    gmt_modified?: string[];
    article_type?: stirng;
    tags?: number[];
    is_recommend?: boolean;
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
    is_recommend: boolean; // 是否置顶
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
    is_recommend: boolean; // 是否置顶
  };

  type UpdateArticleParams = {
    title: string; // 文章标题
    sub_title?: string; // 文章摘要
    cover_url?: string; // 文章封面
    content: string; // 文章内容
    is_recommend: boolean; // 是否置顶
    article_id: string; // 文章id
  };

  type getArticleParams = {
    article_id: string;
  };

  type getArticleResult = DefaultResult & {
    data: {
      id: string; // 主键id
      article_id: string; // 文章id
      article_type?: string; // 文章类型
      title: string; // 文章标题
      sub_title?: string; // 文章摘要
      cover_url?: string; // 文章封面
      content: string; // 文章内容
      visits?: string; // 浏览次数
      is_recommend: boolean; // 是否置顶
    };
  };

  type DeleteArticleParams = {
    article_id: string;
  };

  type CategoryListItem = {
    id: string; // 主键id
    category_id: string; // 分类id
    title: string; // 分类标题
    gmt_create: string; // 创建时间
    gmt_modified: string; // 更新时间
  };
}
